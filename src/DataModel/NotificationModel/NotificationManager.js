import firebase from "firebase";
import Notification from "./Notification";
import SessionManager from "../SessionModel/SessionManager";
import UserManager from "../UserModel/UserManager";

const NO_COLLECTION = 'notifications';
const SESSION_COLLECTION = 'sessions';
const CLASS_NAME = 'NotificationManager';

const auth = firebase.auth();
const db = firebase.firestore();

const noDocs = db.collection(NO_COLLECTION);
const sessionDocs = db.collection(SESSION_COLLECTION);

export default {

    /**
     * a method used to get the notification with the given id from DB
     * @param nid the id of the notification to be retrieved from DB
     * @returns {Promise<null|Notification>} upon successful retrieval, a promise with resolve of the needed notification is returned.
     *                                       upon failed retrieval, a promise with reject value of null is returned.
     */
    async getNotification(nid) {
        try {
            let noDoc = await noDocs.doc(nid).get();
            console.info(`${CLASS_NAME} | getNotification | successfully retrieve notification data from DB`);
            let timeReceived = noDoc.get('timeReceived').toDate();
            let newNotification = new Notification(noDoc.get('title'), noDoc.get('description'), timeReceived, noDoc.get('isRead'), nid, noDoc.get('sid'));
            return Promise.resolve(newNotification);
        } catch (err) {
            console.error(`${CLASS_NAME} | getNotification | failed to retrieve notification data from DB, received error message: ${err.message}`);
            return Promise.reject(null);
        }
    },

    /**
     * a method used to retrieve a list of notifications from DB
     * @param nids a list of notification ids
     * @returns {Promise<unknown[]>} upon successful retrieval, a promise with resolve value of a list of needed notifications is returned.
     *                               upon failed retrieval, a promise with reject value of null is returned.
     */
    async getNotifications(nids) {
        try {
            let notifications = [];
            for (let i = 0; i < nids.length; i ++) {
                let notification = await this.getNotification(nids[i]);
                notifications.unshift(Promise.resolve(notification));
            }
            return Promise.all(notifications);
        } catch (err) {
            console.error(`${CLASS_NAME} | getNotifications | failed to get notifications, received error message: ${err}`);
            return Promise.reject(null);
        }
    },

    /**
     * a method used to send a notification to all signed up participants in the associated session
     * @param notification the notification to be sent
     * @returns {Promise<*>} upon successful sending, a promise with resolve value of undefined is returned.
     *                       upon failed sending, a promise with reject value of received error message is returned.
     */
    async sendNotification(notification) {
        try {
            let toSend = converter(notification);
            let noFeedback = await noDocs.add(toSend);
            let noID = noFeedback.id;
            console.info(`${CLASS_NAME} | sendNotification | successfully add the notification to DB, new id ${noID}`);
            let sid = notification.sid;
            // first add the new notification to the session's notification list
            let sessionRef = SessionManager.getSessionRef(sid);
            if (!sessionRef) {
                console.error(`session with sid ${sid} is not found on DB`);
                return Promise.reject(`session with sid ${sid} is not found on DB`);
            }

            let sessionDoc = await sessionRef.get();
            let notifications = sessionDoc.get('notifications');

            let index = notifications.indexOf(noID);
            if (index !== -1) {
                notifications.splice(index, 1);
            }

            let sessionUpdateFeedback = await sessionRef.update({notifications: notifications});
            console.info(`${CLASS_NAME} | sendNotification | successfully update session's notification list`);

            // then add this new notification to all signed up participants
            // first use sid to get participant list
            // let sessionFeedback = await sessionDocs.doc(sid).get();
            let participants = sessionDoc.get('participants');
            console.info(`${CLASS_NAME} | sendNotification | successfully get the participant list from DB`);
            // start update each user's notification list
            for (let i = 0; i < participants.length; i++) {
                let id = participants[i];

                let useRef = UserManager.getUserRef(id);
                if (!useRef) {
                    console.error(`${CLASS_NAME} | sendNotification | failed to get the user with uid: ${id}`);
                    return Promise.reject('failed to get user ref');
                }

                let userDoc = await useRef.get();
                let newList = userDoc.get('notifications').unshift(noID);
                // and then update the database
                await useRef.update({notifications: newList});
                console.info(`${CLASS_NAME} | sendNotification | successfully send notification to user with id ${id}`);
            }
            console.info(`${CLASS_NAME} | sendNotification | notification has been sent to all signed up participants`);
            return Promise.resolve(undefined);
        } catch (err) {
            console.error(`${CLASS_NAME} | sendNotification | failed to send notification, received error message: ${err.message}`);
            return Promise.reject(err.message);
        }
    },

    /**
     * a method used to delete a notification that was sent before
     * @param notification the notification to be deleted
     * @returns {Promise<string|*>} upon successful deletion, a promise with resolve value of undefined is returned.
     *                              upon failed deletion, a promise with reject value of received error message is returned.
     */
    async deleteNotification(notification) {
        try {
            let nid = notification.nid;
            let sid = notification.sid;
            // now get all signed up users, and remove notification from their notification list
            let sessionRef = SessionManager.getSessionRef(sid);
            if (!sessionRef) {
                console.error(`${CLASS_NAME} | deleteNotification | failed to get session reference from session manager`);
                return Promise.reject('failed to get session ref');
            }

            let sessionDoc = await sessionRef.get();
            let notifications = sessionDoc.get('notifications');

            let index = notifications.indexOf(nid);
            if (index !== -1) {
                // remove from list
                notifications.splice(index, 1);
            }
            // push new data to DB (update session)
            let sessionUpdateFeedback = await sessionRef.update({notifications: notifications});
            console.info(`${CLASS_NAME} | deleteNotification | successfully update session's notification list`);

            // then, move on to update participants
            let participants = sessionDoc.get('participants');
            for (let i = 0; i < participants.length; i++) {
                let id = participants[i];

                let userRef = UserManager.getUserRef(id);
                if (!userRef) {
                    console.error(`${CLASS_NAME} | deleteNotification | failed to get user reference for ${id} from user manager`);
                    return Promise.reject(`failed to get user reference`);
                }

                let userDoc = await userRef.get();
                let noList = userDoc.get('notifications');
                // update list
                let index = noList.indexOf(nid);
                if (index !== -1) {
                    noList.splice(index, 1);
                }
                // push updated list to DB
                await userRef.update({notifications: noList});
            }
            console.info(`${CLASS_NAME} | deleteNotification | notification has been deleted from associated session and participant's notification list`);
            return Promise.resolve(undefined);
        } catch (err) {
            console.error(`${CLASS_NAME} | deleteNotification | failed to delete notification, received error message: ${err.message}`);
            return err.message;
        }
    }
}

// convert a Notification object to a form that can be processed by firebase
function converter(notification) {
    return {title: notification.title,
            description: notification.description,
            timeReceived: firebase.firestore.Timestamp.fromDate(notification.timeReceived),
            isRead: notification.isRead,
            sid: notification.sid
    };
}

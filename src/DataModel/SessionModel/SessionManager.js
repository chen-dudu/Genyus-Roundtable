import firebase from "firebase";
import Session from "./Session";

const SESSION_COLLECTION = 'sessions';
const CLASS_NAME = 'SessionManager';

const db = firebase.firestore();

const sDocs = db.collection(SESSION_COLLECTION);


export default {

    /**
     * a method used to add a new session into DB
     * @param session the session to be added
     * @returns {Promise<*>} upon successful creation, a promise with resolve value of undefined is returned.
     *                       upon failed creation,  a promise with reject value of received error message is returned.
     */
    async createSession(session) {
        try {
            let toSend = converter(session);
            let createFeedback = await sDocs.add(toSend);
            console.info(`${CLASS_NAME} | createSession | new session has been successfully created in DB, id assigned is: ${createFeedback.id}`);
            return Promise.resolve(undefined);
        } catch (err) {
            console.error(`${CLASS_NAME} | createSession | failed to create a new session on DB, received error message: ${err.message}`);
            return Promise.reject(err.message);
        }
    },

    /**
     * a method used to retrieve a reference to the session document in DB with the given id
     * @param sid the id of the session to be retrieved
     * @returns {null|firebase.firestore.DocumentReference<firebase.firestore.DocumentData>}
     *          upon successful retrieval, the session reference is returned.
     *          upon failed retrieval, null is returned.
     */
    getSessionRef(sid) {
        try {
            return sDocs.doc(sid);
        } catch (err) {
            console.error(`${CLASS_NAME} | getSessionRef | failed to get session ref, received error message: ${err.message}`);
            return null;
        }
    },

    /**
     * a method used to get the session with the given id from DB
     * @param sid the id of the session to be retrieved
     * @returns {Promise<Session|null>} upon successful retrieval, a promise with resolve value of the needed session is returned.
     *                                  upon failed retrieval, a promise with reject value of received error message is returned.
     */
    async getSession(sid) {
        try {
            let sDoc = await sDocs.doc(sid).get();
            console.info(`${CLASS_NAME} | getSession | successfully retrieved the needed session from DB`);
            let timeSlots = [];
            sDoc.get('timeSlots').forEach(key => {
                timeSlots.unshift(key.toDate());
            });
            // let timeSlots = sDoc.get('timeSlots').toDate();
            let newSession =  new Session(sDoc.id, sDoc.get('title'), sDoc.get('description'), sDoc.get('duration'),
                                          sDoc.get('youtubeLink'), sDoc.get('zoomLink'), timeSlots,
                                          sDoc.get('questions'), sDoc.get('status'), sDoc.get('researchers'),
                                          sDoc.get('participants'), sDoc.get('notification'));
            return Promise.resolve(newSession);
        } catch (err) {
            console.error(`${CLASS_NAME} | getSession | failed to retrieve the session from DB, received error message: ${err.message}`);
            return Promise.reject(err.message);
        }
    },

    /**
     * a method used to retrieve a list of sessions from DB
     * @param sids a list of session ids
     * @returns {Promise<unknown[]>} upon successful retrieval, a promise with resolve value of a list of needed sessions is returned.
     *                               upon failed retrieval, a promise with reject value of null is returned.
     */
    async getSessions(sids) {
        try {
            let sessions = [];
            for (let i = 0; i < sids.length; i++) {
                let session = await this.getNotification(sids[i]);
                sessions.unshift(Promise.resolve(session));
            }
            console.info(`${CLASS_NAME} | getSessions | successfully get all sessions from DB`);
            return Promise.all(sessions);
        } catch (err) {
            console.error(`${CLASS_NAME} | getSessions | failed to get sessions, received error message: ${err}`);
            return Promise.reject(null);
        }
    },

    /**
     * a method used to update title property of session on DB
     * @param sid   the id of the session whose property is to be updated
     * @param title the new value of the property
     * @returns {Promise<*>} upon successful update, a promise with resolve value of undefined is returned.
     *                       upon failed update, a promise with reject value of received error message is returned.
     */
    async updateTitle(sid, title) {
        try {
            let updateFeedback = await sDocs.doc(sid).update({title: title});
            console.info(`${CLASS_NAME} | updateTitle | successfully update title on DB, feedback received: ${updateFeedback}`);
            return Promise.resolve(undefined);
        } catch (err) {
            console.error(`${CLASS_NAME} | updateTitle | failed to update title, received error message: ${err.message}`);
            return Promise.reject(err.message);
        }
    },

    /**
     * a method used to update researchers property of session on DB
     * @param sid         the id of the session whose property is to be updated
     * @param researchers the new value of the property
     * @returns {Promise<*>} upon successful update, a promise with resolve value of undefined is returned.
     *                       upon failed update, a promise with reject value of received error message is returned.
     */
    async updateResearcher(sid, researchers) {
        try {
            let updateFeedback = await sDocs.doc(sid).update({researchers: researchers});
            console.info(`${CLASS_NAME} | updateResearchers | successfully update researchers on DB, feedback received: ${updateFeedback}`);
            return Promise.resolve(undefined);
        } catch (err) {
            console.error(`${CLASS_NAME} | updateResearchers | failed to update researchers, received error message: ${err.message}`);
            return Promise.reject(err.message);
        }
    },

    /**
     * a method used to update duration property of session on DB
     * @param sid      the id of the session whose property is to be updated
     * @param duration the new value of the property
     * @returns {Promise<*>} upon successful update, a promise with resolve value of undefined is returned.
     *                       upon failed update, a promise with reject value of received error message is returned.
     */
    async updateDuration(sid, duration) {
        try {
            let updateFeedback = await sDocs.doc(sid).update({duration: duration});
            console.info(`${CLASS_NAME} | updateDuration | successfully update duration on DB, feedback received: ${updateFeedback}`);
            return Promise.resolve(undefined);
        } catch (err) {
            console.error(`${CLASS_NAME} | updateDuration | failed to update duration, received error message: ${err.message}`);
            return Promise.reject(err.message);
        }
    },

    /**
     * a method used to update youtube link property of session on DB
     * @param sid  the id of the session whose property is to be updated
     * @param link the new value of the property
     * @returns {Promise<*>} upon successful update, a promise with resolve value of undefined is returned.
     *                       upon failed update, a promise with reject value of received error message is returned.
     */
    async updateYoutubeLink(sid, link) {
        try {
            let updateFeedback = await sDocs.doc(sid).update({youtubeLink: link});
            console.info(`${CLASS_NAME} | updateYoutubeLink | successfully update youtube link on DB, feedback received: ${updateFeedback}`);
            return Promise.resolve(undefined);
        } catch (err) {
            console.error(`${CLASS_NAME} | updateYoutubeLink | failed to update youtube link, received error message: ${err.message}`);
            return Promise.reject(err.message);
        }
    },

    /**
     * a method used to update description property of session on DB
     * @param sid         the id of the session whose property is to be updated
     * @param description the new value of the property
     * @returns {Promise<*>} upon successful update, a promise with resolve value of undefined is returned.
     *                       upon failed update, a promise with reject value of received error message is returned.
     */
    async updateDescription(sid, description) {
        try {
            let updateFeedback = await sDocs.doc(sid).update({description: description});
            console.info(`${CLASS_NAME} | updateDescription | successfully update description on DB, feedback received: ${updateFeedback}`);
            return Promise.resolve(undefined);
        } catch (err) {
            console.error(`${CLASS_NAME} | updateDescription | failed to update description, received error message: ${err.message}`);
            return Promise.reject(err.message);
        }
    },

    /**
     * a method used to update zoom link property of session on DB
     * @param sid  the id of the session whose property is to be updated
     * @param link the new value of the property
     * @returns {Promise<*>} upon successful update, a promise with resolve value of undefined is returned.
     *                       upon failed update, a promise with reject value of received error message is returned.
     */
    async updateZoomLink(sid, link) {
        try {
            let updateFeedback = await sDocs.doc(sid).update({zoomLink: link});
            console.info(`${CLASS_NAME} | updateZoomLink | successfully update zoom link on DB, feedback received: ${updateFeedback}`);
            return Promise.resolve(undefined);
        } catch (err) {
            console.error(`${CLASS_NAME} | updateZoomLink | failed to update zoom link, received error message: ${err.message}`);
            return Promise.reject(err.message);
        }
    },

    /**
     * a method used to update time slots property of session on DB
     * @param sid   the id of the session whose property is to be updated
     * @param slots the new value of the property
     * @returns {Promise<*>} upon successful update, a promise with resolve value of undefined is returned.
     *                       upon failed update, a promise with reject value of received error message is returned.
     */
    async updateTimeSlots(sid, slots) {
        try {
            let slots = [];
            slots.forEach(slot => {
                slots.unshift(firebase.firestore.Timestamp.fromDate(slot));
            });
            let updateFeedback = await sDocs.doc(sid).update({timeSlots: slots});
            console.info(`${CLASS_NAME} | updateTimeSlots | successfully update time slots on DB, feedback received: ${updateFeedback}`);
            return Promise.resolve(undefined);
        } catch (err) {
            console.error(`${CLASS_NAME} | updateTimeSlots | failed to update time slot, received error message: ${err.message}`);
            return Promise.reject(err.message);
        }
    },

    /**
     * a method used to update questions property of session on DB
     * @param sid       the id of the session whose property is to be updated
     * @param questions the new value of the property
     * @returns {Promise<*>} upon successful update, a promise with resolve value of undefined is returned.
     *                       upon failed update, a promise with reject value of received error message is returned.
     */
    async updateQuestions(sid, questions) {
        try {
            let updateFeedback = await sDocs.doc(sid).update({questions: questions});
            console.info(`${CLASS_NAME} | updateQuestions | successfully update questions on DB, feedback received: ${updateFeedback}`);
            return Promise.resolve(undefined);
        } catch (err) {
            console.error(`${CLASS_NAME} | updateQuestions | failed to update questions, received error message: ${err.message}`);
            return Promise.reject(err.message);
        }
    },

    /**
     * a method used to sign up a participant to a session
     * @param sid the id of the session to be signed up
     * @param uid the id of the participant
     * @returns {Promise<*>} upon successful signup, a promise with resolve value of undefined is returned.
     *                       upon failed signup, a promise with reject value of received error message is returned.
     */
    async signup(sid, uid) {
        try {
            let sRef = sDocs.doc(sid);
            let sDoc = await sRef.get();

            let participants = sDoc.get('participants');
            participants.unshift(uid);
            let updateFeedback = await sRef.update({participants: participants});
            console.info(`${CLASS_NAME} | signup | successfully sign up a participant for the given session, feedback received: ${updateFeedback}`);
            return Promise.resolve(undefined);
        } catch (err) {
            console.error(`${CLASS_NAME} | signup | failed to sign up a participant for the given sesison, error message received: ${err.message} `);
            return Promise.reject(err.message);
        }
    },

    /**
     * a method used to retrieve the participant list of the given list
     * @param sid the id of the session whose participant list is to be retrieved
     * @returns {Promise<null|*>} upon successful retrieval, a promise with resolve value of a list of participants is returned.
     *                            upon failed retrieval, a promise with reject value of null is returned.
     */
    async getParticipants(sid) {
        try {
            let sessionDoc = await sDocs.doc(sid).get();
            // let participants = sessionDoc.get('participants');
            return Promise.resolve(sessionDoc.get('participants'));
        } catch (err) {
            console.error(`${CLASS_NAME} | getParticipant | failed to get participant list, received error message: ${err.message}`);
            return Promise.reject(null);
        }
    },

    /**
     * a method used to retrieve the notification list of the given list
     * @param sid the id of the session whose notification list is to be retrieved
     * @returns {Promise<null|*>} upon successful retrieval, a promise with resolve value of a list of notifications is returned.
     *                            upon failed retrieval, a promise with reject value of null is returned.
     */
    async getNotification(sid) {
        try {
            let sessionDoc = await sDocs.doc(sid).get();
            return Promise.resolve(sessionDoc.get('notifications'));
        } catch (err) {
            console.error(`${CLASS_NAME} | getNotification | failed to get notification list, received error message: ${err.message}`);
            return Promise.reject(null);
        }
    }
}

// convert a Session object to a form that can be processed by firebase
function converter(session) {
    let timeSlots = [];
    session.timeSlots.forEach(slot => {
        timeSlots.unshift(firebase.firestore.Timestamp.fromDate(slot));
    });
    return {
        title: session.title,
        description: session.description,
        duration: session.duration,
        youtubeLink: session.youtubeLink,
        zoomLink: session.zoomLink,
        timeSlots: timeSlots,
        questions: session.questions,
        status: session.status,
        researchers: session.researchers,
        participants: session.participants,
        notifications: session.notifications
    };
}

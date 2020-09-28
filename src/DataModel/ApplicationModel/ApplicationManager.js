import firebase from "firebase";
import Application from "./Application";
import UserManager from "../UserModel/UserManager";
import SessionManager from "../SessionModel/SessionManager";

const CLASS_NAME = "ApplicationManager";
const APP_COLLECTION = "applications";

const db = firebase.firestore();
const appDocs = db.collection(APP_COLLECTION);

export default {

    /**
     * a method used to send an application
     * @param application the application to be sent
     * @returns {Promise<undefined|String>} upon successful sending, a promise with resolve value of undefined is returned
     *                                      upon failed sending, a promise with reject value of received error message is returned
     */
    async applyForSession(application) {
        try {
            let toSend = convertor(application);
            let feedback = await appDocs.add(toSend);
            console.info(`${CLASS_NAME} | applyForSession | successfully process the application on DB`);
            return Promise.resolve(undefined);
        } catch (err) {
            console.error(`${CLASS_NAME} | applyForSession | failed to process the application on DB, received error message ${err.message}`);
            return Promise.reject(err.message);
        }
    },

    /**
     * a method used to retrieve the application with the specified id from DB
     * @param aid the id of the application to be retrieved
     * @returns {Promise<Application>} upon successful retrieval, a promise with resolve value of the needed application is returned
     *                                 upon failed retrieval, a promise with reject value of the received error message is returned
     */
    async getApplication(aid) {
        try {
            let application = await appDocs.doc(aid).get();
            console.info(`${CLASS_NAME} | getApplication | successfully retrieved the needed application from DB`);
            return Promise.resolve(new Application(application.id, application.get('applicant'), application.get('session'), application.get('status'), application.get('optional')));
        } catch (err) {
            console.error(`${CLASS_NAME} | getApplication | failed to retrieved the needed application from DB, received eror message ${err.message}`);
            return Promise.reject(null);
        }
    },

    /**
     * a method used to retrieve all applications from DB
     * @returns {Promise<Application[]>} upon successful retrieval, a promise with resolve value of a list of applications is returned
     *                                   upon failed retrieval, a promise with reject value of received error message is returned
     */
    async getApplications() {
        try {
            let applications = [];
            let docs = await appDocs.get();
            console.info(`${CLASS_NAME} | getApplications | successfully retrieve the application list from DB, start doing pre-processing`);
            docs.forEach(doc => {
                let newApp = new Application(doc.id, doc.get('applicant'), doc.get('session'), doc.get('status'), doc.get('optional'));
                applications.unshift(Promise.resolve(newApp))
            });
            console.info(`${CLASS_NAME} | getApplications | finished pre-processing, data is ready to be returned to caller`);
            return Promise.all(applications);
        } catch (err) {
            console.error(`${CLASS_NAME} | getApplications | failed to retrieve application list from DB, received error message ${err.message}`);
            return Promise.reject(null)
        }
    },

    /**
     * a method used to retrieve all pending applications from DB
     * @returns {Promise<Application[]>} upon successful retrieval, a promise with resolve value of a list of pending applications is returned
     *                                   upon failed retrieval, a promise with reject value of received error message is returned
     */
    async getPendingApplication() {
        try {
            let applications = [];
            let docs = await appDocs.get();
            console.info(`${CLASS_NAME} | getPendingApplication | successfully retrieve the application list from DB, start doing pre-processing`);
            docs.forEach(doc => {
                let status = doc.get('status');
                if (status === 'pending') {
                    let newApp = new Application(doc.id, doc.get('applicant'), doc.get('session'), status, doc.get('optional'));
                    applications.unshift(Promise.resolve(newApp))
                }
            });
            console.info(`${CLASS_NAME} | getPendingApplication | finished pre-processing, data is ready to be returned to caller`);
            return Promise.all(applications);
        } catch (err) {
            console.error(`${CLASS_NAME} | getPendingApplication | failed to retrieve application list from DB, received error message ${err.message}`);
            return Promise.reject(null)
        }
    },

    /**
     * a method used to retrieve all approved applications from DB
     * @returns {Promise<Application[]>} upon successful retrieval, a promise with resolve value of a list of approved applications is returned
     *                                   upon failed retrieval, a promise with reject value of received error message is returned
     */
    async getApprovedApplication() {
        try {
            let applications = [];
            let docs = await appDocs.get();
            console.info(`${CLASS_NAME} | getApprovedApplication | successfully retrieve the application list from DB, start doing pre-processing`);
            docs.forEach(doc => {
                let status = doc.get('status');
                if (status === 'approved') {
                    let newApp = new Application(doc.id, doc.get('applicant'), doc.get('session'), status, doc.get('optional'));
                    applications.unshift(Promise.resolve(newApp))
                }
            });
            console.info(`${CLASS_NAME} | getApprovedApplication | finished pre-processing, data is ready to be returned to caller`);
            return Promise.all(applications);
        } catch (err) {
            console.error(`${CLASS_NAME} | getApprovedApplication | failed to retrieve application list from DB, received error message ${err.message}`);
            return Promise.reject(null)
        }
    },

    /**
     * a method used to retrieve all rejected applications from DB
     * @returns {Promise<Application[]>} upon successful retrieval, a promise with resolve value of a list of rejected applications is returned
     *                                   upon failed retrieval, a promise with reject value of received error message is returned
     */
    async getRejectedApplication() {
        try {
            let applications = [];
            let docs = await appDocs.get();
            console.info(`${CLASS_NAME} | getRejectedApplication | successfully retrieve the application list from DB, start doing pre-processing`);
            docs.forEach(doc => {
                let status = doc.get('status');
                if (status === 'rejected') {
                    let newApp = new Application(doc.id, doc.get('applicant'), doc.get('session'), status, doc.get('optional'));
                    applications.unshift(Promise.resolve(newApp))
                }
            });
            console.info(`${CLASS_NAME} | getRejectedApplication | finished pre-processing, data is ready to be returned to caller`);
            return Promise.all(applications);
        } catch (err) {
            console.error(`${CLASS_NAME} | getRejectedApplication | failed to retrieve application list from DB, received error message ${err.message}`);
            return Promise.reject(null)
        }
    },

    /**
     * a method used to approve a session application
     * @param aid the id of the application to be assessed
     * @returns {Promise<undefined|String>} upon successful approval, a promise with resolve value of undefined is returned
     *                                      upon failed approval, a promise with reject value of received error message is returned
     */
    async approve(aid) {
        try {
            // first update application status
            let feedback = await appDocs.doc(aid).update({status: 'approved'});
            console.info(`${CLASS_NAME} | approve | successfully update application status on DB`);

            let application = await appDocs.doc(aid).get();
            let uid = application.applicant;
            let sid = application.session;
            let userRef = UserManager.getUserRef(uid);
            let participant = await userRef.get();
            let session = await SessionManager.getSession(sid);
            console.info(`${CLASS_NAME} | approve | finished setup for update`);

            // then add this session to participant's session list
            let session_list = participant.get('sessions');
            session_list.unshift(sid);
            await userRef.update({sessions: session_list});
            console.info(`${CLASS_NAME} | approve | successfully updated participant's session list`);

            // then move on to add this participant to session's participant list
            let participant_list = session.get('participants');
            participant_list.unshift(uid);
            await SessionManager.getSessionRef(sid).update({participants: participant_list});
            console.info(`${CLASS_NAME} | approve | successfully updated session's participant list`);

            return Promise.resolve(undefined);
        } catch (err) {
            console.error(`${CLASS_NAME} | approve | failed to process the application approval, received error message ${err.message}`);
            return Promise.reject(err.message);
        }
    },

    /**
     * a method used to reject a session application
     * @param aid the id of the application to be assessed
     * @returns {Promise<undefined|String>} upon successful rejection, a promise with resolve value of undefined is returned
     *                                      upon failed rejection, a promise with reject value of received error message is returned
     */
    async reject(aid) {
        try {
            // update application status, nothing else needs to do
            let feedback = await appDocs.doc(aid).update({status: 'rejected'});
            console.info(`${CLASS_NAME} | reject | the given application has been successfully rejected on DB`);
            return Promise.resolve(undefined);
        } catch (err) {
            console.error(`${CLASS_NAME} | reject | failed to process the application rejection, received error message ${err.message}`);
            return Promise.reject(err.message);
        }
    }
}

// convert a Application object to a form that can be processed by firebase
function convertor(application) {
    return {
        application: application.applicant,
        session: application.session,
        status: application.status,
        optional: application.optional
    }
}
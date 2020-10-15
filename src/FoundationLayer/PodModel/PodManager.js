import firebase from "firebase";
import Pod from "./Pod";
import UserManager from "../UserModel/UserManager";

const CLASS_NAME = "PodManager";
const POD_COLLECTION = "pods";
const USER_COLLECTION = 'users';

const db = firebase.firestore();
const podDocs = db.collection(POD_COLLECTION);
const userDocs = db.collection(USER_COLLECTION)

export default {

    /**
     * a method used to create a new pod document on DB, with auto-assigned ID
     * @param pod the pod to be created on DB
     * @param uid the id of the researcher user
     * @returns {Promise<String|String>} upon successful creation, a promise with resolve value of the id of the created pod is returned
     *                                   upon failed creation, a promise with reject value of the received error message is returned
     */
    async createPod(pod, uid) {
        try {
            let toSend = converter(pod);
            // add user to pod's participant list
            toSend.participants.unshift(uid);
            // create a new pod on DB
            let feedback = await podDocs.add(toSend);
            console.debug(`${CLASS_NAME} | createPod | successfully created a new pod on DB, with id ${feedback.id}`);
            let pid = feedback.id;
            // then, add the new pod to user's pod list
            let user = await userDocs.doc(uid).get();
            console.debug(`${CLASS_NAME} | signup | successfully get user record from firestore`);
            let pod_list = user.get('pods');
            pod_list.unshift(pid);
            await userDocs.doc(uid).update({pods: pod_list});
            console.debug(`${CLASS_NAME} | signup | successfully added new pod to user's pod list`);
            return Promise.resolve(pid);
        } catch (err) {
            console.error(`${CLASS_NAME} | createPod | failed to create new pod on DB, received error message ${err.message}`);
            return Promise.reject(err.message);
        }
    },

    /**
     * a method used to retrieve a reference to the pod document in DB with the given id
     * @param pid the id of the pod to be retrieved
     * @return {null|firebase.firestore.DocumentReference<firebase.firestore.DocumentData>}
     *          upon successful retrieval, the pod reference is returned.
     *          upon failed retrieval, null is returned.
     */
    getPodRef(pid) {
        try {
            return podDocs.doc(pid);
        } catch (err) {
            console.error(`${CLASS_NAME} | getPodRef | failed to get pod ref, received error message: ${err.message}`);
            return null
        }
    },

    /**
     * a method used to get the pod with the specified id from DB
     * @param pid the id of the pod to be retrieved fro DB
     * @returns {Promise<Pod|String>} upon successful retrieval, a promise with resolve value of the required pod object is returned
     *                                upon failed retrieval, a promise with reject value of the received error message is returned
     */
    async getPod(pid) {
        try {
            let pod = await podDocs.doc(pid).get();
            console.debug(`${CLASS_NAME} | getPod | successfully retrieved the needed pod from DB`);
            return Promise.resolve(new Pod(pod.id, pod.get('title'), pod.get('calendlyLink'), pod.get('researcher'), pod.get('participants')));
        } catch (err) {
            console.error(`${CLASS_NAME} | getPod | failed to retrieve the needed pod from DB, received error message ${err.message}`);
            return Promise.reject(err.message);
        }
    },

    /**
     * a method used to retrieve all pod records from DB
     * @return {Promise<Pod[]>} upon successful retrieval, a promise with resolve value of an array of pods is returned
     *                          upon failed retrieval, a promise with the received error message is returned
     */
    async getAllPods() {
        try {
            let queryResult = await podDocs.get();
            console.debug(`${CLASS_NAME} | getAllPods| successfully retrieval all pod records from firestore, start pre-processing`);
            let pods = [];
            queryResult.docs.forEach(doc => {
                let pid = doc.id;
                let title = doc.get('title');
                let calendlyLink = doc.get('calendlyLink');
                let researcher = doc.get('researcher');
                let participants = doc.get('participants');
                // let sessions = doc.get('sessions');
                let pod = new Pod(pid, title, calendlyLink, researcher, participants);
                pods.unshift(Promise.resolve(pod));
            });
            console.debug(`${CLASS_NAME} | getAllPods | finished pre-processing, data is ready to be returned`);
            return Promise.all(pods);
        } catch (err) {
            console.error(`${CLASS_NAME} | getAllPods | failed to retrieve pod records from firestore, error: ${err}`);
            return Promise.reject(err);
        }
    },

    /**
     * a method used to sign up a user for a pod
     * @param pid the pod to be signed up for
     * @return {Promise<unknown>} upon successful signup, a promise with resolve value of undefine is returned
     *                            upon failed signup, a promise with reject value of received error message is returned
     */
    async signup(pid) {
        try {
            let pRef = podDocs.doc(pid);
            console.debug(`${CLASS_NAME} | signup | successfully get ref to pod doc`);
            let pDoc = await pRef.get();
            let pid = pDoc.id;
            console.debug(`${CLASS_NAME} | signup | successfully get pod doc from DB`);
            let user = await UserManager.getCurrentUser();
            let uid = user.uid;
            console.debug(`${CLASS_NAME} | signup | successfully get user doc from DB`);
            let participants = pDoc.get('participants');
            // TODO rename var name sessions -> pods
            let pods = user.get('sessions');
            if (!participants.includes(uid) && !pods.includes(pid)) {
                participants.unshift(uid);
                pods.unshift(uid);
                console.debug(`${CLASS_NAME} | signup | successfully update pod and user information, start updating DB`);
            }
            await pRef.update({participants: participants});
            console.debug(`${CLASS_NAME} | signup | successfully updated DB for pods`);
            // TODO rename var name sessions -> pods
            await db.collection('users').doc(uid).update({sessions: pods});
            console.debug(`${CLASS_NAME} | signup | successfully updated DB for user`);
            return Promise.resolve(undefined);
        } catch (err) {
            console.error(`${CLASS_NAME} | signup | failed to process the pod sign up, error: ${err}`);
            return Promise.reject(err);
        }
    }
}

// convert a Pod object to a form that can be processed by firebase
function converter(pod) {
    return {
        title: pod.title,
        calendlyLink: pod.calendlyLink,
        researcher: pod.researcher,
        participants: pod.participants,
        notifications: pod.notifications
        // sessions: pod.sessions
    };
}
import firebase from "firebase";
import Pod from "./Pod";

const CLASS_NAME = "PodManager";
const POD_COLLECTION = "pods";

const db = firebase.firestore();
const podDocs = db.collection(POD_COLLECTION);

export default {

    /**
     * a method used to create a new pod document on DB, with auto-assigned ID
     * @param pod the pod to be created on DB
     * @returns {Promise<undefined|String>} upon successful creation, a promise with resolve value of undefined is returned
     *                                      upon failed creation, a promise with reject value of the received error message is returned
     */
    async createPod(pod) {
        try {
            let toSend = converter(pod);
            let feedback = await podDocs.add(toSend);
            console.debug(`${CLASS_NAME} | createPod | successfully created a new pod on DB, with id ${feedback.id}`);
            return Promise.resolve(undefined);
        } catch (err) {
            console.error(`${CLASS_NAME} | createPod | failed to create new pod on DB, received error message ${err.message}`);
            return Promise.reject(err.message);
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
            return Promise.resolve(new Pod(pod.id, pod.get('title'), pod.get('description'), pod.get('researcher'), pod.get('sessions')));
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
            console.debug(`${CLASS_NAME} | getAllPods| successfully retrievel all pod records from firestore, start pre-processing`);
            let pods = [];
            queryResult.docs.forEach(doc => {
                let pid = doc.id;
                let title = doc.get('title');
                let description = doc.get('description');
                let researcher = doc.get('researcher');
                let sessions = doc.get('sessions');
                let pod = new Pod(pid, title, description, researcher, sessions);
                pods.unshift(Promise.resolve(pod));
            });
            console.debug(`${CLASS_NAME} | getAllPods | finished pre-processing, data is ready to be returned`);
            return Promise.all(pods);
        } catch (err) {
            console.error(`${CLASS_NAME} | getAllPods | failed to retrieve pod records from firestore, error: ${err}`);
            return Promise.reject(err);
        }
    }
}

// convert a Pod object to a form that can be processed by firebase
function converter(pod) {
    return {
        title: pod.title,
        description: pod.description,
        researcher: pod.researcher,
        sessions: pod.sessions
    };
}
/**
 * @file this file contains methods that communicate with firebase about all pod-related issues
 */
import firebase from "firebase";
import Pod from "./Pod";
import UserManager from "../UserModel/UserManager";

const CLASS_NAME = "PodManager";
const POD_COLLECTION = "pods";
const USER_COLLECTION = 'users';

const db = firebase.firestore();
const podDocs = db.collection(POD_COLLECTION);
const userDocs = db.collection(USER_COLLECTION)
const storage = firebase.storage();

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
            if (!toSend) {
                console.error(`${CLASS_NAME} | createPod | failed to convert data to firebase compatible form`);
                return Promise.reject(new Error("input object has wrong format"));
            }
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
            let admin = await UserManager.getCurrentUser();
            let admin_id = admin.uid;
            let pods = admin.pods;
            pods.unshift(pid);
            await userDocs.doc(admin_id).update({pods: pods});
            console.debug(`${CLASS_NAME} | signup | successfully added new pod to admin's pod list`);
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
            return Promise.resolve(new Pod(pod.id, pod.get('title'), pod.get('status'), pod.get('description'),
                pod.get('calendlyLink'), pod.get('researcher'), pod.get('participants'), pod.get('notifications'), pod.get('notes'),
                pod.get('youtubeLink'), pod.get('shareLink'), pod.get('video')));
        } catch (err) {
            console.error(`${CLASS_NAME} | getPod | failed to retrieve the needed pod from DB, received error message ${err.message}`);
            return Promise.reject(err.message);
        }
    },

    /**
     * a method used to get a list of pods from DB
     * @param pids a list of pod ids
     * @return {Promise<unknown[]>} upon successful retrieval, a promise with resolve value of a list of needed pods is returned
     *                              upon failed retrieval, a promise with reject value of received error message is returned
     */
    async getPods(pids) {
        try {
            let pods = [];
            for (let i = 0; i < pids.length; i++) {
                let pod = await this.getPod(pids[i]);
                // add to end
                pods.push(Promise.resolve(pod));
            }
            console.debug(`${CLASS_NAME} | getPods | finished pre-processing, data is ready to be returned`);
            return Promise.all(pods);
        }
        catch (err) {
            console.error(`${CLASS_NAME} | getPods | failed to get pods from DB, received error message ${err}`);
            return Promise.reject(err);
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
                let status = doc.get('status');
                let description = doc.get('description');
                let calendlyLink = doc.get('calendlyLink');
                let researcher = doc.get('researcher');
                let participants = doc.get('participants');
                let notes = doc.get('notes');
                let youtubeLink = doc.get('youtubeLink');
                let shareLink = doc.get('shareLink');
                let video = doc.get('video');
                // let sessions = doc.get('sessions');
                let pod = new Pod(pid, title, status, description, calendlyLink, researcher, participants, notes, youtubeLink, shareLink, video);
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
            console.debug(`${CLASS_NAME} | signup | successfully get pod doc from DB`);
            let user = await UserManager.getCurrentUser();
            let uid = user.uid;
            let userDoc = await userDocs.doc(uid).get();
            console.debug(`${CLASS_NAME} | signup | successfully get user doc from DB`);
            let participants = pDoc.get('participants');
            let pods = userDoc.get('pods');
            if (!participants.includes(uid) && !pods.includes(pid)) {
                // update pod and participant
                participants.unshift(uid);
                pods.unshift(pid);
                console.debug(`${CLASS_NAME} | signup | successfully update pod and user information, start updating DB`);
            }
            await pRef.update({participants: participants});
            console.debug(`${CLASS_NAME} | signup | successfully updated DB for pods`);
            let notifications = pDoc.get('notifications');
            await userDocs.doc(uid).update({notifications: notifications});
            console.debug(`${CLASS_NAME} | signup | successfully added pod notifications to user`);
            await db.collection('users').doc(uid).update({pods: pods});
            console.debug(`${CLASS_NAME} | signup | successfully updated DB for user`);
            return Promise.resolve(undefined);
        } catch (err) {
            console.error(`${CLASS_NAME} | signup | failed to process the pod sign up, error: ${err}`);
            return Promise.reject(err);
        }
    },

    /**
     * a method used to upload a note to the firebase DB
     * @param file the file to be uploaded
     * @param pid  the id of the pod which the note is for
     * @return {Promise<never>} upon successful uploading, a promise with resolve value of undefined is returned.
     *                          upon failed uploading, a promise with reject value of received error message is returned.
     */
    async upload(file, pid) {
        try {
            let path = 'notes/' + pid + '/' + file.name;
            let storageRef = storage.ref(path);
            let uploadFeedback = storageRef.put(file);
            uploadFeedback.on('state_changed',
                function progress(snapshot) {
                    // this is used together with progress bar to show the current upload progress
                },

                function error(err) {
                    console.error(`${CLASS_NAME} | upload.on | failed to upload notes to database, received error message ${err}`);
                    return Promise.reject(err);
                },

                function complete() {
                    console.debug(`${CLASS_NAME} | upload.complete | successfully upload notes to database, start updating pod attribute`);
                    // update pod note url attribute
                    return podDocs.doc(pid).update({notes: path})
                        .then(feedback => {
                            console.debug(`${CLASS_NAME} | upload.complete | successfully update pod attribute information`);
                            return Promise.resolve(undefined);
                        })
                        .catch(err => {
                            console.error(`${CLASS_NAME} | upload.complete | failed to update pod attribute information, received error message ${err}`);
                            return Promise.reject(err);
                        });
                }
            );

        }
        catch (err) {
            console.error(`${CLASS_NAME} | upload | failed to upload file to DB, received error message ${err}`);
            return Promise.reject(err);
        }
    },

    /**
     * a method used to download notes from firebase DB
     * @param path the path of the file in the database
     * @return {Promise<never>} upon successful retrieval, a promise with resolve value of undefined is returned.
     *                          upon failed retrieval, a promise with reject value of received error message is returned.
     */
    async download(path) {
        try {
            let fileRef = storage.ref(path);
            let url = await fileRef.getDownloadURL();
            console.debug(`${CLASS_NAME} | download | successfully get the download URL of the notes file`);
            // This can be downloaded directly:
            let xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function(event) {
                let blob = xhr.response;
                console.debug(blob);
                console.debug(`${CLASS_NAME} | download.XHR | request finished successfully`);
                // get the file type
                let start;
                for (start = 0; start < blob.type.length; start++) {
                    if (blob.type[start] === '/') {
                        start++;
                        break;
                    }
                }
                let type = blob.type.substring(start);
                // download file when button is clicked
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = 'note.' + type;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                alert('your file has downloaded!');
            };
            xhr.open('GET', url);
            xhr.send();
            return Promise.resolve(undefined);
            // Or inserted into an <img> element:
            // var img = document.getElementById('myimg');
            // img.src = url;
        }
        catch (err)  {
            console.error(`${CLASS_NAME} | download | failed to download notes for pod, received error message ${err}`);
            return Promise.reject(err);
        }
    },

    /**
     * a method used to update a pod's youtube link
     * @param pid  the id of the pod whose attribute is going to be changed
     * @param link the new link
     * @return {Promise<unknown>} upon successful update, a promise with resolve value of undefined is returned.
     *                            upon failed update, a promise with reject value of received error message is returned.
     */
    async updateYoutubeLink(pid, link) {
        try {
            await podDocs.doc(pid).update({youtubeLink: link});
            console.debug(`${CLASS_NAME} | updateYoutubeLink | successfully update the youtube link on DB`);
            return Promise.resolve(undefined);
        }
        catch (err) {
            console.error(`${CLASS_NAME} | updateYoutubeLink | failed to update the youtube link for pod with id ${pid}. received error message ${err}`);
            return Promise.reject(err);
        }
    },

    /**
     * a method used to update a pod's share link
     * @param pid  the id of the pod whose attribute is going to be changed
     * @param link the new link
     * @return {Promise<unknown>} upon successful update, a promise with resolve value of undefined is returned.
     *                            upon failed update, a promise with reject value of received error message is returned.
     */
    async updateShareLink(pid, link) {
        try {
            await podDocs.doc(pid).update({shareLink: link});
            console.debug(`${CLASS_NAME} | updateShareLink | successfully update the share link on DB`);
            return Promise.resolve(undefined);
        }
        catch (err) {
            console.error(`${CLASS_NAME} | updateShareLink | failed to update the share link for pod with id ${pid}, received error message ${err}`);
            return Promise.reject(err);
        }
    }
}

// convert a Pod object to a form that can be processed by firebase
function converter(pod) {
    if (pod.title !== null && pod.calendlyLink !== null && pod.researcher !== null && pod.description !== null && pod.video !== null) {
        return {
            title: pod.title,
            calendlyLink: pod.calendlyLink,
            researcher: pod.researcher,
            // participants: pod.participants,
            participants: [],
            // notifications: pod.notifications,
            notifications: [],
            // status: pod.status,
            status: "upcoming",
            description: pod.description,
            notes: "",
            youtubeLink: "N/A",
            shareLink: "",
            video: pod.video
        };
    }
    else {
        console.error(`${CLASS_NAME} | converter | input object has wrong format!`);
        return null;
    }
}
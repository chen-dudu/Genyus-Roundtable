/**
 * @file this file contains methods that communicate with firebase about all user-related issues
 */
import firebase from "../../firebase";
import User from "./User";

const USER_COLLECTION = 'users';
const CLASS_NAME = 'UserManager';

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

const userDocs = db.collection(USER_COLLECTION);

let currentUser = null;

export default {

    /**
     * a method used to get the current login user in the system
     * @returns {Promise<string|User|*>} upon successful retrieving, a promise with resolve value of user is returned.
     *                                   upon failed retrieving, a promise with reject value of error message string is returned.
     */
    async getCurrentUser() {
        let current = auth.currentUser;
        if (current) {
            try {
                let uid = current.uid;
                let creationTime = current.metadata.creationTime;
                let userDoc = await userDocs.doc(uid).get();
                let fullname = userDoc.get('fullname');
                let nickname = userDoc.get('nickname');
                let pods = userDoc.get('pods');
                let notifications = userDoc.get('notifications');
                let type = userDoc.get('type');
                let description = userDoc.get('description');
                let photoURL = userDoc.get('photoURL');
                currentUser = new User(current.uid, current.email, current.displayName, fullname, nickname, current.phoneNumber, photoURL, current.providerId, type, creationTime, description, pods, notifications);
                // return current;
                return Promise.resolve(currentUser);
            } catch (err) {
                console.error(`${CLASS_NAME} | getCurrentUser | failed to retrieve current user information from DB, received error message: ${err.message}`);
                return Promise.reject(err.message);
            }
        }
        console.error(`${CLASS_NAME} | getCurrentUser | current user is null!`);
        return Promise.reject('current user is null');
    },

    /**
     * a method used to get a user document reference for the specified id
     * @param uid the id of user whose document reference is to be returned
     * @return {null|firebase.firestore.DocumentReference<firebase.firestore.DocumentData>} the required document reference
     */
    getUserRef(uid) {
        try {
            return userDocs.doc(uid);
        } catch (err) {
            console.error(`${CLASS_NAME} | getUserRef | failed to retrieve the user data from DB, received error message: ${err.message}`);
            return null;
        }
    },

    /**
     * a method used to get the avatar file from the database
     * @param path the path of the file in the database
     * @returns {Promise<void>} upon successful retrieving, a promise with resolve value of download URL is returned.
     *                          upon failed retrieving, a promise with reject value of null is returned.
     */
    async getAvatar (path) {
        try {
            // let fileRef = storage.ref().child(path);
            let fileRef = storage.ref(path);
            let url = await fileRef.getDownloadURL();
            console.debug(`${CLASS_NAME} | getAvatar | successfully get the download URL of avatar file, ${url}`);
            return Promise.resolve(url);
        } catch (err) {
            console.error(`${CLASS_NAME}| getAvatar | failed to get the download URL for avatar file, received error message: ${err.message}`);
            return Promise.reject(null);
        }
    },

    /**
     * a method used to sign up the user with the provided email address, password, full name and nick name
     * @param email       the email of the user to be signed up
     * @param password    the password of the user to be signed up
     * @param fullname    the full name of the user to be signed up
     * @param nickname    the nick name of the user to be signed up
     * @param type        the type of the user to be signed up
     * @param description the description of the user
     * @returns {Promise<*>} upon successful signup, a promise with resolve value of undefined is returned.
     *                       upon failed signup, a promise with reject value of error message string is returned.
     */
    async signup(email, password, fullname, nickname, type='participant', description='') {
        try {
            let signupFeedback = await auth.createUserWithEmailAndPassword(email, password);
            console.debug(`${CLASS_NAME} | signup | feedback from user signup: ${signupFeedback}`);
            let updateProfileFeedback = await signupFeedback.user.updateProfile({displayName: nickname});
            console.debug(`${CLASS_NAME} | signup | feedback from updating display name: ${updateProfileFeedback}`);
            let uid = signupFeedback.user.uid;
            let storeFeedback = await userDocs.doc(uid).set({fullname: fullname, nickname: nickname, type: type, description: description, pods: [], notifications: [], photoURL: signupFeedback.user.photoURL, email: email});
            console.debug(`${CLASS_NAME} | signup | feedback from firestore: ${storeFeedback}`);
            await auth.currentUser.sendEmailVerification();
            console.debug(`${CLASS_NAME} | signup | verification email has been sent to user`);
            return Promise.resolve(undefined);
        } catch (err) {
            console.error(`${CLASS_NAME} | signup | signup/name-update/data-storing failed, with error message: ${err.message}`);
            return Promise.reject(err.message);
        }
    },

    /**
     * a method used to log in the user with the provided email address and password
     * @param email    the email of the user to be logged in
     * @param password the password of the user to be logged in
     * @returns {Promise<*>} upon successful login, a promise with resolve value of user type is returned.
     *                       upon failed login, a promise with reject value of the received error message is returned.
     */
    async login(email, password) {
        try {
            let loginFeedback = await auth.signInWithEmailAndPassword(email, password);
            console.debug(`${CLASS_NAME} | login |successful login for account ${email} and returned credential ${loginFeedback}`);
            let uid = loginFeedback.user.uid;
            // get the user first, before get the attribute "type", otherwise it would be undefined
            let user = await userDocs.doc(uid).get();
            let type = user.get('type');
            return Promise.resolve(type);
        } catch (err) {
            console.error(`${CLASS_NAME} | login |failed to login account ${email}, received error message: ${err.message}`);
            return Promise.reject(err.message);
        }
    },

    /**
     * a method used to log out the current user
     * @returns {Promise<void>} upon successful logout, a promise wit resolve value of undefined is returned.
     *                          upon failed logout, a promise with reject value of error message string is returned.
     */
    async logout() {
        try {
            let signoutFeedback = await auth.signOut();
            console.debug(`${CLASS_NAME} | logout |signoutFeedback`);
            return Promise.resolve(undefined);
        } catch (err) {
            console.error(`${CLASS_NAME} | logout | failed to logout current user, with error message: ${err.message}`);
            return Promise.reject(err.message);
        }
    },

    /**
     * a method used to retrieve a record from DB for user with the specified uid
     * @param uid the id of the user whose record is to be retrieved from DB
     * @return {Promise<Object|String>} upon successful retrieval, a promise with resolve of an object containing all relevant data is returned
     *                                  upon failed retrieval, a promise with reject value of the received error message is returned
     */
    async getUser(uid) {
        try {
            let doc = await userDocs.doc(uid).get();
            console.debug(`${CLASS_NAME} | getUser | successfully retrieve user record from firestore for uid ${uid}`);
            let user = {
                email: doc.get('email'),
                photoURL: doc.get('photoURL'),
                description: doc.get('description'),
                fullname: doc.get('fullname'),
                nickname: doc.get('nickname'),
                notifications: doc.get('notifications'),
                pods: doc.get('pods'),
                type: doc.get('type')
            };
            console.debug(`${CLASS_NAME} | getUser | finished pre-processing for uid ${uid}, data is ready to be returned`);
            return Promise.resolve(user);
        } catch (err) {
            console.error(`${CLASS_NAME} | getUser | failed to retrieve user record from firestore for uid ${uid}, err: ${err}`);
            return Promise.reject(err);
        }
    },

    /**
     * a method used to update the avatar of the user
     * @param avatarFile the new avatar file which will be stored in the database
     * @param uid        the uid of the user whose avatar is to be updated
     * @returns {Promise<undefined|string>} upon successful update, a promise wit resolve value of undefined is returned.
     *                            upon failed update, a promise with reject value of error message string is returned.
     */
    async updateAvatar (avatarFile, uid=null) {
        try {
            if (!uid) {
                let currentUser = auth.currentUser;
                if (!currentUser) {
                    // current is null
                    console.error(`${CLASS_NAME} | updateAvatar | failed to retrieve the current user to perform update`);
                    return Promise.reject('current user is null');
                }
                uid = auth.currentUser.uid;
            }
            let path = 'avatars/' + uid + '/' + avatarFile.name;
            let storageRef = storage.ref(path);
            // put is not async
            let uploadFeedback = storageRef.put(avatarFile);
            uploadFeedback.on('state_changed',
                function progress(snapshot) {
                    // this is used together with progress bar to show the current upload progress
                },

                function error(err) {
                    console.error(`${CLASS_NAME} | updateAvatar | failed to upload new avatar file to database, received error message: ${err.message}`)
                    return Promise.reject(err.message);
                },

                function complete () {
                    console.debug(`${CLASS_NAME} | updateAvatar | uploading successful, start updating user property`);
                    // now, update the user's photoURL property
                    userDocs.doc(uid).update({photoURL: path})
                        .then(updateFeedback => {
                            console.debug(`${CLASS_NAME} | updateAvatar | successfully update user property photoURL, with feedback: ${updateFeedback}`);
                            return Promise.resolve(undefined);
                        })
                        .catch(err => {
                            console.error(`${CLASS_NAME} | | failed to update user property photoURL, received error message: ${err.message}`);
                            return Promise.reject(err.message);
                        })
                }
            );
        } catch (err) {
            console.error(`${CLASS_NAME} | updateAvatar | failed to update user avatar, received error message ${err.message}`);
            return Promise.reject(err.message);
        }
    },

    /**
     * a method used to update the user's full name and nickname
     * @param fullname the new full name
     * @param nickname the new nick name
     * @returns {Promise<string|*>} upon successful update, a promise wit resolve value of undefined is returned.
     *                              upon failed update, a promise with reject value of error message string is returned.
     */
    async updateProfile(fullname, nickname) {
        try {
            let currentUser = auth.currentUser;
            if (!currentUser) {
                // current is null
                console.error(`${CLASS_NAME} | updateProfile | failed to retrieve the current user to perform update`);
                return Promise.reject('current user is null');
            }
            let uid = currentUser.uid;
            let DBupdateFeedback = await userDocs.doc(uid).update({fullname: fullname, nickname: nickname});
            console.debug(`${CLASS_NAME} | updateProfile | successfully update the user's full name and nick name in database, feedback received: ${DBupdateFeedback}`);
            // also need to update user's display name (using the value of nick name)
            let userUpdateFeedback = await auth.currentUser.updateProfile({displayName: nickname});
            console.debug(`${CLASS_NAME} | updateProfile | successfully update user property displaneName, feedback received: ${userUpdateFeedback}`);
            return Promise.resolve(undefined);
        } catch (err) {
            console.error(`${CLASS_NAME} | updateProfile | failed to update user's full name and nick name, with error message: ${err.message}`);
            return Promise.reject(err.message);
        }
    },

    /**
     * a method used to update a user's full name
     * @param fullname the new full name
     * @returns {Promise<string|*>} upon successful update, a promise with resolve value of undefined is returned.
     *                              upon failed update, a promise with reject value of error message string is returned.
     */
    async updateFullname(fullname) {
        try {
            let currentUser = auth.currentUser;
            if (!currentUser) {
                // current is null
                console.error(`${CLASS_NAME} | updateFullname | failed to retrieve the current user to perform update`);
                return Promise.reject('current user is null');
            }
            let uid = currentUser.uid;
            let updateFeedback = await userDocs.doc(uid).update({fullname: fullname});
            console.debug(`${CLASS_NAME} | updateFullname | successfully update the user's full name, feedback received: ${updateFeedback}`);
            return Promise.resolve(undefined);
        } catch (err) {
            console.error(`${CLASS_NAME} | updateFullname | failed to update user's full name, with error message: ${err.message}`);
            return Promise.reject(err.message);
        }
    },

    /**
     * a method used to update a user's nick name
     * @param nickname the new nick name
     * @returns {Promise<string|*>} upon successful update, a promise with resolve value of undefined is returned.
     *                              upon failed update, a promise with reject value of error message string is returned.
     */
    async updateNickname(nickname) {
        try {
            let currentUser = auth.currentUser;
            if (!currentUser) {
                // current is null
                console.error(`${CLASS_NAME} | updateNickname | failed to retrieve the current user to perform update`);
                return Promise.reject('current user is null');
            }
            let uid = currentUser.uid;
            let DBupdateFeedback = await userDocs.doc(uid).update({nickname: nickname});
            console.debug(`${CLASS_NAME} | updateNickname | successfully update the user's nick name, feedback received: ${DBupdateFeedback}`);
            // also need to update user's display name (using the value of nick name)
            let userUpdateFeedback = await auth.currentUser.updateProfile({displayName: nickname});
            console.debug(`${CLASS_NAME} | updateNickname | successfully update user property displaneName, feedback received: ${userUpdateFeedback}`);
            return Promise.resolve(undefined);
        } catch (err) {
            console.error(`${CLASS_NAME} | updateNickname | failed to update user's and nick name, with error message: ${err.message}`);
            return Promise.reject(err.message);
        }
    },

    /**
     * a method used to update the description of a user
     * @param des the new description
     * @returns {Promise<string|*>} upon successful update, a promise with resolve value of undefined is returned.
     *                              upon failed update, a promise with reject value of received error message is returned.
     */
    async updateDescription(des) {
        try {
            let currentUser = auth.currentUser;
            if (!currentUser) {
                // current is null
                console.error(`${CLASS_NAME} | updateDescription | failed to retrieve the current user to perform update`);
                return Promise.reject('current user is null');
            }
            let uid = currentUser.uid;
            let updateFeedback = userDocs.doc(uid).update({description: des});
            console.debug(`${CLASS_NAME} | updateDescription | successfully retrieved user data for uid ${uid}, feedback received: ${updateFeedback}`);
            return Promise.resolve(undefined);
        } catch (err) {
            console.error(`${CLASS_NAME} | updateDescription | failed to update user description, received error message: ${err.mesage}`);
            return Promise.reject(err.message);
        }
    }
}

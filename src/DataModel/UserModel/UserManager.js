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
                let sessions = userDoc.get('sessions');
                let notifications = userDoc.get('notifications');
                let type = userDoc.get('type');
                let description = userDoc.get('description');
                let photoURL = userDoc.get('photoURL');
                currentUser = new User(current.uid, current.email, current.displayName, fullname, nickname, current.phoneNumber, photoURL, current.providerId, type, creationTime, description, sessions, notifications);
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
            // TODO decide on which one to use
            // let fileRef = storage.ref().child(path);
            let fileRef = storage.ref(path);
            let url = await fileRef.getDownloadURL();
            console.info(`${CLASS_NAME} | getAvatar | successfully get the download URL of avatar file, ${url}`);
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
            console.info(`${CLASS_NAME} | signup | feedback from user signup: ${signupFeedback}`);
            let updateProfileFeedback = await signupFeedback.user.updateProfile({displayName: nickname});
            console.info(`${CLASS_NAME} | signup | feedback from updating display name: ${updateProfileFeedback}`);
            let uid = signupFeedback.user.uid;
            let storeFeedback = await userDocs.doc(uid).set({fullname: fullname, nickname: nickname, type: type, description: description, sessions: [], notifications: [], photoURL: signupFeedback.user.photoURL});
            console.info(`${CLASS_NAME} | signup | feedback from firestore: ${storeFeedback}`);
            await auth.currentUser.sendEmailVerification();
            console.info(`${CLASS_NAME} | signup | verification email has been sent to user`);
            return Promise.resolve(undefined);
        } catch (err) {
            console.error(`${CLASS_NAME} | signup | signup/name-update/data-storing failed, with error message: ${err.message}`);
            return Promise.reject(err.message);
        }
        // let error;
        // auth.createUserWithEmailAndPassword(email, password)
        //     .then(credential => {
        //         // error = null
        //         console.info(`successful login for account ${email}, with fullname ${fullname} and nickname ${nickname}`);
        //         // update user display name
        //         let uid = credential.user.uid;
        //         credential.user.updateProfile({displayName: nickname})
        //             .then(credential => {
        //                 console.info(`successfully update user's display name to ${nickname}`);
        //                 // display name has been updated, now store more info to firestore
        //                 userDocs.doc(uid).set({fullname: fullname, nickname: nickname})
        //                     .then(credential => {
        //                         console.info(`successfully store user info to database`);
        //                         return null;
        //                     })
        //                     .catch(err => {
        //                         console.error(`failed to store user info to database, with error message: ${err.message}`);
        //                         return err.message;
        //                     });
        //             })
        //             .catch(err => {
        //                 console.error(`failed to update user display name, with error message: ${err.message}`);
        //                 return err.message;
        //             })
        //     })
        //     .catch(err => {
        //         // error = err.message;
        //         console.error(`failed to signup account ${email}, received error message: ${err.message}`);
        //         return err.message;
        //     });
        // return error;
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
            console.info(`${CLASS_NAME} | login |successful login for account ${email} and returned credential ${loginFeedback}`);
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
            // TODO log to see the structure of credential, need to change later on
            console.info(`${CLASS_NAME} | logout |signoutFeedback`);
            return Promise.resolve(undefined);
        } catch (err) {
            console.error(`${CLASS_NAME} | logout | failed to logout current user, with error message: ${err.message}`);
            return Promise.reject(err.message);
        }

        // auth.signOut()
        //     .then(credential => {
        //         // TODO log to see the structure of credential, need to change later on
        //         console.info(credential);
        //     })
        //     .catch(err => {
        //         console.error(`failed to logout current user`);
        //     });
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
                    console.info(`${CLASS_NAME} | updateAvatar | uploading successful, start updating user property`);
                    // now, update the user's photoURL property
                    userDocs.doc(uid).update({photoURL: path})
                        .then(updateFeedback => {
                            console.info(`${CLASS_NAME} | updateAvatar | successfully update user property photoURL, with feedback: ${updateFeedback}`);
                            return Promise.resolve(undefined);
                        })
                        .catch(err => {
                            console.error(`${CLASS_NAME} | | failed to update user property photoURL, received error message: ${err.message}`);
                            return Promise.reject(err.message);
                        })

                    // auth.currentUser.updateProfile({photoURL: path})
                    //     .then(value => {
                    //         console.info(`${CLASS_NAME} | updateAvatar | successfully update user property photoURL, with feedback: ${value}`);
                    //         return Promise.resolve(undefined);
                    //     })
                    //     .catch(err => {
                    //         console.error(`${CLASS_NAME} | | failed to update user property photoURL, received error message: ${err.message}`);
                    //         return Promise.reject(err.message);
                    //     });
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
            console.info(`${CLASS_NAME} | updateProfile | successfully update the user's full name and nick name in database, feedback received: ${DBupdateFeedback}`);
            // also need to update user's display name (using the value of nick name)
            let userUpdateFeedback = await auth.currentUser.updateProfile({displayName: nickname});
            console.info(`${CLASS_NAME} | updateProfile | successfully update user property displaneName, feedback received: ${userUpdateFeedback}`);
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
            console.info(`${CLASS_NAME} | updateFullname | successfully update the user's full name, feedback received: ${updateFeedback}`);
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
            console.info(`${CLASS_NAME} | updateNickname | successfully update the user's nick name, feedback received: ${DBupdateFeedback}`);
            // also need to update user's display name (using the value of nick name)
            let userUpdateFeedback = await auth.currentUser.updateProfile({displayName: nickname});
            console.info(`${CLASS_NAME} | updateNickname | successfully update user property displaneName, feedback received: ${userUpdateFeedback}`);
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
            console.info(`${CLASS_NAME} | updateDescription | successfully retrieved user data for uid ${uid}, feedback received: ${updateFeedback}`);
            return Promise.resolve(undefined);
        } catch (err) {
            console.error(`${CLASS_NAME} | updateDescription | failed to update user description, received error message: ${err.mesage}`);
            return Promise.reject(err.message);
        }
    }
}

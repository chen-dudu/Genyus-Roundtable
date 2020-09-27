const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const auth = admin.auth();
const db = admin.firestore();
const storage = admin.storage();

const USER_COLLECTION = "users";
const SESSION_COLLECTION  ="sessions";
const NO_COLLECTION = "notifications";
const BUCKET_NAME = "genyus-roundtables.appspot.com";

const userDocs = db.collection(USER_COLLECTION);
const sessionDocs = db.collection(SESSION_COLLECTION);
const noDocs = db.collection(NO_COLLECTION);

const CLASS_NAME = "function/index";

/**
 * a method used by admin to create a new user using email and password
 * @param user the object containing essential information about the user to be created
 * @return {Promise<undefined|String>} upon successful creation, a promise with resolve value of undefined is returned
 *                                     upon failed creation, a promise with reject value of received error message is returned
 */
exports.createUser = functions.https.onCall((user, context) => {
    // only login admin can do operation
    if (context.auth) {
        // first create a new user for auth part
        auth.createUser({
            email: user.email,
            emailVerified: false,
            password: user.password,
            displayName: user.fullname
        }).then(userRecord => {
            let uid = userRecord.uid;
            console.info(`${CLASS_NAME} | createUser | successfully create a new user for auth part, assigned uid ${uid}`);
            // now create a new record in firestore
            userDocs.doc(uid).set({
                email: user.email,
                fullname: user.fullname,
                nickname: user.fullname,
                type: "researcher",
                description: user.description,
                sessions: [],
                notifications: []
            }).then(storeFeedback => {
                console.info(`${CLASS_NAME} | createUser | successfully created a new user record on firestore`);
                let avatar = user.avatar;
                if (avatar) {
                    // last step, store the avatar photo
                    let path = 'avatars/' + uid + '/' + avatar.name;
                    storage.bucket(BUCKET_NAME).upload(path)
                        .then(response => {
                            console.info(`${CLASS_NAME} | createUser | successfully stored the avatar file to DB`);
                            return Promise.resolve(undefined);
                        })
                        .catch(err => {
                            console.error(`${CLASS_NAME} | createUser | failed to upload avatar file to DB, ${err}`);
                            return Promise.reject(err);
                        })
                }
                else {
                    console.error(`${CLASS_NAME} | createUser | avatar used to create user is null`);
                    return Promise.reject(new Error("given avatar is null"));
                }
                // return Promise.resolve('placeholder');
            }).catch(err => {
                console.error(`${CLASS_NAME} | createUser | failed to create a new user record on firestore, received error message ${err}`);
                return Promise.reject(err);
            });
            // return Promise.resolve('placeholder');
        }).catch(err => {
            console.error(`${CLASS_NAME} | createUser | failed to create a new user for auth part, received error message ${err}`);
            return Promise.reject(err);
        });
    }
    else {
        console.error(`${CLASS_NAME} | getUsers | the admin trying to do operation is not login`);
        return Promise.reject(new Error('admin is not login!'));
    }
});

/**
 * a method used by admin to retrieve information from DB about the user using uid
 * @param data the object containing the id of the user whose data is to be retrieved
 * @return {Promise<Object|String>} upon successful retrieval, a promise with resolve value of the user needed is returned
 *                                upon failed retrieval, a promise with reject value of received error message is returned
 */
exports.getUser = functions.https.onCall((data, context) => {
    // only login admin can do operation
    if (context.auth) {
        // first get some info from firebase auth
        return auth.getUser(data.uid)
            .then(userAuth => {
                console.info(`${CLASS_NAME} | getUser | successfully retrieve data from firebase auth`);
                let uid = userAuth.uid;
                // then get the rest from firestore
                return userDocs.doc(uid).get()
                    .then(userData => {
                        console.info(`${CLASS_NAME} | getUser | successfully retrieve data from firestore`);
                        let user = {
                            uid: userAuth.uid,
                            fullname: userData.get('fullname'),
                            nickname: userData.get('nickname'),
                            phoneNumber: userAuth.phoneNumber,
                            photoURL: userAuth.photoURL,
                            providerID: userAuth.providerData,
                            type: userData.get('type'),
                            creationTime: userAuth.metadata.creationTime,
                            description: userData.get('description'),
                            sessions: userData.get('sessions'),
                            notifications: userData.get('notifications')
                        };
                        console.info(`${CLASS_NAME} | getUser | finished data preparation, data is ready to be returned`);
                        return Promise.resolve(user);
                    })
                    .catch(err => {
                        console.error(`${CLASS_NAME} | getUser | failed to get data from firestore for user with uid ${data.uid}, error: ${err}`);
                        return Promise.reject(err);
                    });
                // return Promise.resolve('placeholder');
            })
            .catch(err => {
                console.error(`${CLASS_NAME} | getUser | failed to get data from firebase auth for user with uid ${data.uid}, error: ${err}`);
                return Promise.reject(err);
            });
    }
    else {
        console.error(`${CLASS_NAME} | getUsers | the admin trying to do operation is not login`);
        return Promise.reject(new Error('admin is not login!'));
    }
});

/**
 * a method used by admin the retrieve all users on DB
 * @return {Promise<Object[]>} upon successful retrieval, a promise with resolve value of a list of needed users is returned
 *                             upon failed retrieval, a promise with reject value of received error message is returned
 */
exports.getUsers = functions.https.onCall((data, context) => {
    // only login admin can do operation
    if (context.auth) {
        let user_list = [];
        auth.listUsers()
            .then(response => {
                response.users.forEach(user => {
                    let uid = user.uid;
                    userDocs.doc(uid).get()
                        .then(doc => {
                            let user = {
                                uid: user.uid,
                                fullname: doc.get('fullname'),
                                nickname: doc.get('nickname'),
                                phoneNumber: user.phoneNumber,
                                photoURL: user.photoURL,
                                providerID: user.providerData,
                                type: doc.get('type'),
                                creationTime: user.metadata.creationTime,
                                description: doc.get('description'),
                                sessions: doc.get('sessions'),
                                notifications: doc.get('notifications')
                            };
                            user_list.unshift(Promise.resolve(user));
                        })
                        .catch(err => {
                            console.error(`${CLASS_NAME} | getUsers | failed to retrieve user record from firestore for uid ${uid}, error: ${err}`);
                            return Promise.reject(err);
                        });
                });
                console.info(`${CLASS_NAME} | getUsers | finished pre-processing, data is ready to be returned`);
                return Promise.all(user_list);
            })
            .catch(err => {
                console.error(`${CLASS_NAME} | getUsers| failed to retrieve all users from DB, received error message ${err}`);
                return Promise.reject(err);
            });
    }
    else {
        console.error(`${CLASS_NAME} | getUsers | the admin trying to do operation is not login`);
        return Promise.reject(new Error('admin is not login!'));
    }
});



/**
 * a method used by admin to retrieve a list of researchers from DB
 * @return {Promise<Object[]|String>} upon successful retrieval, a promise with resolve value of a list of needed researchers is returned
 *                                    upon failed retrieval, a promise with reject value of received error message is returned
 */
exports.getResearchers = functions.https.onCall((data, context) => {
    // only login admin can do operation
    if (context.auth) {
        return userDocs.get()
            .then(docs => {
                let users = docs.docs.map(doc => {
                    if (doc.get('type') === "researcher") {
                        let uid = doc.id;
                        return auth.getUser(uid)
                            .then(userAuth => {
                                let user = {
                                    uid: userAuth.uid,
                                    email: userAuth.email,
                                    fullname: doc.get('fullname'),
                                    nickname: doc.get('nickname'),
                                    photoURL: userAuth.photoURL,
                                    type: doc.get('type'),
                                    creationTime: userAuth.metadata.creationTime,
                                    description: doc.get('description'),
                                    sessions: doc.get('sessions'),
                                    notifications: doc.get('notifications')
                                };
                                console.info(`${CLASS_NAME} | getResearchers | finished processing record for uid ${doc.id}`);
                                return Promise.resolve(user);
                            })
                            .catch(err => {
                                console.error(`${CLASS_NAME} | getResearchers | failed to retrieve info from firebase auth, err: ${err}`);
                                return Promise.reject(err);
                            });
                    }
                });
                console.info(`${CLASS_NAME} | getResearchers | finished pre-processing, data is ready to be returned`);
                return Promise.all(users);
            })
            .catch(err => {
                console.error(`${CLASS_NAME} | getResearchers | failed to retrieved user record from firestore, err: ${err}`);
                return Promise.reject(err);
            });
    }
    else {
        console.error(`${CLASS_NAME} | getResearchers | the admin trying to do operation is not login`);
        return Promise.reject(new Error('admin is not login!'));
    }
});

/**
 * a method used by admin to update the email address of the specified user
 * @param data the object containing the id of the user and the new email address
 * @return {Promise<undefined|String>} upon successful update, a promise with resolve value of undefined is returned
 *                                     upon failed update, a promise with reject value of received error message is returned
 */
exports.updateUserEmail = functions.https.onCall((data, context) => {
    // only login admin can do operation
    if (context.auth) {
        auth.updateUser(data.uid, {
            email: data.email
        }).then(response => {
            console.info(`${CLASS_NAME} | updateUserEmail | successfully updated the email address of the user with uid ${data.uid}`);
            return Promise.resolve(undefined);
        }).catch(err => {
            console.error(`${CLASS_NAME} | updateUserEmail | failed to update the email address of the user with uid ${data.uid}, err: ${err}`);
            return Promise.reject(err);
        });
    }
    else {
        console.error(`${CLASS_NAME} | getUsers | the admin trying to do operation is not login`);
        return Promise.reject(new Error('admin is not login!'));
    }
});

/**
 * a method used by admin to update the password of the specified user
 * @param data the object containing the id of the user and the new password
 * @return {Promise<undefined|String>} upon successful update, a promise with resolve value of undefined is returned
 *                                     upon failed update, a promise with reject value of received error message is returned
 */
exports.updateUserPassword = functions.https.onCall((data, context) => {
    // only login admin can do operation
    if (context.auth) {
        auth.updateUser(data.uid, {
            password: data.password
        }).then(response => {
            console.info(`${CLASS_NAME} | updateUserPassword | successfully updated the password of the user with uid ${data.uid}`);
            return Promise.resolve(undefined);
        }).catch(err => {
            console.error(`${CLASS_NAME} | updateUserPassword | failed to update the password of the user with uid ${data.uid}, err: ${err}`);
            return Promise.reject(err);
        });
    }
    else {
        console.error(`${CLASS_NAME} | getUsers | the admin trying to do operation is not login`);
        return Promise.reject(new Error('admin is not login!'));
    }
});

/**
 * a method used by admin to update the full name of the specified user
 * @param data the object containing the id of the user and the new full name
 * @return {Promise<undefined|String>} upon successful update, a promise with resolve value of undefined is returned
 *                                     upon failed update, a promise with reject value of received error message is returned
 */
exports.updateUserFullname = functions.https.onCall((data, context) => {
    // only login admin can do operation
    if (context.auth) {
       userDocs.doc(data.uid).update({
           fullname: data.fullname
       }).then(response => {
           console.info(`${CLASS_NAME} | updateUserFullname | successfully updated the full name of user with uid ${data.uid}`);
           return Promise.resolve(undefined);
       }).catch(err => {
            console.error(`${CLASS_NAME} | updateUserFullname | failed to update the full name of user with uid ${data.uid}, err: ${err}`);
            return Promise.reject(err);
       });
    }
    else {
        console.error(`${CLASS_NAME} | getUsers | the admin trying to do operation is not login`);
        return Promise.reject(new Error('admin is not login!'));
    }
});

/**
 * a method used by admin to update the description of the specified user
 * @param data the object containing the id of the user and the new description
 * @return {Promise<undefined|String>} upon successful update, a promise with resolve value of undefined is returned
 *                                     upon failed update, a promise with reject value of received error message is returned
 */
exports.updateUserDescription = functions.https.onCall((data, context) => {
    // only login admin can do operation
    if (context.auth) {
        userDocs.doc(data.uid).update({
            description: data.description
        }).then(response => {
            console.info(`${CLASS_NAME} | updateUserDescription | successfully updated the description of user with uid ${data.uid}`);
            return Promise.resolve(undefined);
        }).catch(err => {
            console.error(`${CLASS_NAME} | updateUserDescription | failed to update the description of user with uid ${data.uid}, err: ${err}`);
            return Promise.reject(err);
        });
    }
    else {
        console.error(`${CLASS_NAME} | getUsers | the admin trying to do operation is not login`);
        return Promise.reject(new Error('admin is not login!'));
    }
});

/**
 * a method used by admin to update the avatar of the specified user
 * @param data the object containing the id of the user and the new avatar
 * @return {Promise<undefined|String>} upon successful update, a promise with resolve value of undefined is returned
 *                                     upon failed update, a promise with reject value of received error message is returned
 */
exports.updateUserAvatar = functions.https.onCall((data, context) => {
    // only login admin can do operation
    if (context.auth) {
        let uid = data.uid;
        let path = 'avatars/' + uid + '/' + data.avatar.name;
        // first, upload the new file to DB
        storage.bucket(BUCKET_NAME).upload(path)
            .then(uploadResponse => {
                console.info(`${CLASS_NAME} | updateUserAvatar | successfully uploaded the new avatar to DB for user with uid ${uid}`);
                // then update the user's attribute
                auth.updateUser(uid, {
                    photoURL: path
                }).then(updateResponse => {
                    console.info(`${CLASS_NAME} | updateUserAvatar | successfully updated user attribute "photoURL" for uid ${uid}`);
                    return Promise.resolve(undefined);
                }).catch(err => {
                    console.error(`${CLASS_NAME} | updateUserAvatar | failed to update user attribute "photoURL" for uid ${uid}, error: ${err}`);
                    return Promise.reject(err);
                });
                // return Promise.resolve('placeholder');
            })
            .catch(err => {
                console.error(`${CLASS_NAME} | updateUserAvatar | failed to upload the new avatar to DB for user with uid ${uid}, error: ${err}`);
                return Promise.reject(err);
            });
    }
    else {
        console.error(`${CLASS_NAME} | getUsers | the admin trying to do operation is not login`);
        return Promise.reject(new Error('admin is not login!'));
    }
});

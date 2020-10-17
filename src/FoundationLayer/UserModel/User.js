

class User {

    /**
     * a private constructor which will be called by user manager to creat a new user object
     * @param uid           the unique id of the user
     * @param email         the email address of the user
     * @param displayName   the display name of the user
     * @param fullname      the full name of the user
     * @param nickname      the nick name of the user
     * @param phoneNumber   the phone number of the user
     * @param photoURL      the URL of of the avatar photo of the user
     * @param providerId    the provider id of the user
     * @param type          the type of the user (admin, participant, researcher)
     * @param creationTime  the time when the account of the user was created
     * @param description   the description about the user
     * @param pods          a list of pods, including old and new (items are not in any particular order)
     * @param notifications a list of notifications, including read and not read (items are not in any particular order)
     */
    constructor(uid, email, displayName, fullname, nickname, phoneNumber, photoURL, providerId, type, creationTime, description='', pods, notifications) {
        this._uid = uid;
        this._email = email;
        this._displayName = displayName;
        this._fullname = fullname;
        this._nickname = nickname;
        this._phoneNumber = phoneNumber;
        this._photoURL = photoURL;
        this._providerId = providerId;
        this._type = type;
        this._creationTime = creationTime;
        this._description = description;
        // a list of sessions, including old and new
        this._pods = pods;
        // a list of notifications, including read and not read
        this._notifications = notifications;
    }

    set email(newEmail) {
        this._email = newEmail;
    }

    set displayName(newName) {
        this._displayName = newName;
    }

    set fullname(newName) {
        this._fullname = newName;
    }

    set nickname(newName) {
        this._nickname = newName;
    }

    set phoneNumber(newNumber) {
        this._phoneNumber = newNumber;
    }

    set photoURL(newURL) {
        this._photoURL = newURL;
    }

    set providerId(newProvider) {
        this._providerId = newProvider;
    }

    set type(newType) {
        this._type = newType;
    }

    set creationTime(newTime) {
        this._creationTime = newTime;
    }

    set description(newDescription) {
        this._description = newDescription;
    }

    set uid(newId) {
        this._uid = newId;
    }

    get email() {
        return this._email;
    }

    get displayName() {
        return this._displayName;
    }

    get fullname() {
        return this._fullname;
    }

    get nickname() {
        return this._nickname;
    }

    get phoneNumber() {
        return this._phoneNumber;
    }

    get photoURL() {
        return this._photoURL;
    }

    get providerId() {
        return this._providerId;
    }

    get type() {
        return this._type;
    }

    get creationTime() {
        return this._creationTime;
    }

    get description() {
        return this._description;
    }

    get uid() {
        return this._uid;
    }

    get pods() {
        return this._pods;
    }

    get notifications() {
        return this._notifications;
    }

    addPod(newPod) {
        // unshift method adds item to the front
        this._pods.unshift(newPod);
    }

    addNotification(newNotification) {
        // unshift method adds item to the front
        this._notifications.unshift(newNotification);
    }
}

export default User;

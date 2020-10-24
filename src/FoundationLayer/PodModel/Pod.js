
class Pod {

    /**
     * a private constructor which will be called by pod manager to creat a new pod object
     * @param pid           the unique id of the pod
     * @param title         the title of the pod
     * @param status        the status of the pod
     * @param description   the description of the pod
     * @param calendlyLink  the calendly sharing link of the pod
     * @param researcher    the researcher who is responsible for the pod
     * @param participants  the list of participants who sign up for the pod
     * @param notifications the list of notifications associated with the pod
     * @param notes         the URL to the location where notes are store in DB
     * @param youtubeLink   the link of the session recording on youtube
     * @param sharLink      then link of the landing page which will be shared to participants for signup
     */
    constructor(pid, title, status, description, calendlyLink, researcher, participants, notifications, notes, youtubeLink, sharLink) {
        this._pid = pid;
        this._title = title;
        this._status = status;
        this._description = description;
        this._calendlyLink = calendlyLink;
        this._researcher = researcher;
        this._participants = participants;
        this._notifications = notifications;
        this._notes = notes;
        this._youtubeLink = youtubeLink;
        this._shareLink = sharLink;
        // this._sessions = sessions
    }

    get pid() {
        return this._pid;
    }

    get title() {
        return this._title;
    }

    get status() {
        return this._status;
    }

    get description() {
        return this._description;
    }

    get calendlyLink() {
        return this._calendlyLink;
    }

    get researcher() {
        return this._researcher;
    }

    get participants() {
        return this._participants;
    }

    get notifications() {
        return this._notifications;
    }

    get notes() {
        return this._notes;
    }

    get youtubeLink() {
        return this._youtubeLink;
    }

    get shareLink() {
        return this._shareLink;
    }

    set pid(newID) {
        this._pid = newID;
    }

    set title(newTitle) {
        this._title = newTitle;
    }

    set status(newStatus) {
        this._status = newStatus;
    }

    set description(newDescription) {
        this._description = newDescription;
    }

    set calendlyLink(newLink) {
        this._calendlyLink = newLink;
    }

    set researcher(newResearcher) {
        this._researcher = newResearcher;
    }

    set notes(newNotes) {
        this._notes = newNotes;
    }

    set youtubeLink(newLink) {
        this._youtubeLink = newLink;
    }

    set shareLink(newLink) {
        this._shareLink = newLink;
    }

    addNotification(notification) {
        this._notifications.unshift(notification);
    }

    addParticipant(participant) {
        this._participants.unshift(participant);
    }

    removeParticipant(participant) {
        let index = this._participants.indexOf(participant);
        if (index !== -1) {
            this._participants.splice(index, 1);
        }
    }

    deleteNotification(notification) {
        let index = this._notifications.indexOf(notification);
        if (index !== -1) {
            this._notifications.splice(index, 1);
        }
    }
}

export default Pod;

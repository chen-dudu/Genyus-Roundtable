
class Pod {

    /**
     * a private constructor which will be called by pod manager to creat a new pod object
     * @param pid           the unique id of the pod
     * @param title         the title of the pod
     * @param calendlyLink  the calendly sharing link of the pod
     * @param researcher    the researcher who is responsible for the pod
     * @param participants  the list of participants who sign up for the pod
     * @param notifications the list of notifications associated with the pod
     */
    constructor(pid, title, calendlyLink, researcher, participants, notifications) {
        this._pid = pid;
        this._title = title;
        this._calendlyLink = calendlyLink;
        this._researcher = researcher;
        this._participants = participants;
        this._notifications = notifications;
        // this._sessions = sessions
    }

    get pid() {
        return this._pid;
    }

    get title() {
        return this._title;
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

    set pid(newID) {
        this._pid = newID;
    }

    set title(newTitle) {
        this._title = newTitle;
    }

    set calendlyLink(newLink) {
        this._calendlyLink = newLink;
    }

    set researcher(newResearcher) {
        this._researcher = newResearcher;
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

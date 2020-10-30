/**
 * @file       this file contains methods that communicate with firebase about all application-related issues
 * @deprecated everything in this file has been deprecated from the final version of the system
 */
class Session {

    /**
     * a private constructor which will be called by session manager to creat a new session object
     * @param sid           the unique of the session
     * @param title         the title of the session
     * @param description   the description of the session
     * @param duration      the duration of the session
     * @param youtubeLink   the youtube link of the introduction video of the session
     * @param zoomLink      the zoom link of the session
     * @param timeSlots     the time slots of the session
     * @param questions     the signup questions of the session
     * @param status        the status of the session (i.e. whether the session is completed or not)
     * @param researchers   the researcher list of the session
     * @param participants  the participant list of the session
     * @param notifications the notification list of the session
     */
    constructor(sid, title, description, duration, youtubeLink, zoomLink, timeSlots, questions, status, researchers, participants=null, notifications=null) {
        this._sid = sid;
        this._title = title;
        this._description = description;
        this._duration = duration;
        // intro video on youtube ??
        this._youtubeLink = youtubeLink;
        this._zoomLink = zoomLink;
        // a list of time slots
        this._timeSlots = timeSlots;
        // a list of signup questions
        this._questions = questions;
        // a boolean indicating the status of the session (i.e. whether the session is completed or not)
        this._status = status;
        // a list of researchers who have signed up for the session
        this._researchers = researchers;
        // a list of participants who have signed up for the session
        this._participants = participants;
        // a list of notifications associated with the session
        this._notifications = notifications;
    }

    get sid() {
        return this._sid;
    }

    get title() {
        return this._title;
    }

    get description() {
        return this._description;
    }

    get researchers() {
        return this._researchers;
    }

    get duration() {
        return this._duration;
    }

    get youtubeLink() {
        return this._youtubeLink;
    }

    get zoomLink() {
        return this._zoomLink;
    }

    get timeSlots() {
        return this._timeSlots;
    }

    get questions() {
        return this._questions;
    }

    get status() {
        return this._status;
    }

    get participants() {
        return this._participants;
    }

    get notifications() {
        return this._notifications;
    }

    set sid(newID) {
        this._sid = newID;
    }

    set title(newTitle) {
        this._title = newTitle;
    }

    set description(newDescription) {
        this._description = newDescription;
    }

    set duration(newDuration) {
        this._duration = newDuration;
    }

    set youtubeLink(newLink) {
        this._youtubeLink = newLink;
    }

    set zoomLink(newLink) {
        this._zoomLink = newLink;
    }

    set status(dummy) {
        if (!this.status) {
            this._status = !this.status;
        }
    }

    addTimeSlot(newSlot) {
        // unshift method adds item to the front
        this._timeSlots.unshift(newSlot);
    }

    removeTimeSlot(slot) {
        let index = this._timeSlots.indexOf(slot);
        if (index !== -1) {
            // 1 is for removing 1 element
            this._timeSlots.splice(index, 1)
        }
        // return -1, element is not in the array
    }

    addQuestion(newQuestion) {
        // unshift method adds item to the front
        this._questions.unshift(newQuestion);
    }

    removeQuestion(question) {
        let index = this._questions.indexOf(question);
        if (index !== -1) {
            // 1 for removing 1 element
            this._questions.splice(index, 1);
        }
        // return -1, element is not in the array
    }

    addResearcher(researcher) {
        this._researchers.unshift(researcher);
    }

    removeResearcher(researcher) {
        let index = this._researchers.indexOf(researcher);
        if (index !== -1) {
            // 1 for removing 1 element
            this._researchers.splice(index, 3);
        }
        // return -1, element is not in the array
    }

    removeParticipant(participant) {
        let index = this._participants.indexOf(participant);
        if (index !== -1) {
            // 1 for removing 1 element
            this._participants.splice(index, 3);
        }
        // return -1, element is not in the array
    }

    addNotification(notification) {
        this._notifications.unshift(notification);
    }

    removeNotification(notification) {
        let index = this._notifications.indexOf(notification);
        if (index !== -1) {
            // 1 for removing 1 element
            this._notifications.splice(index, 1);
        }
        // return -1, element is not in the array
    }
}

export default Session;

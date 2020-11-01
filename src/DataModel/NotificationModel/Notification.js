/**
 * @file this file contains a class that represents the notification data model in the system
 */
class Notification {

    /**
     * a private constructor which will be called by notification manager to creat a new notification object
     * @param nid          the id of the notification
     * @param title        the title of the notification
     * @param description  the description of the notification
     * @param timeReceived the time when the notification is received
     * @param isRead       whether the notification has been read or not
     * @param pid          the id of the associated pod
     */
    constructor(title, description, timeReceived, isRead, nid=null, pid=null) {
        this._title = title;
        this._description = description;
        this._timeReceived = timeReceived;
        this._isRead = isRead;
        this._nid = nid;
        this._pid = pid;
    }


    get nid() {
        return this._nid;
    }

    get title() {
        return this._title;
    }

    get description() {
        return this._description;
    }

    get timeReceived() {
        return this._timeReceived;
    }

    get isRead() {
        return this._isRead;
    }

    get pid() {
        return this._pid;
    }

    set nid(newId) {
        this._nid = newId;
    }

    set title(newTitle) {
        this._title = newTitle;
    }

    set description(newDescription) {
        this._description = newDescription;
    }

    set timeReceived(newTime) {
        this._timeReceived = newTime;
    }

    set isRead(dummy) {
        if (!this.isRead) {
            this._isRead = !this.isRead;
        }
    }

    set pid(newId) {
        this._pid = newId;
    }
}

export default Notification;
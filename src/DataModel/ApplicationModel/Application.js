
class Application {

    /**
     * a private constructor which will be called by application manager to creat a new application object
     * @param aid      the unique id of the application
     * @param uid      the id of the applicant
     * @param sid      the id of the roundtable session to be applied for
     * @param status   the current status of the application, i.e. approved, rejected or pending for assessment
     * @param optional additional information applicant provides during the application process
     */
    constructor(aid, uid, sid, status, optional='') {
        this._aid = aid;
        this._uid = uid;
        this._sid = sid;
        this._status = status;
        this._optional = optional;
    }

    get aid() {
        return this._aid;
    }

    get uid() {
        return this._uid;
    }

    get sid() {
        return this._sid;
    }

    get status() {
        return this._status;
    }

    get optional() {
        return this._optional;
    }

    set aid(newID) {
        this._aid = newID;
    }

    set uid(newID) {
        this._uid = newID;
    }

    set sid(newID) {
        this._sid = newID;
    }

    set status(newStatus) {
        this._status = newStatus;
    }

    set optional(newOptional) {
        this._optional = newOptional;
    }
}

export default Application;

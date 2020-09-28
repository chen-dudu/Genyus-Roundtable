
class Application {

    /**
     * a private constructor which will be called by application manager to creat a new application object
     * @param aid       the unique id of the application
     * @param applicant the id of the applicant
     * @param session   the id of the session to be applied for
     * @param status    the current status of the application, i.e. approved, rejected or pending
     * @param optional  additional information applicant provides during the application process
     */
    constructor(aid, applicant, session, status, optional='') {
        this._aid = aid;
        this._applicant = applicant;
        this._session = session;
        this._status = status;
        this._optional = optional;
    }

    get aid() {
        return this._aid;
    }

    get applicant() {
        return this._applicant;
    }

    get session() {
        return this._session;
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

    set applicant(newApplicant) {
        this._applicant = newApplicant;
    }

    set session(newSession) {
        this._session = newSession;
    }

    set status(newStatus) {
        this._status = newStatus;
    }

    set optional(newOptional) {
        this._optional = newOptional;
    }
}

export default Application;

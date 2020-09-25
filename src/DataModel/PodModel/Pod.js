
class Pod {

    /**
     * a private constructor which will be called by pod manager to creat a new pod object
     * @param pid         the unique id of the pod
     * @param title       the title of the pod
     * @param description the description of the pod
     * @param researcher  the researcher who is responsible for the pod
     * @param sessions    the list of roundtable sessions the pod contains
     */
    constructor(pid, title, description, researcher, sessions) {
        this._pid = pid;
        this._title = title;
        this._description = description;
        this._researcher = researcher;
        this._sessions = sessions
    }

    get pid() {
        return this._pid;
    }

    get title() {
        return this._title;
    }

    get description() {
        return this._description;
    }

    get researcher() {
        return this._researcher;
    }

    get sessions() {
        return this._sessions;
    }

    set pid(newID) {
        this._pid = newID;
    }

    set title(newTitle) {
        this._title = newTitle;
    }

    set description(newDescription) {
        this._description = newDescription;
    }

    set researcher(newResearcher) {
        this._researcher = newResearcher;
    }

    addSession(session) {
        this._sessions.unshift(session);
    }

    deleteSession(session) {
        let index = this._sessions.indexOf(session);
        if (index !== -1) {
            this._sessions.splice(index, 1);
        }
    }
}

export default Pod;

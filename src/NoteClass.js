class NoteClass {
    constructor(id, title, category, content, status, date, time) {
        this._id = id;
        this._title = title;
        this._category = category;
        this._content = content;
        this._status = status;
        this._date = date;
        this._time = time;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get category() {
        return this._category;
    }

    set category(value) {
        this._category = value;
    }

    get content() {
        return this._content;
    }

    set content(value) {
        this._content = value;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }

    get time() {
        return this._time;
    }

    set time(value) {
        this._time = value;
    }
}

export default NoteClass;
class LocalStorage {
    constructor(db_name) {
        this.db_name = db_name
    }

    set_item(object) {
        localStorage.setItem(this.db_name, JSON.stringify(object))
    }

    get_item() {
        return JSON.parse(localStorage.getItem(this.db_name))
    }
}


export default LocalStorage

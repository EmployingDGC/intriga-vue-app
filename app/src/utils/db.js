class DB {
    constructor(db_file, http) {
        this.db_file = db_file
        this.$http = http
    }

    set_item(object) {
        this.$http.post(
            this.db_file,
            object
        ).then(() => {})

        return this
    }

    get_item(vect) {
        this.$http.get(this.db_file).then(
            (res) => {
                if (res.data) {
                    for (let i = 0; i < res.data.length; i += 1) {
                        const data = res.data[i]
                        vect[i] = data
                    }
                }
            }
        )

        return this
    }
}


export default DB

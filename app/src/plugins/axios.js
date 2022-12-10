import Vue from "vue"

import axios from "axios"

Vue.use({
    install(vue) {
        vue.prototype.$http = axios.create({
            baseURL: process.env.VUE_APP_DATA_BASE_URL,
            headers: {
                get: {
                    "Authorization": "abc123"
                }
            }
        })
    }
})

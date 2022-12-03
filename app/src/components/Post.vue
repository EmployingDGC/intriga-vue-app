<template>
    <div class="post">
        <div class="container-options">
            <span
                class="icon icon-edit"
                @click="edit_post"
            ><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="485.219px" height="485.22px" viewBox="0 0 485.219 485.22" style="enable-background:new 0 0 485.219 485.22;" xml:space="preserve"> <g><path d="M467.476,146.438l-21.445,21.455L317.35,39.23l21.445-21.457c23.689-23.692,62.104-23.692,85.795,0l42.886,42.897 C491.133,84.349,491.133,122.748,467.476,146.438z M167.233,403.748c-5.922,5.922-5.922,15.513,0,21.436 c5.925,5.955,15.521,5.955,21.443,0L424.59,189.335l-21.469-21.457L167.233,403.748z M60,296.54c-5.925,5.927-5.925,15.514,0,21.44 c5.922,5.923,15.518,5.923,21.443,0L317.35,82.113L295.914,60.67L60,296.54z M338.767,103.54L102.881,339.421 c-11.845,11.822-11.815,31.041,0,42.886c11.85,11.846,31.038,11.901,42.914-0.032l235.886-235.837L338.767,103.54z M145.734,446.572c-7.253-7.262-10.749-16.465-12.05-25.948c-3.083,0.476-6.188,0.919-9.36,0.919 c-16.202,0-31.419-6.333-42.881-17.795c-11.462-11.491-17.77-26.687-17.77-42.887c0-2.954,0.443-5.833,0.859-8.703 c-9.803-1.335-18.864-5.629-25.972-12.737c-0.682-0.677-0.917-1.596-1.538-2.338L0,485.216l147.748-36.986 C147.097,447.637,146.36,447.193,145.734,446.572z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></span>
            <span
                class="icon icon-trash-can"
                @click="del_post"
            ><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="30px" height="30px"><path d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z"/></svg></span>
        </div>
        <User :user="user" :enabled_infos="true" />
        <p>{{ post.content }}</p>
        <div class="container-date">
            <span class="date">Postado em {{ _format_date(post.date) }}</span>
            <span v-if="post.date_edit" class="date">Editado em {{ _format_date(post.date_edit) }}</span>
        </div>
        <div class="interact">
            <a
                href="#"
                class="icon-comments"
                @click="comment_post"
            >
                <span><svg viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"><g><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path></g></svg></span>
                <span>{{ post.posts.length }}</span>
            </a>
            <a
                href="#"
                @click="reintrig_post"
            >
                <span><svg :style="this.is_reintrig ? {fill: '#00c784'} : {fill: 'var(--color-text-gray)'}" viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"><g><path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path></g></svg></span>
                <span>{{ post.reintrigs.length }}</span>
            </a>
            <a
                href="#"
                @click="like_post"
            >
                <span><svg :style="this.is_like ? {fill: '#ff1b92'} : {fill: 'var(--color-text-gray)'}" viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"><g><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path></g></svg></span>
                <span>{{ post.likes.length }}</span>
            </a>
            <a href="#">
                <span><svg viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"><g><path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"></path></g></svg></span>
                <span></span>
            </a>
        </div>
    </div>
</template>

<script>
import User from "./User.vue"

import { format_date } from "../utils/date"
import onDelPost from "../events/onDelPost"
import onEditPost from "../events/onEditPost"
import onInteractPost from "../events/onInteractPost"

export default {
    name: "Post",
    props: ["user", "post", "logged_user"],
    watch: {
        logged_user: {
            handler() {
                this.update_interact()
            }
        }
    },
    components: {
        User
    },
    data() {
        return {
            is_reintrig: false,
            is_like: false
        }
    },
    methods: {
        _format_date(date) {
            return format_date(date)
        },
        del_post() {
            onDelPost.$emit("del-post", this.post)
        },
        edit_post() {
            this.post.date_edit = new Date()
            onEditPost.$emit("edit-post", this.post)
        },
        comment_post() {
            onInteractPost.$emit("comment-post", this.post)
        },
        reintrig_post() {
            onInteractPost.$emit("reintrig-post", this.post)
            this.update_interact()
        },
        like_post() {
            onInteractPost.$emit("like-post", this.post)
            this.update_interact()
        },
        update_interact() {
            this.is_reintrig = false
            this.is_like = false

            if (!this.logged_user) {
                return
            }

            const logged_id_user = this.logged_user.id

            for (let i = 0; i < this.post.reintrigs.length; i += 1) {
                const id_user = this.post.reintrigs[i]

                if (logged_id_user == id_user) {
                    this.is_reintrig = true
                    break
                }
            }

            for (let i = 0; i < this.post.likes.length; i += 1) {
                const id_user = this.post.likes[i]

                if (logged_id_user == id_user) {
                    this.is_like = true
                    break
                }
            }
        }
    }
}
</script>

<style scoped>
    .post {
        padding: 16px;
        cursor: pointer;
        position: relative;
    }

    .post:hover {
        background-color: var(--color-background-button-hover-white);
    }

    .interact {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        margin-top: 10px;
    }

    .interact a {
        display: flex;
        align-items: center;
    }

    .interact a span:first-child {
        margin-right: 5px;
    }

    svg {
        fill: var(--color-text-gray);
        width: 14px;
        height: 14px;
    }

    p {
        margin-top: 10px;
        margin-bottom: 10px;
        white-space: pre-wrap;
    }

    .container-date {
        display: flex;
        justify-content: space-between;
    }

    .date {
        font-size: .7rem;
        color: var(--color-text-gray);
    }

    .container-options {
        position: absolute;
        right: 5px;
        top: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .container-options > * {
        border-radius: 50%;
    }
    
    .container-options > * svg {
        padding: 2px;
        width: 20px;
        height: 20px;
    }

    .icon:hover {
        background-color: var(--color-background-button-hover-white);

    }

    .icon-trash-can {
        margin-left: 5px;
    }

    .icon-trash-can:hover svg {
        fill: red;
    }

    .icon-edit:hover {
        background-color: var(--color-background-button-hover-white);
    }

    .icon-edit:hover svg {
        fill: green;
    }
</style>

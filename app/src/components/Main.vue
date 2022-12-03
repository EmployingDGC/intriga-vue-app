<template>
    <div class="main">
        <Intrigar :logged_user="get_logged_user()" />
        <div class="container-posts">
            <Post
                v-for="p in posts"
                :key="p.id"
                :user="get_user(p.user_id)"
                :post="p"
            />
        </div>
        <div
            v-if="edited_post"
            class="edited-post"
        >
            <div class="content">
                <textarea
                    v-model.trim="edited_post.content"
                    placeholder="O que está acontecendo?"
                    maxlength="280"
                    wrap="hard"
                ></textarea>
                <button
                    @click="edit_post"
                >Salvar</button>
            </div>
        </div>
    </div>
</template>

<script>
import Intrigar from "./Intrigar.vue"
import Post from "./Post.vue"

import onAddPost from "../events/onAddPost"
import onDelPost from "../events/onDelPost"
import onEditPost from "../events/onEditPost"

export default {
    name: "Main",
    props: ["users"],
    components: {
        Intrigar,
        Post
    },
    watch: {
        posts: {
            handler(new_value, old_value) {
                new_value
                old_value
            },
            deep: true
        }
    },
    data() {
        return {
            posts: [
                {id: 1, user_id: 3, content: "Partiu Programar #VueJS", qtt_like: 5, qtt_reintrig: 0, date: new Date("2022-01-01 17:55:13"), date_edit: null},
                {id: 2, user_id: 6, content: "Partiu Programar #VueJS", qtt_like: 10, qtt_reintrig: 3, date: new Date("2022-02-02 19:23:27"), date_edit: null},
                {id: 3, user_id: 5, content: "Partiu Programar #VueJS", qtt_like: 15, qtt_reintrig: 1, date: new Date("2022-03-03 10:15:33"), date_edit: null},
            ],
            edited_post: null
        }
    },
    methods: {
        get_next_post_id() {
            const list_id = []

            for (let i = 0; i < this.posts.length; i += 1) {
                const post = this.posts[i]

                list_id.push(post.id)
            }

            return Math.max(...list_id) + 1
        },
        get_logged_user() {
            for (let i = 0; i < this.users.length; i += 1) {
                const user = this.users[i]
                
                if (user.logged) {
                    return user
                }
            }

            return null
        },
        get_user(id) {
            for (let i = 0; i < this.users.length; i += 1) {
                const user = this.users[i]
                
                if (user.id == id) {
                    return user
                }
            }

            return null
        },
        edit_post() {
            if (this.edited_post.content) {
                this.edited_post.date_edit = new Date()
                this.edited_post = null
            }
        }
    },
    created() {
        onAddPost.$on("add-post", (post) => {
            const id = this.get_next_post_id()

            this.posts.push({id, ...post})
        })

        onDelPost.$on("del-post", (post) => {
            const user_id = this.get_logged_user().id

            if (user_id != post.user_id) {
                return
            }

            for (let i = 0; i < this.posts.length; i += 1) {
                const p = this.posts[i]
                
                if (p.id == post.id) {
                    this.posts.splice(i, 1)
                    return
                }
            }
        })
        
        onEditPost.$on("edit-post", (post) => {
            const user_id = this.get_logged_user().id

            if (user_id != post.user_id) {
                return
            }

            for (let i = 0; i < this.posts.length; i += 1) {
                const p = this.posts[i]
                
                if (p.id == post.id) {
                    this.edited_post = p
                    return
                }
            }
        })
    },
    destroyed() {
        onAddPost.$off("add-post")
        onDelPost.$off("del-post")
        onEditPost.$off("edit-post")
    }
}
</script>

<style scoped>
    .main {
        width: 600px;
        padding: 5px;
    }

    .container-posts {
        margin-top: 10px;
    }

    .edited-post {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #000000ba;
        z-index: 500;
    }

    .edited-post .content {
        display: flex;
        flex-direction: column;
    }

    .edited-post .content textarea {
        height: 500px;
        width: 500px;
        resize: none;
        outline: none;
        border: none;
        background-color: var(--color-background-side);
        padding: 12px;
        border-radius: 20px;
    }

    .edited-post .content button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 90px;
        height: 36px;
        outline: none;
        border: none;
        border-radius: 40px;
        padding: 16px;
        background-color: var(--color-background-button-blue);
        color: var(--color-text-white);
        font-weight: 900;
        margin-top: 5px;
        cursor: pointer;
        font-size: 1.1rem;
    }

    .edited-post .content button:hover {
        background-color: var(--color-background-button-hover-blue);
    }
</style>

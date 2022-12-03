<template>
    <div class="main">
        <Intrigar :logged_user="logged_user" />
        <div class="container-posts">
            <Post
                v-for="p in posts"
                :key="p.id"
                :user="get_user(p.user_id)"
                :post="p"
            />
        </div>
        <EditPost
            v-if="edited_post"
            :post="edited_post"
        />
    </div>
</template>

<script>
import Intrigar from "./Intrigar.vue"
import EditPost from "./EditPost.vue"
import Post from "./Post.vue"

import onAddPost from "../events/onAddPost"
import onDelPost from "../events/onDelPost"
import onEditPost from "../events/onEditPost"

const storage_name_posts = "db_posts"

export default {
    name: "Main",
    props: ["logged_user", "users"],
    components: {
        Intrigar,
        Post,
        EditPost
    },
    watch: {
        posts: {
            handler() {
                this.update_local_storage_posts()
            },
            deep: true
        }
    },
    data() {
        return {
            posts: [],
            edited_post: null
        }
    },
    methods: {
        update_local_storage_posts() {
            localStorage.setItem(storage_name_posts, JSON.stringify(this.posts))
        },
        get_next_post_id() {
            const list_id = []

            for (let i = 0; i < this.posts.length; i += 1) {
                const post = this.posts[i]

                list_id.push(post.id)
            }

            return Math.max(...list_id) + 1
        },
        get_user(id) {
            for (let i = 0; i < this.users.length; i += 1) {
                const user = this.users[i]
                
                if (user.id == id) {
                    return user
                }
            }

            return null
        }
    },
    created() {
        this.posts = JSON.parse(localStorage.getItem(storage_name_posts)) || []

        for (let i = 0; i < this.posts.length; i += 1) {
            const post = this.posts[i]

            post.date = new Date(post.date)
            
            if (post.date_edit) {
                post.date_edit = new Date(post.date_edit)
            }
        }

        onAddPost.$on("add-post", (post) => {
            const id = this.get_next_post_id()

            this.posts.push({id, ...post})
        })

        onDelPost.$on("del-post", (post) => {
            const user_id = this.logged_user.id

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
            const user_id = this.logged_user.id

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
        
        onEditPost.$on("edited-post", (post) => {
            this.edited_post = null

            for (let i = 0; i < this.posts.length; i += 1) {
                const p = this.posts[i]
                
                if (p.id == post.id) {
                    this.posts[i] = post
                    break
                }
            }
        })
    },
    destroyed() {
        onAddPost.$off("add-post")
        onDelPost.$off("del-post")
        onEditPost.$off("edit-post")
        onEditPost.$off("edited-post")
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
</style>

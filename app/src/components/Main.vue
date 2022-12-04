<template>
    <div class="main">
        <Intrigar :logged_user="logged_user" />
        <div class="container-posts">
            <Post
                v-for="p in posts"
                :key="p.id"
                :user="get_user(p.user_id)"
                :post="p"
                :logged_user="logged_user"
                :users="users"
            />
        </div>
        <EditPost
            v-if="edited_post"
            :post="edited_post"
        />
        <NewComment
            v-if="comment_post"
            :post="comment_post"
            :logged_user="logged_user"
		/>
    </div>
</template>

<script>
import Intrigar from "./Intrigar.vue"
import EditPost from "./EditPost.vue"
import NewComment from "./NewComment.vue"
import Post from "./Post.vue"

import onInteractPost from "../events/onInteractPost"
import onInteractUser from "../events/onInteractUser"

import LocalStorage from "../utils/local_storage"

const posts_local_storage = new LocalStorage("db_posts")

export default {
    name: "Main",
    props: ["logged_user", "users"],
    components: {
        Intrigar,
        Post,
        EditPost,
        NewComment
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
            edited_post: null,
            comment_post: null
        }
    },
    methods: {
        update_local_storage_posts() {
            posts_local_storage.set_item(this.posts)
        },
        get_next_post_id() {
            if (this.posts.length == 0) {
				return 1
			}

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
        this.posts = posts_local_storage.get_item() || []

        for (let i = 0; i < this.posts.length; i += 1) {
            const post = this.posts[i]

            post.date = new Date(post.date)

            for (let j = 0; j < post.posts.length; j += 1) {
                const comments = post.posts[j]

                comments.date = new Date(comments.date)
            }
            
            if (post.date_edit) {
                post.date_edit = new Date(post.date_edit)
            }
        }

        onInteractPost.$on("add-post", (post) => {
            const id = this.get_next_post_id()

            this.logged_user.id_posts.push(id)

            onInteractUser.$emit("update-storage")

            this.posts.unshift({id, ...post})

            onInteractPost.$emit("add-post-success", true)
        })

        onInteractPost.$on("del-post", (post) => {
            const post_del_id = post.id
            const user_post_id = post.user_id
            const user_logged_id = this.logged_user.id

            if (user_logged_id != user_post_id) {
                onInteractPost.$emit("del-post-success", false)
                return
            }

            for (let i = 0; i < this.posts.length; i += 1) {
                const current_post_id = this.posts[i].id
                
                if (current_post_id == post_del_id) {
                    const posts_logged_user = this.logged_user.id_posts
                    const del_index = posts_logged_user.indexOf(post_del_id)

                    posts_logged_user.splice(del_index, 1)
                    onInteractUser.$emit("update-storage")

                    this.posts.splice(i, 1)
                    onInteractPost.$emit("del-post-success", true)
                    
                    return
                }
            }
        })
        
        onInteractPost.$on("edit-post", (post) => {
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
        
        onInteractPost.$on("edited-post", (post) => {
            this.edited_post = null

            for (let i = 0; i < this.posts.length; i += 1) {
                const p = this.posts[i]
                
                if (p.id == post.id) {
                    post.date_edit = new Date()
                    post.qtt_edits += 1
                    this.posts[i] = post
                    break
                }
            }
        })

        onInteractPost.$on("comment-post", (post) => {
            this.comment_post = post
        })
        
        onInteractPost.$on("reintrig-post", (post) => {
            const id_logged_user = this.logged_user.id

            if (post.user_id == id_logged_user) {
                return
            }

            for (let i = 0; i < this.posts.length; i += 1) {
                const p = this.posts[i]
                
                let add_reintrig = true

                if (p.id == post.id) {
                    let j

                    for (j = 0; j < p.reintrigs.length; j += 1) {
                        const user_id = p.reintrigs[j]

                        if (user_id == id_logged_user) {
                            add_reintrig = false
                            break
                        }
                    }

                    if (add_reintrig) {
                        p.reintrigs.push(id_logged_user)
                    } else {
                        p.reintrigs.splice(j, 1)
                    }

                    break
                }
            }
        })
        
        onInteractPost.$on("like-post", (post) => {
            const id_logged_user = this.logged_user.id

            if (post.user_id == id_logged_user) {
                return
            }

            for (let i = 0; i < this.posts.length; i += 1) {
                const p = this.posts[i]
                
                let add_reintrig = true

                if (p.id == post.id) {
                    let j

                    for (j = 0; j < p.likes.length; j += 1) {
                        const user_id = p.likes[j]

                        if (user_id == id_logged_user) {
                            add_reintrig = false
                            break
                        }
                    }

                    if (add_reintrig) {
                        p.likes.push(id_logged_user)
                    } else {
                        p.likes.splice(j, 1)
                    }

                    break
                }
            }
        })

        onInteractPost.$on("add-comment", (o) => {
            const parent_comment = o.post
            const comment = o.comment

            parent_comment.posts.push(comment)

            this.update_local_storage_posts()

            this.comment_post = null
        })
    },
    destroyed() {
        onInteractPost.$off("add-post")
        onInteractPost.$off("del-post")
        onInteractPost.$off("edit-post")
        onInteractPost.$off("edited-post")
        onInteractPost.$off("comment-post")
        onInteractPost.$off("reintrig-post")
        onInteractPost.$off("like-post")
        onInteractPost.$off("add-comment")
    }
}
</script>

<style scoped>
    .main {
        width: 600px;
    }
</style>

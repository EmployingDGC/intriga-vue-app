<template>
    <div class="container">
        <div class="content">
            <textarea
                v-model.trim="comment"
                placeholder="O que está acontecendo?"
                maxlength="280"
                wrap="hard"
                @keyup.ctrl.enter="add_comment"
            ></textarea>
            <button
                @click="add_comment"
            >Comentar</button>
        </div>
    </div>
</template>

<script>
import onInteractPost from "../events/onInteractPost"

export default {
    name: "NewComment",
    props: ["post", "logged_user"],
    data() {
        return {
            comment: null
        }
    },
    methods: {
        add_comment() {
            const comment = this.comment
        
            if (comment) {
                const list_id = []

                for (let i = 0; i < this.post.posts.length; i += 1) {
                    const id_comment = this.post.posts[i].id

                    list_id.push(id_comment)
                }

                const id = list_id.length > 0 ? Math.max(...list_id) + 1 : 1

                onInteractPost.$emit("add-comment", {
                    post: this.post,
                    comment: {
                        id,
                        user_id: this.logged_user.id,
                        content: comment,
                        date: new Date()
                    }
                })
            }
        }
    }
}
</script>

<style scoped>
    .container {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--color-background-dark-transparent);
        z-index: 500;
    }

    .content {
        display: flex;
        flex-direction: column;
    }

    .content textarea {
        height: 500px;
        width: 500px;
        resize: none;
        outline: none;
        border: none;
        background-color: var(--color-background-side);
        padding: 12px;
        border-radius: 20px;
    }

    .content button {
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

    .content button:hover {
        background-color: var(--color-background-button-hover-blue);
    }
</style>

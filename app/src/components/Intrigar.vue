<template>
    <div class="intrigar">
        <div class="content">
            <textarea
                placeholder="O que está acontecendo?"
                maxlength="280"
                wrap="hard"
                v-model.trim="value_post"
                @keyup.ctrl.enter="new_post"
            ></textarea>
            <button
                @click="new_post"
            >Intrigar</button>
        </div>
    </div>
</template>

<script>
import onInteractPost from "../events/onInteractPost"

export default {
    name: "Intrigar",
    props: ["logged_user"],
    components: {},
    data() {
        return {
            value_post: null
        }
    },
    methods: {
        new_post() {
            if (this.value_post) {
                onInteractPost.$emit("add-post", {
                    user_id: this.logged_user.id,
                    content: this.value_post,
                    posts: [],
                    reintrigs: [],
                    likes: [],
                    qtt_edits: 0,
                    date_edit: null,
                    date: new Date()
                })
            }

            this.value_post = null
        }
    }
}
</script>

<style scoped>
    .intrigar {
        display: flex;
        border: 1px solid var(--color-text-gray);
        border-top: none;
        padding: 5px;
    }
    
    .user {
        align-items: flex-start;
    }

    .content {
        margin-bottom: 10px;
        width: 100%;
    }

    textarea {
        resize: none;
        outline: none;
        border: none;
        background-color: var(--color-background-side);
        width: 100%;
        padding: 12px;
        height: 125px;
        border-radius: 20px;
    }

    button {
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

    button:hover {
        background-color: var(--color-background-button-hover-blue);
    }
</style>

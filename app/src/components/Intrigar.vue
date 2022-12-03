<template>
    <div class="intrigar">
        <User :user="logged_user" />
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
import User from "./User.vue"
import onAddPost from "../events/onAddPost"

export default {
    name: "Intrigar",
    props: ["logged_user"],
    components: {
        User
    },
    data() {
        return {
            value_post: null
        }
    },
    methods: {
        new_post() {
            if (this.value_post) {
                onAddPost.$emit("add-post", {
                    user_id: this.logged_user.id,
                    content: this.value_post,
                    qtt_like: 0,
                    qtt_reintrig: 0,
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
    }
    
    .user {
        align-items: flex-start;
    }

    .content {
        margin-left: 10px;
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

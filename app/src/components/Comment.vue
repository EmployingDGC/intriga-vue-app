<template>
    <div class="container">
        <User
            :user="user"
            :enabled_infos="true"
        />
        <div class="content">
            <p
                class="comment"
            >{{ comment.content }}</p>
            <span class="date">Comentado em {{ _format_date(comment.date) }}</span>
        </div>
        <hr v-if="separator">
    </div>
</template>

<script>
import { format_date } from "../utils/date"

import User from "./User.vue"

export default {
    name: "Comment",
    props: ["comment", "user", "separator"],
    components: {
        User
    },
    data() {
        return {
            
        }
    },
    methods: {
        _format_date(date) {
            return format_date(date)
        }
    }
}
</script>

<style scoped>
    hr {
        margin-top: 5px;
        border-color: var(--color-text-gray);
    }

    .container {
        padding: 16px 0 0 16px;
    }

    .comment {
        margin-top: 10px;
        margin-bottom: 10px;
        white-space: pre-wrap;
    }

    .date {
        font-size: .7rem;
        color: var(--color-text-gray);
    }
</style>

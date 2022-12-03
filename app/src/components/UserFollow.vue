<template>
    <div class="container-user-follow">
        <User :user="user" :enabled_infos="true" />
        <button>Seguir</button>
    </div>
</template>

<script>
import User from "./User.vue"

export default {
    name: "UserFollow",
    components: {User},
    props: ["user"]
}
</script>

<style scoped>
    .container-user-follow {
        display: flex;
        justify-content: space-between;
        padding: 12px 16px;
        cursor: pointer;
    }

    .container-user-follow:hover {
        background-color: var(--color-background-button-hover-white);
    }

    button {
        background-color: var(--color-background-button-white);
        border-radius: 20px;
        padding: 0 16px;
        color: var(--color-text-gray);
        font-weight: 400;
        cursor: pointer;
    }
</style>

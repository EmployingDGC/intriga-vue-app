<template>
    <div class="user">
        <span class="user-avatar"><svg viewBox="0 0 24 24" aria-hidden="true" class="r-1nao33i r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-cnnz9e"><g><path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"></path></g></svg></span>
        <div v-if="enabled_infos" class="user-informations">
            <span class="user-name overflow">{{ user.name }}</span>
            <span class="user-login overflow">@{{ user.login }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "UserFollow",
    props: ["user", "enabled_infos"]
}
</script>

<style scoped>
    .overflow {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 198px;
    }

    .user {
        display: flex;
        align-items: center;
    }

    .user-informations {
        display: flex;
        flex-direction: column;
    }

    .user-login {
        font-size: 13px;
        color: var(--color-text-gray);
    }

    .user-name {
        font-size: 15px;
        color: var(--color-text-white);
        font-weight: 400;
    }

    .user-avatar {
        width: 36px;
        height: 36px;
    }
</style>

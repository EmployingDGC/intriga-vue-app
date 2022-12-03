<template>
    <div class="indication-to-folow">
        <h3>Quem Seguir</h3>
        <div>
            <UserFollow
                v-for="u in users"
                :key="u.id"
                :user="u"
            />
        </div>
        <a href="#">Mostrar mais</a>
    </div>
</template>

<script>
import UserFollow from "./UserFollow.vue"

export default {
    name: "IndicationToFollow",
    components: {
        UserFollow
    },
    props: ["users"],
    data() {
        return {
            
        }
    }
}
</script>

<style scoped>
    .indication-to-folow {
        background-color: var(--color-background-side);
        border-radius: 16px;
        margin-top: 15px;
    }

    .indication-to-folow > h3{
        padding: 12px 16px;
        border-radius: 16px 16px 0 0;
    }

    .indication-to-folow > a {
        padding: 16px;
        cursor: pointer;
        color: var(--color-text-blue);
        display: flex;
        align-items: center;
        border-radius: 0 0 16px 16px;
    }

    .indication-to-folow > a:hover {
        background-color: var(--color-background-button-hover-white);
    }
</style>

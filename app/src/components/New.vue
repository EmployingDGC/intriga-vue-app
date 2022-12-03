<template>
    <div class="c-new">
        <span>{{ pnew.description }}</span>
        <h2>{{ pnew.title }}</h2>
        <span>{{ pnew.qtt_intrigs }}</span>
    </div>
</template>

<script>
export default {
    name: "New",
    props: ["pnew"]
}
</script>

<style scoped>
    .c-new {
        padding: 12px 16px;
        cursor: pointer;
    }

    .c-new:hover {
        background-color: var(--color-background-button-hover-white);
    }

    .c-new span {
        font-size: 13px;
        color: var(--color-text-gray);
    }

    .c-new h2 {
        font-size: 15px;
        color: var(--color-text-white);
        font-weight: 400;
    }
</style>

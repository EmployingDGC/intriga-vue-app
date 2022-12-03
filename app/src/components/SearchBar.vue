<template>
    <div class="search-bar">
        <span><svg viewBox="0 0 24 24" aria-hidden="true" class="r-1bwzh9t r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-4wgw6l r-f727ji r-bnwqim r-1plcrui r-lrvibr"><g><path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path></g></svg></span>
        <input type="text" placeholder="Buscar no Intriga">
    </div>
</template>

<script>
export default {
    name: "SearchBar"
}
</script>

<style scoped>
    .search-bar {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 44px;
        border-radius: 40px;
        background-color: var(--color-background-side);
        width: 100%;
        margin-bottom: 15px;
    }

    .search-bar input {
        color: var(--color-text-white);
        padding: 12px;
        background-color: transparent;
        outline: none;
        border: none;
    }

    .search-bar span {
        width: 16px;
        height: 16px;
        margin-left: 12px;
    }

    .search-bar svg {
        fill: var(--color-text-gray);
    }
</style>

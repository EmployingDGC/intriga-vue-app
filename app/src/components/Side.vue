<template>
    <div class="side">
        <SearchBar />
        <ContainerNews />
        <IndicationToFollow :users="users"/>
    </div>
</template>

<script>
import IndicationToFollow from "./IndicationToFollow.vue"
import SearchBar from "./SearchBar.vue"
import ContainerNews from "./ContainerNews.vue"

export default {
    name: "Side",
    props: ["users"],
    components: {
        SearchBar,
        ContainerNews,
        IndicationToFollow
    },
    data() {
        return {
            
        }
    }
}
</script>

<style scoped>
    .side {
        max-width: 350px;
        padding: 5px;
    }
</style>

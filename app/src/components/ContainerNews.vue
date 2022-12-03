<template>
    <div class="container-news">
        <h3>O que está acontecendo</h3>
        <div>
            <New
                v-for="n in news"
                :key="n.id"
                :pnew="n"
            />
        </div>
        <a href="#">Mostrar mais</a>
    </div>
</template>

<script>
import New from "./New.vue"

export default {
    name: "ContainerNews",
    components: {
        New
    },
    data() {
        return {
            news: [
                {id: 1, title: "IEM Rio 2022", description: "Counter Strike - AO VIVO", qtt_intrigs: "150 mil Intrigs"},
                {id: 2, title: "#11do11Americanas", description: "superlive com muuuita oferta antecipada", qtt_intrigs: "115 mil Intrigs"},
                {id: 3, title: "Furia x Navi", description: "Assuntos do Momento", qtt_intrigs: "110 mil Intrigs"},
                {id: 4, title: "Nyvi", description: "Assunto do Momento em Brasil", qtt_intrigs: "80 mil Intrigs"},
                {id: 5, title: "Cabo Frio", description: "Assunto do Momento em Rio de Janeiro", qtt_intrigs: "78 mil Intrigs"}
            ]
        }
    }
}
</script>

<style scoped>
    .container-news{
        background-color: var(--color-background-side);
        border-radius: 16px;
    }

    .container-news > h3{
        padding: 12px 16px;
        border-radius: 16px 16px 0 0;
    }

    .container-news > a {
        padding: 16px;
        cursor: pointer;
        color: var(--color-text-blue);
        display: flex;
        align-items: center;
        border-radius: 0 0 16px 16px;
    }

    .container-news > a:hover {
        background-color: var(--color-background-button-hover-white);
    }
</style>

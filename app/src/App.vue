<template>
	<div id="app">
		<Menu />
		<Main :users="users" />
		<Side :users="users.slice(-3)"/>
	</div>
</template>

<script>
import Menu from "./components/Menu.vue"
import Main from "./components/Main.vue"
import Side from "./components/Side.vue"

export default {
	name: "App",
	components: {
		Menu,
		Main,
		Side
	},
	data() {
		return {
			users: [
				{id: 1, name: "Davi", login: "davi", logged: true},
				{id: 2, name: "Victor", login: "victor", logged: false},
				{id: 3, name: "Marcelo", login: "marcelo", logged: false},
				{id: 4, name: "Andrico", login: "andrico", logged: false},
				{id: 5, name: "Mayara", login: "mayara", logged: false},
				{id: 6, name: "Leo Alporges", login: "leo_alporges", logged: false},
				{id: 7, name: "Gabriel Marrochi", login: "gabriel_marrochi", logged: false}
			]
		}
	},
	methods: {}
}
</script>

<style scoped>
	#app {
		display: flex;
		justify-content: center;
		background-color: black;
		min-height: 100vh;
	}
</style>

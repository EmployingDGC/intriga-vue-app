<template>
	<div id="app">
		<Menu :logged_user="logged_user" />
		<Main
			:logged_user="logged_user"
			:users="users"
		/>
		<Side :users="recommended_follow()" />
		<Login
			v-if="!logged_user"
			:users="users"
		/>
	</div>
</template>

<script>
import Menu from "./components/Menu.vue"
import Main from "./components/Main.vue"
import Side from "./components/Side.vue"
import Login from "./components/Login.vue"

import onLogin from "./events/onLogin"

const storage_name_users = "db_users"

export default {
	name: "App",
	components: {
		Menu,
		Main,
		Side,
		Login
	},
	data() {
		return {
			users: [],
			logged_user: null
		}
	},
	methods: {
		login(_login) {
			for (let i = 0; i < this.users.length; i += 1) {
                const user = this.users[i]

                if (_login == user.login) {
					this.logged_user = user
					onLogin.$emit("log-in-success", true)
					return true
				}
            }

			onLogin.$emit("log-in-success", false)

			return false
		},
		register(_login, name) {
			for (let i = 0; i < this.users.length; i += 1) {
                const user = this.users[i]

                if (_login == user.login) {
					onLogin.$emit("register-success", false)
					return false
				}
            }

			if (!name) {
				onLogin.$emit("register-success", false)
				return false
			}

			this.users.push({
				id: this.get_next_user_id(),
				name: name,
				login: _login
			})

			localStorage.setItem(storage_name_users, JSON.stringify(this.users))

			onLogin.$emit("register-success", true)

			return true
		},
		sign_out() {
			this.logged_user = null
		},
		get_next_user_id() {
			if (this.users.length == 0) {
				return 1
			}

            const list_id = []

            for (let i = 0; i < this.users.length; i += 1) {
                const user = this.users[i]

                list_id.push(user.id)
            }

            return Math.max(...list_id) + 1
        },
		recommended_follow() {
			if (!this.logged_user) {
				return this.users.slice(-3)
			}

			const users = []
			const recommended = []

			for (let i = 0; i < this.users.length; i += 1) {
                const u = this.users[i]
				
				if (u.id != this.logged_user.id) {
					users.push(u)
				}
            }

			for (let i = 0; i < 3; i += 1) {
				const index = Math.floor(Math.random() * users.length)
				recommended.push(...users.splice(index, 1))
			}

			return recommended
		}
	},
	created() {
		onLogin.$on("log-in", (user) => {
			this.login(user.login)
		})

		onLogin.$on("register", (user) => {
			if (this.register(user.login, user.name)) {
				this.login(user.login)
			}
		})

		onLogin.$on("sign-out", () => {
			this.sign_out()
		})

		this.users = JSON.parse(localStorage.getItem(storage_name_users)) || []
	}
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

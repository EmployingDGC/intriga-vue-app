<template>
    <div class="login">
        <div class="container">
            <span>Nome:</span>
            <input
                :style="input_error(valid_name)"
                placeholder="Seu Nome!"
                type="text"
                v-model.trim="user.name"
                @focusout="validation_name"
            >
            <span>Login:</span>
            <input
                :style="input_error(valid_login)"
                placeholder="Seu Login!"
                type="text"
                v-model.trim="user.login"
                @focusout="validation_login"
            >
            <div class="buttons">
                <button
                    @click="login"
                >Logar</button>
                <button
                    @click="register"
                >Registrar</button>
            </div>
        </div>
    </div>
</template>

<script>
import onLogin from "../events/onLogin"

export default {
    name: "Login",
    data() {
        return {
            user: {
                name: null,
                login: null
            },
            valid_name: true,
            valid_login: true
        }
    },
    methods: {
        login() {
            const user = this.user

            const valid = (
                this.valid_login
                && user.login
            )

            if (valid) {
                onLogin.$emit("log-in", user)
                user.name = null
                user.login = null
            }
        },
        register() {
            const user = this.user

            const valid = (
                this.valid_login
                && this.valid_name
                && user.name
                && user.login
            )

            if (valid) {
                onLogin.$emit("register", user)
                user.name = null
                user.login = null
            }
        },
        input_error(valid) {
            const border = valid ? "none" : "1px solid red"

            return {border}
        },
        validation_name() {
            const name = this.user.name

            if (!name) {
                this.valid_name = true
                return
            }

            this.valid_name = /^[a-z ]*$/.exec(name.toLowerCase()) ? true : false
        },
        validation_login() {
            const _login = this.user.login

            if (!_login) {
                this.valid_login = true
                return
            }

            this.valid_login = /^[a-z]+[a-z_0-9]*$/.exec(_login.toLowerCase()) ? true : false
        }
    },
    created() {
        onLogin.$on("log-in-success", (success) => {
            this.valid_login = success
		})

        onLogin.$on("register-success", (success) => {
            this.valid_login = success
            this.valid_name = success
		})
    }
}

</script>

<style scoped>
    .login {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--color-background-dark-transparent);
        z-index: 500;
    }

    .container {
        display: flex;
        flex-direction: column;
    }

    .container input {
        margin-bottom: 25px;
    }

    .container span {
        margin-bottom: 5px;
    }

    .container input {
        resize: none;
        outline: none;
        border: none;
        background-color: var(--color-background-side);
        padding: 12px;
        border-radius: 20px;
    }

    .container .buttons {
        display: flex;
        justify-content: space-between;
    }

    .container .buttons button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 90px;
        height: 36px;
        outline: none;
        border: none;
        border-radius: 40px;
        padding: 16px;
        background-color: var(--color-background-button-blue);
        color: var(--color-text-white);
        font-weight: 900;
        margin-top: 5px;
        cursor: pointer;
        font-size: 1.1rem;
    }
</style>

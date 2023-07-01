<template>
    <div>
        <!-- login -->
        <div class="contain py-16">
            <div class="max-w-lg mx-auto shadow border px-6 py-7 rounded overflow-hidden">
                <h2 class="text-2xl uppercase font-medium mb-1">Create an account</h2>
                <p class="text-gray-600 mb-6 text-sm">
                    Register for new cosutumer
                </p>
                <form action="#" method="post" autocomplete="on" @submit.prevent="register">
                    <div class="space-y-2">
                        <div>
                            <label for="name" class="text-gray-600 mb-2 block">Full Name</label>
                            <input type="text" name="name" id="name" v-model="validation.name"
                                class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                placeholder="full name" >
                            <span v-if="validationErrors.name" class="text-error text-xs tracking-wide leading-4">{{
                                validationErrors.name }}</span>
                        </div>
                        <div>
                            <label for="email" class="text-gray-600 mb-2 block">Email address</label>
                            <input type="email" name="email" id="email" v-model="validation.email"
                                class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                placeholder="youremail.@domain.com" >
                            <span v-if="validationErrors.email" class="text-error text-xs tracking-wide leading-4">{{
                                validationErrors.email }}</span>
                        </div>
                        <div>
                            <label for="password" class="text-gray-600 mb-2 block">Password</label>
                            <input type="password" name="password" id="password" v-model="validation.password"
                                class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                placeholder="*******">
                            <span v-if="validationErrors.password" class="text-error text-xs tracking-wide leading-4">{{
                                validationErrors.password }}</span>
                        </div>
                        <div>
                            <label for="confirm" class="text-gray-600 mb-2 block">Confirm password</label>
                            <input type="password" name="confirm" id="confirm" v-model="validation.password_confirmation"
                                class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                placeholder="*******">
                            <span v-if="validationErrors.password_confirmation"
                                class="text-error text-xs tracking-wide leading-4">{{
                                    validationErrors.password_confirmation }}</span>
                        </div>
                    </div>
                    <div class="mt-6">
                        <div class="flex items-center">
                            <input type="checkbox" name="aggrement" id="aggrement"
                                class="text-primary focus:ring-0 rounded-sm cursor-pointer">
                            <label for="aggrement" class="text-gray-600 ml-3 cursor-pointer">I have read and agree to the <a
                                    href="#" class="text-primary">terms & conditions</a></label>
                        </div>
                    </div>
                    <div class="mt-4">
                        <button type="submit"
                            class="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium">create
                            account</button>
                    </div>
                </form>

                <!-- login with -->
                <div class="mt-6 flex justify-center relative">
                    <div class="text-gray-600 uppercase px-3 bg-white z-10 relative">Or signup with</div>
                    <div class="absolute left-0 top-3 w-full border-b-2 border-gray-200"></div>
                </div>
                <div class="mt-4 flex gap-4">
                    <a href="#"
                        class="w-1/2 py-2 text-center text-white bg-blue-800 rounded uppercase font-roboto font-medium text-sm hover:bg-blue-700">facebook</a>
                    <a href="#"
                        class="w-1/2 py-2 text-center text-white bg-red-600 rounded uppercase font-roboto font-medium text-sm hover:bg-red-500">google</a>
                </div>
                <!-- ./login with -->

                <p class="mt-4 text-center text-gray-600">Already have account? <router-link to="login"
                        class="text-primary">Login now</router-link></p>
            </div>
        </div>
        <!-- ./login -->
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'LoginView',

    data() {
        return {
            //state loggedIn with localStorage
            loggedIn: localStorage.getItem('loggedIn'),
            //state token
            token: localStorage.getItem('token'),
            token_type: localStorage.getItem('token_type'),
            //state user
            user: [],
            //state validation
            validation: {
                name: "wawan",
                email: "Sandi@gmail.com",
                password: '12345678',
                password_confirmation: '12345678',
            },
            validationErrors: {
                name: null,
                email: null,
                password: null,
                password_confirmation: null,
            },
            //state login failed
            loginFailed: null
        }
    },
    methods: {
        register() {

            axios({
                url: "http://127.0.0.1:8000/api/register",
                method: 'post',
                data: this.validation,
                headers: { "Content-Type": "multipart/form-data" },
            }).then(res => {

                //debug user login
                console.log(res.data.data)

                if (res.status == 200) {

                    //set localStorage
                    localStorage.setItem("loggedIn", "true")

                    //set localStorage Token
                    localStorage.setItem("token", res.data.data.access_token)
                    localStorage.setItem("token_type", res.data.data.token_type)

                    //change state
                    this.loggedIn = true

                    //redirect dashboard
                    window.location.reload();
                    return this.$router.push({ name: 'home' })

                } else {

                    //set state login failed
                    this.loginFailed = true

                }

            }).catch(error => {
                const response = error.response.data.errors;
                this.validationErrors.email = response.email.toString();
                this.validationErrors.password = response.password.toString();
                this.validationErrors.name = response.name.toString();
                this.validationErrors.password_confirmation = response.password_confirmation;

            })

        }
    },

    //check user already logged in
    mounted() {

        if (this.loggedIn) {
            return this.$router.push({ name: 'home' })
        }

    }
}
</script>
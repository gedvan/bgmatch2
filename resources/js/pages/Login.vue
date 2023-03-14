<template>
    <div class="row justify-content-md-center">
        <div class="col-6">
            <div v-if="errors.length > 0" class="alert alert-danger" role="alert">
                <ul class="mb-0">
                    <li v-for="error in errors">{{ error }}</li>
                </ul>
            </div>
            <form action="/public" method="post" @submit.prevent="login">
                <input type="text" class="form-control" name="username" v-model="credentials.email">
                <input type="password" class="form-control" name="password" v-model="credentials.password">
                <button type="submit" class="btn btn-primary" :disabled="processing">Entrar</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { useAuthStore } from "../stores/auth";

export default {
    data() {
        return {
            credentials: {
                email: '',
                password: '',
            },
            processing: false,
            errors: [],
        }
    },
    methods: {
        async login() {
            this.processing = true;
            this.errors = [];
            const authStore = useAuthStore();

            await axios.get('/sanctum/csrf-cookie')
            await axios.post('/api/login', this.credentials)
                .then(({data}) => {
                    authStore.login(data.user);
                    this.$router.push({name: 'restricted'});
                })
                .catch(({response}) => {
                    this.errors = [].concat(...Object.values(response.data.errors));
                })
                .finally(() => {
                    this.processing = false;
                });
        }
    },
}
</script>

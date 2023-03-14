<template>
    <h2>Restricted content</h2>
    <button class="btn btn-link" @click="logout">Logout</button>
</template>

<script>
import { useAuthStore } from "../stores/auth";
export default {
    data() {
        return {
        }
    },
    methods: {
        logout() {
            const authStore = useAuthStore();
            authStore.logout();
            this.$router.push('/');
        }
    }
}
</script>

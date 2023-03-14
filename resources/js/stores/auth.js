import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authenticated: false,
        user: {},
    }),
    persist: true,
    getters: {
        isAuthenticated(state) {
            return state.authenticated;
        },
        getUser(state) {
            return state.user;
        },
    },
    actions: {
        login(user) {
            this.authenticated = true;
            this.user = user;
        },
        logout() {
            this.authenticated = false;
            this.user = {};
        },
    },
});

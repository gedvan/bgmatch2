import { createRouter, createWebHashHistory } from 'vue-router';
import { useAuthStore } from "./stores/auth";
import Login from "./pages/Login.vue";
import Restricted from "./pages/Restricted.vue";

export const initRouter = () => {

    // Application routes.
    const routes = [
        {
            name: 'home',
            path: '/',
            component: Restricted,
            meta: {
                title: 'Home',
                middleware: 'auth',
            }
        },
        {
            name: 'login',
            path: '/login',
            component: Login,
            meta: {
                title: 'Login',
                middleware: 'guest',
            }
        },
        {
            name: 'restricted',
            path: '/restricted',
            component: Restricted,
            meta: {
                title: 'Restricted',
                middleware: 'auth',
            }
        },
    ];

    const router = createRouter({
        history: createWebHashHistory(),
        routes,
    });

    const authStore = useAuthStore();

    // Handle access to public and restricted routes.
    router.beforeEach((to, from, next) => {

        // If the user tries to access a restricted route, but they're not
        // authenticated, send them to login.
        if (to.meta.middleware === 'auth' && !authStore.isAuthenticated) {
            next({name: 'login'});
            return;
        }

        // If the user is already logged in and tries to access login page, send
        // them to the dashboard.
        if (to.name === 'login' && authStore.isAuthenticated) {
            next({name: 'restricted'});
            return;
        }

        next();
    });

    // Add a class to the root app element accordingly to the current route.
    router.afterEach((to, from) => {
        if (to.name !== from.name) {
            document.title = to.meta.title;
            const appRoot = document.querySelector('#app');
            appRoot.classList.remove('route-' + from.name);
            appRoot.classList.add('route-' + to.name);
        }
    });

    return router;
};

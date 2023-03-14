<script>
export default {
    data() {
        return {
            msg: 'Hello World!'
        }
    },
    methods: {
    },
}
</script>

<template>
    <h1>BGMatch2</h1>
    <ul>
        <li><router-link to="login">Login</router-link></li>
        <li><router-link to="restricted">Restricted</router-link></li>
    </ul>
    <router-view></router-view>
</template>

<template lang="pug">
      form.register
        div.input-container
            | Login:
            input(type="text" v-model="name")
        div.input-container
            | Password:
            input(type="password" v-model="password")
        div.input-container
            button( class="waves-effect waves-light btn" @click="register")
                | Register
</template>

<script>
import PostsService from '@/services/PostsService'
export default {
    name: 'RegisterForm',
    data () {
        return {
            name: '',
            password: ''
        }
    },
    methods: {
        async register(){
            await PostsService.addUser({
                name: this.name,
                password: this.password
            })
            this.$router.push({ name: 'Admin' })
        }
    }
}
</script>

<style lang="scss">
</style>


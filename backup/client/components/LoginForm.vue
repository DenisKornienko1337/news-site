<template lang="pug">
    div.register-form
        h2 Login Form
        form.register( @submit.prevent="logIn" )
            div.input-container
                | Login:
                input(type="text" name="name" v-model="name" v-validate="'required'" )
                div(class="validation-error text-center") {{ errors.first('name') }}
            div.input-container
                | Password:
                input(type="password" name="password" v-model="password" v-validate="'required'" )
                div(class="validation-error text-center") {{ errors.first('password') }}
            div.input-container
                button( class="waves-effect waves-light btn")
                    | Login
</template>

<script>
import Vue from 'vue'
import PostsService from '@/services/PostsService'
export default {
    name: 'LoginForm',
    data () {
        return {
            name: '',
            password: ''
        }
    },
    methods: {
        async logIn() {
            this.$validator.validateAll()        
            .then( async () => {
                if (!this.errors.any()) { 
                    try {
                        const response = await PostsService.logIn({
                            name: this.name,
                            password: this.password
                        })
                          
                        Vue.prototype.$userName = response.data.username 
                        Vue.prototype.$isAuth = true
                        this.$router.push({ name: 'Admin' })
                    } catch(err) {   
                        Vue.prototype.$isAuth = false      
                        this.$dialog
                        .alert('Cant find user or failed password')
                    }
                }
            })
        }
    }
}
</script>

<style lang="scss">
</style>


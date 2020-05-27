<template lang="pug">
    div.login-form
        h2 Register Form
        form.register( @submit.prevent="register" )
            div.input-container
                | Login:
                input(type="text" name="name" v-model="name" v-validate="'required'" )
                div(class="validation-error text-center") {{ errors.first('name') }}
            div.input-container
                | Password:
                input(type="password" name="password" v-model="password" v-validate="'required'" )
                div(class="validation-error text-center") {{ errors.first('password') }}
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
            this.$validator.validateAll()        
            .then( async () => {
                if (!this.errors.any()) {                     
                    
                    const res = await PostsService.addUser({
                        name: this.name,
                        password: this.password
                    })
                    console.log(res);
                    
                    // if(res)  this.$router.push({ name: 'Admin' })
                    // else this.$dialog.alert('Cant find user or failed password')
                    // try {
                    //     await PostsService.addUser({
                    //         name: this.name,
                    //         password: this.password
                    //     })
                    //     this.$router.push({ name: 'Admin' })
                    // } catch(err) {         
                    //     this.$dialog
                    //     .alert('Cant find save user try other username')
                    // }
                }
            })
        }
    }
}
</script>

<style lang="scss">
</style>


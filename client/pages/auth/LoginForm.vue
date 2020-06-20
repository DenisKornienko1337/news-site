<template lang="pug">
    div.register-form
        h2 Login Form
        form.register( @submit.prevent="logIn" )
            div.input-container
                | Login:
                input(type="text" name="name" v-model="name"  )
                //- div(class="validation-error text-center") {{ errors.first('name') }}
            div.input-container
                | Password:
                input(type="password" name="password" v-model="password" )
                //- div(class="validation-error text-center") {{ errors.first('password') }}
            div.input-container
                button( class="waves-effect waves-light btn")
                    | Login
</template>

<script>
import User from '~/middleware/actions/user.js'

export default {
    name: 'LoginForm',
    data () {
        return {
            name: '',
            password: ''
        }
    },
    //methods: {
        async logIn() {
            // this.$validator.validateAll()        
            // .then( 
                async () => {
               // if (!this.errors.any()) {
                    const user = {
                        name: this.name, 
                        password: this.password
                    }
                    const res = await User.logIn(user)
                    
                    if (res)  this.$router.push({ name: 'Admin' })
                    // else this.
                    //     $dialog.alert('Cant find user or failed password')
               // }
            } //)
        }
   // }
}
</script>

<style lang="scss">
</style>


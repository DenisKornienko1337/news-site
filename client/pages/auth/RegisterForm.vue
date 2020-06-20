<template lang="pug">
    div.login-form
        h2 Register Form
        form.register( @submit.prevent="register" )
            div.input-container
                | Login:
                input(type="text" name="name" v-model="name" )
                //- div(class="validation-error text-center") {{ errors.first('name') }}
            div.input-container
                | Password:
                input(type="password" name="password" v-model="password" )
                //- div(class="validation-error text-center") {{ errors.first('password') }}
            div.input-container
                button( class="waves-effect waves-light btn")
                    | Register
</template>

<script>
import User from '~/middleware/actions/user.js'

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
            console.log('dasdasdad');
            
            // this.$validator.validateAll()        
            // .then( 
                // async () => {
                // if (!this.errors.any()) {              
                    console.log('fasfds');
                            
                    const user = {
                        name: this.name, 
                        password: this.password
                    }
                    const res = await User.addUser(user)
                    
                    if(res) this.$router.push({ name: 'Admin' })
                    // else this.$dialog
                    //     .alert('Cant find save user try other username')
                    
                // }
             //)
        }
    }
}
</script>

<style lang="scss">
</style>


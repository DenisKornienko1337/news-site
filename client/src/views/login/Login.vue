<template lang="pug">
  .container
    .row
      .col-lg-12
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
        div.input-container
            button( class="waves-effect waves-light btn" @click="logIn")
                | Login


</template>

<script>
  import { XCircleIcon, Edit2Icon } from 'vue-feather-icons'
  import PostsService from '@/services/PostsService'
  import AddButton from '@/components/AddButton'

  export default {
    name: 'Login',
    components: {
      XCircleIcon, Edit2Icon, AddButton
    },
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
        },
        async logIn() {
            await PostsService.logIn({
                name: this.name,
                password: this.password
            })
        }
    }
  }
</script>

<style lang="scss">
    form.register {
        margin-top: 70px;
    }
    .input-container {
        margin-top: 30px;
    }
</style>
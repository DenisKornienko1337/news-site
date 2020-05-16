<template lang="pug">
  .container
    .row
      .col-lg-12
      div.admin
        button(@click="logOut")
            | Logout


</template>

<script>
  import { XCircleIcon, Edit2Icon } from 'vue-feather-icons'
  import PostsService from '@/services/PostsService'
  import AddButton from '@/components/AddButton'

  export default {
    name: 'Admin',
    components: {
      XCircleIcon, Edit2Icon, AddButton
    },
    data () {
      return {
      }
    },
    methods: {
        async logOut() { 
            await PostsService.logOut()
            this.$router.push({ name: 'Posts' })
        }
    },
    async mounted () {
      const response = await PostsService.isAuth()
      if(!response.data.isLoggedIn) {
        console.log(response.data.isLoggedIn)
        this.$router.push({ name: 'Login' })
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
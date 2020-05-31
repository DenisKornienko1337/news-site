<template lang="pug">
  .container
    .row
      .col-lg-12
        div.tab
          div.tab__button.blue(@click="switchView('Profile')")
                | Profile
          div.tab__button.blue(@click="switchView('Card')")
                | News list
        component( :is="currentView" )

        div.admin
          button(@click="logOut")
              | Logout


</template>

<script>
  import { XCircleIcon, Edit2Icon } from 'vue-feather-icons'
  import PostsService from '@/services/PostsService'
  import AddButton from '@/components/AddButton'
  import Card from './Card'
  import Profile from './Profile'

  export default {
    name: 'Admin',
    components: {
      Card, Profile, XCircleIcon, Edit2Icon, AddButton
    },
    data () {
      return {
        currentView: Card
      }
    },
    methods: {
        async logOut() { 
            await PostsService.logOut()
            this.$router.push({ name: 'Posts' })
        },
        switchView(view) {
            this.currentView = view
        }
    },
    async mounted () {
      const response = await PostsService.isAuth()
      if(!response.data.isLoggedIn) {
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
<template lang="pug">
  .container
    .row
      .col-lg-12
        div.tab
            div.tab__button.blue(@click="switchView('LoginForm')")
                | Login
            div.tab__button.blue(@click="switchView('RegisterForm')")
                | Register
        component( :is="currentView" )

</template>

<script>
  import LoginForm from './LoginForm'
  import RegisterForm from './RegisterForm'

  export default {
    name: 'Login',
    data () {
        return {
            currentView: LoginForm
        }
    },
    components: {
      LoginForm, RegisterForm
    },
    methods: {
        switchView(view) {
            this.currentView = view
        }
    }
  }
</script>

<style lang="scss">
.tab {
    margin-top: 40px;
    max-width: 80%;
    margin-left: auto;
    margin-right: auto;
}
    .tab__button {
        &:hover {
            background: darken(blue, 10) !important;
        }
        display: inline-block;
        width: 50%;
        color: #fff;
        border: 2px solid #fff;
        cursor: pointer;
    }
    form.register {
        margin-top: 70px;
    }
    .input-container {
        margin-top: 30px;
    }
</style>
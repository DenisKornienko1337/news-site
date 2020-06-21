<template lang="pug">
  div
		.nav-wrapper.sidebar
			ul
				li
          nuxt-link(:to="{path: '/admin/profile'}")
						| Profile
				li
					nuxt-link(:to="{path: '/admin/news'}")
						| News list
					li
						router-link(:to="{path: '/admin/categories'}")
							| Categories
					li
						router-link(:to="{path: '/chat'}")
							| Chat
					li
						span( class="link" @click.prevent="logOut")
							| Log out
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    hasToken() {
      return this.$store.getters.hasToken
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  }
}
</script>


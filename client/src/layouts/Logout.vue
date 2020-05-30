<template lang="pug">
    .layout-logout
        logout-header
        router-view
</template>

<script>
import LogoutHeader  from '@/components/LogoutHeader'

export default {
    name: 'LayoutLogout',
    components: {
        LogoutHeader
    }
}
</script>

<style>

</style>
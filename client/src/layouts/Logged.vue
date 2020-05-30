<template lang="pug">
    div
        logged-header
            router-view
</template>

<script>
import LoggedHeader  from '@/components/LoggedHeader'

export default {
    name: 'LayoutLogged',
    components: {
        LoggedHeader
    }
}
</script>

<style>

</style>
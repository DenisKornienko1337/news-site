<template lang="pug">
    div
        router-link( :to="{ name: path }" tag="a" class="waves-effect waves-light btn")
            | {{text}}
</template>

<script>
export default {
    props: ['text', 'path']
}
</script>

<style lang="scss">
</style>


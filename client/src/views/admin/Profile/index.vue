<template lang="pug">
    div.col.s12
        h1 Profile
</template>
<script>
import Services from '@/services/PostsService'
export default {
    name: "Profile",
    async mounted(){
        const res = await Services.getUsers()
        console.log(res.data.users)       
    }
}
</script>
<template lang="pug">
          table.table.table-striped
            tr
              th Index
              th Title
              th Content
              th Buttons
              th Update
              th Categories
            tr(v-for="(post, index) in posts", :key="post.title" v-show="!post.catHide && !post.queryHide")
              td {{ index }}
              td
                router-link(:to="{name: 'SinglePost', params:{id: post._id }}")
                  | {{ post.title }}                 
              td {{ post.description }}
              td 
                button(class="btn pt-0" @click="deletePosts(index)") 
                  <x-circle-icon size="2x" class="circle-icon"></x-circle-icon> 
              td
                router-link(class="btn" :to="{name: 'UpdatePost', params:{id: post._id }}")
                  | <edit-2-icon size="1.5x" class="edit-icon pt-0"></edit-2-icon>
              td
                div(v-for="(category, index) in post.categories.items", :key="category.categoryId.title")
                  span {{category.categoryId.title}}
</template>

<script>
export default {

}
</script>

<style>

</style>
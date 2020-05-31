<template lang="pug">
    div.col.s12.m6.l4
        div.card.white-grey.darken-1000
            div.card-content
                div(class="post-image" v-if="post.imageId")
                  img(:src="server_url+post.imageId")
                span.card-title
                | {{post.title}}
                div.post-categories Categories: 
                    span(v-for="(category, index) in post.categoriesTitles", :key="index") {{category}}
                        span(v-if="index!==post.categoriesTitles.length-1") , 
                div.post-content {{post.description}}
            div.card-action
                button(class="btn pt-0" @click="deleteOnConfirm()") 
                    <x-circle-icon size="2x" class="circle-icon"></x-circle-icon>
                router-link(class="btn" :to="{name: 'UpdatePost', params:{id: post._id }}")
                    <edit-2-icon size="1.5x" class="edit-icon pt-0"></edit-2-icon>
</template>

<script>
import { XCircleIcon, Edit2Icon } from 'vue-feather-icons'
import {mapActions, mapGetters} from 'vuex'
import config from '@/config/config'

export default {
    name: "CardItem",
    props:['postItem', 'index'],
    components: {
      XCircleIcon, Edit2Icon
    },
    data(){
        return {
            server_url: config.server_url,
            post: this.$props.postItem,
            indexItem: this.$props.index
        }
    },
    methods: {
      ...mapActions(['userRemovePost']),
      deletePostItem() {        
        const post = {
          _id: this.post._id,
          index: this.indexItem
        }
        this.userRemovePost(post)
        this.$forceUpdate()  
      },
      deleteOnConfirm() {
        let self = this
        this.$dialog
          .confirm('Do you want delete this post?')
          .then(function() {
            self.deletePostItem()
            self.$helper.notify('Notification', 'Post have been deleted!', 'error')
          })
      }
    },
    watch: {
      postItem: function() {
        this.post = this.$props.postItem
      }
    },
    computed: mapGetters(['allUserPosts'])
}
</script>

<style lang="scss">
.post-image {
  margin-top: .5rem;
  width: 100%;
  text-align: left;
  img {
    max-width: 100%;
    max-height: 300px;
  }
}
blockquote.remove-color {
  border-left-color: transparent !important;
}
.blockquote-footer {
  &:before{
    display: none;
  }
}
.post-categories, .post-content {
  text-align: left;
}
.post-categories {
  font-size: 15px;
  color: gray;
  margin-bottom: 20px;
}
.card-action {
  text-align: left;
  a, button {
    background-color: transparent;
    margin-left: 15px;
    box-shadow: none !important;
  }
  .btn {
      &:hover {
          background-color: transparent;
      }
  }
}
.col {
  margin-left: 0 !important;
  margin-right: auto !important;
  flex-basis: unset !important;
  flex-grow: unset !important;
}
  .delete {
    background: red;
  }
  select {
    max-width: 300px;
    margin: 0 auto;
    margin-top: 30px;
  }
  .circle-icon {
    &:hover {
      circle {
        fill: #c82333;
      }
    }
    color: white;
    circle {
      fill: #dc3545;
    }
    line {
      color: white;
    }
  }
  .edit-icon {
    color: #007bff;
  }
</style>
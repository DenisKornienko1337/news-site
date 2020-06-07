<template lang="pug">
    div
        #chat
            p.text-left( v-model="messages" v-for="msg in messages")
                span(v-bind:style="{ color: msg.color }")
                    | {{msg.user}}
                |  at {{msg.time}} : {{msg.message}}
        form(@submit.prevent="sendMessage")
            input(type="text" name="msg")
            input.btn(type="submit" value="Send")
</template>

<script>
  import PostsService from '@/services/PostsService'
  import config from '@/config/config'
  export default {
    name: 'Chat',
    data () {
      return {
          connection: '',
          messages: [],
      }
    },
    methods: {
        async sendMessage(e){
            let msg = e.target.elements.msg.value
            e.target.elements.msg.value = ''
            if(msg){
                this.connection.send(msg)
            }
        },
    },
    async mounted() {
        let res = await PostsService.getChatIndex();
        this.messages = res.data.chat
        let websocketUrl = ('ws://'+config.server_url+'/chat/send-message')
        this.connection = new WebSocket(websocketUrl.replace('http://', ''));
        this.connection.onopen = () => {
            console.log('Connected!')
        }
        this.connection.onerror = err => {
            console.log(err)
        }
        const self = this
        this.connection.onmessage = (msg) => {
            if(msg.data) {
                console.log(JSON.parse(msg.data))
                self.messages.push(JSON.parse(msg.data))
            }
        }
}
  }
</script>

<style lang="scss" scoped>
    p { line-height:18px; }
    div { width:70vw; margin-left:auto; margin-right:auto;}
    #chat { padding:5px; background:#ddd; border-radius:5px;
        overflow-y: scroll; border:1px solid #CCC;
        margin-top:10px; height: 60vh; }
    #input { border-radius:2px; border:1px solid #ccc;
        margin-top:10px; padding:5px; width:400px;
    }
    #status { width:88px;display:block;float:left;margin-top:15px; }
</style>
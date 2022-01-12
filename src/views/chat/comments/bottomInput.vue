<!-- 聊天室底部输入 -->
<template>
  <div>
    <div class="chat-bottom-input">
      <input
        class="chat-bottom-input-input"
        value=""
        placeholder="输入聊天内容"
        v-model="message"
      />
      <input
        type="button"
        name=""
        class="send-button"
        @click="sendMessages"
        value="发送"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { bottonType: 'success', message: '' }
  },
  props: { send: Function },
  components: {},

  computed: {},

  methods: {
    sendMessages() {
      console.log('点击了')
      this.$parent.websocketsend(this.message)
      // this.send()
      this.message = ' '
    }
  }
}
</script>
<style scope="this api replaced by slot-scope in 2.5.0+">
@import '../css/bottomInput.css';
</style>

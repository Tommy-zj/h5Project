<!-- 聊天主体内容 -->
<template>
  <div class="message-body-main" id="message-body" ref="messageContent">
    <div v-for="(item, index) in messages" :key="index">
      <div
        class="chat-body-time"
        v-if="item.timeShow"
        v-text="item.ctime"
      ></div>
      <!--对方-->
      <div
        class="chat-left"
        v-if="
          item.other_id == other_id ||
            item.buyer_id == person_id ||
            item.create_id == 0
        "
      >
        <div class="chat-left-content">
          <img :src="other_avatar" alt="" />
          <div class="chat-left-message" v-text="item.msg"></div>
          <div style="clear:both"></div>
        </div>
      </div>
      <!--本人-->
      <div class="chat-right" v-if="item.create_id == person_id">
        <div class="chat-right-content">
          <img :src="person_avatar" alt="头像" />
          <div class="chat-right-message" v-text="item.msg"></div>
          <div style="clear:both"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      other_id: this.$route.query.otherId,
      person_id: JSON.parse(this.$store.getters.getUser).id,
      other_avatar: this.$route.query.other_avatar,
      person_avatar: JSON.parse(this.$store.getters.getUser).avatar
    }
  },
  props: { messages: Array },

  components: {},
  computed: {},
  mounted() {
    this.scrollToBottom()
  },
  // 每次页面渲染完之后滚动条在最底部
  updated: function() {
    this.scrollToBottom()
  },
  methods: {
    scrollToBottom: function() {
      this.$nextTick(() => {
        // this.$refs.messageContent.scrollTop = this.$refs.messageContent.scrollHeight
        // console.log('nextTick', this.$refs.messageContent.scrollHeight)
        document.getElementById('null').scrollIntoView()
      })
    },
    test() {
      console.log('点击了')
    }
  }
}
</script>
<style scope="this api replaced by slot-scope in 2.5.0+">
@import '../css/chatRoom.css';
</style>

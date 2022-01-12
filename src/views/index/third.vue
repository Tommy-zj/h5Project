<template>
  <div>
    <div class="third-top">
      <div class="top-contents">
        消息
        <el-input
          v-model="input"
          class="top-contents-search"
          placeholder="请输入内容"
        ></el-input>
      </div>
    </div>
    <MyLoad :show="loading" text="消息加载中"></MyLoad>
    <div class="third-body">
      <div
        class="third-item"
        @click="toChat(item.other_id, item.image_url, item.info_num)"
        v-for="(item, index) in chatArr"
        :key="index"
      >
        <el-badge v-if="item.info_num > 0" :value="item.info_num">
          <img v-if="item.info_num == 0" :src="item.image_url" alt="头像" />
        </el-badge>
        <img :src="item.image_url" />
        <div classs="third-item-right">
          <div v-text="item.name"></div>
          <div class="third-item-right-message">
            {{ item.chat_record }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { chatList } from '@/api/chat'
import { mapGetters } from 'vuex'
import MyLoad from '@/views/components/MyLoad'
export default {
  data() {
    return {
      input: '',
      choose: 1,
      person_id: JSON.parse(this.$store.getters.getUser).id,
      loading: false,
      chatArr: []
    }
  },
  mounted() {
    this.$store.commit('user/SET_TITLE', '消息')
    this.getChatList()
  },
  components: { MyLoad },
  computed: {
    ...mapGetters(['getTipNum'])
  },
  watch: {
    getTipNum(val) {
      this.getChatList()
    }
  },
  methods: {
    clickIndex() {
      this.choose = 1
    },
    toChat(id, img, tipNum) {
      this.$router.push({
        path: 'noBottom/chatRoom',
        query: { otherId: id, other_avatar: img, tipNum: tipNum }
      })
    },
    getChatList() {
      this.loading = true
      chatList({ person_id: this.person_id, pageNo: 1 })
        .then(res => {
          setTimeout(() => {
            this.loading = false
            this.chatArr = res.data
            const msg = res.data
            let num = 0
            for (const i in msg) {
              if (msg[i].info_num > 0) {
                num += msg[i].info_num
              }
            }
            // console.log('新消息个数', num)
            this.$store.commit('user/SET_TIPNUM', num)
          }, 1000)
        })
        .catch(error => {
          console.log('获取聊天列表异常', error)
          this.loading = false
        })
    }
  }
}
</script>
<style src="./css/third.css" scoped></style>

<!-- 查看他人信息 -->
<template>
  <div>
    <myPage other="yes" :data="merchanicData"></myPage>
    <div class="merchanic-bottom-button">
      <div class="merchanic-bottom-button-chat">
        聊天
      </div>
      <div class="merchanic-bottom-button-phone">
        电话
      </div>
    </div>
  </div>
</template>

<script>
import myPage from '../my/myPage'
export default {
  data() {
    return {
      merchanicData: {}
    }
  },

  components: { myPage },

  computed: {},

  mounted() {
    this.$store.commit('user/SET_TITLE', '技工详情')
    console.log('merchanicData', this.$route.query.merchanicData)
    this.merchanicData = this.$route.query.merchanicData
  },

  methods: {}
}
</script>
<style src="./components/css/merchanicDetails.css"></style>

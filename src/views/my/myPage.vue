<!-- 我的首页 -->
<template>
  <div>
    <div class="my-page-top">
      <img class="my-page-top-avatar" :src="info.avatar" alt="头像" />
      <div class="my-page-top-info">
        <div style="display:flex">
          <p>{{ info.name }}</p>
          <img
            v-if="other != 'yes'"
            @click="edit()"
            class="eidt-icon"
            src="../../images/icon/edit.png"
            alt=""
          />
          <div></div>
        </div>
        <div>电话: {{ info.phone }}</div>
        <div>电子邮箱: {{ info.mail }}</div>
      </div>
    </div>
    <div class="my-page-introduce">
      个人介绍
      <div class="my-page-introduce-content">
        {{ info.introduce }}
      </div>
    </div>

    <div class="my-page-introduce">
      个人技能标签
      <div class="my-page-introduce-content">
        {{ info.tag }}
      </div>
    </div>

    <div class="my-page-certificate">
      个人证书
      <div
        class="my-page-certificate-content"
        v-for="(item, index) in info.certificates"
        :key="index"
      >
        <div class="my-page-certificate-content-name">
          证书名称： {{ item.name }}
        </div>
        <img
          class="my-page-certificate-content-img"
          :src="item.image_url"
          alt=""
        />
      </div>
    </div>
    <div class="my-page-bottom-null"></div>
    <bottomButton
      v-if="other != 'yes'"
      :describe="info.tag ? '修改个人技能标签' : '成为技工'"
    ></bottomButton>
  </div>
</template>

<script>
import bottomButton from '../components/bottomButton'
export default {
  data() {
    return { info: {}, test: '' }
  },
  props: { other: String },
  components: { bottomButton },
  mounted() {
    this.$store.commit('user/SET_TITLE', '我的信息')
    if (this.other === 'yes') {
      this.info = this.$route.query.user
    } else {
      this.info = JSON.parse(this.$store.getters.getUser)
    }
  },

  computed: {},

  methods: {
    bottomButtonMethod() {
      this.$router.push({ path: '/noBottom/becomeMechanic' })
    },
    edit() {
      this.$router.push({ path: '/noBottom/modifyInfo' })
    }
  }
}
</script>
<style src="./css/myPage.css"></style>

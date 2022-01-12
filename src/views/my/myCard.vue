<!-- 个人卡片简介 -->
<template>
  <div>
    <div class="my-boy-top-null"></div>
    <div class="my-body" @click="toMyPage()">
      <img :src="user.avatar" alt="个人头像" class="my-body-avatar" />
      <div class="my-body-right">
        <div>{{ user.name }}</div>
        <div>
          {{
            user.province_name + ' ' + user.city_name + ' ' + user.county_name
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {}
    }
  },

  components: {},

  computed: {},
  mounted() {
    const user = this.$store.getters.getUser
    this.user = JSON.parse(user)
  },
  methods: {
    toMyPage() {
      this.$router.push({
        path: 'noBottom/myPage',
        query: { user: this.user, id: 1 }
      })
    }
  }
}
</script>
<style src="./css/myCard.css"></style>

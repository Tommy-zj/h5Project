<template>
  <div>
    <div class="home-bottom-bar" style="background-color: white">
      <div class="bar-item" @click="clickIndex()">
        <div class="icon-body">
          <img
            v-if="choose !== 1"
            src="../../../images/icon/index.png"
            class="icon"
          />
          <img
            v-if="choose === 1"
            src="../../../images/icon/index-click.png"
            class="icon"
          />
        </div>
        <p :class="'title' + [choose === 1 ? '-choose' : '']">首页</p>
      </div>
      <div class="bar-item" @click="clickSecond()">
        <div class="icon-body">
          <img
            src="../../../images/icon/mark.png"
            class="icon"
            v-if="choose !== 2"
            alt="首页2"
          />
          <img
            src="../../../images/icon/mark-click.png"
            v-if="choose === 2"
            class="icon"
            alt="首页2"
          />
        </div>
        <p :class="'title' + [choose === 2 ? '-choose' : '']">市场</p>
      </div>
      <div class="bar-item" @click="clickThird()">
        <div class="icon-body">
          <span v-if="newMessage == 0">
            <img
              src="../../../images/icon/message.png"
              v-if="choose !== 3"
              class="icon"
              alt="首页3"
            />
            <img
              src="../../../images/icon/message-click.png"
              v-if="choose === 3"
              class="icon"
              alt="首页3"
            />
          </span>
          <el-badge v-if="newMessage > 0" :value="newMessage" class="item">
            <img
              src="../../../images/icon/message.png"
              v-if="choose !== 3"
              class="icon"
              alt="首页3"
            />
            <img
              src="../../../images/icon/message-click.png"
              v-if="choose === 3"
              class="icon"
              alt="首页3"
            />
          </el-badge>
        </div>
        <p :class="'title' + [choose === 3 ? '-choose' : '']">消息</p>
      </div>
      <div class="bar-item" @click="clickFourth()">
        <div class="icon-body">
          <img
            src="../../../images/icon/my.png"
            v-if="choose !== 4"
            class="icon"
            alt="首页4"
          />
          <img
            src="../../../images/icon/my-click.png"
            v-if="choose === 4"
            class="icon"
            alt="首页4"
          />
        </div>
        <p :class="'title' + [choose === 4 ? '-choose' : '']">我的</p>
      </div>
    </div>
    <div class="bottom-null"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getChoose } from '../../../utils/auth'
export default {
  name: 'BottomBar',
  data() {
    return {
      choose: 1,
      newMessage: this.$store.getters.getTipNum
    }
  },
  computed: {
    ...mapGetters(['showChoose', 'getTipNum'])
  },
  watch: {
    showChoose(val) {
      // console.log('监听变化', val)
      this.choose = val
    },
    getTipNum(val) {
      console.warn('新消息变化的值')
      this.newMessage = val
    }
  },
  mounted() {
    console.log('choose', getChoose())
    console.log('store', this.$store.getters)
    const choose = parseInt(getChoose())
    if (choose) {
      this.choose = choose
      if (choose === 1) {
        this.$router.push({ path: '/' })
      }
      if (choose === 2) {
        this.$router.push({ path: '/second' })
      }
      if (choose === 3) {
        this.$router.push({ path: '/third' })
      }
      if (choose === 4) {
        this.$router.push({ path: '/fourth' })
      }
    }
  },
  methods: {
    clickIndex() {
      this.choose = 1
      this.$store.commit('user/SET_CHOOSE', 1)
      this.$router.push({ path: '/' })
    },
    clickSecond() {
      this.choose = 2
      this.$store.commit('user/SET_CHOOSE', 2)
      this.$router.push({ path: '/second' })
    },
    clickThird() {
      this.choose = 3
      this.$store.commit('user/SET_CHOOSE', 3)
      this.$router.push({ path: '/third' })
    },
    clickFourth() {
      this.choose = 4
      this.$store.commit('user/SET_CHOOSE', 4)
      this.$router.push({ path: '/fourth' })
    }
  }
}
</script>

<style src="../css/home.css"></style>

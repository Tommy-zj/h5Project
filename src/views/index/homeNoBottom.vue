<template>
  <body>
    <div class="page">
      <v-top :showBack="'yes'"></v-top>
      <MyLoad :show="show" :text="text"></MyLoad>
      <router-view />
    </div>
  </body>
</template>
<script>
import top from './coments/top'
import MyLoad from '@/views/components/MyLoad'
export default {
  name: 'HomeNoBottom',
  data() {
    return {
      show: false,
      text: ''
    }
  },
  computed: {
    showBottom() {
      return this.$store.getters.showBottom
    }
  },
  watch: {
    '$store.state.base.show'(newval, oldval) {
      // alert(newval)
      this.show = newval
    },
    '$store.state.base.text'(newval, oldval) {
      this.text = newval
    }
  },
  components: { 'v-top': top, MyLoad },
  mounted() {
    document.querySelector('body').setAttribute('style', 'background:#f2f2f2')
    const body = document.querySelector('.page')
    const docHeight = document.body.clientHeight
    // const docWidth = document.body.clientWidth
    // console.log('fsf', docHeight, 'and', docWidth, 'showBottom: ', this.$store)
    body && body.style.setProperty('--docHeight', docHeight + 'px')
  },
  beforeCreate() {
    document.querySelector('body').setAttribute('style', 'background:#f2f2f2')
  },
  beforeDestroy() {
    // document.querySelector('body').removeAttribute('style')
  },
  methods: {}
}
</script>
<style src="./css/home.css"></style>

<!-- 编辑配送方式 -->
<template>
  <div class="send-method-body">
    <div>
      配送方式
    </div>
    <div class="send-method-row">
      <el-row class="block-col-2" style="width:75px">
        <el-col :span="24">
          <el-dropdown trigger="click" @command="choose">
            <span class="el-dropdown-link">
              {{ sendMethod ? sendMethod : '下拉菜单'
              }}<i class="el-icon-arrow-right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <div v-for="(item, index) in sendData" :key="index">
                <el-dropdown-item
                  :command="item.text"
                  v-text="item.text"
                ></el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sendMethod: this.$store.state.order.sendMethod,
      sendData: [
        {
          text: '快递到付'
        },
        {
          text: '到店自取'
        }
      ]
    }
  },
  watch: {
    '$store.state.order.sendMethod'(newval, oldval) {
      // console.log('val', newval, oldval)
      this.sendMethod = newval
    }
  },
  components: {},

  computed: {},

  mounted() {
    console.log('$store', this.$store.state.order.num)
  },

  methods: {
    choose(e) {
      // console.log('dropdown events', e)
      this.$store.commit('order/SET_SEND_METHOD', e)
    }
  }
}
</script>
<style src="../css/shopOrder.css" scoped></style>

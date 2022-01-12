<!-- 发布需求 -->
<template>
  <div>
    <div style="height:1px"></div>
    <MyLoad :show="loading"></MyLoad>
    <!-- 输入框 -->
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">标题</label></div>
        <div class="weui-cell__bd">
          <input
            class="weui-input"
            v-model="demand.description"
            type="text"
            placeholder="标题"
          />
        </div>
      </div>
    </div>

    <div
      style="width:90%;height:100%;background-color:white;margin-top:10px;padding:5%"
    >
      <textarea
        v-model="demand.content"
        class="weui-textarea"
        placeholder="请详细描述你的问题(选填)"
        rows="5"
      ></textarea>
      <div
        :style="
          'width:100%;text-align:right;color:gray;' +
            [getremarkLength() > 200 ? 'color:red' : '']
        "
      >
        {{ getremarkLength() }}/200
      </div>
    </div>
    <el-alert
      v-show="getremarkLength() > 200 ? true : false"
      title="描述超过了最大字数限制！"
      type="error"
    >
    </el-alert>

    <!-- 图片上传 -->
    <div
      style="width:90%;height:100%;background-color:white;margin-top:10px;padding:10px 5%"
    >
      <el-upload
        list-type="picture-card"
        action="fuck"
        :http-request="upload"
        :before-upload="beforeAvatarUpload"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
    </div>

    <!-- 输入框 -->
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">产品型号</label>
        </div>
        <div class="weui-cell__bd">
          <input
            v-model="demand.shop_type"
            class="weui-input"
            type="text"
            placeholder="产品型号，分类信息"
          />
        </div>
      </div>
    </div>
    <!-- 输入框 -->
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">联系号码</label>
        </div>
        <div class="weui-cell__bd">
          <input
            class="weui-input"
            v-model="demand.phone"
            type="text"
            placeholder="联系号码"
          />
        </div>
      </div>
    </div>
    <!-- 输入框 -->
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">悬赏金额</label>
        </div>
        <div class="weui-cell__bd">
          <input
            class="weui-input"
            v-model="demand.bounty"
            type="text"
            placeholder="悬赏金额"
          />
        </div>
      </div>
    </div>
    <!--<getCurrentLocal ref="getAddress"></getCurrentLocal>-->
    <!-- 输入框 -->
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">所在地区</label>
        </div>
        <div class="weui-cell__bd">
          <input
            :readonly="true"
            @click="chooseAddress"
            class="weui-input"
            type="text"
            v-if="demand.province_name == ''"
            placeholder="所在地区"
          />
          <span @click="chooseAddress">
            {{
              demand.province_name +
                ' ' +
                demand.city_name +
                ' ' +
                demand.county_name
            }}</span
          >
        </div>
      </div>
    </div>
    <v-distpicker
      v-if="isShow"
      type="mobile"
      :province="demand.province_name"
      :city="demand.city_name"
      :area="demand.county_name"
      @selected="clicked"
    ></v-distpicker>
    <!-- 输入框 -->
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">详细地址</label>
        </div>
        <div class="weui-cell__bd">
          <input
            class="weui-input"
            v-model="demand.address"
            type="text"
            placeholder="详细地址"
          />
        </div>
      </div>
    </div>
    <div style="height:9px"></div>
    <become-mechanic ref="chooseTags" call="yes"></become-mechanic>
    <div style="height:80px"></div>
    <bottomButton describe="确认提交"></bottomButton>
  </div>
</template>

<script>
import bottomButton from '../../components/bottomButton'
import getCurrentLocal from './components/getCurrentLocal'
import becomeMechanic from '../becomeMechanic'
import VDistpicker from 'v-distpicker'
import MyLoad from '@/views/components/MyLoad'
import { imgUpload } from '@/api/baseApi'
import { addDemand } from '@/api/demand'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      city: '',
      orgLocation: '',
      local: '',
      center: { lat: 39.915, lng: 116.404 },
      loading: false,
      imgs: [],
      img: {
        id: 0,
        image_url: '',
        image_name: '',
        image_size: '',
        demand_id: 0
      },
      demand: {
        name: JSON.parse(this.$store.getters.getUser).name,
        person_id: JSON.parse(this.$store.getters.getUser).id,
        phone: '',
        content: '',
        shop_type: '',
        province_name: '',
        city_name: '',
        county_name: '',
        remark: '',
        description: '',
        bounty: '',
        address: '',
        tag: ''
      },
      isShow: false
    }
  },
  computed: {
    ...mapGetters(['getLocal'])
  },
  watch: {
    getLocal(val) {
      console.log('监听local变化', val)
      this.loading = false
      this.local = val
    },
    'demand.content'(newval, oldval) {
      if (this.demand.content.length > 200) {
        this.demand.content = String(this.demand.content).slice(0, 200)
      }
    }
  },

  components: {
    bottomButton,
    getCurrentLocal,
    becomeMechanic,
    VDistpicker,
    MyLoad
  },

  mounted() {
    this.$store.commit('user/SET_TITLE', '发布需求')
  },

  methods: {
    bottomButtonMethod() {
      this.loading = true
      this.demand.imgs = this.imgs
      // console.log('点击提交', this.$refs.chooseTags.tags)
      const tags = this.$refs.chooseTags.tags
      let tag = ''
      for (const i in tags) {
        if (i === 0 || i === '0') {
          tag = tags[i]
        } else {
          tag = tag + ',' + tags[i]
        }
      }
      this.demand.tag = tag
      // console.log('tag', tag)
      console.log('demand', this.demand)
      addDemand(this.demand)
        .then(res => {
          setTimeout(() => {
            this.loading = false
            this.$router.go(-1)
          }, 1000)
        })
        .catch(error => {
          console.log('发布需求异常', error)
        })
    },
    beforeAvatarUpload() {},
    upload(params) {
      const file = params.file
      const fileType = file.type
      const isImage = fileType.indexOf('image') !== -1
      const isLt2M = file.size / 1024 / 1024 < 2
      console.log(isImage, isLt2M, file)
      // 根据后台需求数据格式
      const form = new FormData()
      // 文件对象
      form.append('file', file)
      // 本例子主要要在请求时添加特定属性，所以要用自己方法覆盖默认的action
      form.append('clientType', 'xxx')
      // 项目封装的请求方法
      console.log('append', form.get('file'))
      imgUpload(form)
        .then(res => {
          this.img.image_name = res.fileRealName
          this.img.image_size = res.image_size
          this.img.image_url = res.imgUrl
          this.imgs.push(this.img)
          console.log('需求描述图片上传结果', this.imgs)
        })
        .catch(error => {
          console.log('需求描述图片上传异常', error)
        })
    },
    chooseAddress() {
      this.isShow = true
    },
    clicked(e) {
      // console.log('clicked', e)
      this.demand.province_name = e.province.value
      this.demand.city_name = e.city.value
      this.demand.county_name = e.area.value
      this.isShow = false
    },
    getremarkLength() {
      return this.demand.content.length
    }
  }
}
</script>
<style scoped></style>

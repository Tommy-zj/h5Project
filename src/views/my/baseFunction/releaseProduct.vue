<!-- 发布个人的商品 -->
<template>
  <div>
    <div style="height:1px"></div>
    <MyLoad :show="loading" :text="text"></MyLoad>
    <productCatalog ref="catalog"></productCatalog>
    <!-- 输入框 -->
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">商品名字</label>
        </div>
        <div class="weui-cell__bd">
          <input
            class="weui-input"
            v-model="product.name"
            type="text"
            placeholder="商品名字"
          />
        </div>
      </div>
    </div>

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

    <!--商品描述-->
    <div
      style="width:90%;height:100%;background-color:white;margin-top:10px;padding:5%"
    >
      <textarea
        v-model="product.detail"
        class="weui-textarea"
        placeholder="请详细描述你的产品(选填)"
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

    <!-- 输入框 -->
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">产品型号</label>
        </div>
        <div class="weui-cell__bd">
          <input
            v-model="product.numbering"
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
            v-model="product.phone"
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
          <label class="weui-label">售卖价格</label>
        </div>
        <div class="weui-cell__bd">
          <input
            class="weui-input"
            v-model="product.price"
            type="text"
            placeholder="售卖价格"
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
            v-if="product.province_name == ''"
            placeholder="所在地区"
          />
          <span @click="chooseAddress">
            {{
              product.province_name +
                ' ' +
                product.city_name +
                ' ' +
                product.county_name
            }}</span
          >
        </div>
      </div>
    </div>
    <v-distpicker
      v-if="isShow"
      type="mobile"
      :province="product.province_name"
      :city="product.city_name"
      :area="product.county_name"
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
            v-model="product.detail_address"
            type="text"
            placeholder="详细地址"
          />
        </div>
      </div>
    </div>
    <div style="height:9px"></div>
    <div style="height:80px"></div>
    <bottomButton describe="确认提交"></bottomButton>
  </div>
</template>

<script>
import bottomButton from '../../components/bottomButton'
import getCurrentLocal from './components/getCurrentLocal'
import VDistpicker from 'v-distpicker'
import MyLoad from '@/views/components/MyLoad'
import productCatalog from './components/productCatalog'
import { imgUpload } from '@/api/baseApi'
import { mapGetters } from 'vuex'
import { addProduct } from '@/api/addProduct'
export default {
  data() {
    return {
      city: '',
      orgLocation: '',
      local: '',
      center: { lat: 39.915, lng: 116.404 },
      loading: false,
      shopImgs: [],
      text: '',
      // 图片对象
      img: {
        id: 0,
        image_url: '',
        image_name: '',
        image_size: '',
        demand_id: 0
      },
      // 商品对象
      product: {
        person_id: JSON.parse(this.$store.getters.getUser).id,
        name: '',
        detail: '',
        numbering: '',
        phone: '',
        price: '',
        province_name: '',
        city_name: '',
        county_name: '',
        detail_address: '',
        second_catalog_id: '',
        first_catalog_id: '',
        shopImgs: []
      },
      // 是否展示地区选择器
      isShow: false
    }
  },
  computed: {
    ...mapGetters(['getLocal'])
  },
  watch: {
    /*
    监听vuex中local的变化
    */
    getLocal(val) {
      // console.log('监听local变化', val)
      this.loading = false
      this.local = val
    },
    /*
  通过watch限制商品详情的最大长度为200
    */
    'product.detail'(newval, oldval) {
      if (this.product.detail.length > 200) {
        this.product.detail = String(this.product.detail).slice(0, 200)
      }
    }
  },

  components: {
    bottomButton,
    getCurrentLocal,
    VDistpicker,
    MyLoad,
    productCatalog
  },

  mounted() {
    // 设置页面的顶部标题
    this.$store.commit('user/SET_TITLE', '发布商品')
  },

  methods: {
    /*
    点击底部提交栏，提交新增商品
    */
    bottomButtonMethod() {
      this.loading = true
      var product = this.product
      product.shopImgs = this.shopImgs
      product.first_catalog_id = this.$refs.catalog.first_catalog_id
      product.second_catalog_id = this.$refs.catalog.second_catalog_id
      console.log('点击提交', product)
      addProduct(product)
        .then(res => {
          this.text = '操作成功，可到我的商品查看详情!'
          setTimeout(() => {
            this.loading = false
            this.$router.go(-1)
          }, 2000)
        })
        .catch(error => {
          console.log('发布需求异常', error)
          this.text = '数据异常'
          setTimeout(() => {
            this.loading = false
            this.$router.go(-1)
          }, 2000)
        })
    },
    /*
    头像上传前的钩子，可判断图片的大小类型等
    */
    beforeAvatarUpload() {},
    /**
    上传图片api
    */
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
          // this.img.image_name = res.fileRealName
          // this.img.image_size = res.image_size
          this.img.image_url = res.imgUrl
          this.shopImgs.push(this.img)
          console.log('需求描述图片上传结果', this.shopImgs)
        })
        .catch(error => {
          console.log('需求描述图片上传异常', error)
        })
    },
    /**
    是否弹出地区
    */
    chooseAddress() {
      this.isShow = true
    },
    /*
    点击选择地区后触发的方法
    */
    clicked(e) {
      // console.log('clicked', e)
      this.product.province_name = e.province.value
      this.product.city_name = e.city.value
      this.product.county_name = e.area.value
      this.isShow = false
    },
    /**
    获取商品详情的长度
    */
    getremarkLength() {
      return this.product.detail.length
    }
  }
}
</script>
<style src="../css/product.css"></style>

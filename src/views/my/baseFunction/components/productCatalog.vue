<!-- 添加商品分类 -->
<template>
  <div style="width:100%">
    <MyLoad :show="show" :text="text"></MyLoad>
    <!--一级分类-->
    <div class="product-catalog">
      <div>
        一级分类
      </div>
      <div class="product-select-body">
        <el-select
          v-model="first_catalog_id"
          style="width:120px;height:15px;border:none"
          placeholder="请选择"
        >
          <el-option
            v-for="item in firstCatalogs"
            :key="item.id"
            :label="item.catalog_name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <!--二级分类-->
    <div class="product-catalog">
      <div>
        二级分类
      </div>
      <div class="product-select-body">
        <el-select
          v-model="second_catalog_id"
          style="width:120px;height:15px"
          placeholder="请选择"
        >
          <el-option
            v-for="item in secondCatalogs"
            :key="item.id"
            :label="item.catalog_name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>

<script>
import { getSort } from '@/api/addProduct'
import MyLoad from '@/views/components/MyLoad'
export default {
  data() {
    return {
      show: false,
      text: '',
      test: '',
      firstCatalogs: [],
      secondCatalogs: [],
      first_catalog_id: '',
      second_catalog_id: ''
    }
  },

  components: { MyLoad },

  computed: {},
  watch: {
    /**
    监听first_catalog_id的变化，让二级分类跟着联动
    **/
    first_catalog_id(newval, oldval) {
      // console.log('first_catalog_id变了: ', newval)
      const firstCatalogs = this.firstCatalogs
      for (const i in firstCatalogs) {
        if (newval === firstCatalogs[i].id) {
          this.secondCatalogs = firstCatalogs[i].catalogs
          this.second_catalog_id = firstCatalogs[i].catalogs[0].id
        }
      }
    }
  },

  mounted() {
    this.getSort()
  },

  methods: {
    getSort() {
      this.show = true
      getSort()
        .then(res => {
          console.log('sort', res.data)
          setTimeout(() => {
            this.show = false
            this.firstCatalogs = res.data
            this.first_catalog_id = res.data[0].id
            this.secondCatalogs = res.data[0].catalogs
          }, 1500)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
<style src="../../css/product.css"></style>

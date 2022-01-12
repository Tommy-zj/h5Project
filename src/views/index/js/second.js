import carousel from '../coments/carousel'
import BScroll from 'better-scroll'
import { getCategory } from '../../../api/baseApi'
import MyLoad from '@/views/components/MyLoad'
export default {
  name: 'App',
  components: { carousel, MyLoad },
  data() {
    return {
      lefts: '',
      rights: '',
      choose: 1,
      scrollY: 0,
      index: 0,
      clickIndex: 0,
      listHeight: [],
      clickItem: 0,
      clickEvent: false,
      loading: false,
      left: [],
      right: [],
      // 实时屏幕高度度
      windowHeight: document.documentElement.clientHeight - 50 - 80 - 200 + 58
    }
  },
  created() {
    this.getAllCatalog()
  },
  mounted() {
    this.loading = true
    this.$store.commit('user/SET_TITLE', '市场')
    this.windowHeight = 'height:' + this.windowHeight + 'px'
    // console.log('welcome', this.windowHeight)
    // console.log('分类长度', this.listHeight)
    // console.log('mounted')
    this.$nextTick(() => {
      this.clickIndex = this.$route.query.index
      this._initScroll()

      // console.log('全部都渲染完成了')
    })
  },
  computed: {
    currentIndex() {
      // console.log('左边的数值变化了', this.scrollY)
      // console.log(this.listHeight)
      const index = this.listHeight.findIndex((item, index) => {
        return (
          this.scrollY >= this.listHeight[index] &&
          this.scrollY < this.listHeight[index + 1]
        )
      })
      if (index === this.index) {
        // console.log('和之前一样，不需要改变')
      }
      this.index = index
      // console.log('有改变: ', index)
      return index > 0 ? index : 0
      // console.log('index: ', index)
    },
    test: {
      get: function() {
        console.log('right数据发生了变化')
      },
      set: function(value) {
        console.log('right数据发生了变化')
        this.right = value
        this.$nextTick(() => {
          setTimeout(() => {
            this.loading = false
            this._getHeight()
            this.rights.refresh()
            this.lefts.refresh()
            console.log('computed中的数据变化', this.clickIndex)
            if (this.clickIndex > 0) {
              this.selectLeft(this.clickIndex)
            }
          }, 1500)
        })
      }
    }
  },
  methods: {
    // clickIndexMethod() {
    //   this.choose = 1
    // },
    // 初始化 better-scroll
    _initScroll() {
      this.lefts = new BScroll(this.$refs.left, {
        click: true
      })

      this.rights = new BScroll(this.$refs.right, {
        probeType: 3, // 探针的效果，实时获取滚动高度
        mouseWheel: true,
        click: true
      })
      console.log('滑动组件加载完毕', this.rights)
      // console.log('left', this.lefts)
      // console.log('rights: ', this.rights)
      // rights这个对象监听事件，实时获取位置pos.y
      this.rights.on('scroll', pos => {
        // 获取实时滚动的距离，使用scrollY接收
        this.scrollY = Math.abs(Math.round(pos.y))
        // console.log('实时计算高度：', this.scrollY)
      })
    },
    getAllCatalog() {
      // 获取全部分类信息
      getCategory()
        .then(res => {
          const arr = []
          const rigthArr = []
          const data = res.data
          for (const i in data) {
            console.log(data[i])
            arr.push(data[i].catalog_name)
            rigthArr.push(data[i])
          }
          this.test = arr
          this.left = arr
          this.right = rigthArr

          // console.log(this.left)
          // console.log('right', this.right)
        })
        .catch(error => {
          console.log('error', error)
        })
    },
    _getHeight() {
      const rightItems = this.$refs.right.getElementsByClassName('right-item')
      // console.log('每个子分类的高度', rightItems)
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < rightItems.length; i++) {
        const item = rightItems[i]
        height += item.clientHeight
        this.listHeight.push(height - 10)
      }
      // console.log('右边高度列表: ', this.listHeight)
    },
    selectLeft(index) {
      const rItem = this.$refs.rItem
      const el = rItem[index]
      console.log('el: ', this.rights)
      this.index = index
      this.rights.scrollToElement(el, 1000)
    },
    toShops(name, id) {
      console.log('点击了')
      this.$router.push({
        path: '/noBottom/category',
        query: { id: id, name: name }
      })
    }
  }
}

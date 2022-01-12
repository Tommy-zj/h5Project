<!-- 成为技工 -->
<template>
  <div class="mechanic">
    <MyLoad :show="loadding" :text="message"></MyLoad>
    <div class="choosed">
      选取好的分类
    </div>
    <div class="category-content">
      <div
        class="category-item-choosed"
        v-for="(item, index) in tags"
        :key="index"
        v-text="item"
      ></div>
    </div>
    <div class="category">
      <div class="category-title">
        一级技能选择
      </div>
      <div class="category-content">
        <div v-for="(item, index) in category" :key="index">
          <div
            class="category-item-choosed"
            v-text="item.name"
            v-if="item.choosed == 1"
          ></div>
          <div
            class="category-item"
            v-text="item.name"
            v-if="item.choosed == 0"
            @click="choosing(index)"
          ></div>
        </div>
      </div>
    </div>

    <div class="category">
      <div class="category-title">
        二级技能选择
      </div>
      <div class="category-content">
        <div v-for="(item, index) in secondCategory" :key="index">
          <div
            class="category-item-choosed"
            v-text="item.name"
            @click="remove(item.name, index)"
            v-if="item.choosed == 1"
          ></div>
          <div
            class="category-item"
            v-text="item.name"
            v-if="item.choosed != 1"
            @click="choosingSecond(item.name, index)"
          ></div>
        </div>
      </div>
    </div>
    <v-bottom-button describe="保存" v-if="call !== 'yes'"></v-bottom-button>
  </div>
</template>

<script>
import { getSkill, getPersonTags, setPersonTags, getPerson } from '@/api/person'
import bottomButton from '../components/bottomButton'
import MyLoad from '../components/MyLoad'
export default {
  data() {
    return {
      category: [],
      choosed: [1],
      secondCategory: [],
      tags: [],
      person_id: 0,
      loadding: false,
      message: ''
    }
  },
  props: { call: String },

  components: { 'v-bottom-button': bottomButton, MyLoad },

  computed: {},

  mounted() {
    this.$store.commit('user/SET_TITLE', '技工选择')
    this.getCategoryMethod()
    console.log('处理好: ', this.category)
  },

  methods: {
    getCategoryMethod() {
      this.loadding = true
      this.message = '个人信息加载中！'
      getSkill()
        .then(res => {
          this.category = res.user
          const category = res.user
          this.secondCategory = category[0].skills
          for (const i in category) {
            this.$set(category[i], 'choosed', 0)
            // category[i].isShow = false
            for (const j in category[i].skills) {
              this.$set(category[i].skills[j], 'choosed', 0)
            }
          }
          setTimeout(() => {
            this.loadding = false
          }, 1000)
          if (this.call !== 'yes') {
            this.getPersonTagsMethod()
          }
          this.$set(this.category[0], 'choosed', 1)
          // console.log('secondCategory', this.category)
        })
        .catch(error => {
          console.log('获取全部技工标签', error)
        })
    },
    getPersonTagsMethod() {
      const person = JSON.parse(this.$store.getters.getUser)
      // console.log('perosn', person)
      const params = { person_id: person.id }
      this.person_id = person.id
      getPersonTags(params)
        .then(res => {
          const tags = res.msg
          const tagsArr = tags.split(',')
          for (const i in tagsArr) {
            this.tags.push(tagsArr[i])
          }
          this.dealSecondCategory()
          // console.log('getPersonTags', this.tags)
        })
        .catch(error => {
          console.log('获取个人技能标签发生错误', error)
        })
    },
    dealSecondCategory() {
      for (const k in this.secondCategory) {
        for (const t in this.tags) {
          if (this.tags[t] === this.secondCategory[k].name) {
            console.log('这个选项被选择了')
            this.secondCategory[k].choosed = 1
          }
        }
      }
    },
    choosing(item) {
      this.secondCategory = this.category[item].skills
      const category = this.category
      for (const i in category) {
        category[i].choosed = 0
      }
      this.category[item].choosed = 1
      this.dealSecondCategory()
    },
    choosingSecond(name, index) {
      // console.log('name', name)
      this.secondCategory[index].choosed = 1
      this.tags.push(name)
      // console.log('tags: ', this.tags)
    },
    remove(name, item) {
      console.log('item', item, this.secondCategory[item].choosed)
      this.secondCategory[item].choosed = 0
      const tags = this.tags
      const index = tags.indexOf(name)
      // console.log('tags before: ', this.tags)
      if (index !== -1) {
        tags.splice(index, 1)
      }
      // console.log('tags after: ', this.tags)
    },
    bottomButtonMethod() {
      console.log('提交技能标签')
      this.loadding = true
      this.message = '提交技能标签'
      let tag = ''
      for (const i in this.tags) {
        if (tag) {
          tag = tag + ',' + this.tags[i]
        } else {
          tag = this.tags[i]
        }
      }
      const params = {
        person_id: this.person_id,
        name: tag
      }
      setPersonTags(params)
        .then(res => {
          // console.log('保存个人技能成功回调', res)
          const that = this
          setTimeout(() => {
            that.loadding = false
            that.getPersonMethod()
            this.$router.go(-1) // 返回上一层
          }, 1000)
        })
        .catch(error => {
          console.log('保存个人技能标签报错', error)
        })
    },
    getPersonMethod() {
      getPerson({ person_id: this.person_id })
        .then(res => {
          console.log('user', res.user)
          this.$store.commit('user/SET_USER', JSON.stringify(res.user))
        })
        .catch(error => {
          console.log('修改个人技能标签后获取个人信息报错', error)
        })
    }
  }
}
</script>
<style src="./css/becomeMechanic.css"></style>

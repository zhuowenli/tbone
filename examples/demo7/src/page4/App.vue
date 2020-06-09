<template>
  <div class="cnt">
    <Header></Header>
    <div>url: {{url}}</div>
    <button @click="onClickBack">回到上一页</button>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '../common/Header.vue'
import Footer from '../common/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      url: '',
    }
  },
  created() {
    window.addEventListener('myload', query => console.log('page3 myload', query))
    window.addEventListener('myshow', () => console.log('page3 myshow'))
    window.addEventListener('myready', () => console.log('page3 myready'))
    window.addEventListener('myhide', () => console.log('page3 myhide'))
    window.addEventListener('myunload', () => console.log('page3 myunload'))
  },
  mounted() {
    this.url = window.location.href
  },
  methods: {
    onClickBack() {
      if (process.env.isminiapp) {
        my.navigateBack()
      }
    },
  },
}
</script>

<style>
.cnt {
  margin-top: 20px;
}
a, button {
  display: block;
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 20px;
  border: 1px solid #ddd;
}
</style>

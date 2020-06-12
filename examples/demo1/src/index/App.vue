<template>
    <div>
        <ul class="tabbar">
            <li><RouterLink class="link" to="/test/aaa">aaa</RouterLink></li>
            <li><RouterLink class="link" to="/test/bbb">bbb</RouterLink></li>
        </ul>

        <RouterView />

        <button class="btn" @click.stop="throwError">throw an error</button>

        <input v-model="input" type="text" @input="onInputChange">

        <div style="margin-left: 20px;">
            <p>这是<span>{{ input }}</span>段中间插入了span的文本</p>
        </div>

        <div class="add-module-list">
            add-module-list
            <div v-for="item in MODULES_LIST" :key="item.title" class="item">
                item
                <div>{{ item.title }}</div>
                <div class="card-wrap">
                    card-wrap
                    <div v-for="child in item.child" :key="child.type" class="card">
                        card
                        <i :class="child.icon" />
                        <p>{{ child.name }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div style="margin: 20px;">
            <p style="width: 10rem;">这段看起来特别特别长的文字宽度是 10 rem，测试测试测试测试测试测试测试测试测试测试测试测试</p>
        </div>
        <Footer />
    </div>
</template>

<script>
import Footer from '../components/Footer.vue';

export default {
    name: 'App',
    components: {
        Footer,
    },
    data() {
        return {
            input: '12313',
            MODULES_LIST: [{
                title: '图文模块',
                child: [{
                    name: '海报',
                    icon: 'haibao',
                    type: 'haibao',
                }, {
                    name: '热区海报',
                    icon: 'requhaibao',
                    type: 'requhaibao',
                }],
            }, {
                title: '导航模块',
                child: [{
                    name: '电梯导航',
                    icon: 'haibao',
                    type: 'haibao',
                }],
            }, {
                title: '列表模块',
                child: [{
                    name: '双列宝贝',
                    icon: 'haibao',
                    type: 'haibao',
                }],
            }, {
                title: '工具模块',
                child: [{
                    name: '尺码工具',
                    icon: 'haibao',
                    type: 'haibao',
                }],
            }]
        };
    },
    mounted() {
        // console.log('TEST_VAR_STRING', TEST_VAR_STRING);
        // console.log('TEST_VAR_NUMBER', TEST_VAR_NUMBER);
        // console.log('TEST_VAR_BOOL', TEST_VAR_BOOL);
        // console.log('TEST_VAR_FUNCTION', TEST_VAR_FUNCTION);
        // console.log('TEST_VAR_OTHERS', TEST_VAR_OTHERS);

        // // cookie
        // console.log('before set cookie', document.cookie);
        // document.cookie = `time=${+new Date()}; expires=Wed Jan 01 2220 00:00:00 GMT+0800; path=/`;
        // console.log('after set cookie', document.cookie);
    },
    methods: {
        throwError() {
            setTimeout(() => {
                throw new Error('I am an error');
            }, 0);
        },
        onInputChange(e) {
            // this.input = e.$_detail.value
        },
        jump(url) {
            console.log(url);
            this.$router.push(url);
        }
    },
};
</script>

<style>
.tabbar {
  margin-top: 20px;
  padding: 0;
  width: 100%;
  display: flex;
  list-style: none;
  justify-content: center;
}
.tabbar li {
  position: relative;
  display: block;
  height: 50px;
  width: 80px;
  text-align: center;
  line-height: 50px;
  background: #dff1e7;
  margin: 5px;
}
.tabbar li .link {
  display: block;
  width: 100%;
  height: 100%;
}
.btn {
  display: block;
  margin: 15px auto;
  width: 250px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #000;
  font-size: 16px;
  background: #dff1e7;
  border-radius: 5px;
}

.add-module-list{
    background: #666;
    padding: 20px;
}
.add-module-list .item{
    background: #aaa;
    padding: 20px;
    margin-bottom: 10px;
}
.add-module-list .card-wrap {
    padding: 20px;
    background: #445577;
}
.add-module-list .card {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 100px;
    min-width: 100px;
    background: #ffffff;
    margin-right: 10px;
}
</style>

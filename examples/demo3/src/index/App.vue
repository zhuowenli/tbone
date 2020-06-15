<template>
    <div>
        <ul class="tab">
            <li class="tab-item" :class="{selected: builtinPrefix === 0}" @click="builtinPrefix = 0">builtin-component 用法</li>
            <li class="tab-item" :class="{selected: builtinPrefix === 1}" @click="builtinPrefix = 1">无前缀用法</li>
        </ul>
        <div class="btns">
            <button ref="btn" @click="doPageScroll">滚动到 50px 处</button>
        </div>
        <MyComponents :builtin-prefix="builtinPrefix" />
    </div>
</template>

<script>
import MyComponents from './Component.vue';

export default {
    name: 'App',
    components: {
        MyComponents,
    },
    data() {
        return {
            builtinPrefix: 1, // 0 - builtin-component 用法，1 - 无前缀用法
        };
    },
    mounted() {
        // 监听页面滚动事件
        window.addEventListener('scroll', () => {
            console.log('[window scroll]', document.documentElement.scrollTop);
        });
        console.log(document);
        console.log(this.$refs.btn);

        console.log('-----------');
        console.log(my.createSelectorQuery().select('.miniapp-root'));
        console.log(my.createSelectorQuery().select('.miniapp-root').exec(console.log));
    },
    methods: {
        doPageScroll() {
            document.documentElement.scrollTop = 50;
        },
    },
};
</script>

<style>
.tab {
  padding: 10px;
}

.tab-item {
  display: inline-block;
  margin-bottom: 10px;
  font-size: 18px;
  padding: 5px 10px;
  border-radius: 5px;
}

.tab-item.selected {
  background: #3eaf7c;
  color: #fff;
}

.btns {
  margin: 20px;
}

button {
  display: block;
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 20px;
  border: 1px solid #ddd;
}
</style>

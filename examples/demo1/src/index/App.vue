<template>
    <div class="app">
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
        };
    },
    mounted() {
        console.log('TEST_VAR_STRING', TEST_VAR_STRING);
        console.log('TEST_VAR_NUMBER', TEST_VAR_NUMBER);
        console.log('TEST_VAR_BOOL', TEST_VAR_BOOL);
        console.log('TEST_VAR_FUNCTION', TEST_VAR_FUNCTION);
        console.log('TEST_VAR_OTHERS', TEST_VAR_OTHERS);

        // cookie
        console.log('before set cookie', document.cookie);
        document.cookie = `time=${+new Date()}; expires=Wed Jan 01 2220 00:00:00 GMT+0800; path=/`;
        console.log('after set cookie', document.cookie);
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

<style lang="scss" src="./app.scss"></style>

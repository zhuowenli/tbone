<template>
    <div class="app">
        <ul class="tabbar">
            <li><RouterLink class="link" to="/test/aaa">aaa</RouterLink></li>
            <li><RouterLink class="link" to="/test/bbb">bbb</RouterLink></li>
        </ul>

        <RouterView />

        <Footer />
    </div>
</template>

<script>
import Footer from './components/Footer.vue';

export default {
    name: 'App',
    components: {
        Footer,
    },
    data() {
        return {
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
};
</script>

<style lang="scss" src="./app.scss"></style>

<template>
    <div class="app">
        <ul class="tabbar">
            <li><RouterLink class="link" to="/test/aaa">aaa</RouterLink></li>
            <li><RouterLink class="link" to="/test/bbb">bbb</RouterLink></li>
        </ul>

        <RouterView />

        <HlgButton @click.stop="throwError">throw an error</HlgButton>

        <HlgInput
            v-model="input"
            type="text"
            @input="onInputChange"
            @keyup="onKeyup"
            @enter="onEnter"
        />
        <HlgInput
            v-model="input2"
            type="textarea"
            @input="onInputChange"
            @keyup="onKeyup"
            @enter="onEnter"
        />

        <div style="margin-left: 20px;">
            <p>这是<span>{{ input }}</span>段中间插入了span的文本</p>
        </div>

        <HlgSelect v-model="value" placeholder="请选择">
            <HlgOption
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
        </HlgSelect>

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
            input2: '',

            options: [{
                value: '1',
                label: '国庆大促'
            }, {
                value: '2',
                label: '夏季促销'
            }, {
                value: '3',
                label: '春季促销'
            }, {
                value: '4',
                label: '中秋大促'
            }, {
                value: '5',
                label: '女神新衣'
            }, {
                value: '6',
                label: '国庆大放价'
            }],
            value: '',
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
            console.log('input', e);
        },
        jump(url) {
            console.log(url);
            this.$router.push(url);
        },
        onEnter(e) {
            console.log('enter', e);
        },
        onKeyup(e) {
            console.log('keyup', e);
        }
    },
};
</script>

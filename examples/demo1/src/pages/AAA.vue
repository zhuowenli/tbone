<template>
    <div class="aaa">
        <!-- <HlgInput
            v-model="input"
            type="text"
            @input="onInputChange"
            @keyup="onKeyup"
            @enter="onEnter"
        />

        <div>
            <p>这是<span>{{ input }}</span>段中间插入了span的文本</p>
        </div>

        <label>
            <input v-model="checkbox" type="checkbox" @input="onInput">
            aaaaaa
        </label> -->

        <div>
            <HlgCheckboxGroup v-model="checkList">
                <HlgCheckbox label="复选框 A" />
                <HlgCheckbox label="复选框 B" />
                <HlgCheckbox label="复选框 C" />
                <HlgCheckbox label="禁用" disabled />
                <HlgCheckbox label="选中且禁用" disabled />
            </HlgCheckboxGroup>
        </div>

        <HlgSelect v-model="value" placeholder="请选择">
            <HlgOption
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
        </HlgSelect>

        <!-- <HlgDropdown
            trigger="click"
            placeholder="请选择分类"
            update-placeholder
            @command="onCommand"
        >
            <HlgDropdownItem command="a">潮流男装</HlgDropdownItem>
            <HlgDropdownItem command="b">新品上市</HlgDropdownItem>
            <HlgDropdownItem command="c">潮流女装</HlgDropdownItem>
            <HlgDropdownItem command="d" disabled>未分类</HlgDropdownItem>
            <HlgDropdownItem command="e" divided>其他</HlgDropdownItem>
        </HlgDropdown> -->
    </div>
</template>

<script>
export default {
    name: 'AAA',
    data() {
        return {
            input: '12313',
            input1: '',
            input2: '',
            dropdown: 'a',
            checkbox: '',
            checkList: ['选中且禁用', '复选框 A'],
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
        window.onPullDownRefresh = () => {
            console.log('onPullDownRefresh');
        };
    },
    methods: {
        onInputChange(e) {
            console.log('input', e);
        },
        onInput(e) {
            console.log('onInput', e);
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
        },
        onCommand(cmd) {
            this.dropdown = cmd;
        }
    },
};
</script>

<style lang="scss" src="./aaa.scss"></style>

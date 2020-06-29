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

        <div v-for="(item, inx) in inputs" :key="inx">
            <HlgInput v-model="item.value" type="text" />
        </div>

        <div>
            <HlgCheckboxGroup v-model="checkList">
                <HlgCheckbox v-for="item in options" :key="item.value" :label="item.value">{{ item.label }}</HlgCheckbox>
            </HlgCheckboxGroup>
        </div>

        <!-- <HlgSelect v-model="value" placeholder="请选择">
            <HlgOption
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
        </HlgSelect> -->

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
            checkList: ['1'],
            inputs: [
                { value: '' },
                { value2: '1' },
            ],
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
    watch: {
        inputs: {
            deep: true,
            handler() {
                console.log(this.inputs);
            }
        }
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

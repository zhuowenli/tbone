<template>
  <div class="header">
    <p>wechat-miniapp</p>
  </div>
</template>

<script>
import {printf} from './utils'

export default {
  mounted() {
    printf('I am Header --> tbone')
  },
}
</script>

<style>
.header {
  margin-bottom: 10px;
  width: 100%;
  text-align: center;
}
</style>

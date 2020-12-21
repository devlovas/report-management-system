<template>
  <div class='setting'>
    <Toolbar/>
    <h1>Setting 页面</h1> 
    <foot-tagbar/>
  </div>
</template>

<script>
import Toolbar from '/@/components/Toolbar.vue'
import FootTagbar from '/@/components/FootTagbar.vue'
export default {
  name: 'Setting',
  components: { Toolbar, FootTagbar }
}
</script>

<style lang='sass' scoped>
.setting
  width: 100%
  height: 100%
</style>

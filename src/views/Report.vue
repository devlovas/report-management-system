<template>
  <div class='report'>
    <Toolbar/>
    <h1>Report 页面</h1> 
    <foot-tagbar/>
  </div>
</template>

<script>
import Toolbar from '/@/components/Toolbar.vue'
import FootTagbar from '/@/components/FootTagbar.vue'
export default {
  name: 'Report',
  components: { Toolbar, FootTagbar }
}
</script>

<style lang='sass' scoped>
.report
  width: 100%
  height: 100%
</style>

<template>
  <div class='Category'>
    <Toolbar/>
    <h1>category 页面</h1> 
    <foot-tagbar/>
  </div>
</template>

<script>
import Toolbar from '/@/components/Toolbar.vue'
import FootTagbar from '/@/components/FootTagbar.vue'
export default {
  name: 'Category',
  components: { Toolbar, FootTagbar }
}
</script>

<style lang='sass' scoped>
</style>

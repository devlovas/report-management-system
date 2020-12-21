<template>
  <div class='home'>
    <Toolbar/>
    <h1>Home 页面</h1> 
    <foot-tagbar/>
  </div>
</template>

<script>
import Toolbar from '/@/components/Toolbar.vue'
import FootTagbar from '/@/components/FootTagbar.vue'
export default {
  name: 'Home',
  components: { Toolbar, FootTagbar }
}
</script>

<style lang='sass' scoped>
.home
  width: 100%
  height: 100%
</style>

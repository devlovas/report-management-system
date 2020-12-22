<template>
  <div class='setting'>
    <Toolbar/>
    <h1>页面待开发...</h1> 
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
  
h1
  top: 50%
  left: 50%
  font-size: 32px
  transform: translate(-50%, -50%)
  position: absolute
</style>

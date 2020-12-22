<template>
  <div class='home'>
    <Toolbar/>
    <div class='masking' v-show='createLog.boxHold'></div> 
    <h1>页面待开发...</h1> 
    <foot-tagbar/>
  </div>
</template>

<script>
import Toolbar from '/@/components/Toolbar.vue'
import FootTagbar from '/@/components/FootTagbar.vue'

import { useStore } from 'vuex'
export default {
  name: 'Home',
  components: { Toolbar, FootTagbar },
  setup () {
    const store = useStore()

    return { ...store.state }
  }
}
</script>

<style lang='sass' scoped>
.home
  width: 100%
  height: 100%

h1
  top: 50%
  left: 50%
  font-size: 32px
  transform: translate(-50%, -50%)
  position: absolute

.masking
  top: 0
  left: 0
  width: 100%
  height: 100%
  background-color: #000
  transition: all .5s ease
  position: absolute
  opacity: 0.5
</style>

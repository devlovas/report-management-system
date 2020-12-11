<template>
  <div class='container'>
    <div class='notification' :style='{ top: notification.offset, transform: `scale(${notification.scale})` }'>
      <i class='warni-icon' v-show='notification.type == 3 && true'><svg t="1607696360954" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20973" width="32" height="32"><path d="M512 64c247.424 0 448 200.576 448 448S759.424 960 512 960 64 759.424 64 512 264.576 64 512 64z m64 608H448v128h128V672z m32-448H416l64 400h64l64-400z" p-id="20974" fill="#1296db"></path></svg></i>
      <i class='error-icon' v-show='notification.type == 2 && true'><svg t="1607696360954" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20973" width="32" height="32"><path d="M512 64c247.424 0 448 200.576 448 448S759.424 960 512 960 64 759.424 64 512 264.576 64 512 64z m64 608H448v128h128V672z m32-448H416l64 400h64l64-400z" p-id="20974" fill="#d81e06"></path></svg></i>
      <i class='succe-icon' v-show='notification.type == 1 && true'><svg t="1607695627434" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20126" width="32" height="32"><path d="M909.200906 68.178799c0 0-24.76094 203.794499 51.423183 350.448604 0 0-379.01522 215.231993-512.322341 537.108864 0 0-201.889103-289.49844-386.635781-306.640865l199.983707-163.807786c0 0 151.013389 201.429639 168.701237 228.614791C451.469903 746.357586 874.918102 83.414805 909.200906 68.178799z" p-id="20127" fill="#1afa29"></path></svg></i>
      {{ notification.message }}
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'

export default {
  name: 'Attention',
  setup () {
    const store = useStore()
    return { ...store.state }
  }
}
</script>

<style lang='sass' scoped>

.notification
  left: 5%
  width: 90%
  font-size: 18px
  line-height: 50px
  border-radius: 10px
  background-color: rgba(255,255,255,1)
  transition: all 0.5s ease
  position: absolute

.warni-icon,
.error-icon,
.succe-icon
  svg
    top: 10px
    left: 10px
    position: absolute
</style>

<template>
  <div class='toolbar'>
    <div class='searchBox'>
      <form action="#" :style='{width: `${search.inputHold ? 260 : 0}px`, opacity: `${search.inputHold ? 1 : 0}`}'>
        <input v-model='inpSearch' type="text" @blur='inputSearchOnBlur'>
      </form>
    </div>
    <i class='icon-menu'>
      <button class='add-items' @click='addItemsClick' v-show='routePath == "/home"'>添加</button>
      <svg v-show='routePath != "/home"' t="1608297431233" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3989" width="25" height="25"><path d="M 852.11 620 A 108 108 0 1 1 960 512 a 107.94 107.94 0 0 1 -107.89 108 Z M 512 620 a 108 108 0 1 1 107.89 -108 A 107.95 107.95 0 0 1 512 620 Z M 171.89 620 a 108 108 0 1 1 107.88 -108 a 107.94 107.94 0 0 1 -107.88 108 Z" fill="#d81e06" p-id="3990"></path></svg>
    </i>
    <i class='icon-search' @click='searchSubmit'><svg t="1608296976718" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1451" width="25" height="25"><path d="M942.8 860.4L739.5 652.3c-2-2-4.5-2.9-6.7-4.6 42.6-60 67.9-133.2 67.9-212.4 0-203.1-164.7-367.8-367.8-367.8-203.1 0-367.8 164.7-367.8 367.8C65.1 638.4 229.8 803 432.9 803c84 0 161.1-28.4 223-75.8 1.1 1.3 1.5 2.9 2.7 4.1l203.3 208.1c11 11.3 25.8 17 40.4 17 14.3 0 28.6-5.4 39.6-16.1 22.3-21.7 22.7-57.6 0.9-79.9zM121.7 435.3c0-171.6 139.6-311.2 311.2-311.2s311.2 139.6 311.2 311.2-139.6 311.2-311.2 311.2c-171.6-0.1-311.2-139.6-311.2-311.2z" p-id="1452" fill="#d81e06"></path></svg></i>
  </div>
</template>

<script>

const data = new Date()
const year = data.getFullYear()
const month = String(data.getMonth() + 1).padStart(2, 0)

import { reactive, toRefs } from 'vue'

import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { getMaxDays, dialog } from '/@/tools/index.js'

export default {
  name: 'Toolbar',
  setup () {

    const route = useRoute()
    const store = useStore()
    const state = reactive({
      routePath: route.path,
      inpSearch: year+month
    })

    const router = useRouter()

    function searchSubmit () {
      document.querySelector('input').focus()
      store.state.search.inputHold = !store.state.search.inputHold
    }

    function inputSearchOnBlur () {
      const value = state.inpSearch.trim()
      if (/^\d{8}$/.test(value)) {
        store.commit('setDataTime', [value, null])
        router.push('/home')
      } else if (/^\d{6}$/.test(value)) {
        store.commit('setDataTime', [null, value])
        router.push('/report')
      } else {
        dialog(store, 'waring', '字符长度有误！')
      }

      store.state.search.inputHold = !store.state.search.inputHold
    }

    function addItemsClick () {
      getMaxDays(store)
      store.commit('setCreateLogBoxHold', true)
    }


    return { ...toRefs(state), ...store.state, addItemsClick, searchSubmit, inputSearchOnBlur }
  }
}
</script>

<style lang='sass' scoped>
.toolbar
  width: 100%
  height: 10%
  line-height: 50px
  border-bottom: 1px solid rgba(0,0,0, 0.1)
  background-color: #FFF
  position: relative

.searchBox
  top: 8px
  right: 40px
  width: 280px
  height: 35px
  position: absolute

form
  height: 35px
  border: 1px solid rgba(0,0,0, 0.2)
  border-radius: 30px
  transition: all 0.5s ease
  position: absolute

input
  top: 0
  left: 5%
  width: 90%
  height: 100%
  position: absolute 
  color: rgba(44, 62, 80, 0.8)
  text-indent: 15px
  font-size: 18px

.icon-menu
  right: 15px
  position: absolute

.icon-search
  right: 70px
  position: absolute

svg
  vertical-align: middle

.add-items
  font-size: 18px
  background-color: ''
  color: red
</style>

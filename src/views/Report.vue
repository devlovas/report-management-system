<template>
  <div class='report'>
    <Toolbar/>
    <div class='reportDays' style='height: 100%'>
      <div class='datatime'>
        <h2>时间：</h2>
        <span>{{datatime}}</span>
      </div>

      <div class='dataList'>
        <ul>
          <li>
            <div><span style='left: 2px'>序号</span></div>
            <div><span>品名</span></div>
            <div><span>上期结存</span></div>
            <div><span>仓库付出</span></div>
            <div><span>检验付出</span></div>
            <div><span>主机付出</span></div>
            <div><span>本期结存</span></div>
            <div><span>更新时间</span></div>
          </li>
          <li v-for='(item, idx) in monthList.data' :style='{backgroundColor: idx % 2 ? "#ecf0f1" : ""}' :key='item.ID'>
            <div><span style='left: 5px'>{{String(idx+1).padStart(3, 0)}}</span></div>
            <div><span>{{item.NAME}}</span></div>
            <div><span>{{item.PREV_BALANCE}}</span></div>
            <div><span>{{item.WAREHOUSE}}</span></div>
            <div><span>{{item.INSPECTION}}</span></div>
            <div><span>{{item.HOST_MACHINE}}</span></div>
            <div><span>{{item.CURR_BALANCE}}</span></div>
            <div><span>{{dateTimeFormat(item.C_DATETIME)}}</span></div>
          </li>
        </ul>
      </div>
      <div class='content' v-show='!monthList.data.length'>
        <h2>无数据</h2>
        <h2 class='time'>{{datatime}}</h2>
      </div>
    </div>
    <foot-tagbar/>
  </div>
</template>

<script>
import Toolbar from '/@/components/Toolbar.vue'
import FootTagbar from '/@/components/FootTagbar.vue'

import { getDateTimeFormat, getMonthListData } from '/@/tools/index.js'
import { reactive, toRefs, computed, watch} from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'Home',
  components: { Toolbar, FootTagbar },
  setup () {
    const store = useStore()
    const state = reactive({
      monthList: {
        data: []
      }
    })

    const router = useRouter()

    const datatime = computed(() => {
      var t = String(store.state.createLog.datatime[1])
      return t.slice(0,4)+'年'+t.slice(4,6)+'月'
    })

    getMonthListData(router, store, state)

    function dateTimeFormat (data) {
      return getDateTimeFormat(new Date(data))
    }

    watch (() => { return store.state.createLog.datatime[1]
    }, () => { getMonthListData(router, store, state) })

    return { ...toRefs(state), ...store.state, datatime, dateTimeFormat}
  }
}
</script>

<style lang='sass' scoped>
.report
  width: 100%
  height: 100%


.datatime
  width: 100%
  height: 50px
  line-height: 50px
  padding-left: 10px
  border-bottom: 1px solid #ccc
  background-color: #FFF
  box-sizing: border-box
  text-align: left
  h2
    vertical-align: middle
    display: inline-block
    margin-right: 10px
    vertical-align: middle
    display: inline-block
    font-size: 18px
    color: #1a2a3a

.datatime
  span
    font-size: 21px
    vertical-align: middle
    color: #777

.dataList
  width: 1300px
  height: 400px
  text-align: left
  overflow-x: auto
  overflow-y: auto
  div
    position: relative
    text-align: center
    border-right: 1px solid #ccc
    box-sizing: border-box
    overflow: hidden
    span
      top: 0
      left: 10px
      position: absolute
      text-align: center
      text-align: left
    &:nth-child(1)
      width: 50px
    &:nth-child(2)
      width: 230px
    &:nth-child(3)
      width: 100px
    &:nth-child(4)
      width: 100px
    &:nth-child(5)
      width: 100px
    &:nth-child(6)
      width: 100px
    &:nth-child(7)
      width: 100px
    &:nth-child(8)
      width: 200px
  li
    width: 150%
    height: 50px
    display: flex
    font-size: 18px
    line-height: 50px
    padding-left: 5px
    border-bottom: 1px solid #ccc
    transition: all .5s ease
    box-sizing: border-box
    background-color: #FFF
    overflow: height
    color: #4a5a6a


.content
  top: 50%
  left: 50%
  width: 300px
  font-size: 50px
  transform: translate(-50%, -50%)
  position: absolute
  text-align: center
  opacity: .5
  .time
    margin-top: 20px
    margin-left: 5px
    font-size: 25px !important
    background-color: #ecf0f1
    opacity: .5
</style>

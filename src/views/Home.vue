<template>
  <div class='home'>
    <Toolbar/>
    <div class='masking' v-show='createLog.boxHold'></div> 
    <div class='reportDays' style='height: 100%'>
      <div style='height: 100%'>

        <div class='row'>
          <h2>时间：</h2>
          <span>{{datatime}}</span>
          <button class='del-item' v-show='btnDelItem.show' @click='delItemData'>删除</button> 
        </div>


        <div class='btn-type'>
          <h2>类型：</h2>
          <button @click='daysList.type = "data"' :style='{color: daysList.type === "data" ? "#FFF" : "#000",backgroundColor: daysList.type === "data" ? "#2C97D8" : ""}'>全部</button>
          <button @click='daysList.type = "ware"' :style='{color: daysList.type === "ware" ? "#FFF" : "#000",backgroundColor: daysList.type === "ware" ? "#2C97D8" : ""}'>仓库</button>
          <button @click='daysList.type = "insp"' :style='{color: daysList.type === "insp" ? "#FFF" : "#000",backgroundColor: daysList.type === "insp" ? "#2C97D8" : ""}'>检验</button>
          <button @click='daysList.type = "host"' :style='{color: daysList.type === "host" ? "#FFF" : "#000",backgroundColor: daysList.type === "host" ? "#2C97D8" : ""}'>主机</button>
        </div>

        <div class='dataList'>
          <ul>
            <li>
              <div><span style='left: 2px'>序号</span></div>
              <div><span>品名</span></div>
              <div><span>类型</span></div>
              <div><span>领用</span></div>
              <div><span>剩余</span></div>
              <div><span>备注</span></div>
              <div><span>更新时间</span></div>
            </li>
            <li v-for='(item, idx) in daysList[daysList.type]' @click='daysList.sels = item; btnDelItem.show = true' :style='{backgroundColor: daysList.sels && item.ID == daysList.sels.ID ? "#ccc" : ""}' :key='item.ID'>
              <div><span style='left: 5px'>{{String(idx+1).padStart(3, 0)}}</span></div>
              <div><span>{{item.NAME}}</span></div>
              <div><span>{{item.TYPE}}</span></div>
              <div><span>{{item.RECEIVE}}</span></div>
              <div><span>{{item.RESIDUE}}</span></div>
              <div><span>{{item.COMMENT}}</span></div>
              <div><span>{{dateTimeFormat(item.C_DATETIME)}}</span></div>
            </li>
          </ul>
        </div>
      </div>
      <div class='content' v-show='!daysList.data.length'>
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

import Api from '/@/api/index.js'
import { getDateTimeFormat, getDaysListData, dialog} from '/@/tools/index.js'
import { reactive, toRefs, computed, watch } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'Home',
  components: { Toolbar, FootTagbar },
  setup () {
    const store = useStore()
    const state = reactive({
      daysList: {
        data: [],
        ware: [],
        insp: [],
        host: [],
        sels: {},
        type: 'data'
      },
      btnDelItem: {
        show: false
      }
    })

    const datatime = computed(() => {
      var t = String(store.state.createLog.datatime[0])
      return t.slice(0,4)+'年'+t.slice(4,6)+'月'+t.slice(-2)+'日'
    })

    getDaysListData(state, store)

    function dateTimeFormat (data) {
      return getDateTimeFormat(new Date(data))
    }

    watch (() => { return store.state.createLog.datatime[0]
    }, () => { getDaysListData(state, store) })

    function delItemData () {
      Api.del.days({
        id: state.daysList.sels.ID,
        name: state.daysList.sels.NAME,
        type: state.daysList.sels.TYPE,
        time: store.state.createLog.datatime[0],
        value: state.daysList.sels.RECEIVE
      })
      .then(data => {
        if (!data.err_code) {
          dialog(store, 'success', data.message)
          getDaysListData(state, store)
          state.daysList.sels = null
        } else dialog(store, 'error', data.message)
      }).catch(e => dialog(store, 'error', data.message))
    }

    return { ...toRefs(state), ...store.state, datatime, delItemData, dateTimeFormat}
  }
}
</script>

<style lang='sass' scoped>
.home
  width: 100%
  height: 100%


.btn-type,
.row
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

  button
    width: 60px
    height: 30px
    margin-right: 10px
    border-radius: 20px
    transition: all .2s ease
    box-shadow: 1px 2px 3px #34495e
    font-size: 16px

.row
  span
    font-size: 21px
    vertical-align: middle
    color: #777

.del-item
  float: right
  width: 70px
  height: 30px
  font-size: 18px
  margin-top: 10px
  transition: all .5s ease
  margin-right: 30px !important
  border-radius: 0 !important
  color: #F00

.dataList
  width: 1200px
  height: 350px
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
      width: 60px
    &:nth-child(4)
      width: 100px
    &:nth-child(5)
      width: 80px
    &:nth-child(6)
      width: 200px
    &:nth-child(7)
      width: 200px
  li
    width: 150%
    height: 50px
    display: flex
    font-size: 18px
    overflow:auto
    line-height: 50px
    padding-left: 5px
    border-bottom: 1px solid #ccc
    transition: all .5s ease
    box-sizing: border-box
    background-color: #FFF
    overflow: height
    color: #4a5a6a


.content
  top: 60%
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

<template>
  <div class='report'>
    <Toolbar/>
    <div class='reportDays' style='height: 100%'>
      <div class='datatime'>
        <h2>时间：</h2>
        <span>{{datatime}}</span>
      </div>

      <div class='classify'>
        <div class='cls-title'>
          <h2>分类：</h2> 
          <div class='btns-sel'>
            <button @click='labels.crrType = "specs"' :style='{color: labels.crrType === "specs" ? "#FFF" : "#1a2a3a", backgroundColor: labels.crrType === "specs" ? "#2C97D8" : ""}'>规格</button>
            <button @click='labels.crrType = "color"' :style='{color: labels.crrType === "color" ? "#FFF" : "#1a2a3a", backgroundColor: labels.crrType === "color" ? "#2C97D8" : ""}'>颜色</button>
            <button @click='labels.crrType = "other"' :style='{color: labels.crrType === "other" ? "#FFF" : "#1a2a3a", backgroundColor: labels.crrType === "other" ? "#2C97D8" : ""}'>其它</button>
            <button @click='onButtonTagResetClick' style='color: #4a5a6a'>重置</button>
          </div>
        </div>
        <div class='btns-tag'>
          <button v-for='data in labels[labels.crrType]' @click='onButtonTagClick(data)' :style='{backgroundColor: labels.opts.indexOf(data.ID) != -1 ? "#EC4C40" : ""}'>
           {{data.NAME}}
          </button>
        </div>
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
          <li v-for='(item, idx) in product.opts' :style='{backgroundColor: idx % 2 ? "#ecf0f1" : ""}' :key='item.ID'>
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
      <div class='content' v-show='!product.data.length'>
        <h2>无数据</h2>
        <h2 class='time'>{{datatime}}</h2>
      </div>
    </div>
    <foot-tagbar/>
  </div>
</template>

<script>
import Api from '/@/api/index.js'
import Toolbar from '/@/components/Toolbar.vue'
import FootTagbar from '/@/components/FootTagbar.vue'

import { getDateTimeFormat, getMonthListData, isUserLogin } from '/@/tools/index.js'
import { reactive, toRefs, computed, watch} from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

Array.prototype.contains = function (v) {

  for (var i=0; i<v.length; i++) {
    if (this.indexOf(v[i]) === -1) return false
  }

  return true
}

export default {
  name: 'Home',
  components: { Toolbar, FootTagbar },
  setup () {
    const store = useStore()
    const state = reactive({
      product: {
        data: [],
        opts: []
      },
      labels: {
        specs: [],
        color: [],
        other: [],
        crrType: 'specs',
        opts: []
      }
    })

    const router = useRouter()

    const datatime = computed(() => {
      var t = String(store.state.createLog.datatime[1])
      return t.slice(0,4)+'年'+t.slice(4,6)+'月'
    })

    getMonthListData(router, store, state)

    Api.get.label().then(data => {
      if (!isUserLogin(router, store, data)) return
      if (!data.err_code && data.result) {
        data.result.forEach(label => state.labels[label.TYPE].push(label) )
      }
    }).catch(err => console.log(err))

    function onButtonTagClick (data) {
      if (state.labels.opts.indexOf(data.ID) === -1) { state.labels.opts.push(data.ID) }
      else { state.labels.opts = state.labels.opts.filter(id => id != data.ID )}

      state.product.opts = [] // 清空之前数据
      state.product.data.forEach(item => {
        // 检查labels.opts中的标签ID 是否在product.CLASSIFY中存在

        if (item.CLASSIFY.contains(state.labels.opts)) {
          state.product.opts.push(item)
        }
      })
    }

    function onButtonTagResetClick (e) {
      state.labels.opts = []
      state.product.opts = state.product.data
      e.toElement.style.color = 'red'
      setTimeout(() => e.toElement.style.color = '#4a5a6a', 100)
    }

    function dateTimeFormat (data) {
      return getDateTimeFormat(new Date(data))
    }

    watch (() => { return store.state.createLog.datatime[1]
    }, () => { getMonthListData(router, store, state) })

    return { ...toRefs(state), ...store.state, datatime, dateTimeFormat, onButtonTagClick, onButtonTagResetClick }
  }
}
</script>

<style lang='sass' scoped>
.report
  width: 100%
  height: 100%
  h2
    vertical-align: middle
    display: inline-block
    margin-right: 10px
    vertical-align: middle
    display: inline-block
    font-size: 18px
    color: #1a2a3a



.datatime
  width: 100%
  height: 50px
  line-height: 50px
  padding-left: 10px
  border-bottom: 1px solid #ccc
  background-color: #FFF
  box-sizing: border-box
  text-align: left

.classify 
  width: 100%
  height: 150px
  padding: 10px
  padding-top: 2px
  box-sizing: border-box
  background-color: #FFF
  .cls-title
    width: 100%
    height: 40px
    padding-top: 2px
    border-bottom: 1px solid #ccc
    box-sizing: border-box
    h2
      float: left
      line-height: 30px
    .btns-sel button
      float: left
      width: 57px
      height: 30px
      margin-right: 10px
      border-radius: 20px
      box-shadow: 1px 2px 3px #34495e
      transition: all .2s ease
      font-size: 16px

  .btns-tag
    width: 100%
    height: 100px
    overflow: auto
    margin-top: 2px
    text-align: left
    button
      width: 62px
      padding: 2px
      margin-right: 3.5px
      margin-bottom: 2px
      border-radius: 5px
      display: inline-block
      box-sizing: border-box
      border: 1px solid #aaa
      transition: all .5s ease
      background-color: #3498db
      font-size: 16px
      color: #FFF

.datatime
  span
    font-size: 21px
    vertical-align: middle
    color: #777

.dataList
  width: 1300px
  height: 250px
  text-align: left
  overflow-x: auto
  overflow-y: auto
  border-top: 1px solid #ccc
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
  top: 70%
  left: 50%
  width: 300px
  transform: translate(-50%, -50%)
  position: absolute
  text-align: center
  opacity: .5
  h2
    font-size: 50px !important
  .time
    margin-top: 20px 
    margin-left: 5px
    font-size: 25px !important
    display: block !important
    opacity: .5
</style>

<template>
  <div class='create-log' :style='{height: createLog.boxHold ? "100%" : "0"}'>
    <div class='container'>
      <div class='btns-top'>
        <button class='btn-cancel' @click='btnCancelClick'>取消</button> 
        <button class='btn-addLog' @click='addReportDaysSubmit'>添加</button> 
        <button class='btn-delete' v-show='false'>删除</button>
        <button class='btn-change' v-show='false'>修改</button>
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
          <button v-for='data in labels[labels.crrType]' @click='onButtonTagClick(data)' :style='{backgroundColor: labels.opts.indexOf(data.ID) != -1 ? "#EC4C40" : ""}' :key='data.ID'>
           {{data.NAME}}
          </button>
        </div>
      </div>

      <div class='pro-name'>
        <h2>品名：</h2>
        <select v-model='logsData.name'>
          <option :value='data.NAME' v-for='(data, idx) in product.opts' :key='data.ID'>{{data.NAME}}</option>
        </select>
      </div>

      <div class='cre-time'>
        <h2>时间：</h2> 
        <select v-model='creTimeYear' @change='creTimeChange'>
          <option v-for='i in 7' :value='2018+i' :key="i">{{2018 + i}}年</option>
        </select>
        <select v-model='creTimeMonth' @change='creTimeChange'>
          <option v-for='i in 12' :value='i' :key='i'>{{String(i).padStart(2, 0)}}月</option>
        </select>
        <select v-model='creTimeDay'>
          <option v-for='i in createLog.maxDays' :value='i' :key='i'>{{String(i).padStart(2, 0)}}日</option>
        </select>
      </div>

      <div class='log-type'>
        <h2>类型：</h2> 
        <button @click='logsData.type = "检验"; logsData.resi = 0' :style='{color: logsData.type === "检验" ? "#FFF" : "#000",backgroundColor: logsData.type === "检验" ? "#2C97D8" : ""}'>检验</button>
        <button @click='logsData.type = "仓库"; logsData.resi = 0' :style='{color: logsData.type === "仓库" ? "#FFF" : "#000",backgroundColor: logsData.type === "仓库" ? "#2C97D8" : ""}'>仓库</button>
        <button @click='logsData.type = "主机"' :style='{color: logsData.type === "主机" ? "#FFF" : "#000",backgroundColor: logsData.type === "主机" ? "#2C97D8" : ""}'>主机</button>
      </div>

      <div class='receives'>
        <h2>领用：</h2> 
        <input type="text" v-model='logsData.rece'>
      </div>
      <div class='residues'>
        <h2>剩余：</h2> 
        <input type="text" v-model='logsData.resi' :disabled='logsData.type != "主机"'>
      </div>
      <div class='comments'>
        <h2>备注：</h2> 
        <input type="text" v-model='logsData.comm'>
      </div>
    </div>
  </div>  

</template>

<script>
import Api from '/@/api/index.js'
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { getMaxDays, dialog } from '/@/tools/index.js'

Array.prototype.contains = function (v) {

  for (var i=0; i<v.length; i++) {
    if (this.indexOf(v[i]) === -1) return false
  }

  return true
}


export default {
  name: 'CreateLog',
  setup () {
    const date = new Date()
    var creTimeDay = ref(date.getDate())
    var creTimeYear = ref(date.getFullYear())
    var creTimeMonth = ref(date.getMonth() + 1)

    const store = useStore()
    const state = reactive({
      labels: {
        specs: [],
        color: [],
        other: [],
        crrType: 'specs',
        opts: []
      },
      product: {
        data: [],
        opts: []
      },
      optActive: {
        specs: 0,
        color: 0,
        other: 0
      },
      logsData: {
        name: '',
        type: '',
        rece: '0',
        resi: '0',
        comm: '(无)'
      }
    })

    const router = useRouter()

    Api.get.label().then(data => {
      if (!data.err_code && data.result) {
        data.result.forEach(label => state.labels[label.TYPE].push(label) )
      }
    }).catch(err => console.log(err))

    Api.get.product().then(data => {
      if(!data.err_code && data.result) {
        state.product.data = data.result
        state.product.opts = data.result
        state.logsData.name = data.result[0].NAME
      }

    }).catch(err => console.log(err))

    function btnCancelClick () {
      store.commit('setCreateLogBoxHold', false)
    }

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

    function creTimeChange (){
      getMaxDays(store, creTimeYear.value + String(creTimeMonth.value).padStart(2,0))
    }

    function addReportDaysSubmit (e) {
      const stateLogsData = state.logsData
      const createDataTime = String(creTimeYear.value)+creTimeMonth.value+creTimeDay.value
      e.toElement.style.color = '#777'
      setTimeout(() => e.toElement.style.color = 'red', 100)
      if (!stateLogsData.type.length) return dialog(store, 'waring', '请选择类型！')
      if (!stateLogsData.comm.length) stateLogsData.comm = '(无)'
      Api.add.days({
        time: createDataTime,
        name: stateLogsData.name,
        type: stateLogsData.type,
        rece: stateLogsData.rece,
        resi: stateLogsData.resi,
        comm: stateLogsData.comm
      }).then(data => {
        if (!data.err_code) {
          dialog(store, 'success', data.message)
          store.commit('setDataTime', [19000101, null])
          setTimeout(() => { store.commit('setDataTime', [createDataTime, null]) }, 10)
          stateLogsData.name = ''
          stateLogsData.type = ''
          stateLogsData.rece = '0'
          stateLogsData.resi = '0'
          stateLogsData.comm = '(无)'
        } else dialog(store, 'error', data.message)
      }).catch(e => console.log(e))
      store.commit('setCreateLogBoxHold', false)
    }

    return { ...state, ...store.state,
      creTimeDay, creTimeYear, creTimeMonth, addReportDaysSubmit,
      btnCancelClick, onButtonTagClick, onButtonTagResetClick, creTimeChange }
  }
} 
</script>

<style lang='sass' scoped>
.create-log
  left: 0
  bottom: 0
  width: 100%
  height: 100%
  position: absolute
  border-top-left-radius: 20px
  border-top-right-radius: 20px
  transition: all .5s ease
  box-sizing: border-box
  text-align: left
  overflow: hidden

.container
  top: 5%
  left: 0
  width: 100%
  height: 95%
  border-top-left-radius: 20px
  border-top-right-radius: 20px
  background-color: #ecf0f1
  position: absolute
  h2
    margin-right: 10px
    vertical-align: middle
    display: inline-block
    font-size: 18px
    color: #1a2a3a


.log-type,
.cre-time,
.pro-name,
.receives,
.residues,
.comments
  width: 100%
  height: 50px
  line-height: 50px
  padding-left: 10px
  background-color: #FFF
  box-sizing: border-box
  margin-top: 2px

.btns-top
  width: 100%
  height: 38px
  padding-left: 10px
  padding-right: 10px
  border-top-left-radius: 20px
  border-top-right-radius: 20px
  background-color: #FFF
  box-sizing: border-box
  font-size: 18px
  button
    height: 100%
    color: red

.btn-cancel
  float: left

.btn-addLog,
.btn-delete,
.btn-change
  float: right


.log-type
  width: 100%
  height: 50px
  line-height: 50px
  padding-left: 10px
  background-color: #FFF
  box-sizing: border-box
  margin-top: 10px
  h2
    vertical-align: middle
    display: inline-block

  button
    width: 70px
    height: 30px
    margin-right: 10px
    transition: all .2s ease
    box-shadow: 1px 2px 3px #34495e
    font-size: 16px

.cre-time
  select
    height: 30px
    border: 1px solid #33495D
    margin-right: 10px
    font-size: 16px

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


.pro-name select
  width: 260px
  height: 35px
  border: 1px solid #227FB7
  font-size: 16px
  color: #1a2a3a

.receives input,
.residues input,
.comments input
  width: 170px
  height: 30px
  border: 1px solid #ccc
  text-indent: 8px
  font-size: 16px

</style>

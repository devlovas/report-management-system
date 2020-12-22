<template>
  <div class='create-log' :style='{height: createLog.boxHold ? "100%" : "0"}'>
    <div class='container'>
      <div class='btns-top'>
        <button class='btn-cancel' @click='btnCancelClick'>取消</button> 
        <button class='btn-addLog'>添加</button> 
        <button class='btn-delete' v-show='false'>删除</button>
        <button class='btn-change' v-show='false'>修改</button>
      </div>

      <div class='cre-time'>
        <h2>时间：</h2> 
        <select v-model='creTimeYear' @change='creTimeChange'>
          <option v-for='i in 7' :value='2018+i'>{{2018 + i}}年</option>
        </select>
        <select v-model='creTimeMonth' @change='creTimeChange'>
          <option v-for='i in 12' :value='i'>{{String(i).padStart(2, 0)}}月</option>
        </select>
        <select v-model='creTimeDay'>
          <option v-for='i in createLog.maxDays' :value='i'>{{String(i).padStart(2, 0)}}日</option>
        </select>
      </div>

      <div class='log-type'>
        <h2>类型：</h2> 
        <button @click='logsData.type = "检验"' :style='{color: logsData.type === "检验" ? "#FFF" : "#000",backgroundColor: logsData.type === "检验" ? "#2C97D8" : ""}'>检验</button>
        <button @click='logsData.type = "仓库"' :style='{color: logsData.type === "仓库" ? "#FFF" : "#000",backgroundColor: logsData.type === "仓库" ? "#2C97D8" : ""}'>仓库</button>
        <button @click='logsData.type = "主机"' :style='{color: logsData.type === "主机" ? "#FFF" : "#000",backgroundColor: logsData.type === "主机" ? "#2C97D8" : ""}'>主机</button>
      </div>

      <div class='classify'>
        <h2>分类：</h2>
        <select @blur='selectChange' v-model='optActive.specs'>
          <option :value='0'>规格</option>
          <option :value='data.ID' v-for='data in labels.specs'>{{data.NAME}}</option>
        </select>
        <select @blur='selectChange' v-model='optActive.color'>
          <option :value='0'>颜色</option>
          <option :value='data.ID' v-for='data in labels.color'>{{data.NAME}}</option>
        </select>
        <select @blur='selectChange' v-model='optActive.other'>
          <option :value='0'>其它</option>
          <option :value='data.ID' v-for='data in labels.other'>{{data.NAME}}</option>
        </select>
      </div>

      <div class='pro-name'>
        <h2>品名：</h2>
        <select>
          <option :value='data.ID' v-for='(data, idx) in product.opts'>{{data.NAME}}</option>
        </select>
      </div>

      <div class='receives'>
        <h2>领用：</h2> 
        <input type="text" v-model='logsData.rece'>
      </div>
      <div class='residues'>
        <h2>剩余：</h2> 
        <input type="text" v-model='logsData.resi'>
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
import { getMaxDays } from '/@/tools/index.js'

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
        other: []
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
        type: '',
        name: '',
        rece: '0',
        resi: '0',
        comm: '(无)'
      }
    })


    Api.get.label().then(data => {
      if (!data.err_code && data.result) {
        data.result.forEach(label => state.labels[label.TYPE].push(label) )
      }
    }).catch(err => console.log(err))

    Api.get.product().then(data => {
      if(!data.err_code && data.result) {
        state.product.data = data.result
        state.product.opts = data.result
      }

    }).catch(err => console.log(err))

    function btnCancelClick () {
      store.commit('setCreateLogBoxHold', false)
    }

    function selectChange () {
      const sels = Object.values(state.optActive)
      if (!sels.length) state.product.opts = state.product.data

      state.product.opts = []

      state.product.data.forEach(item => {
        if (item.CLASSIFY.contains(sels.filter(v => Boolean(v)))) {
          state.product.opts.push(item)
        }
      })
    }

    function creTimeChange (){
      getMaxDays(store, creTimeYear.value + String(creTimeMonth.value).padStart(2,0))
    }

    return { ...state, ...store.state,
      creTimeDay, creTimeYear, creTimeMonth,
      btnCancelClick, selectChange, creTimeChange }
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
.classify,
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
  margin-top: 10px

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
    font-size: 18px
    vertical-align: middle
    display: inline-block

  button
    width: 70px
    height: 30px
    margin-right: 10px
    box-shadow: 1px 2px 3px #34495e
    font-size: 16px

.cre-time
  select
    height: 30px
    border: 1px solid #33495D
    margin-right: 10px
    font-size: 16px

.classify select
  width: 70px
  height: 30px
  margin-right: 10px
  border: 1px solid #EC4C40
  font-size: 16px
  color: #1a2a3a

.pro-name select
  width: 230px
  height: 30px
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

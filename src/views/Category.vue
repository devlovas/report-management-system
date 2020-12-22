<template>
  <div class='category'>
    <Toolbar/>
    <div class='classify' v-show='labels.specs.length'>
      <h2>当前分类：</h2> 
      <button @click='labels.crrType = "specs"' :style='{color: labels.crrType === "specs" ? "#FFF" : "#1a2a3a", backgroundColor: labels.crrType === "specs" ? "#2C97D8" : ""}'>规格</button>
      <button @click='labels.crrType = "color"' :style='{color: labels.crrType === "color" ? "#FFF" : "#1a2a3a", backgroundColor: labels.crrType === "color" ? "#2C97D8" : ""}'>颜色</button>
      <button @click='labels.crrType = "other"' :style='{color: labels.crrType === "other" ? "#FFF" : "#1a2a3a", backgroundColor: labels.crrType === "other" ? "#2C97D8" : ""}'>其它</button>
    </div>

    <div class='labels' v-show='labels.specs.length'>
      <!-- 标签列表 -->
      <button v-for='data in labels[labels.crrType]' @click='onButtonClick(data)' :style='{backgroundColor: (products.selected.CLASSIFY && products.selected.CLASSIFY.indexOf(data.ID) != -1 ? "#e74c3c": "")}'>
       {{data.NAME}}
      </button>

      <!-- 添加标签 -->
      <div class='add-label'>
        <form action="#">
          <input ref='inpLabelElem' type="text" v-model='labelText' :style='{width: `${labels.inputHold ? 100 : 0}px`, opacity: `${labels.inputHold ? 1 : 0}`}'>
          <i @click='addLabelOnClick' v-show='!labels.inputHold'><svg t="1608547794666" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="37936" width="32" height="32"><path d="M531.192944 736.105843c-23.144432 1.128997-47.417861 1.693495-71.126792 1.693495-229.186329 0-417.164278-45.159868-442.566703-104.432194-2.257993 4.515987-3.38699 9.031974-3.38699 13.54796l0 117.415656c5.080485 63.223815 202.654906 114.593164 445.389195 114.593164 62.094818 0 120.802646-3.38699 174.429989-9.596472C586.513782 836.586549 550.950386 789.733186 531.192944 736.105843z" p-id="37937" fill="#8a8a8a"></path><path d="M513.693495 638.44763c0-40.643881 8.467475-79.029768 23.708931-113.464168-25.402426 1.128997-51.36935 1.693495-77.900772 1.693495-229.750827 0-417.164278-45.159868-442.566703-104.432194-2.257993 4.515987-3.38699 9.596472-3.38699 14.112459l0 117.415656c5.080485 63.223815 202.654906 114.593164 445.389195 114.593164 19.192944 0 37.821389-0.564498 56.449835-1.128997C514.257993 657.640573 513.693495 648.6086 513.693495 638.44763z" p-id="37938" fill="#8a8a8a"></path><path d="M797.071665 355.06946c37.256891 0 73.384785 7.338479 106.125689 20.886439 0.564498-2.257993 1.128997-4.515987 1.693495-7.338479L904.890849 251.201764c0-64.352811-199.832415-117.415656-445.389195-117.415656-246.121279 0-445.389195 53.062845-445.953693 117.415656l0 117.415656c5.080485 63.223815 202.654906 114.593164 445.953693 114.593164 34.998897 0 69.433297-1.128997 102.738699-3.38699C613.045204 404.745314 699.413451 355.06946 797.071665 355.06946z" p-id="37939" fill="#8a8a8a"></path><path d="M797.071665 411.519294c-125.318633 0-226.928335 101.609702-226.928335 226.928335 0 125.318633 101.609702 226.928335 226.928335 226.928335 125.318633 0 226.928335-101.609702 226.928335-226.928335C1024 513.128997 922.390298 411.519294 797.071665 411.519294zM822.47409 663.850055l0 160.31753-50.804851 0 0-160.31753-160.31753 0 0-50.804851 160.31753 0L771.669239 453.292172l50.804851 0 0 160.31753L982.227122 613.609702l0 50.240353L822.47409 663.850055z" p-id="37940" fill="#8a8a8a"></path></svg></i>
          <i @click='addLabelSubmit' v-show='labels.inputHold'><svg t="1608608619917" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5925" width="32" height="32"><path d="M512 976.7424c-256.67072 0-464.7424-208.07168-464.7424-464.73728C47.2576 255.32928 255.32928 47.2576 512 47.2576s464.7424 208.07168 464.7424 464.7424c0 256.67072-208.07168 464.7424-464.7424 464.7424z m225.41312-754.26816c-161.65888 106.2144-264.18176 424.86272-264.18176 424.86272L410.14272 490.54208l-130.11968 101.16096c55.20896 25.28768 134.0672 106.2144 201.09312 212.4288 47.31392-111.26784 193.20832-338.87744 264.18176-359.11168-27.5968-80.9216-11.82208-146.67776-7.8848-222.54592z m0 0" fill="#1296db" p-id="5926"></path></svg></i>
        </form>
      </div>
    </div>
    <div class='product' v-show='products.data.length'>

      <!-- 品名列表 -->
      <ul>
        <li v-for='(data, index) in products.data' @click='onProductClick(data)' :style='{backgroundColor: products.selected.ID == data.ID ? "#00B26D" : ""}'>
          {{String(++index).padStart(3, 0)}} : {{data.NAME}}
        </li>
        <li>{{products.data.length + 1}} :</li>
      </ul>

      <!-- 添加品名 -->
      <div class='add-product'>
        <form action="#">
          <input ref='inpProductElem' type="text" v-model='productText' :style='{width: `${products.inputHold ? 200 : 0}px`, opacity: `${products.inputHold ? 1 : 0}`}'>
          <i @click='addProductOnClick' v-show='!products.inputHold'><svg t="1608549315854" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="39452" width="21" height="21"><path d="M1024 256L768 0 128 640 0 1024 384 896.498054zM307.498833 747.081712L747.081712 307.498833l82.776654 82.776653-439.58288 439.184436z m656.136965-491.081712L859.542412 360.093385 663.906615 164.457588 768 60.364202z m-329.911284-61.459922l82.776653 82.776654-439.184435 439.184435-82.776654-82.776653zM67.436576 956.264591l33.36965-99.610895 66.83891 66.838911z m145.431906-48.510505l-96.9214-96.921401 48.908949-146.428016L359.595331 859.143969zM341.366537 981.366537h512v42.633463h-512zM938.633463 981.366537h85.366537v42.633463h-85.366537z" fill="#8a8a8a" p-id="39453"></path></svg></i>
          <i @click='addProductSubmit' v-show='products.inputHold'><svg t="1608608619917" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5925" width="32" height="32"><path d="M512 976.7424c-256.67072 0-464.7424-208.07168-464.7424-464.73728C47.2576 255.32928 255.32928 47.2576 512 47.2576s464.7424 208.07168 464.7424 464.7424c0 256.67072-208.07168 464.7424-464.7424 464.7424z m225.41312-754.26816c-161.65888 106.2144-264.18176 424.86272-264.18176 424.86272L410.14272 490.54208l-130.11968 101.16096c55.20896 25.28768 134.0672 106.2144 201.09312 212.4288 47.31392-111.26784 193.20832-338.87744 264.18176-359.11168-27.5968-80.9216-11.82208-146.67776-7.8848-222.54592z m0 0" fill="#1296db" p-id="5926"></path></svg></i>
        </form>
      </div>
    </div>
    <foot-tagbar/>
  </div>
</template>

<script>
import Toolbar from '/@/components/Toolbar.vue'
import FootTagbar from '/@/components/FootTagbar.vue'
import { getLabelRequest, getProductRequest, addLabelRequest, addProductRequest, chgProductRequest } from '/@/service/request.js'

import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { dialog } from '/@/tools/index.js'
export default {
  name: 'Category',
  components: { Toolbar, FootTagbar },
  setup () {
    const store = useStore()
    const inpLabelElem = ref(null)
    const inpProductElem = ref(null)

    const labelText = ref(null)
    const productText = ref(null)

    const state = reactive({
      labels: {
        specs: [],
        color: [],
        other: [],
        inputHold: false,
        crrType: 'specs'
      },
      products: {
        data: [],
        selected: {},
        inputHold: false
      }
    })

    function setLabels (data) {
      if (!data.err_code && data.result) {
        state.labels.specs = []
        state.labels.color = []
        state.labels.other = []
        data.result.forEach(label => state.labels[label.TYPE].push(label) )
      }
    }

    // 获取分类
    getLabelRequest()
    .then(data => { setLabels(data)})
    .catch(err => console.log(err))

    // 获取品名
    getProductRequest().then(data => {
      if (!data.err_code && data.result) {
        state.products.data = data.result
        state.products.selected = data.result[0]
      }
    }).catch(err => console.log(err))

    function addLabelOnClick () {
      inpLabelElem.value.focus()
      state.labels.inputHold = true
    }

    function addLabelSubmit () {
      addLabelRequest({name: labelText.value, type: state.labels.crrType})
      .then(data => {
        
        setLabels(data)

        if (!data.err_code && data.result) {
          dialog(store, 'success', data.message) // 打开通知消息
          labelText.value = null
        } else dialog(store, 'error', data.message)

      }).catch(err => { console.log(err) })
      state.labels.inputHold = false
    }

    function addProductOnClick () {
      inpProductElem.value.focus()
      state.products.inputHold = true
    }

    function addProductSubmit () {
      addProductRequest({name: productText.value})
      .then(data => {

        if (!data.err_code && data.result) {
          dialog(store, 'success', data.message) // 打开通知消息
          state.products.data = data.result
          productText.value = null
        } else dialog(store, 'error', data.message)

      }).catch(err => { console.log(err) })
      state.products.inputHold = false
    }

    function onProductClick (data) {
      state.products.selected = data
    }

    function onButtonClick (data) {
      var selected = state.products.selected
      var classify = selected.CLASSIFY

      if (classify.indexOf(data.ID) != -1) {
        classify = classify.filter(v => v != data.ID) // 去除已有分类ID
      } else { classify.push(data.ID) } // 新增分类ID

      chgProductRequest({
        id: selected.ID,
        name: selected.NAME,
        classify: classify.join(',')
      })
      .then(data => {

        if (!data.err_code && data.result) {
          state.products.data = data.result 
          dialog(store, 'success', data.message) // 打开通知消息
          var selected = state.products.selected
          selected.CLASSIFY = (data.result.filter(v => selected.ID === v.ID))[0].CLASSIFY
        } else dialog(store, 'error', data.message)

      }).catch(err => { console.log(err) })
    }

    return { ...store.state, ...state,
      labelText, productText,
      inpLabelElem, inpProductElem,
      addLabelOnClick, addLabelSubmit,
      addProductOnClick, addProductSubmit,
      onButtonClick, onProductClick }
  }
}
</script>

<style lang='sass' scoped>
.category
  width: 100%
  height: 100%

.classify
  width: 100%
  height: 10%
  line-height: 50px
  background-color: #FFF
  padding-left: 10px
  text-align: left
  font-size: 16px
  button
    width: 70px
    height: 30px
    margin-right: 10px
    box-shadow: 1px 2px 3px #34495e
    font-size: 16px

  h2
    margin-right: 10px
    vertical-align: middle
    display: inline-block
    font-size: 18px
    color: #1a2a3a



.labels,
.product
  width: 100%
  padding: 5px
  margin-bottom: 10px
  box-sizing: border-box
  text-align: left
  overflow: auto

  button
    margin: 5px
    padding: 2px
    width: 50px
    border-radius: 5px
    display: inline-block
    box-sizing: border-box
    border: 1px solid #aaa
    background-color: #61687A
    font-size: 16px
    color: #FFF

.labels
  height: 25%

form
  margin-top: 5px
  vertical-align: middle
  display: inline-block
  input
    float: left
    height: 30px
    margin-right: 2px
    border-radius: 20px
    border: 1px solid #666
    transition: all 0.5s ease
    text-indent: 10px
    font-size: 16px

  i
    float: left
    transition: all 0.5s ease

.add-label
  display: inline-block

.product
  height: 45%
  padding-bottom: 20px
  box-sizing: border-box
  li
    width: 100%
    height: 50px
    font-size: 18px
    line-height: 50px
    padding-left: 5px
    border-top: 1px solid #ccc
    box-sizing: border-box
    background-color: #FFF
    overflow: height

.add-product
  margin-top: -45px
  margin-left: 50px
</style>

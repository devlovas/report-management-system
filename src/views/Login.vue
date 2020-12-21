<template>
  <div class='login'>
    <h1>报表统计系统</h1>

    <form class='loginRef' action='#' method='post'>
      <!-- 账号区域 -->
      <div class='inp-accInput' :style='{border: `1px solid ${formStyle.border.accInput}`}'>
        <i class='inp-icon'><svg t="1607666394017" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1522" width="25" height="25"><path d="M793.6 316.991c0-163.287-131.807-295.658-294.4-295.658S204.8 153.704 204.8 316.991c0 163.288 131.807 295.659 294.4 295.659S793.6 480.279 793.6 316.99z m-537.6 0c0-134.89 108.884-244.239 243.2-244.239 134.316 0 243.2 109.35 243.2 244.24 0 134.89-108.884 244.239-243.2 244.239-134.316 0-243.2-109.35-243.2-244.24z" p-id="1523" fill="#ffffff"></path><path d="M0 998.29V1024h1024v-25.71c0-230.827-236.91-437.06-512-437.06-16.552 0-33.01 0.67-49.34 2.003-14.092 1.149 22.596 13.553 23.74 27.706 14.95-1.22 10.431 21.71 25.6 21.71 248.31 0 460.8 184.975 460.8 385.642l25.6-25.71H25.6l25.6 25.71c0-136.534 85.814-261.346 224.064-330.852 12.642-6.356 17.76-21.802 11.431-34.498-6.329-12.697-21.709-17.837-34.351-11.48C97.582 699.267 0 841.195 0 998.29z" p-id="1524" fill="#ffffff"></path></svg></i>
        <input type="text" v-model='loginForm.accInput' @blur='onBlurOfaccInput' @focus='onFocusOfaccInput' @keyup='inputChange' maxLength='15' :style='{color: formStyle.color.inputText.accInput}' placeholder='请输入账号'>
        <div class='extend-fun'>
          <i class='del-icon' @click='loginForm.accInput = ""' :style='{visibility: iconStatus.visibility.delIconAcc, opacity: iconStatus.opacity.delIconAcc}'><svg t="1607691144114" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12295" width="32" height="32"><path d="M512 64q190.016 4.992 316.512 131.488T960 512q-4.992 190.016-131.488 316.512T512 960q-190.016-4.992-316.512-131.488T64 512q4.992-190.016 131.488-316.512T512 64z m0 394.016l-104-104q-12-12-27.488-12t-27.008 11.488-11.488 27.008 12 27.488l104 104-104 104q-12 12-12 27.488t11.488 27.008 27.008 11.488 27.488-12l104-104 104 104q16 15.008 36.992 9.504t26.496-26.496-9.504-36.992L565.984 512l104-104q12-12 12-27.488t-11.488-27.008-27.008-11.488-27.488 12z" p-id="12296" fill="#e6e6e6"></path></svg></i>
          <i class='err-icon' :style='{visibility: iconStatus.visibility.errIconAcc, opacity: iconStatus.opacity.errIconAcc}'><svg t="1607677425488" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6812" width="32" height="32"><path d="M512 938.666667C276.352 938.666667 85.333333 747.648 85.333333 512S276.352 85.333333 512 85.333333s426.666667 191.018667 426.666667 426.666667-191.018667 426.666667-426.666667 426.666667z m0-85.333334a341.333333 341.333333 0 1 0 0-682.666666 341.333333 341.333333 0 0 0 0 682.666666z m-42.666667-213.333333h85.333334v85.333333h-85.333334v-85.333333z m0-341.333333h85.333334v256h-85.333334V298.666667z" p-id="6813" fill="#d81e06"></path></svg></i>
        </div>
      </div>

      <!-- 密码区域 -->
      <div class='inp-pasInput' :style='{border: `1px solid ${formStyle.border.pasInput}`}'>
        <i class='inp-icon'><svg t="1607666574967" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3173" width="25" height="25"><path d="M974.96177778 984.86044445H47.78666667V299.46311111h927.17511111v685.39733334z m-854.35733333-72.81777778h781.53955555V372.28088889H120.60444445v539.76177778zM747.29244445 248.71822222h-72.81777778c0-89.99822222-73.15911111-163.15733333-163.15733334-163.15733333-89.99822222 0-163.15733333 73.15911111-163.15733333 163.15733333h-72.81777778c0-130.16177778 105.81333333-235.97511111 235.97511111-235.97511111s235.97511111 105.92711111 235.97511112 235.97511111z" p-id="3174" fill="#ffffff"></path><path d="M275.34222222 230.05866667h72.81777778v130.73066666h-72.81777778zM674.47466667 230.05866667h72.81777778v130.73066666h-72.81777778zM601.77066667 601.88444445c0-46.19377778-37.43288889-83.62666667-83.62666667-83.62666667s-83.62666667 37.43288889-83.62666667 83.62666667c0 33.10933333 19.22844445 61.78133333 47.21777778 75.32088888v106.60977778h72.81777778v-106.60977778c27.87555555-13.53955555 47.21777778-42.21155555 47.21777778-75.32088888z" p-id="3175" fill="#ffffff"></path></svg></i>
        <input type="password" v-model='loginForm.pasInput' @blur='onBlurOfpasInput' @focus='onFocusOfpasInput' :style='{color: formStyle.color.inputText.pasInput}' maxLength='15' placeholder='请输入密码'>
        <div class='extend-fun'>
          <i class='del-icon' @click='loginForm.pasInput = ""' :style='{visibility: iconStatus.visibility.delIconPas, opacity: iconStatus.opacity.delIconPas}'><svg t="1607691144114" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12295" width="32" height="32"><path d="M512 64q190.016 4.992 316.512 131.488T960 512q-4.992 190.016-131.488 316.512T512 960q-190.016-4.992-316.512-131.488T64 512q4.992-190.016 131.488-316.512T512 64z m0 394.016l-104-104q-12-12-27.488-12t-27.008 11.488-11.488 27.008 12 27.488l104 104-104 104q-12 12-12 27.488t11.488 27.008 27.008 11.488 27.488-12l104-104 104 104q16 15.008 36.992 9.504t26.496-26.496-9.504-36.992L565.984 512l104-104q12-12 12-27.488t-11.488-27.008-27.008-11.488-27.488 12z" p-id="12296" fill="#e6e6e6"></path></svg></i>
          <i class='err-icon' :style='{visibility: iconStatus.visibility.errIconPas, opacity: iconStatus.opacity.errIconPas}'><svg t="1607677425488" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6812" width="32" height="32"><path d="M512 938.666667C276.352 938.666667 85.333333 747.648 85.333333 512S276.352 85.333333 512 85.333333s426.666667 191.018667 426.666667 426.666667-191.018667 426.666667-426.666667 426.666667z m0-85.333334a341.333333 341.333333 0 1 0 0-682.666666 341.333333 341.333333 0 0 0 0 682.666666z m-42.666667-213.333333h85.333334v85.333333h-85.333334v-85.333333z m0-341.333333h85.333334v256h-85.333334V298.666667z" p-id="6813" fill="#d81e06"></path></svg></i>
        </div>
      </div>

      <!-- 登录区域 -->
      <div class='btn-submit'>
        <button @click.prevent='submitLoginForm'>登&nbsp;&nbsp;&nbsp;录</button>
      </div>
    </form>

    <div class='otherLogin'>
      <p>或</p>
      <p>其它登录方式</p>
      <i class='facebook-icon'><svg t="1607693406967" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17128" width="48" height="48"><path d="M512 64.050782c60.495816 0 119.153774 11.836583 174.345794 35.181267 53.335742 22.558785 101.245915 54.864562 142.401244 96.01989s73.461105 89.066525 96.01989 142.401244c23.344684 55.19202 35.181267 113.851001 35.181267 174.345794 0 60.494793-11.836583 119.153774-35.181267 174.345793-22.558785 53.334719-54.864562 101.245915-96.01989 142.401244s-89.066525 73.461105-142.401244 96.019891c-55.19202 23.344684-113.851001 35.181267-174.345794 35.181267s-119.153774-11.836583-174.345794-35.181267c-53.335742-22.558785-101.245915-54.864562-142.401244-96.019891S121.791857 739.679489 99.233072 686.34477c-23.344684-55.19202-35.181267-113.851001-35.181267-174.345793 0-60.495816 11.836583-119.153774 35.181267-174.345794 22.558785-53.335742 54.864562-101.245915 96.01989-142.401244s89.066525-73.461105 142.401244-96.01989c55.19202-23.344684 113.849978-35.181267 174.345794-35.181267m0-51.16531c-275.653107 0-499.114528 223.461421-499.114528 499.114528S236.346893 1011.114528 512 1011.114528s499.114528-223.461421 499.114528-499.114528S787.653107 12.885472 512 12.885472z" fill="#e6e6e6" p-id="17129"></path><path d="M450.54023 373.666398v76.873832h-61.508889v92.188632h61.508889v215.156268h92.205005V542.729885h92.222401v-92.188632h-92.206028v-61.491493c0-18.450211 12.295024-30.729885 30.697139-30.729885h61.508889V266.113847h-76.906577c-58.356083-0.001023-107.520829 49.1627-107.520829 107.552551z" fill="#e6e6e6" p-id="17130"></path></svg></i>
    </div>

    <div class='footer-link'>
      <a class='link' href="javascript: void(0)">忘记密码</a>
      <a class='link' href="javascript: void(0)">创建账户</a>
    </div>
  </div>
</template>

<script>
import { dialog } from '/@/tools/index.js'
import { reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useStore } from 'vuex'
import { userLoginRequest } from '/@/service/request.js'
import { checkLoginInput, loginFormInputChangeForBlurAndFoucs } from '/@/components/Login/utils.js'

export default {
  name: 'Login',
  setup () {
    onMounted(() => {
    })

    const route = useRoute()
    const store = useStore()
    const router = useRouter()

    const state = reactive({
      loginForm: {
        accInput: '13517438529',
        pasInput: '13517438529'
      },
      iconStatus: {
        opacity: {
          delIconAcc: 0,
          delIconPas: 0,
          errIconAcc: 0,
          errIconPas: 0
        },
        visibility: {
          delIconAcc: 'hidden',
          delIconPas: 'hidden',
          errIconAcc: 'hidden',
          errIconPas: 'hidden'
        }
      },
      formStyle: {
        color: {
          inputText: {
            accInput: 'rgba(44, 62, 80, 0.8)',
            pasInput: 'rgba(44, 62, 80, 0.8)'
          }
        },
        border: {
          accInput: 'rgba(255, 255, 255, 0.5)',
          pasInput: 'rgba(255, 255, 255, 1)'
        }
      }
    })

    function inputChange () {
      /**
       * @description: accInput input 只能以数字形式输入
       * @return void
       */

      const lForm = state.loginForm
      lForm.accInput = lForm.accInput.replace(/[^\d]/g, '')
    }

    async function submitLoginForm (e) {
      try {

        if (checkLoginInput({state, store})) {
          const data = await userLoginRequest(state.loginForm)

          if (!data.err_code) {
            dialog(store, 'success', data.message)
            setTimeout(() => router.push('/home'), 1500)
          }
          else dialog(store, 'error', data.message)
        }

      }

      catch (e) { console.log(e) }
    }

    return { ...state, inputChange, submitLoginForm, 
      ...loginFormInputChangeForBlurAndFoucs(state)
    }
  }
}

</script>

<style lang='sass' scoped>
.login
  width: 100%
  height: 100%
  background-color: #E798A6

.loginRef
  width: 100%
  height: 200px
  .inp-icon
    float: left
    width: 50px
    height: 100%
    padding-top: 8px
    display: inline-block
    border-right: 2px solid rgba(255,255,255,0.5)
    box-sizing: border-box

  .extend-fun
    float: right
    width: 48px
    height: 50px
    position: relative
    .del-icon,
    .err-icon
      top: 8px
      left: 10px
      position: absolute
      transition: all 0.5s linear

.btn-submit,
.inp-accInput,
.inp-pasInput
  width: 300px
  height: 50px
  margin-bottom: 20px
  border: 1px solid rgba(255, 255, 255, 0.5)
  background-color: rgba(255, 255, 255, 0.5)
  transition: all 1s ease
  box-sizing: border-box
  display: inline-block

.inp-accInput,
.inp-pasInput
  input
    float: left
    width: 200px
    height: 50px
    font-size: 21px
    text-indent: 10px
    background-color: rgba(0, 0, 0, 0)

.btn-submit button
  width: 300px
  height: 50px
  font-size: 24px
  background-color: #E6FFF8
  color: #6B8986

.otherLogin
  margin: 20px 0
  p
    &:nth-child(1)
      font-size: 24px
      margin-bottom: 20px
    margin-bottom: 10px
    font-size: 18px
    color: rgba(255, 255, 255, 0.8)

.footer-link 
  width: 100%
  display: flex
  line-height: 30px
  justify-content: space-around

  .link
    font-size: 18px
    opacity: 0.8
    color: #FFF

h1
  margin-bottom: 20px
  line-height: 100px
  font-weight: bold
  font-size: 50px
  color: #FFF
</style>

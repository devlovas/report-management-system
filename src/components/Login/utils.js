  function setOpacityAndVisibilityForBlur (state, type) {
  /**
   * @description: 文本框失去焦点
   * @param {Object} state 数据
   * @param {String} type
   * @return void
   */

  state.iconStatus.opacity['delIcon' + type] = 0
  setTimeout(() => { state.iconStatus.visibility['delIcon' + type] = 'hidden' }, 5)
}

function setOpacityAndVisibilityForFocus (state, type) {
  /**
   * @description: 文本框得到焦点
   * @param {Object} state 数据
   * @param {String} type
   * @return void
   */

  state.iconStatus.opacity['delIcon' + type] = 1
  state.iconStatus.visibility['delIcon' + type] = 'visible' 
  state.iconStatus.opacity['errIcon' + type] = 0
  state.iconStatus.visibility['errIcon' + type] = 'hidden'
  state.formStyle.border[type != 'Acc' ? 'pasInput' : 'accInput'] = 'rgba(255, 255, 255, 0.5)'
  state.formStyle.color.inputText[type != 'Acc' ? 'pasInput' : 'accInput'] = 'rgba(44, 62, 80, 0.8)'
}

function loginFormInputChangeForBlurAndFoucs (state) {
  /**
   * @description: 文本框得到/失去焦点 执行的功能
   * @param {Object} state 数据
   * @return void
   */

  return {
    onFocusOfaccInput () { setOpacityAndVisibilityForFocus(state, 'Acc') },
    onFocusOfpasInput () { setOpacityAndVisibilityForFocus(state, 'Pas') },
    onBlurOfaccInput () { setOpacityAndVisibilityForBlur(state, 'Acc') },
    onBlurOfpasInput () { setOpacityAndVisibilityForBlur(state, 'Pas') }
  }
}

function setOpacityAndVisibilityForErrIcon (state, type) {
  /**
   * @description: 在文本框中显示错误图标
   * @param {Object} state 数据
   * @param {String} type
   * @return void
   */
  const flag = 'errIcon' + type.substr(0, 1).toUpperCase() + type.substr(1,2)

  state.iconStatus.opacity[flag] = 1
  state.iconStatus.visibility[flag] = 'visible'
}

function checkInput (data, type) {
  /**
   * @description: 设置文本框检查规则
   * @param {Object} state 数据
   * @param {String} type
   * @return Boolean
   */

  if (!data.state.loginForm[type]) {
    setOpacityAndVisibilityForErrIcon(data.state, type)
    data.state.formStyle.border[type] = 'rgba(255, 0, 0, 0.5)'
    data.store.commit('dialog', [3, `请输入${type != 'accInput' ? '密码' : '账号'} !`])
    return false
  }

  if (data.state.loginForm[type].length < 6) {
    setOpacityAndVisibilityForErrIcon(data.state, type)
    data.state.formStyle.color.inputText[type] = 'rgba(255, 0, 0, 0.5)'
    data.state.formStyle.border[type] = 'rgba(255, 0, 0, 0.8)'
    data.store.commit('dialog', [3, '字符长度 6~15 !'])
    return false
  }

  return true
}

function checkLoginInput (data) {
  /**
   * @description: 检查文本框中的数据是否合法
   * @param {Object} state 数据
   * @return Boolean
   */

  if (!checkInput(data, 'accInput') || !checkInput(data, 'pasInput')) return false
  return true
}

export { checkLoginInput, loginFormInputChangeForBlurAndFoucs }

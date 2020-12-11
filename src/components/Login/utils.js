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
  state.iconStatus.opacity['errIcon' + type] = 0;
  state.iconStatus.visibility['errIcon' + type] = 'hidden';
}

function loginFormInputChangeForBlurAndFoucs (state) {
  /**
   * @description: 文本框得到/失去焦点 执行的功能
   * @param {Object} state 数据
   * @return void
   */

  return {
    onFocusOfAccount () { setOpacityAndVisibilityForFocus(state, 'Acc') },
    onFocusOfPassword () { setOpacityAndVisibilityForFocus(state, 'Pas') },
    onBlurOfAccount () { setOpacityAndVisibilityForBlur(state, 'Acc') },
    onBlurOfPassword () { setOpacityAndVisibilityForBlur(state, 'Pas') }
  }
}

function setOpacityAndVisibilityForErrIcon (state, type) {
  /**
   * @description: 在文本框中显示错误图标
   * @param {Object} state 数据
   * @param {String} type
   * @return void
   */

  state.iconStatus.opacity['errIcon' + type] = 1;
  state.iconStatus.visibility['errIcon' + type] = 'visible';
}

function checkInput (state, type) {
  /**
   * @description: 设置文本框检查规则
   * @param {Object} state 数据
   * @param {String} type
   * @return Boolean
   */

  const vo = (type != 'Acc') ? 'password' : 'account';
  if (!state.loginForm[vo] || state.loginForm[vo].length < 6) {
    setOpacityAndVisibilityForErrIcon(state, type)
    return false
  }

  return true
}

function checkLoginInput (state) {
  /**
   * @description: 检查文本框中的数据是否合法
   * @param {Object} state 数据
   * @return Boolean
   */

  if (!checkInput(state, 'Acc') || !checkInput(state, 'Pas')) return false
  return true
}

export { checkLoginInput, loginFormInputChangeForBlurAndFoucs }

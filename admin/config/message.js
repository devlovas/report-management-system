const userStatus = {
  // 用户登录
  userLoginDataFail: {
    err_code: 1000,
    message: '数据不能为空！'
  },
  userLoginLthFail: {
    err_code: 1001,
    message: '字符长度不符合要求 6 ~ 20！'
  },
  userLoginAccExistsFail: {
    err_code: 1002,
    message: '账户不存在！'
  },
  userLoginPwdExistsFail: {
    err_code: 1003,
    message: '密码不正确！'
  },
  userLoginSuccess: {
    err_code: 0,
    message: '登录成功！'
  },

  // 用户注册
  userRegisterFail: {
    err_code: 2000,
    message: '注册功能暂不开放！'
  },
}

module.exports = {
  ...userStatus
}

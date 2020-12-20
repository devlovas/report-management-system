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
    message: '账号不存在！'
  },
  userLoginPwdExistsFail: {
    err_code: 1003,
    message: '密码不正确！'
  },
  userLoginFail: {
    err_code: 1004,
    message: '登录失败！'
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


const categoryStatus = {
  creatingLabelDataFail: {
    err_code: 3000,
    message: '数据不能为空！'
  },
  creatingLabelLthFail: {
    err_code: 3001,
    message: '字符长度不符合要求 2 ~ 10！'
  },
  creatingLabelExistsFail: {
    err_code: 3002,
    message: '此分类已存在！'
  },
  creatingLabelFail: {
    err_code: 3003,
    message: '添加失败！'
  },
  getLabelFail: {
    err_code: 3010,
    message: '获取失败, 请重新刷新页面！'
  },
  delLabelDataFail: {
    err_code: 3020,
    message: '数据不能为空！'
  },
  delLabelLthFail: {
    err_code: 3021,
    message: '字符长度不符合要求 1 ~ 4！'
  },
  delLabelExistsFail: {
    err_code: 3022,
    message: '分类不存在！'
  },
  delLabelFail: {
    err_code: 3023,
    message: '删除失败！'
  },
  delLabelSuccess: {
    err_code: 0,
    message: '删除成功！'
  },
  getLabelSuccess: {
    err_code: 0,
    message: '获取成功！'
  },
  creatingLabelSuccess: {
    err_code: 0,
    message: '添加成功！'
  }
}

module.exports = {
  ...userStatus,
  ...categoryStatus
}

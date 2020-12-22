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


const labelStatus = {
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
  getLabelFail: {
    err_code: 3010,
    message: '获取失败, 请重新刷新页面！'
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

const productStatus = {
  creatingProductDataFail: {
    err_code: 4000,
    message: '数据不能为空！'
  },
  creatingProductLthFail: {
    err_code: 4001,
    message: '字符长度不符合要求 2 ~ 30！'
  },
  creatingProductExistsFail: {
    err_code: 4002,
    message: '此产品已存在！'
  },
  delProductDataFail: {
    err_code: 4010,
    message: '数据不能为空！'
  },
  delProductLthFail: {
    err_code: 4011,
    message: '字符长度不符合要求 1 ~ 4！'
  },
  delProductExistsFail: {
    err_code: 4012,
    message: '产品不存在！'
  },
  delProductFail: {
    err_code: 4013,
    message: '删除失败！'
  },
  getProductFail: {
    err_code: 4020,
    message: '获取失败, 请重新刷新页面！'
  },
  chgProductDataFail: {
    err_code: 4030,
    message: '数据不能为空！'
  },
  chgProductLthFail: {
    err_code: 4031,
    message: '字符长度不符合要求 2 ~ 30！'
  },
  chgProductExistsFail: {
    err_code: 4032,
    message: '产品不存在！'
  },
  chgProductFail: {
    err_code: 4013,
    message: '修改失败！'
  },
  chgProductSuccess: {
    err_code: 0,
    message: '修改成功！'
  },
  creatingProductSuccess: {
    err_code: 0,
    message: '添加成功！'
  },
  delProductSuccess: {
    err_code: 0,
    message: '删除成功！'
  },
  getProductSuccess: {
    err_code: 0,
    message: '获取成功！'
  }
}

const createlogStatus = {
  createlogGetDaysDataFail: {
    err_code: 5000,
    message: '数据不能为空！'
  },
  createlogGetDaysLthFail: {
    err_code: 5001,
    message: '字符长度不符合要求！'
  },
  createlogGetDaysFail: {
    err_code: 5002,
    message: '天数获取失败！'
  },
  createlogGetDaysSuccess: {
    err_code: 0,
    message: '天数获取成功'
  }
}

module.exports = {
  ...userStatus,
  ...labelStatus,
  ...productStatus,
  ...createlogStatus
}

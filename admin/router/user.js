const express = require('express')
const router = express.Router()

const { userLogin } = require('../controller/user')
const { ErrorReply } = require('../model/reply_model')
const { userRegisterFail } = require('../config/status_code')

// 用户登录
router.post('/login', async (req, res) => {
  try { res.json(await userLogin({...req.body})) }
  catch(e) { res.json(e) }
})

// 用户注册
router.post('/register', (req, res) => {
  res.json(new ErrorReply({...userRegisterFail, result: null}))
})

module.exports = router

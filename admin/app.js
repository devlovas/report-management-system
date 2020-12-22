const express = require('express')
const app = express()
const port = 8888

const userRouter = require('./router/user')
const categoryRouter = require('./router/category')
const createlogRouter = require('./router/createlog')

app.use(express.json()) // 开启解析 application/json
app.use(express.urlencoded({extended: false})) // 开启表单类型的解析

// 用户管理
app.use('/reportcms/user', userRouter)

// 产品分类
app.use('/reportcms/category', categoryRouter)

// 创建日报
app.use('/reportcms/createlog', createlogRouter)

app.listen(port, () => {
  console.log(`Dev server running at:
  > Local:    http://localhost:${port}/
  > Network:  http://192.168.0.243:${port}/`)
})

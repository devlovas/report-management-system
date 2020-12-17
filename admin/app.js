const express = require('express')
const app = express()
const port = 8888

const userRouter = require('./router/user')

app.use(express.json()) // 开启解析 application/json
app.use(express.urlencoded({extended: false})) // 开启表单类型的解析

// 用户管理
app.use('/reportcms/user', userRouter)

app.listen(port, () => {
  console.log(`Dev server running at:
  > Local:    http://localhost:${port}/
  > Network:  http://192.168.0.243:${port}/`)
})

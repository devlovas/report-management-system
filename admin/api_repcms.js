const express = require('express')
const app = express()

const session = require('express-session')
const userRouter = require('./router/user')
const categoryRouter = require('./router/category')
const createlogRouter = require('./router/createlog')

app.use(express.static('public'))

app.use(session({
  secret: '3ANpdjJt9AyX3cUKEpjX51k2fFsLMJkwTD5Jc',
  cookie: { path:'/', httpOnly: true, maxAge: 1000 * 60 * 24 * 7 }
}))

app.use(express.json()) // 开启解析 application/json
app.use(express.urlencoded({extended: false})) // 开启表单类型的解析

// 用户管理
app.use('/user', userRouter)

// 产品分类
app.use('/category', categoryRouter)

// 创建日报
app.use('/createlog', createlogRouter)

const port = 3000

app.listen(port, () => {
  console.log(`Dev server running at:
  > Local:    http://localhost:${port}/
  > Network:  http://192.168.0.243:${port}/`)
})

const express = require('express')
const router = express.Router()

const { creatingLabel, getCategoryLabel, delCategoryLabel } = require('../controller/category')

// 创建分类
router.post('/add/label', async (req, res) => {
  try { res.json(await creatingLabel({...req.body})) }
  catch(e) { res.json(e) }
})

// 删除分类
router.post('/del/label', async (req, res) => {
  try { res.json(await delCategoryLabel({...req.body})) }
  catch(e) { res.json(e) }
})

// 获取分类
router.post('/get/label', async (req, res) => {
  try { res.json(await getCategoryLabel()) }
  catch(e) { res.json(e) }
})

module.exports = router

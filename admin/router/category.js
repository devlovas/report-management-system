const express = require('express')
const router = express.Router()

const { creatingLabel, 
        getCategoryLabel, getProductData,
        delCategoryLabel, delCategoryProduct,
        chgCategoryProduct, creatingProduct
      } = require('../controller/category')

// 创建分类
router.post('/label/add', async (req, res) => {
  try { res.json(await creatingLabel({...req.body})) }
  catch(e) { res.json(e) }
})

// 删除分类
router.post('/label/del', async (req, res) => {
  try { res.json(await delCategoryLabel({...req.body})) }
  catch(e) { res.json(e) }
})

// 获取分类
router.post('/label/get', async (req, res) => {
  try { res.json(await getCategoryLabel()) }
  catch(e) { res.json(e) }
})

// 创建产品
router.post('/product/add', async (req, res) => {
  try { res.json(await creatingProduct({...req.body})) }
  catch(e) { res.json(e) }
})

// 获取产品
router.post('/product/get', async (req, res) => {
  try { res.json(await getProductData({...req.body})) }
  catch(e) { res.json(e) }
})

// 删除产品
router.post('/product/del', async (req, res) => {
  try { res.json(await delCategoryProduct({...req.body})) }
  catch(e) { res.json(e) }
})

// 修改产品
router.post('/product/chg', async (req, res) => {
  try { res.json(await chgCategoryProduct({...req.body})) }
  catch(e) { res.json(e) }
})

module.exports = router

const express = require('express')
const router = express.Router()

const { getNumberOfDays, addReportDays } = require('../controller/createlog')

// 得到天数
router.post('/days/get', async (req, res) => {
  try { res.json(await getNumberOfDays({...req.body})) }
  catch(e) { res.json(e) }
})

// 添加日报
router.post('/days/add', async (req, res) => {
  try { res.json(await addReportDays({...req.body})) }
  catch(e) { res.json(e) }
})

module.exports = router

const express = require('express')
const router = express.Router()

const { getNumberOfDays } = require('../controller/createlog')

// 得到天数
router.post('/days/get', async (req, res) => {
  try { res.json(await getNumberOfDays({...req.body})) }
  catch(e) { res.json(e) }
})

module.exports = router

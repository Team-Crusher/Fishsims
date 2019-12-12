const router = require('express').Router()
const imageToMap = require('../../script/imageToMap')
const file = 'baseballStalker.png'

router.get('/', async (req, res, next) => {
  try {
    const map = await imageToMap(file)
    res.json(map)
  } catch (err) {
    next(err)
  }
})

module.exports = router

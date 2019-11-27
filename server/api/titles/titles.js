const titles = require('./titles.json')

const router = require('express').Router()
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const title = titles[Math.floor(Math.random() * titles.length)]
    res.json(title)
  } catch (err) {
    next(err)
  }
})

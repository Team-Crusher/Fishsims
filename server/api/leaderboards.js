const router = require('express').Router()
const {Leaderboard} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const query = {
      limit: 10
    }
    if (req.query.board) {
      query.where = {board: req.query.board}
    }
    const scores = await Leaderboard.findAll(query)
    res.json(scores)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {name, score} = req.body
    const result = await Leaderboard.create({name, score, board: 'ALL'})
    res.json(result)
  } catch (err) {
    next(err)
  }
})

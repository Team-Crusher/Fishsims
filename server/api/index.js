const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))

// router.get("/:gameid",(req, res, next) => {
//   const game = await Game.findAll({where:{gameid}})
//   res.json()
// })

// router.get("/",(req, res, next) => {
//   const games = await Game.findAll()
//   const game = games[0]
//   res.json()
// })

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

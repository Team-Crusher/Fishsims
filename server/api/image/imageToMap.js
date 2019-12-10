const router = require('express').Router()
const Jimp = require('jimp')
const file = 'baseballStalker.png'

router.get('/', (req, res, next) => {
  try {
    Jimp.read(`server/api/image/${file}`, function(err, image) {
      if (err) {
        res.send(err.toString())
        return
      }
      const gray = image.resize(65, 65).greyscale()
      let max = 0
      for (let x = 0; x < 65; x++) {
        for (let y = 0; y < 65; y++) {
          const curr = Jimp.intToRGBA(gray.getPixelColor(x, y)).r
          if (curr > max) {
            max = curr
          }
        }
      }
      const map = []
      for (let y = 0; y < 65; y++) {
        map.push([])
        for (let x = 0; x < 65; x++) {
          map[y].push(
            Math.floor(Jimp.intToRGBA(gray.getPixelColor(x, y)).r / max * 65)
          )
        }
      }
      res.json(map)
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router

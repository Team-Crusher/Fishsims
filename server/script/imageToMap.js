/* eslint-disable complexity */

const Jimp = require('jimp')

async function imageToMap(file) {
  let image
  try {
    image = await Jimp.read(`server/api/image/${file}`)
  } catch (err) {
    return false
  }
  const gray = image.resize(65, 65).grayscale()
  let max = 0,
    maxAlpha = 0,
    minAlpha = 256
  for (let x = 0; x < 65; x++) {
    for (let y = 0; y < 65; y++) {
      const curr = Jimp.intToRGBA(gray.getPixelColor(x, y))
      if (curr.r > max) {
        max = curr.r
      }
      if (curr.a > maxAlpha) {
        maxAlpha = curr.a
      }
      if (curr.a < minAlpha) {
        minAlpha = curr.a
      }
    }
  }

  const map = []
  for (let y = 0; y < 65; y++) {
    map.push([])
    for (let x = 0; x < 65; x++) {
      const curr = Jimp.intToRGBA(gray.getPixelColor(x, y))
      if (max === 0 && maxAlpha !== minAlpha) {
        map[y].push(Math.floor((curr.a - minAlpha) / maxAlpha * 64))
      } else if (max === 0) {
        map[y].push(0)
      } else {
        map[y].push(Math.floor(curr.r / max * 65))
      }
    }
  }
  return map
}

module.exports = imageToMap

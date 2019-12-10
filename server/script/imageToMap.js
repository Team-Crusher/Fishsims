const Jimp = require('jimp')

async function imageToMap(file) {
  let image
  try {
    image = await Jimp.read(`server/api/image/${file}`)
  } catch (err) {
    return false
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
  return map
}

module.exports = imageToMap

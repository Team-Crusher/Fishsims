const {getLand} = require('../../utilityMethods.js')
const {makeMap, N} = require('./fractal-noise.js')

// make new map and make sure that it's viable
module.exports = () => {
  const area = N * N,
    propLand = 0.3
  let newMap,
    landTiles,
    c = 0
  do {
    newMap = makeMap()
    landTiles = getLand(newMap)
    c++
  } while (
    (landTiles.length / area > propLand ||
      landTiles / area <= propLand + 0.07) &&
    c < 50
  )
  return newMap
}

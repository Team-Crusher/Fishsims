const {getLand} = require('../../utilityMethods.js')
const {makeMap, N} = require('../../fractal-noise.js')

// make new map and make sure that it's viable
module.exports = () => {
  const area = N * N,
    propLand = 0.3
  let newMap, landTiles
  do {
    newMap = makeMap()
    landTiles = getLand(newMap)
  } while (landTiles.length / area > propLand)
  return newMap
}

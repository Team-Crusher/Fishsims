const {getLand, getCoast, getWater} = require('../../utilityMethods.js')
const {makeMap, N} = require('./fractal-noise.js')
const fs = require('fs')

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
    landTiles.length / area < propLand - 0.1 ||
    (landTiles.length / area > propLand + 0.1 && c < 50)
  )
  //  getLand(newMap)
  //  getWater(newMap)
  //  getCoast(newMap)
  fs.writeFile(`map21.txt`, JSON.stringify(newMap), err => {
    if (err) throw err
    console.log('wrote file')
  })
  return newMap
}

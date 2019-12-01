const TILE_SIZE = 32
const MAP_TILE_SIZE = 8
const SEA_LEVEL = 47

const drawMap = (ctx, map) => {
  map.forEach((row, i) => {
    row.forEach((x, j) => {
      if (x >= 60) ctx.fillStyle = 'silver'
      else if (x < 60 && x >= 57) ctx.fillStyle = 'darkgreen'
      else if (x < 57 && x >= 50) ctx.fillStyle = 'yellowgreen'
      else if (x < 50 && x >= 47) ctx.fillStyle = 'wheat'
      else if (x < 47 && x >= 30) ctx.fillStyle = 'deepskyblue'
      else if (x < 30 && x >= 15) ctx.fillStyle = 'royalblue'
      else ctx.fillStyle = 'mediumblue'
      ctx.fillRect(
        MAP_TILE_SIZE * j,
        MAP_TILE_SIZE * i,
        MAP_TILE_SIZE,
        MAP_TILE_SIZE
      )
      ctx.strokeStyle = ctx.fillStyle
      ctx.strokeRect(
        MAP_TILE_SIZE * j,
        MAP_TILE_SIZE * i,
        MAP_TILE_SIZE,
        MAP_TILE_SIZE
      )
    })
  })
}

module.exports = {drawMap, TILE_SIZE, SEA_LEVEL}

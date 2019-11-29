const TILE_SIZE = 32
const SEA_LEVEL = 47

const drawMap = (ctx, map) => {
  ctx.scale(0.3, 0.3)
  map.forEach((row, i) => {
    row.forEach((x, j) => {
      if (x >= 60) ctx.fillStyle = 'silver'
      else if (x < 60 && x >= 55) ctx.fillStyle = 'darkgreen'
      else if (x < 55 && x >= 50) ctx.fillStyle = 'green'
      else if (x < 50 && x >= 47) ctx.fillStyle = 'yellow'
      else if (x < 47 && x >= 30) ctx.fillStyle = 'blue'
      else if (x < 30 && x >= 20) ctx.fillStyle = 'mediumblue'
      else ctx.fillStyle = 'darkblue'
      ctx.fillRect(TILE_SIZE * j, TILE_SIZE * i, TILE_SIZE, TILE_SIZE)
      ctx.strokeStyle = ctx.fillStyle
      ctx.strokeRect(TILE_SIZE * j, TILE_SIZE * i, TILE_SIZE, TILE_SIZE)
    })
  })
}

module.exports = {drawMap, TILE_SIZE, SEA_LEVEL}

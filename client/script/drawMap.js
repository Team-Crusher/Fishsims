const TILE_SIZE = 32
const SEA_LEVEL = 47
const PIXEL = 1

const drawMap = (ctx, map) => {
  //    ctx.scale(0.6, 0.6)
  map.forEach((row, i) => {
    row.forEach((x, j) => {
      if (x >= 60) ctx.fillStyle = 'silver'
      else if (x < 60 && x >= 57) ctx.fillStyle = 'darkgreen'
      else if (x < 57 && x >= 50) ctx.fillStyle = 'yellowgreen'
      else if (x < 50 && x >= 47) ctx.fillStyle = 'wheat'
      else if (x < 47 && x >= 30) ctx.fillStyle = 'deepskyblue'
      else if (x < 30 && x >= 15) ctx.fillStyle = 'royalblue'
      else ctx.fillStyle = 'mediumblue'
      ctx.fillRect(PIXEL * j, PIXEL * i, PIXEL, PIXEL)
      ctx.strokeStyle = ctx.fillStyle
      ctx.strokeRect(PIXEL * j, PIXEL * i, PIXEL, PIXEL)
    })
  })
  return ctx.canvas.toDataURL()
}

module.exports = {drawMap, TILE_SIZE, SEA_LEVEL}

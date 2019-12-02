const TILE_SIZE = 32
const SEA_LEVEL = 47
const FAKE_DRAW_SIZE = 1

const drawMap = (ctx, map) => {
  ctx.canvas.width = map[0].length
  ctx.canvas.height = map.length
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      const x = map[row][col]
      if (x >= 60) ctx.fillStyle = 'silver'
      else if (x < 60 && x >= 57) ctx.fillStyle = 'darkgreen'
      else if (x < 57 && x >= 50) ctx.fillStyle = 'yellowgreen'
      else if (x < 50 && x >= 47) ctx.fillStyle = 'wheat'
      else if (x < 47 && x >= 30) {
        ctx.fillStyle = 'deepskyblue'
      } else if (x < 30 && x >= 15) ctx.fillStyle = 'royalblue'
      else ctx.fillStyle = 'mediumblue'
      ctx.fillRect(
        FAKE_DRAW_SIZE * col,
        FAKE_DRAW_SIZE * row,
        FAKE_DRAW_SIZE,
        FAKE_DRAW_SIZE
      )
    }
  }
  return ctx.canvas.toDataURL()
}

module.exports = {drawMap, TILE_SIZE, SEA_LEVEL}

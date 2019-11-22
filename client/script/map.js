/* eslint-disable complexity */
const tileSize = 64

function drawVoid(ctx, x, y) {
  ctx.fillStyle = 'black'
  ctx.fillRect(x, y, tileSize, tileSize)
}

function drawGrass(ctx, x, y) {
  ctx.fillStyle = 'green'
  ctx.fillRect(x, y, tileSize, tileSize)
}

function drawWater(ctx, x, y) {
  ctx.fillStyle = 'blue'
  ctx.fillRect(x, y, tileSize, tileSize)
}

function drawFishery(ctx, x, y) {
  ctx.fillStyle = 'yellow'
  ctx.fillRect(x, y, tileSize, tileSize)
}

const tileRenders = [drawVoid, drawWater, drawGrass, drawFishery]

// Scroll
// let worldX = 0
// let worldY = 0

function drawWorld(ctx, tiles, scroll) {
  const tx = scroll.x / tileSize || 0
  const ty = scroll.y / tileSize || 0
  const tW = ctx.canvas.width / tileSize || 0
  const tH = ctx.canvas.height / tileSize || 0

  ctx.setTransform(1, 0, 0, 1, -scroll.x, -scroll.y)

  for (let y = 0; y < tH; y += 1) {
    for (let x = 0; x < tW; x += 1) {
      const currentRow = tiles[y + Math.floor(ty)] || []
      const currentTile = currentRow[x + Math.floor(tx)] || 0
      tileRenders[currentTile](
        ctx,
        (Math.floor(tx) + x) * tileSize,
        (Math.floor(ty) + y) * tileSize
      )
    }
  }
}

export const drawMap = (ctx, tiles, view) => {
  // reset stuff so it's easy to draw
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.globalAlpha = 1

  // Draw the map
  drawWorld(ctx, tiles, view.pos)
}

export const tickMap = (velocity, scroll) => {
  scroll.x += velocity.x
  scroll.y += velocity.y
}

export const mapListeners = (incScroll, setScroll, setZoom) => {
  document.addEventListener('wheel', e => {
    incScroll(e.deltaX, e.deltaY)
  })
}

// setInterval(update, 1000)

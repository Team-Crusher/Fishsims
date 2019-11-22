/* eslint-disable complexity */
const tileSize = 64
const MAP_SIZE = 1000

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

function drawWorld(ctx, tiles, scroll, incScroll) {
  const tx = scroll.x / tileSize || 0
  const ty = scroll.y / tileSize || 0
  const tW = ctx.canvas.width / tileSize || 0
  const tH = ctx.canvas.height / tileSize || 0

  if (scroll.x < 0) {
    incScroll(MAP_SIZE * tileSize, 0)
  }
  if (scroll.y < 0) {
    incScroll(0, MAP_SIZE * tileSize)
  }

  ctx.setTransform(1, 0, 0, 1, -scroll.x, -scroll.y)

  for (let y = 0; y < tH + 1; y += 1) {
    const currentRow = tiles[(y + Math.floor(ty)) % MAP_SIZE] || []
    for (let x = 0; x < tW + 1; x += 1) {
      const currentTile = currentRow[(x + Math.floor(tx)) % MAP_SIZE] || 0
      tileRenders[currentTile](
        ctx,
        (Math.floor(tx) + x) * tileSize,
        (Math.floor(ty) + y) * tileSize
      )
    }
  }
}

export const drawMap = (ctx, tiles, view, is) => {
  // reset stuff so it's easy to draw
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.globalAlpha = 1

  // Draw the map
  drawWorld(ctx, tiles, view.pos, is)
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

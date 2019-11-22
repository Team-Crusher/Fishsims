const tileSize = 64

// actually draw the stuff
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

const tileRenders = [() => {}, drawWater, drawGrass, drawFishery]

// Scroll
// let worldX = 0
// let worldY = 0

function drawWorld(ctx, tiles, scroll) {
  const tx = 0 // (worldX / tileSize) | 0; // get the top left tile
  const ty = 0 // (worldY / tileSize) | 0;
  const tW = tiles[0].length // ((canvas.width / tileSize) | 0); // get the number of tiles to fit canvas
  const tH = tiles.length // ((canvas.height / tileSize) | 0);

  // set the location (floor fits to pixel)
  ctx.setTransform(1, 0, 0, 1, Math.floor(-scroll.x), Math.floor(-scroll.y))

  // Draw the tiles
  for (let y = 0; y < tH; y += 1) {
    for (let x = 0; x < tW; x += 1) {
      // console.log("(", x, ",", y, ")");
      const currentTile = tiles[y][x] || 0
      tileRenders[currentTile](ctx, (tx + x) * tileSize, (ty + y) * tileSize)
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

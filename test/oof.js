const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')
const tileSize = 64

// ctx.canvas.width = 666
canvas.setAttribute('width', window.innerWidth)
canvas.setAttribute('height', window.innerHeight)

const tiles = [
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 2, 2, 3, 2]
]

const boats = [
  {
    x: 69,
    y: 69
  }
]
// BOAT

const dxB = (fish, boat) => {
  return (
    (fish.x - boat.x) /
    Math.sqrt(Math.pow(fish.x - boat.x, 2) + Math.pow(fish.y - boat.y, 2))
  )
}

const dyB = (fish, boat) => {
  return (
    (fish.y - boat.y) /
    Math.sqrt(Math.pow(fish.x - boat.x, 2) + Math.pow(fish.y - boat.y, 2))
  )
}

function circle(ctx, x, y, radius, fill) {
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false)
  ctx.fillStyle = fill
  ctx.fill()
  ctx.lineWidth = 5
  ctx.strokeStyle = '#003300'
  ctx.stroke()
}

function drawBoat(ctx, x, y) {
  // ctx.fillStyle = "brown"
  circle(ctx, x, y, 10, 'brown')
}

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
let worldX = 0
let worldY = 0

function drawWorld() {
  const tx = 0 // (worldX / tileSize) | 0; // get the top left tile
  const ty = 0 // (worldY / tileSize) | 0;
  const tW = tiles[0].length // ((canvas.width / tileSize) | 0); // get the number of tiles to fit canvas
  const tH = tiles.length // ((canvas.height / tileSize) | 0);

  // set the location (floor fits to pixel)
  ctx.setTransform(1, 0, 0, 1, Math.floor(-worldX), Math.floor(-worldY))

  // Draw the tiles
  for (let y = 0; y < tH; y += 1) {
    for (let x = 0; x < tW; x += 1) {
      // console.log("(", x, ",", y, ")");
      const currentTile = tiles[y][x] || 0
      tileRenders[currentTile](ctx, (tx + x) * tileSize, (ty + y) * tileSize)
    }
  }
}

function drawBoats() {
  boats.forEach(boat => {
    drawBoat(ctx, boat.x, boat.y)
    boat.x += tileSize
  })
}

const velocity = {
  x: 0,
  y: 0
}

function update() {
  // reset stuff so it's easy to draw
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.globalAlpha = 1

  worldX += velocity.x
  worldY += velocity.y
  // Draw the map
  drawWorld()
  drawBoats()
}

setInterval(update, 1000)

document.addEventListener(
  'onkeypress',
  e => {
    // console.log(e);
  },
  false
)

const board = require('./server/store/board').init
const store = require('./server/store/')
const allPlayers = [{id: 1, docks: [{i: 1, j: 7}]}]
const TILE_SIZE = 32
//const allPlayers =

const waterTiles = []
const landTiles = []
const occupiedTiles = []

for (let i = 0; i < board.length; i++) {
  for (let j = 0; j < board[i].length; j++) {
    // Nb: if we have more of a range of numbers, change conditional to reflect that
    if (board[i][j] === 1) waterTiles.push({i, j})
    else if (board[i][j] === 2) landTiles.push({i, j})
  }
}

// returns which board tile a set of coordinates resolves to
const coordsToTile = coords => ({
  x: Math.floor(coords.x / TILE_SIZE),
  y: Math.floor(coords.y / TILE_SIZE)
})

// returns the top-left coordinates of a given board tile
const getTileOrigin = tile => ({x: tile.x * TILE_SIZE, y: tile.y * TILE_SIZE})

// checks traversible as mouse moves
const validatePath = coords => {
  let toReturn = false
  const tile = coordsToTile(coords)
  if (board[tile.y][tile.x] === 2) {
    // disallow movement on land
    return toReturn
  } else {
    return true
  }
}

const rand = () => Math.random() - 0.5

let heights = []
const k = 6
const N = Math.pow(2, k) + 1
for (let i = 0; i < N; i++) {
  const a = []
  for (let j = 0; j < N; j++) a.push(0)
  heights.push(a)
}

let step = N - 1
let noise = step / 2
// initialize corners first
heights[0][0] = noise * rand()
heights[step][0] = noise * rand()
heights[0][step] = noise * rand()
heights[step][step] = noise * rand()
// magic
while (step > 1) {
  for (let i = step / 2; i < N; i += step) {
    for (let j = step / 2; j < N; j += step) {
      let sum = 0
      let count = 0
      if (j - step / 2 >= 0 && i - step / 2 >= 0) {
        sum += heights[j - step / 2][i - step / 2]
        count++
      }
      if (j - step / 2 >= 0 && i + step / 2 < N) {
        sum += heights[j - step / 2][i + step / 2]
        count++
      }
      if (j + step / 2 < N && i + step / 2 < N) {
        sum += heights[j + step / 2][i + step / 2]
        count++
      }
      if (j + step / 2 < N && i - step / 2 >= 0) {
        sum += heights[j + step / 2][i - step / 2]
        count++
      }
      // add to the array the average of parents + random * noise
      heights[j][i] = (sum / count || 0) + noise / 2 * rand()
    }
  }
  // up down
  for (let i = 0; i < N; i += step) {
    for (let j = step / 2; j < N; j += step) {
      let sum = 0
      let count = 0
      if (j - step / 2 >= 0) {
        sum += heights[j - step / 2][i]
        count++
      }
      if (j + step / 2 < N) {
        sum += heights[j + step / 2][i]
        count++
      }
      if (i - step / 2 >= 0) {
        sum += heights[j][i - step / 2]
        count++
      }
      if (i + step / 2 < N) {
        sum += heights[j][i + step / 2]
        count++
      }
      heights[j][i] = (sum / count || 0) + noise / 2 * rand()
    }
  }
  // left right
  for (let i = step / 2; i < N; i += step) {
    for (let j = 0; j < N; j += step) {
      let sum = 0
      let count = 0
      if (j - step / 2 >= 0) {
        sum += heights[j - step / 2][i]
        count++
      }
      if (j + step / 2 < N) {
        sum += heights[j + step / 2][i]
        count++
      }
      if (i - step / 2 >= 0) {
        sum += heights[j][i - step / 2]
        count++
      }
      if (i + step / 2 < N) {
        sum += heights[j][i + step / 2]
        count++
      }
      heights[j][i] = (sum / count || 0) + noise / 2 * rand()
    }
  }
  step /= 2
  noise = step / 2
}

const M = Math.max(...heights.map(row => Math.max(...row)))
const m = Math.min(...heights.map(row => Math.min(...row)))

// normalizing
for (let i = 0; i < N; i++)
  for (let j = 0; j < N; j++)
    heights[i][j] = Math.floor((heights[i][j] - m) / (M - m) * (N - 1))

// pgm output
console.log('P2')
console.log(`${N} ${N}`)
console.log(N)
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    let x = i
    let y = j

    /*    x = heights[x][y];
       y = heights[(x * 57 + 130) % N][(y + 25) % N]

       x = heights[x][y];
       y = heights[(x + 13) % N][(y * 7 + 259) % N]*/

    console.log(heights[x][y]) // > N / 2 ? N : 0);
  }
}

const spawnDock = docks => {
  let index = Math.floor(Math.random() * landTiles.length)
  let randomLand = landTiles[index]
  let landsChecked = new Map()
  landsChecked.set(index, randomLand)
  //  console.log(randomLand)
  let k = 0
  while (
    landsChecked.length < landTiles.length &&
    randomLand.i === docks[k].i &&
    randomLand.j === docks[k].j
  ) {
    occupiedTiles.push(randomLand)
    randomLand = landTiles[Math.floor(Math.random() * landTiles.length)]
    k++
  }
  if (landsChecked.length === landTiles.length) return {}
  else return randomLand
  // check return condition
}
spawnDock()

// --- //

// Test validatePath:
// Main diagonal test passes
/*let x = 0
   let y = 0
   while (x < TILE_SIZE * 8 && y < TILE_SIZE * 8) {
   console.log(validatePath({x, y}))
   x++
   y++
   }*/

module.exports = {
  validatePath,
  coordsToTile,
  getTileOrigin,
  spawnDock,
  waterTiles,
  landTiles
}

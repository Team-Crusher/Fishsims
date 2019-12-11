function deco(rs, prop, minH, maxH, maxAmount, buffD) {
  return {rs, prop, minH, maxH, maxAmount, buffD}
}

// if (x >= 60) ctx.fillStyle = 'silver'
// else if (x < 60 && x >= 57) ctx.fillStyle = 'darkgreen'
// else if (x < 57 && x >= 50) ctx.fillStyle = 'yellowgreen'
// else if (x < 50 && x >= 47) ctx.fillStyle = 'wheat'
// else if (x < 47 && x >= 34) {
//   ctx.fillStyle = 'deepskyblue'

const decoTypes = [
  deco(
    ['tree1.png', 'tree2.png', 'tree3.png', 'tree4.png', 'tree5.png'],
    0.3,
    50,
    60,
    999,
    0
  ),
  deco(
    ['beach1.png', 'beach2.png', 'beach3.png', 'beach4.png'],
    0.15,
    47,
    50,
    999,
    0
  ),
  deco(['mountain1.png', 'mountain2.png'], 1, 60, 100, 99999, 0),
  deco(['volcano1.png', 'volcano2.png'], 0.1, 60, 100, 6, 0)
]

function sortTilesIntoHeightRanges(map, ranges) {
  const levels = new Map()

  ranges.forEach(e => {
    levels.set(e[0] + ',' + e[1], [])
  })

  for (let i = 0; i < ranges.length; i++) {
    const rangeKey = ranges[i][0] + ',' + ranges[i][1]
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        const tile = map[y][x]
        if (tile >= ranges[i][0] && tile < ranges[i][1]) {
          levels.get(rangeKey).push({x, y, height: tile})
        }
      }
    }
  }
  return levels
}

function randFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function populateMapDecorations(map) {
  const ranges = decoTypes.map(e => [e.minH, e.maxH])
  const levels = sortTilesIntoHeightRanges(map, ranges)
  const placed = new Map()

  function populateDeco(decoration) {
    let amount = 0
    const tiles = levels.get(decoration.minH + ',' + decoration.maxH)
    for (let i = 0; i < tiles.length; i++) {
      const key = [tiles[i].x, tiles[i].y]
      if (!placed.has(key) && Math.random() < decoration.prop) {
        placed.set(key, randFromArray(decoration.rs))
        amount++
        if (amount === decoration.maxAmount) {
          break
        }
      }
    }
  }

  for (let i = 0; i < decoTypes.length; i++) {
    populateDeco(decoTypes[i])
  }

  const out = []
  for (let e of placed.entries()) {
    out.push({x: e[0][0], y: e[0][1], resource: e[1]})
  }

  return out
}

module.exports = {populateMapDecorations, sortTilesIntoHeightRanges}

import React from 'react'
import {connect} from 'react-redux'

function circle(ctx, x, y, radius, fill) {
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false)
  ctx.fillStyle = fill
  ctx.fill()
  ctx.lineWidth = 5
  ctx.strokeStyle = '#003300'
  ctx.stroke()
}

class Map extends React.Component {
  constructor() {
    super()
    this.drawBoat = this.drawBoat.bind(this)
    this.drawGrass = this.drawGrass.bind(this)
    this.drawWater = this.drawWater.bind(this)
    this.drawFishery = this.drawFishery.bind(this)

    this.drawWorld = this.drawWorld.bind(this)
    // this.drawFish = this.drawFish.bind(this)
    this.drawBoats = this.drawBoats.bind(this)

    this.tileRenders = [
      () => {},
      this.drawWater,
      this.drawGrass,
      this.drawFishery
    ]

    this.tileSize = 64
  }

  drawBoat(ctx, x, y) {
    // ctx.fillStyle = "brown"
    circle(ctx, x, y, 10, 'brown')
  }

  // actually draw the stuff
  drawGrass(ctx, x, y) {
    ctx.fillStyle = 'green'
    ctx.fillRect(x, y, this.tileSize, this.tileSize)
  }

  drawWater(ctx, x, y) {
    ctx.fillStyle = 'blue'
    ctx.fillRect(x, y, this.tileSize, this.tileSize)
  }

  drawFishery(ctx, x, y) {
    ctx.fillStyle = 'yellow'
    ctx.fillRect(x, y, this.tileSize, this.tileSize)
  }

  drawWorld() {
    const ctx = this.canvas.getContext('2d')
    const tiles = this.props.map
    const {sx, sy} = this.props.scroll

    const tx = 0 // (worldX / this.tileSize) | 0; // get the top left tile
    const ty = 0 // (worldY / this.tileSize) | 0;
    const tW = tiles[0].length // ((canvas.width / this.tileSize) | 0); // get the number of tiles to fit canvas
    const tH = tiles.length // ((canvas.height / this.tileSize) | 0);

    // set the location (floor fits to pixel)
    ctx.setTransform(1, 0, 0, 1, Math.floor(-sx), Math.floor(-sy))

    // Draw the tiles
    for (let y = 0; y < tH; y += 1) {
      for (let x = 0; x < tW; x += 1) {
        // console.log("(", x, ",", y, ")");
        const currentTile = tiles[y][x] || 0
        this.tileRenders[currentTile](
          ctx,
          (tx + x) * this.tileSize,
          (ty + y) * this.tileSize
        )
      }
    }
  }

  drawBoats() {
    const ctx = this.canvas.getContext('2d')

    this.props.boats.forEach(boat => {
      this.drawBoat(ctx, boat.x, boat.y)
      boat.x += this.tileSize
    })
  }

  draw() {
    this.drawWorld()
    this.drawBoats()
  }

  update() {
    // reset stuff so it's easy to draw
    const ctx = this.canvas.getContext('2d')

    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.globalAlpha = 1

    // worldX += velocity.x;
    // worldY += velocity.y;
    // Draw the map
    this.draw()
  }

  componentDidMount() {
    this.canvas.setAttribute('height', window.innerHeight)
    this.canvas.setAttribute('width', window.innerWidth)
    this.update()
  }

  componentDidUpdate() {
    this.update()
  }

  render() {
    return <canvas id="game" ref={ref => (this.canvas = ref)} />
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    map: state.map.map,
    scroll: state.map.scroll,
    boats: [{x: 0, y: 0}]
  }
}

const mapDispatch = dispatch => {
  return {}
}

export default connect(mapState, mapDispatch)(Map)

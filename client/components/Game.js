import React from 'react'
import {connect} from 'react-redux'
import {drawMap, tickMap, mapListeners} from '../script/map'
import {increaseScroll, setScrollPos, setMap, setPlayer} from '../store'
import {drawBoat, boatListener} from '../script/boats'
import {drawFish} from '../script/fish'

class Game extends React.Component {
  constructor() {
    super()

    this.handleResize = this.handleResize.bind(this)

    this.init = this.init.bind(this)
    this.draw = this.draw.bind(this)
    this.tick = this.tick.bind(this)
    this.update = this.update.bind(this)
  }

  handleResize() {
    console.log('resize')
    const {canvas} = this
    canvas.width = document.body.clientWidth
    canvas.height = document.body.clientHeight
  }
  /**
   * stuff that will only be done once
   */
  init() {
    this.handleResize()
    document.addEventListener('resize', this.handleResize, false)
    mapListeners(this.props.incScroll)
    boatListener()
  }

  /**
   * do all the canvas stuff
   */
  draw() {
    const ctx = this.canvas.getContext('2d')
    const {x, y} = this.props.view.pos
    ctx.clearRect(x - 1, y - 1, this.canvas.width + 1, this.canvas.height + 1)
    drawMap(ctx, this.props.map, this.props.view, this.props.incScroll)
    // boats
    if (this.props.boats.length) {
      this.props.boats.forEach(boat => {
        drawBoat(ctx, boat)
      })
    }
    // fishes
    if (this.props.fish.length) {
      this.props.fish.forEach(fish => {
        drawFish(ctx, fish)
      })
    }
  }

  /**
   * do all movement stuff
   */
  tick() {}

  /**
   * everything
   */
  update() {
    console.log('updating')
    this.tick()
    this.draw()
  }

  componentDidMount() {
    this.init()
    this.draw()
  }

  componentDidUpdate() {
    this.update()
  }

  render() {
    return (
      <canvas
        id="game"
        ref={ref => {
          this.canvas = ref
        }}
      />
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    map: state.map,
    view: state.view,
    player: state.player,
    boats: state.boats,
    fish: state.fish
  }
}

const mapDispatch = dispatch => {
  return {
    incScroll: (x, y) => dispatch(increaseScroll(x, y)),
    setScroll: (x, y) => dispatch(setScrollPos(x, y)),
    setMap: board => dispatch(setMap(board)),
    setPlayer: player => dispatch(setPlayer(player))
  }
}

export default connect(mapState, mapDispatch)(Game)

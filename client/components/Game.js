import React from 'react'
import {connect} from 'react-redux'
import {drawMap, tickMap, mapListeners} from '../script/map'
import {
  increaseScroll,
  setScrollPos,
  setCircles,
  // addCircle,
  setMap,
  setPlayer
} from '../store'
import {drawCircle, circleListener} from '../script/circles'
import {drawFish} from '../script/fish'
import socket from '../socket'

class Game extends React.Component {
  constructor() {
    super()

    this.handleResize = this.handleResize.bind(this)

    this.init = this.init.bind(this)
    this.draw = this.draw.bind(this)
    this.tick = this.tick.bind(this)
    this.update = this.update.bind(this)

    this.boats = []
    this.fishes = []
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
    socket.on('send-game-state', gameState => {
      this.props.setMap(gameState.board)
      // this.props.setPlayer(
      //   gameState.players.find(player => player.socketId === socket.id)
      // )
      this.fishes = gameState.fishes.reduce((acc, fish) => acc.concat(fish), [])
    })
    this.handleResize()
    document.addEventListener('resize', this.handleResize, false)
    mapListeners(this.props.incScroll)
    circleListener(this.props.addCircle)
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
    if (this.boats.length) {
      this.boats.forEach(boat => {
        drawCircle(ctx, boat)
      })
    }
    // fishes
    if (this.fishes.length) {
      this.fishes.forEach(fish => {
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
    socket.on('send-game-state', gameState => {
      this.props.setMap(gameState.board)
      // get da boatz
      this.boats = gameState.players.reduce((acc, player) => {
        const addedBoats = acc.concat(player.boats)
        return addedBoats
      }, [])
      // get dems fishies
      this.fishes = gameState.fishes.reduce((acc, fish) => acc.concat(fish), [])
    })
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
    //    map: state.map.map,
    map: state.map,
    boats: [{x: 0, y: 0}],
    view: state.view,
    circles: state.circles,
    player: state.player
  }
}

const mapDispatch = dispatch => {
  return {
    incScroll: (x, y) => dispatch(increaseScroll(x, y)),
    setScroll: (x, y) => dispatch(setScrollPos(x, y)),
    setCircles: circles => dispatch(setCircles(circles)),
    setMap: board => dispatch(setMap(board)),
    setPlayer: player => dispatch(setPlayer(player))
    // addCircle: (x, y) => dispatch(addCircle(x, y)),
  }
}

export default connect(mapState, mapDispatch)(Game)

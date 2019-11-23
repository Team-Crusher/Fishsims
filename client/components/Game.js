import React from 'react'
import {connect} from 'react-redux'
import {drawMap, tickMap, mapListeners} from '../script/map'
import {increaseScroll, setScrollPos, setCircles, addCircle} from '../store'
import {drawCircle, circleListener} from '../script/circles'
import socket from '../socket'

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
    socket.on('server-circles', circles => {
      console.log("everyone's circles: ", circles)
      this.props.setCircles(circles)
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
    // drawMap(ctx, this.props.map, this.props.view, this.props.incScroll)

    if (this.props.circles) {
      console.log(
        'in circles draw FO REAL. These are the circles: ',
        this.props.circles
      )
      this.props.circles.forEach(circle => {
        console.log('Current circle ', circle)
        drawCircle(ctx, circle)
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
    map: state.map.map,
    boats: [{x: 0, y: 0}],
    view: state.view,
    circles: state.circles
  }
}

const mapDispatch = dispatch => {
  return {
    incScroll: (x, y) => dispatch(increaseScroll(x, y)),
    setScroll: (x, y) => dispatch(setScrollPos(x, y)),
    setCircles: circles => dispatch(setCircles(circles))
    // addCircle: (x, y) => dispatch(addCircle(x, y)),
  }
}

export default connect(mapState, mapDispatch)(Game)
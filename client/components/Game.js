import React from 'react'
import {connect} from 'react-redux'
import {drawMap, tickMap, mapListeners} from '../script/map'
import {increaseScroll} from '../store'

class Game extends React.Component {
  constructor() {
    super()
    this.init = this.init.bind(this)
    this.draw = this.draw.bind(this)
    this.tick = this.tick.bind(this)
    this.update = this.update.bind(this)
  }

  /**
   * stuff that will only be done once
   */
  init() {
    const {canvas} = this
    canvas.width = document.body.clientWidth
    canvas.height = document.body.clientHeight

    mapListeners(this.props.incScroll)
  }

  /**
   * do all the canvas stuff
   */
  draw() {
    const ctx = this.canvas.getContext('2d')
    drawMap(ctx, this.props.map, this.props.view)
  }

  /**
   * do all movement stuff
   */
  tick() {}

  /**
   * everything
   */
  update() {
    this.tick()
    this.draw()
  }

  componentDidMount() {
    this.init()
    this.update()
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
    view: state.view
  }
}

const mapDispatch = dispatch => {
  return {
    incScroll: (x, y) => dispatch(increaseScroll(x, y))
  }
}

export default connect(mapState, mapDispatch)(Game)

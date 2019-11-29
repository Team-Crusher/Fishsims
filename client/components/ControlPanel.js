import React from 'react'
import {connect} from 'react-redux'
import store, {addBoat, setPixiGameState} from '../store'

class ControlPanel extends React.Component {
  constructor() {
    super()
    this.handleBuyBoat = this.handleBuyBoat.bind(this)
    this.handleChangeTurn = this.handleChangeTurn.bind(this)
  }

  handleBuyBoat() {
    store.dispatch(addBoat(this.props.player.name))
  }

  handleChangeTurn() {
    this.props.setPixiGameState(
      this.props.pixiGameState === 'playerTurn' ? 'computerTurn' : 'playerTurn'
    )
  }

  render() {
    const {name, dubloons} = this.props.player

    return (
      <div id="controlPanel">
        <div>
          <div>You are: {name}</div>
          <div>Dubloons: {dubloons}d</div>
        </div>
        <button type="button" name="buyBoat" onClick={this.handleBuyBoat}>
          Buy Boat (500d)
        </button>
        <button type="button" name="changeTurn" onClick={this.handleChangeTurn}>
          Change Turn
        </button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    player: state.player,
    pixiGameState: state.pixiGameState
  }
}

const mapDispatch = dispatch => {
  return {
    setPixiGameState: state => dispatch(setPixiGameState(state))
  }
}

export default connect(mapState, mapDispatch)(ControlPanel)

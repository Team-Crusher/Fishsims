import React from 'react'
import {connect} from 'react-redux'
import store, {addBoat} from '../store'

class ControlPanel extends React.Component {
  constructor() {
    super()
    this.handleBuyBoat = this.handleBuyBoat.bind(this)
  }

  handleBuyBoat() {
    store.dispatch(addBoat(this.props.player.name))
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
      </div>
    )
  }
}

const mapState = state => {
  return {
    player: state.player
  }
}

export default connect(mapState)(ControlPanel)

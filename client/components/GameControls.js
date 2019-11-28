import React from 'react'
import store, {addBoat} from '../store'

class GameControls extends React.Component {
  constructor() {
    super()
    this.handleBuyBoat = this.handleBuyBoat.bind(this)
  }

  handleBuyBoat() {
    const playerName = store.getState().player.name
    store.dispatch(addBoat(playerName))
  }

  render() {
    return (
      <div id="gameControls">
        <button type="button" name="buyBoat" onClick={this.handleBuyBoat}>
          Buy Boat
        </button>
      </div>
    )
  }
}

export default GameControls

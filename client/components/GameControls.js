import React from 'react'

class GameControls extends React.Component {
  constructor() {
    super()
    this.handleBuyBoat = this.handleBuyBoat.bind(this)
  }

  handleBuyBoat() {
    console.log('in Buy Boat')
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

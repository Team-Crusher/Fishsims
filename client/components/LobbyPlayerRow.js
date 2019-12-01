import React from 'react'
import {makeDarker} from '../script/utils'

class LobbyPlayerRow extends React.Component {
  componentDidMount() {
    const color = this.props.player.color
    this.mount.style.backgroundColor = color
    this.mount.style.color = makeDarker(color, 0.7)
  }

  render() {
    const {name} = this.props.player
    return (
      <li
        ref={ref => {
          this.mount = ref
        }}
      >
        <p className="player-name no-select">{name}</p>
      </li>
    )
  }
}

export default LobbyPlayerRow

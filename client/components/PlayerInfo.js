import React from 'react'
import {connect} from 'react-redux'
import {makeDarker} from '../script/utils'

class PlayerInfo extends React.Component {
  componentDidMount() {
    const {color} = this.props.me
    this.mount.style.backgroundColor = color
    this.mount.style.color = makeDarker(color, 0.5)
  }

  render() {
    const {name, dubloons} = this.props.me
    return (
      <div
        id="player-info"
        ref={ref => {
          this.mount = ref
        }}
      >
        <div id="player-info-name">{name}</div>
        <div id="player-info-dubloons">{dubloons}</div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    me: state.player
  }
}

export default connect(mapState)(PlayerInfo)

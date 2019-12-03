import React from 'react'
import {connect} from 'react-redux'
import {makeDarker, makeAlpha} from '../script/utils'

class PlayerInfo extends React.Component {
  componentDidMount() {
    const {color} = this.props.me
    const darker = makeDarker(color, 0.5)
    this.mount.style.backgroundColor = makeAlpha(color, 0.8)
    this.mount.style.color = darker
    this.mount.style.borderColor = darker
    this.dub.style.borderColor = darker
  }

  render() {
    const {name, dubloons} = this.props.me
    return (
      <div
        id="player-info"
        className="no-select"
        ref={ref => {
          this.mount = ref
        }}
      >
        <div id="player-info-name">{name}</div>
        <div
          ref={ref => {
            this.dub = ref
          }}
          id="player-info-dubloons"
        >
          {dubloons} Dubloons
        </div>
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

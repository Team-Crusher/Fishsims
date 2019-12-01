import React from 'react'
import {makeDarker} from '../script/utils'

class LeaderboardRanking extends React.Component {
  componentDidMount() {
    const {color} = this.props.rank
    this.mount.style.backgroundColor = color
    this.mount.style.color = makeDarker(color, 0.7)
  }

  render() {
    const {score, name} = this.props.rank
    const place = this.props.place

    return (
      <li
        ref={ref => {
          this.mount = ref
        }}
      >
        <p className="ranking no-select">
          <span className="rank-place">{place}</span>
          <span className="rank-name">{name}</span>
          <span className="rank-score">{score}</span>
        </p>
      </li>
    )
  }
}

export default LeaderboardRanking

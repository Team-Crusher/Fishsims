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
      <tr
        className="ranking no-select"
        ref={ref => {
          this.mount = ref
        }}
      >
        <td className="rank-place">{place}</td>
        <td className="rank-name">{name}</td>
        <td className="rank-score">{score}</td>
      </tr>
    )
  }
}

export default LeaderboardRanking

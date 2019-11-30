import React from 'react'

function makeDarker(color, amount) {
  const allowed = '1234567890,'
  let out = ''
  for (let i = 0; i < color.length; i++) {
    if (allowed.indexOf(color[i]) !== -1) {
      out += color[i]
    }
  }
  return (
    'rgb(' +
    out
      .split(',')
      .map(n => Math.round(parseInt(n, 10) * (1 - amount)))
      .join(',') +
    ')'
  )
}

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
        <p className="player-name">{name}</p>
      </li>
    )
  }
}

export default LobbyPlayerRow

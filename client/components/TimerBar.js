import React from 'react'
import './css/TimerBar.css'

export default class TimerBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      percentage: 100
    }

    this.start = this.start.bind(this)
  }

  start() {
    setInterval(() => {
      if (this.state.percentage <= 100) {
        this.setState(prevState => ({percentage: prevState.percentage - 5}))
      }
    }, 500)
  }

  componentDidMount() {
    this.start()
  }

  render() {
    return (
      <div>
        <h2> Timer </h2>
        <ProgressBar percentage={this.state.percentage} />

        <div
          style={{marginTop: '10px', color: 'blue', marginBottom: '15px'}}
          onClick={() => this.setState({percentage: 100})}
        >
          Reset
        </div>
      </div>
    )
  }
}

const ProgressBar = props => {
  return (
    <div className="progress-bar">
      <Filler percentage={props.percentage} />
    </div>
  )
}

const Filler = props => {
  return <div className="filler" style={{width: `${props.percentage}%`}} />
}

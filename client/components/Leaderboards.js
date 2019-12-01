import React from 'react'
import {connect} from 'react-redux'
import {fetchLeaderboards, setRoute} from '../store'

function makeRandom(length) {
  let result = ''
  const characters = '   abcdefghijklnopqrstuvxyz'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

class Leaderboards extends React.Component {
  constructor() {
    super()

    this.state = {
      currentBoard: 1,
      h5Text: 'all time high scores'
    }
    this.slot = this.slot.bind(this)

    this.boards = [
      {
        key: 'ALL',
        name: 'all time high scores'
      },
      {
        key: 'DAY',
        name: "today's best scores"
      }
    ]
  }
  componentDidMount() {
    // this.props.load()
  }

  slot() {
    const targetNum = (this.state.currentBoard + 1) % this.boards.length,
      targetText = this.boards[targetNum].name,
      amount = 70
    this.setState({currentBoard: targetNum})
    let i = 0
    const clear = setInterval(() => {
      i++
      if (i > amount) {
        this.setState({h5Text: targetText})
        clearInterval(clear)
        console.log('CURRENT BOARD:\t', this.state.currentBoard)
        return
      }
      const split = Math.floor(targetText.length * (i / amount))
      this.setState({
        h5Text:
          targetText.substring(0, split) + makeRandom(targetText.length - split)
      })
    }, 10)
  }

  render() {
    return (
      <div className="content blackblur">
        <div className="center-content">
          <div className="title-box">
            <h1>Leaderboards</h1>
            <h5 onClick={this.slot}>{this.state.h5Text}</h5>
          </div>
        </div>

        <div className="top-left-btns">
          <button
            onClick={() => this.props.gotoHome()}
            type="button"
            className="btn btn-dark"
          >
            Back
          </button>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {}
}

const mapDispatch = dispatch => {
  return {
    load: () => dispatch(fetchLeaderboards()),
    gotoHome: () => dispatch(setRoute('HOME'))
  }
}

export default connect(mapState, mapDispatch)(Leaderboards)

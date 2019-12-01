import React from 'react'
import {connect} from 'react-redux'
import ReactLoading from 'react-loading'
import {fetchLeaderboards, setRoute, gotLeaderboards} from '../store'
import {LeaderboardRanking} from './'

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
      currentBoard: 0,
      h5Text: 'all time high scores'
    }
    this.slot = this.slot.bind(this)
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
    this.boards = [
      {
        key: 'ALL',
        name: 'all time high scores'
      },
      {
        key: 'DAY',
        name: "today's best scores"
      },
      {
        key: 'WEEK',
        name: "this weeks's best scores"
      },
      {
        key: 'MONTH',
        name: `${monthNames[new Date().getMonth()]}'s best scores`
      }
    ]
  }
  componentDidMount() {
    this.props.load('ALL')
  }

  slot() {
    const targetNum = (this.state.currentBoard + 1) % this.boards.length,
      targetText = this.boards[targetNum].name,
      amount = 70
    this.setState({currentBoard: targetNum})
    let i = 0
    this.props.clear()
    const clear = setInterval(() => {
      i++
      if (i > amount) {
        this.setState({h5Text: targetText})
        clearInterval(clear)
        this.props.load(this.boards[targetNum].key)
        return
      }
      const split = Math.floor(targetText.length * (i / amount))
      this.setState({
        h5Text:
          targetText.substring(0, split) + makeRandom(targetText.length - split)
      })
    }, 15)
  }

  render() {
    const leaderboards = this.props.leaderboards
    return (
      <div className="content blackblur">
        <div
          className={
            leaderboards && leaderboards.length
              ? 'center-content start'
              : 'center-content'
          }
        >
          <div className="title-box">
            <h1>Leaderboards</h1>
            <h5 onClick={this.slot}>{this.state.h5Text}</h5>
          </div>
          {leaderboards === null ? (
            <ReactLoading
              className="l-load"
              type="spinningBubbles"
              color="#FFF"
              height={128}
              width={128}
            />
          ) : leaderboards.length ? (
            <>
              <table className="lb-players">
                {leaderboards.map((l, i) => (
                  <LeaderboardRanking key={l.id} rank={l} place={i + 1} />
                ))}
              </table>
              <div className="lb-filler" />
            </>
          ) : (
            <h3 className="l-load">
              There isn't anything on this leaderboard...
            </h3>
          )}
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
  return {
    leaderboards: state.leaderboards
  }
}

const mapDispatch = dispatch => {
  return {
    load: key => dispatch(fetchLeaderboards(key)),
    clear: () => dispatch(gotLeaderboards(null)),
    gotoHome: () => dispatch(setRoute('HOME'))
  }
}

export default connect(mapState, mapDispatch)(Leaderboards)

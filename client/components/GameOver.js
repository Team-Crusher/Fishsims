import React from 'react'
import {connect} from 'react-redux'
import ReactLoading from 'react-loading'
import {setRoute} from '../store'
import {LeaderboardRanking} from './'

class GameOver extends React.Component {
  render() {
    const gameStats = this.props.gameStats
    return (
      <div className="content blackblur">
        <div
          className={
            gameStats && gameStats.length
              ? 'center-content start'
              : 'center-content'
          }
        >
          <div className="title-box">
            <h1>Wahoo! Game Over</h1>
            <h5>Another day, another fish...</h5>
          </div>
          {gameStats === null ? (
            <ReactLoading
              className="l-load"
              type="spinningBubbles"
              color="#FFF"
              height={128}
              width={128}
            />
          ) : gameStats.length ? (
            <>
              <table className="lb-players">
                <tbody>
                  {gameStats
                    .sort((a, b) => b.score - a.score)
                    .map((l, i) => (
                      <LeaderboardRanking
                        key={l.socketId}
                        rank={l}
                        place={i + 1}
                      />
                    ))}
                </tbody>
              </table>
              <div className="lb-filler" />
            </>
          ) : (
            <h3 className="l-load">
              There isn't anything on this leaderboard...
            </h3>
          )}
        </div>

        <div className="bottom-right-icons">
          <a
            onClick={e => {
              e.preventDefault()
              this.props.gotoHome()
            }}
          >
            <i className="fas fa-home" />
          </a>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    gameStats: state.gameStats
  }
}

const mapDispatch = dispatch => {
  return {
    gotoHome: () => dispatch(setRoute('HOME'))
  }
}

export default connect(mapState, mapDispatch)(GameOver)

import React from 'react'
import socket from '../socket/index.js'
import {connect} from 'react-redux'

import {setRoute, setName, getTitle} from '../store'

class Home extends React.Component {
  constructor() {
    super()

    this.state = {
      name: ''
    }

    this.newTitle = this.newTitle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.newTitle()
  }

  newTitle() {
    this.props.getTitle()
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.setName(this.state.name)

    // tells the server we want to join a lobby
    socket.emit('lobby-me', this.state.name)
    this.props.gotoLobby()
  }

  handleChange(event) {
    event.preventDefault()
    this.setState({
      name: event.target.value
    })
  }

  render() {
    return (
      <div className="content">
        <small>*not actual gameplay footage</small>
        <div className="homescreen">
          <div className="title-box">
            <h1>Actual Title Here</h1>
            <h5 onClick={this.newTitle}>"{this.props.title}"</h5>
          </div>
          <form id="start-form" onSubmit={this.handleSubmit}>
            <input
              maxLength="20"
              autoComplete="off"
              onChange={this.handleChange}
              name="fishioname"
              value={this.state.name}
            />
            <button className="btn btn-dark" id="play" type="submit">
              Play Game
            </button>
          </form>
        </div>
        <div className="top-left-btns">
          <button type="button" className="btn btn-dark">
            Leaderboards
          </button>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    title: state.title
  }
}

const mapDispatch = dispatch => {
  return {
    gotoLobby: () => dispatch(setRoute('LOBBY')),
    setName: name => dispatch(setName(name)),
    getTitle: () => dispatch(getTitle())
  }
}

export default connect(mapState, mapDispatch)(Home)

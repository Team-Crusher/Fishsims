import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import socket from '../socket/index.js'
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
    this.handlePrivate = this.handlePrivate.bind(this)
  }

  componentDidMount() {
    this.newTitle()
  }

  newTitle() {
    this.props.getTitle()
  }

  handleSubmit(event) {
    event.preventDefault()

    let name = this.state.name
    if (name === '') {
      name = `anon${socket.id.substring(0, 6)}`
    }
    this.props.setName(name)

    // tells the server we want to join a lobby
    const id = this.props.location.pathname.replace('/', '')
    socket.emit('lobby-me', {name, lobbyId: id})
    this.props.gotoLobby()
  }

  handleChange(event) {
    event.preventDefault()
    this.setState({
      name: event.target.value
    })
  }

  handlePrivate(event) {
    event.preventDefault()
    let name = this.state.name
    if (name === '') {
      name = `anon${socket.id.substring(0, 6)}`
    }
    this.props.setName(name)
    this.props.history.push('/')
    socket.emit('make-private-lobby', {name})
    this.props.gotoLobby()
  }

  render() {
    const inviteId = this.props.location.pathname.replace('/', '')
    return (
      <div className="content">
        <small>*not actual gameplay footage</small>
        <div className="center-content">
          <div className="title-box">
            <h1>King Fisher</h1>
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
              Join {inviteId ? null : 'Random'} Game
            </button>
            <button
              onClick={this.handlePrivate}
              className="btn btn-dark"
              id="play"
              type="button"
            >
              Make Private Game
            </button>
          </form>
        </div>
        <div className="bottom-right-icons ">
          <a href="https://github.com/Team-Crusher/Fishsims">
            <i className="fab fa-github" />
          </a>
          <a
            href=""
            onClick={e => {
              e.preventDefault()
              this.props.gotoLeader()
            }}
          >
            <i className="fas fa-trophy" />
          </a>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    title: state.title,
    id: state.lobby.id
  }
}

const mapDispatch = dispatch => {
  return {
    gotoLobby: () => dispatch(setRoute('LOBBY')),
    gotoLeader: () => dispatch(setRoute('LEADERBOARDS')),
    gotoAbout: () => dispatch(setRoute('ABOUT')),
    setName: name => dispatch(setName(name)),
    getTitle: () => dispatch(getTitle())
  }
}

export default withRouter(connect(mapState, mapDispatch)(Home))

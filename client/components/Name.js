import React from 'react'
import socket from '../socket/index.js'
import {connect} from 'react-redux'

import {setRoute, setName} from '../store'

class Name extends React.Component {
  constructor() {
    super()

    this.state = {
      name: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log(this.state.name)
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
        <form id="start-form" onSubmit={this.handleSubmit}>
          <input
            maxLength="20"
            onChange={this.handleChange}
            name="fishioname"
            value={this.state.name}
          />
          <button className="btn btn-dark" id="play" type="submit">
            Play Game
          </button>
        </form>
        <small>*not actual gameplay footage</small>
      </div>
    )
  }
}

const mapState = state => {
  return {}
}

const mapDispatch = dispatch => {
  return {
    gotoLobby: () => dispatch(setRoute('LOBBY')),
    setName: name => dispatch(setName(name))
  }
}

export default connect(mapState, mapDispatch)(Name)

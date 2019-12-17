import React from 'react'
import {connect} from 'react-redux'
import socket from '../socket'
import {ManageBoat} from './'

class ManageResources extends React.Component {
  render() {
    const myBoats = this.props.boats.filter(b => b.ownerSocket === socket.id)

    return (
      <div id="manage-resources">
        <div>WHOA SOMETHING HERE?!?</div>
        {myBoats.map(b => <ManageBoat key={b.id} boat={b} />)}
      </div>
    )
  }
}

const mapState = state => {
  return {
    boats: state.boats
  }
}

export default connect(mapState)(ManageResources)

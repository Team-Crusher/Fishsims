import React from 'react'
import {connect} from 'react-redux'
import socket from '../socket'
import {getBoatFishTotal} from '../script/utils'
import FlipMove from 'react-flip-move'

class ManageBoats extends React.Component {
  render() {
    const {boats, me} = this.props
    const myBoats = boats.filter(b => b.ownerSocket === socket.id)

    return (
      <div id="manage-boats">
        <FlipMove>
          {myBoats
            .sort((boat1, boat2) => {
              const boat1Payload = getBoatFishTotal(boat1) / boat1.capacity
              const boat2Payload = getBoatFishTotal(boat2) / boat2.capacity
              return boat2Payload - boat1Payload
            })
            .map(b => (
              <div key={b.id} id="manage-boat">
                <div>
                  <div style={{color: me.color}}>{b.name}</div>
                  <div>Status- soooon</div>
                </div>
                <div>
                  <div>Range: {b.maxDistance}</div>
                  {getBoatFishTotal(b) / b.capacity === 1 ? (
                    <div style={{color: 'red'}}>🐟 MAX</div>
                  ) : (
                    <div>
                      🐟 {getBoatFishTotal(b)} / {b.capacity}
                    </div>
                  )}
                </div>
              </div>
            ))}
        </FlipMove>
      </div>
    )
  }
}

const mapState = state => {
  return {
    boats: state.boats,
    me: state.player
  }
}

export default connect(mapState)(ManageBoats)

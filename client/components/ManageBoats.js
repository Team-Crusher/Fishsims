import React from 'react'
import {connect} from 'react-redux'
import socket from '../socket'
import {getBoatFishTotal} from '../script/utils'
import {clearRange, makeBoatHighlight} from '../script/sprites'
import FlipMove from 'react-flip-move'
import {viewport} from '../script/game'
import {setSelectedObject, setStart} from '../store'
import {TILE_SIZE} from '../../server/CONSTANTS'

class ManageBoats extends React.Component {
  render() {
    const {boats, me, setBoatAsSelected, setPathStart} = this.props
    const myBoats = boats.filter(b => b.ownerSocket === socket.id)

    return (
      <div id="manage-boats">
        <FlipMove>
          {myBoats
            .sort((boat1, boat2) => {
              const boat1Payload = getBoatFishTotal(boat1) / boat1.capacity
              const boat2Payload = getBoatFishTotal(boat2) / boat2.capacity
              if (boat1Payload === 1 && boat2Payload < 1) {
                return -1
              } else if (boat1.status === 'Idle' && boat2.status !== 'Idle') {
                return -1
              }
              return 1
            })
            .map(b => (
              <div
                key={b.id}
                id="manage-boat"
                onClick={() => {
                  viewport.moveCenter(b.x, b.y)

                  //select the boat and prepare to move it
                  clearRange()
                  setBoatAsSelected(b)
                  setPathStart({row: b.y / TILE_SIZE, col: b.x / TILE_SIZE})
                  makeBoatHighlight(b.x, b.y, b.maxDistance, b.sprite)
                }}
              >
                <div>
                  <div style={{color: me.color}}>{b.name}</div>
                  {b.status === 'Idle' ? (
                    <div style={{color: 'yellow'}}>{b.status}</div>
                  ) : (
                    <div>{b.status}</div>
                  )}
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

const mapDispatch = dispatch => {
  return {
    setBoatAsSelected: boat => dispatch(setSelectedObject(boat)),
    setPathStart: coordsObj => dispatch(setStart(coordsObj))
  }
}

export default connect(mapState, mapDispatch)(ManageBoats)

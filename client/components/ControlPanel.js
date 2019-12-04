import React from 'react'
import {connect} from 'react-redux'
import store, {
  setName,
  addBoat,
  adjustMoney,
  setPixiGameState,
  addActionToReel,
  setTurnEnded,
  setStart,
  removeSelectedObject,
  setEnd
} from '../store'
import socket from '../socket'
import {TILE_SIZE} from '../script/drawMap.js'
import {getWaterNeighbors, getWater} from '../../utilityMethods.js'
import {path, putArrowOnMap, clearArrows} from '../script/utils'
import {BuyMenu} from './'
import {Container, Tab} from 'semantic-ui-react'

class ControlPanel extends React.Component {
  constructor() {
    super()
    //    this.handleBuyBoat = this.handleBuyBoat.bind(this)
    this.handleEndTurn = this.handleEndTurn.bind(this)
    // this.handleCommitMovesToReel = this.handleCommitMovesToReel.bind(this)
  }
  handleEndTurn() {
    // Turn data will be sent to the server to aggregate for computer turn
    const turnData = {
      actionsReel: this.props.actionsReel
    }
    socket.emit('end-turn', turnData)
    this.props.setTurnEnd(true)
    this.props.removeSelectedObject({})
  }

  render() {
    const {name, dubloons, socketId} = this.props.player
    const pixiGameState = this.props.pixiGameState
    let activeIndex = -1
    const panes = [
      {
        menuItem: {
          key: 'stats',
          content: 'Stats'
        },
        render: () => <Tab.Pane inverted={true}>Player Stats Here</Tab.Pane>
      },
      {
        menuItem: {
          key: 'buy',
          content: 'Buy'
        },
        render: () => (
          <Tab.Pane inverted={true}>
            <BuyMenu />
          </Tab.Pane>
        )
      },
      {
        menuItem: {
          key: 'upgrade',
          content: 'Upgrade'
        },
        render: () => (
          <Tab.Pane
            onClick={() => {
              activeIndex = -1
            }}
            inverted={true}
          >
            Upgrade Options Here
          </Tab.Pane>
        )
      }
    ]
    return store.getState() ? (
      <>
        <div id="semantic">
          <Container>
            <Tab
              menu={{
                fluid: true,
                inverted: true,
                attached: true,
                tabular: 'right'
              }}
              panes={panes}
            />
          </Container>
        </div>

        <div id="controlPanel">
          {/* ----------------------- Buying Section -----------------------------------*/}
          {/* 
              <div className="section-container">

              <button
              type="button"
              name="buyBoat"
              disabled={dubloons < 500}
              onClick={this.handleBuyBoat}
              >
              Buy Boat 500d
              </button>
              <button
              type="button"
              name="buyDock"
              disabled={dubloons < 10000}
              onClick={this.handleBuyDock}
              >
              Buy Dock 10,000d
              </button>
              </div>
	    */}
          {/* ----------------------- Play Section -----------------------------------*/}
          {pixiGameState === 'playerTurn' && !this.props.turnEnded ? (
            <React.Fragment>
              <div className="section-container">
                <h2 className="header-section">Actions</h2>
                <button
                  type="button"
                  name="endTurn"
                  onClick={this.handleEndTurn}
                >
                  End Turn
                </button>
              </div>

              <div className="section-container">
                <h2 className="header-section">Player's status</h2>
                {this.props.boats[0] && (
                  <p style={{fontSize: 15, fontWeight: 'bold'}}>Boat</p>
                )}
                <table>
                  <tbody>
                    {this.props.boats[0] &&
                      this.props.boats.map(boat => {
                        if (boat.ownerSocket === this.props.player.socketId) {
                          return (
                            <React.Fragment key={boat.id}>
                              <tr>
                                <td>Boat Id</td>
                                <td>{boat.id}</td>
                              </tr>
                              <tr>
                                <td>Fuel</td>
                                <td>{boat.fuel}</td>
                              </tr>
                              <tr>
                                <td>Distance</td>
                                <td>{boat.maxDistance}</td>
                              </tr>
                              <tr>
                                <td>Shallow</td>
                                <td>{boat.fishes.shallows || 0}</td>
                              </tr>
                              <tr>
                                <td>Open Ocean</td>
                                <td>{boat.fishes.openOcean || 0}</td>
                              </tr>
                              <tr>
                                <td>Deep Ocean</td>
                                <td>{boat.fishes.deep || 0}</td>
                              </tr>
                            </React.Fragment>
                          )
                        }
                      })}
                  </tbody>
                </table>
              </div>
            </React.Fragment>
          ) : pixiGameState === 'playerTurn' ? (
            <div>Waiting for other players to make their moves!</div>
          ) : (
            <div>Watching last round's moves!</div>
          )}
          <div className="section-container">
            <h2 className="header-section">hello</h2>
          </div>
        </div>
      </>
    ) : null
  }
}

const mapState = state => {
  return {
    player: state.player,
    pixiGameState: state.pixiGameState,
    selectedObject: state.selectedObject,
    actionsReel: state.actionsReel,
    boats: state.boats,
    turnEnded: state.turnEnded
  }
}

const mapDispatch = dispatch => {
  return {
    setName: () => dispatch(setName()),
    setPixiGameState: state => dispatch(setPixiGameState(state)),
    addBoatToStore: (boatId, socketId, playerName, boatX, boatY) =>
      dispatch(addBoat(boatId, socketId, playerName, boatX, boatY)),
    adjustPlayerMoney: value => dispatch(adjustMoney(value)),
    addAction: (
      objectId,
      socketId,
      playerName,
      reelActionType,
      reelActionDetail
    ) =>
      dispatch(
        addActionToReel(
          objectId,
          socketId,
          playerName,
          reelActionType,
          reelActionDetail
        )
      ),
    setTurnEnd: bool => dispatch(setTurnEnded(bool)),
    setStart: coords => dispatch(setStart(coords)),
    setEnd: coords => dispatch(setEnd(coords)),
    removeSelectedObject: () => dispatch(removeSelectedObject())
  }
}

export default connect(mapState, mapDispatch)(ControlPanel)

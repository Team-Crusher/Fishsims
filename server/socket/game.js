const lobbies = require('../lobbyer')
const makeMap = require('../script/newMap')
const {setMap} = require('../store/board')
const {addDock} = require('../store/docks')
const {addEndTurn, resetEndTurns} = require('../store/endTurns')
const {setFishes} = require('../store/fish.js')
const {addActionToReel, resetReel} = require('../store/serverActionsReel')
const {spawnDock, spawnFish} = require('../../utilityMethods.js')
const {setTurnsRemaining} = require('../store/turnsRemaining')
const {updateGameStats} = require('../store/gameStats')
const {setDecorations} = require('../store/decorations')
const {withdrawBoatName} = require('../store/boatNames')
const {populateMapDecorations} = require('../script/decorations')

const TURN_SECONDS = 30

// to be called once by the server to setup the map etc
const initGame = lobby => {
  // make and dispatch map to lobby
  const map = makeMap()
  const decorations = populateMapDecorations(map)
  lobby.dispatch(setMap(map))
  lobby.dispatch(setDecorations(decorations))

  const players = lobby.getPlayers()
  let docks = []
  const {board} = lobby.store.getState()
  players.forEach(player => {
    const newDock = spawnDock(docks, map)
    if (newDock.row)
      lobby.dispatch(addDock(player.socketId, player.name, newDock, board))
    else console.log('no space left!')
    docks = lobby.store.getState().docks
  })
  const fishes = spawnFish(map)
  lobby.dispatch(setFishes(fishes))
}

// actual game stuff
const gameSockets = (socket, io) => {
  socket.emit('connected-you')
  const lobby = lobbies.findPlayerLobby(socket.id)
  const lobStore = lobby.store
  let turnInterval = 0

  socket.emit('starting-map', lobStore.getState().board)
  socket.emit('update-map') // send to client who requested start
  socket.emit(
    'spawn-me',
    lobStore.getState().docks.find(dock => dock.pId === socket.id)
  )
  //  socket.broadcast.to(lobby.id).emit('update-map')
  socket.emit('spawn-players', lobStore.getState().docks)
  socket.emit('spawn-fishes', lobStore.getState().fish)
  socket.emit('spawn-decos', lobStore.getState().decorations)

  // handle requests for a boat name
  socket.on('get-boat-name', boatId => {
    const boatNames = lobStore.getState().boatNames
    const randomName = boatNames[Math.floor(Math.random() * boatNames.length)]
    const boatData = {boatId, randomName}
    socket.emit('set-boat-name', boatData)
    lobStore.dispatch(withdrawBoatName(randomName))
  })

  socket.on('end-turn', turnData => {
    lobStore.dispatch(addEndTurn(socket.id))
    lobStore.dispatch(addActionToReel(turnData.actionsReel))

    if (
      allPlayersEndedTurn(
        lobStore.getState().players,
        lobStore.getState().endTurns
      )
    ) {
      io
        .in(lobby.id)
        .emit('start-server-turn', lobStore.getState().serverActionsReel) //TODO go to client to fix this
      lobStore.dispatch(resetEndTurns())
      lobStore.dispatch(resetReel())
    }
    socket.emit('ended-turn')
  })

  socket.on('reel-finished', player => {
    const playerStats = {
      socketId: socket.id,
      name: player.name,
      score: player.dubloons,
      color: player.color
    }

    lobStore.dispatch(updateGameStats(playerStats))
    lobStore.dispatch(addEndTurn(socket.id))
    if (
      allPlayersEndedTurn(
        lobStore.getState().players,
        lobStore.getState().endTurns
      )
    ) {
      clearInterval(turnInterval)
      const turnsRemaining = lobStore.getState().turnsRemaining
      console.log(`${lobStore.getState().turnsRemaining} turns left in game!`)
      const gameStats = lobStore.getState().gameStats
      if (turnsRemaining === 0) {
        io.in(lobby.id).emit('game-over', gameStats)
      } else {
        io.in(lobby.id).emit('stats-update', gameStats)
        lobStore.dispatch(resetEndTurns())
        io.in(lobby.id).emit('start-player-turn')
        lobStore.dispatch(setTurnsRemaining(turnsRemaining - 1))
        let i = 0
        turnInterval = setInterval(() => {
          i++
          // io.in(lobby.id).emit('timer-update', i)
          if (i === TURN_SECONDS) {
            // io.in(lobby.id).emit('force-end-turn')
            clearInterval(turnInterval)
          }
        }, 1000)
      }
    }
  })
}

/**
 * Returns true if all players in the lobby have emitted an endTurn.
 * @param {Object} players  Player objects from lobby store
 * @param {Array} endTurns  Array of socketIds who have emitted endTurn
 */
function allPlayersEndedTurn(players, endTurns) {
  return players.every(player => endTurns.includes(player.socketId))
}

module.exports = {gameSockets, initGame}

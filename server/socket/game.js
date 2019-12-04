const lobbies = require('../lobbyer')
const makeMap = require('../script/newMap')
const {setMap} = require('../store/board')
const {addDock} = require('../store/docks')
const {addEndTurn, resetEndTurns} = require('../store/endTurns')
const {setFishes} = require('../store/fish.js')
const {addActionToReel, resetReel} = require('../store/serverActionsReel')
const {getLand, spawnDock, spawnFish} = require('../../utilityMethods.js')
const {setTurnsRemaining} = require('../store/turnsRemaining')
const {updateGameStats} = require('../store/gameStats')
const {setDecorations} = require('../store/decorations')
const {populateMapDecorations} = require('../script/decorations')

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
    const newDock = spawnDock(docks)
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
  const lobby = lobbies.findPlayerLobby(socket.id)
  const lobStore = lobby.store

  socket.emit('starting-map', lobStore.getState().board)
  socket.emit('update-map') // send to client who requested start
  socket.emit(
    'spawn-me',
    lobStore.getState().docks.find(dock => dock.pId === socket.id)
  )
  //  socket.broadcast.to(lobby.id).emit('update-map')
  socket.emit('spawn-players', lobStore.getState().docks)
  socket.emit('spawn-fishes', lobStore.getState().fish)

  const decos = JSON.stringify(lobStore.getState().decorations)
  console.log('emitting:\t', decos) // TODO broken rn (wont emit anything to bee seen by the client)
  socket.emit('spawn-decos', decos)

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
        .emit('start-server-turn', lobStore.getState().serverActionsReel)
      lobStore.dispatch(resetEndTurns())
      lobStore.dispatch(resetReel())
    }
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
      const turnsRemaining = lobStore.getState().turnsRemaining
      console.log(`${lobStore.getState().turnsRemaining} turns left in game!`)
      if (turnsRemaining === 0) {
        const gameStats = lobStore.getState().gameStats
        io.in(lobby.id).emit('game-over', gameStats)
      } else {
        lobStore.dispatch(resetEndTurns())
        io.in(lobby.id).emit('start-player-turn')
        lobStore.dispatch(setTurnsRemaining(turnsRemaining - 1))
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

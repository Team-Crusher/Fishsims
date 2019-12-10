/* eslint-disable no-loop-func */
const lobbies = require('../lobbyer')
const makeMap = require('../script/newMap')
const {setMap} = require('../store/board')
const {addDock, clearDocks} = require('../store/docks')
const {addEndTurn, resetEndTurns} = require('../store/endTurns')
const {setFishes} = require('../store/fish.js')
const {addActionToReel, resetReel} = require('../store/serverActionsReel')
const {spawnDock, spawnFish} = require('../../utilityMethods.js')
const {setTurnsRemaining} = require('../store/turnsRemaining')
const {updateGameStats} = require('../store/gameStats')
const {setDecorations} = require('../store/decorations')
const {assignBoatName} = require('../store/boatNames')
const {populateMapDecorations} = require('../script/decorations')
const imageToMap = require('../script/imageToMap')

const TURN_SECONDS = 15
const TIMER_UPDATE_RATE = 5 // updates per second

function loadImage(players) {
  for (let i = 0; i < players.length; i++) {
    console.log(players[i])
    if (players[i].name.endsWith('.png')) {
      return players[i].name
    }
  }
  return false
}

// to be called once by the server to setup the map etc
const initGame = async lobby => {
  const players = lobby.getPlayers()
  let base = loadImage(players)

  // make and dispatch map to lobby
  let map
  let badMap = false
  let docks = []
  do {
    lobby.dispatch(clearDocks())
    docks = []
    badMap = false
    if (base) {
      map = await imageToMap(base)
      if (!map) {
        base = false
      }
    }
    if (!base) {
      map = makeMap()
    }
    lobby.dispatch(setMap(map))
    let {board} = lobby.store.getState()
    players.forEach(player => {
      const newDock = spawnDock(docks, map)
      if (!newDock) {
        badMap = true
        return
      }
      if (newDock.row)
        lobby.dispatch(addDock(player.socketId, player.name, newDock, board))
      else console.log('no space left!')
      docks = lobby.store.getState().docks
    })
  } while (badMap)
  const decorations = populateMapDecorations(map)
  lobby.dispatch(setDecorations(decorations))
  const fishes = spawnFish(map)
  lobby.dispatch(setFishes(fishes))
}

// actual game stuff
const gameSockets = (socket, io) => {
  socket.emit('connected-you')
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
  socket.emit('spawn-decos', lobStore.getState().decorations)

  // handle requests for a boat name
  socket.on('get-boat-name', boatId => {
    const boatNames = lobStore.getState().boatNames
    let nameToAssign

    const existingName = Object.keys(boatNames).find(
      name => boatNames[name] === boatId
    )

    if (existingName) {
      //if boat already has a name, send it
      nameToAssign = existingName
    } else {
      // else reserve a new name
      const availBoatNames = Object.keys(boatNames).filter(
        name => boatNames[name] === null
      )
      if (availBoatNames.length) {
        nameToAssign =
          availBoatNames[Math.floor(Math.random() * availBoatNames.length)]
      } else {
        nameToAssign = 'A Nameless Dread'
      }
      lobStore.dispatch(assignBoatName(nameToAssign, boatId))
    }

    const boatData = {nameToAssign, boatId}
    socket.emit('set-boat-name', boatData)
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
        .emit('start-server-turn', lobStore.getState().serverActionsReel) // TODO go to client to fix this
      clearInterval(lobby.interval)
      lobStore.dispatch(resetEndTurns())
      lobStore.dispatch(resetReel())
    }
    socket.emit('ended-turn')
  })

  socket.on('buy', player => {
    const playerStats = {
      socketId: socket.id,
      name: player.name,
      score: player.dubloons,
      color: player.color
    }
    lobStore.dispatch(updateGameStats(playerStats))
    const gameStats = lobby.store.getState().gameStats
    io.in(lobby.id).emit('stats-update', gameStats)
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
      clearInterval(lobby.interval)
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
        console.log('ENDING INTERVAL')
        lobby.interval = setInterval(() => {
          i += 1 / TIMER_UPDATE_RATE
          io.in(lobby.id).emit('timer-update', i)
          if (i >= TURN_SECONDS) {
            io.in(lobby.id).emit('force-end-turn')
            clearInterval(lobby.interval)
          }
        }, 1000 / TIMER_UPDATE_RATE)
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

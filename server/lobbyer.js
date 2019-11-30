const makeStore = require('./store')
const {addPlayer, removePlayer} = require('./store/players.js')
const {setStatus} = require('./store/status.js')
const {makePlayer} = require('./Player')

const MIN_LOBBY_SIZE = 2
const MAX_LOBBY_SIZE = 4

/**
 * the lobby holder nothing special not really even worth a new file
 */
class Lobby {
  constructor(id, store, hidden = false) {
    this.id = id
    this.store = store
    this.hidden = hidden
    this.time = new Date()
    this.status = 'WAITING'
  }

  /**
   * checks if a player is in a lobby
   * plan to use for permissions stuff if needed
   * @param {string} socketId   socketId of the player
   */
  containsPlayer(socketId) {
    const players = this.store.getState().players
    for (let i = 0; i < players.length; i++) {
      if (players[i].socketId === socketId) {
        return true
      }
    }
    return false
  }

  /**
   * remove a player from the lobby by socketId
   * @param {string} socketId   player socketId
   */
  removePlayer(socketId) {
    this.dispatch(removePlayer(socketId))
  }

  /**
   * dispatches to the lobby store this isnt needed but may be nice
   * @param {any} thing   action creator to be dispatched
   */
  dispatch(thing) {
    this.store.dispatch(thing)
  }

  /**
   * gives all the players
   */
  getPlayers() {
    return this.store.getState().players
  }
}

/**
 * Will do lobby magic
 */
class Lobbyer {
  constructor() {
    this.waitingPlayers = []
    this.lobbies = new Map()
    this.hidden = new Map()
  }

  /**
   * adds the player to the waiting list (dont use for hidden games)
   * @param {string} name      player's name
   * @param {string} socketId  player's socket id
   */
  addPlayerToWaiting(name, socketId) {
    if (!this.playerIsLobbied(socketId)) {
      this.waitingPlayers.push({name, socketId})
    }
  }

  /**
   * removes the playeer from the lobbyer if they are in one of the lobbies
   * @param {string} socketId   the platyer's id
   */
  removePlayer(socketId) {
    ;[...this.hidden.values(), ...this.lobbies.values()].forEach(lobby => {
      if (lobby.removePlayer(socketId)) {
        // will remove if they are in this
        return true
      }
    })
    return false
  }

  /**
   * find player lobby
   * @param {string} socketId   the platyer's id
   */
  findPlayerLobby(socketId) {
    let found = false
    ;[...this.hidden.values(), ...this.lobbies.values()].forEach(lobby => {
      if (lobby.containsPlayer(socketId)) {
        found = lobby
        return 'get me out of this foreach lol'
      }
    })

    return found
  }

  /**
   * checks if the player is in a lobby
   * @param {string} id  checks if a player is in any of the lobbies
   */
  playerIsLobbied(id) {
    let found = false
    ;[...this.hidden.values(), ...this.lobbies.values()].forEach(l => {
      if (l.containsPlayer(id)) {
        found = true
        return 'get me out of this foreach lol'
      }
    })
    return found
  }

  /**
   * makes an id to be used for a lobby
   * @param {int} length   length of the id
   */
  makeId(length) {
    let result = ''
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }

  /**
   * makes a new lobby with a unique id
   * @param {string} lobbyName    optional name of lobby
   * @param {boolean} hidden      if the lobby is hidden and can only be joined by link
   */
  newLobby(lobbyName = null, hidden = false) {
    if (lobbyName === null) {
      do {
        lobbyName = this.makeId(20)
      } while (this.hidden.has(lobbyName) || this.lobbies.has(lobbyName))
    }
    const lobby = new Lobby(lobbyName, makeStore())
    if (hidden) {
      lobby.hidden = true
      this.hidden.set(lobbyName, lobby)
    } else {
      this.lobbies.set(lobbyName, lobby)
    }
    return lobby
  }

  /**
   * gets all lobbies waiting for players
   */
  getWaitingLobbies() {
    return [...this.lobbies.values()].filter(l => l.status === 'WAITING')
  }

  /**
   * Checks if there are any lobbies waiting for players
   */
  areThereWaitingLobbies() {
    return this.getWaitingLobbies().length > 0
  }

  /**
   * adds a player to the given lobby (both hidden and public)
   * @param {string} id         The id of the lobby
   * @param {string} name       the player's name
   * @param {string} socketId   the player's socket
   */
  addPlayerToLobby(id, name, socketId) {
    let lob = this.lobbies.get(id)
    console.log(lob)
    if (!lob) {
      // no lobby by that id
      lob = this.hidden.get(id)
      if (!lob) {
        // no hidden lobby either
        return {status: 404}
      }
    }
    if (lob.store.getState().status !== 'WAITING') {
      // console.log(id, 'is not waiting for players')
      return {status: 2, lobby: lob} // lobby full
    }

    lob.store.dispatch(addPlayer(makePlayer(socketId, name)))
    if (lob.store.getState().players.length === MAX_LOBBY_SIZE) {
      // set to playing if the max playercount has been reached
      lob.status = 'PLAYING'
      lob.dispatch(setStatus('PLAYING'))
      return {status: 1, lobby: lob} // switched lobby to playing
    }
    return {status: 0, lobby: lob} // added to existing
  }

  /**
   * adds the first person in the waitlist to the oldest lobby
   * - will make new lobbies if there are none
   * - only adds to public lobbies
   */
  addToOldestWaiting() {
    let lobbies = this.getWaitingLobbies()
    let player = this.waitingPlayers.shift()
    if (lobbies.length > 0) {
      // there were waiting lobbies
      let oldest = {time: new Date()}
      lobbies.forEach(l => {
        if (l.time < oldest.time) {
          oldest = l
        }
      })
      return this.addPlayerToLobby(oldest.id, player.name, player.socketId)
    } else {
      // no waiting lobbies
      const lob = this.newLobby()
      return this.addPlayerToLobby(lob.id, player.name, player.socketId)
    }
  }

  /**
   * sets the status of a lobby (simple but makes my life easier)
   * @param {string} id     the id of the lobby
   * @param {string} status the status to set
   */
  setStatus(id, status) {
    this.getLobby(id).status = status
  }

  /**
   *  gets lobby by id
   * @param {string} id   id of lobby
   */
  getLobby(id) {
    let lob = this.lobbies.get(id)
    if (!lob) {
      lob = this.hidden.get(id)
    }
    return lob
  }

  /**
   *  gets lobby store by id
   * @param {string} id   id of lobby
   */
  getLobbyStore(id) {
    return this.getLobby(id).store
  }

  /**
   * dispatches to lobby store by id
   * @param {string} id   id of the lobby
   * @param {any} thing   (action creator)
   */
  dispatch(id, thing) {
    this.getLobby(id).dispatch(thing)
  }
}
const lobbies = new Lobbyer()
module.exports = lobbies

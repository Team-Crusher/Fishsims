import store, {setPlayers, addPlayer, removePlayer, setLobbyId} from '../store'

export default (socket, data) => {
  switch (data.status) {
    case 200:
    case 201:
      store.dispatch(setPlayers(data.players))
      break
    default:
      return
  }

  store.dispatch(setLobbyId(data.lobbyId))

  socket.on('player-added-to-lobby', player => {
    store.dispatch(addPlayer(player))
  })

  socket.on('player-left-lobby', player => {
    store.dispatch(removePlayer(player))
  })
}

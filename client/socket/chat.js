import store, {addMessage} from '../store'

export default socket => {
  socket.on('new-message', msg => {
    msg.time = new Date()
    store.dispatch(addMessage(msg))
  })
}

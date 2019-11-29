import store, {addMessage} from '../store'

export default socket => {
  socket.on('new-message', msg => {
    msg.time = new Date()
    store.dispatch(addMessage(msg))
  })

  //TODO seperate route for dms
  //TODO pay people mony with message (for bribing)
}

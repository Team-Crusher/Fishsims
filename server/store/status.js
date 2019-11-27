const SET_STATUS = 'SET_STATUS'

const setStatus = status => ({type: SET_STATUS, status})

const init = 'WAITING'

const status = function(state = init, action) {
  switch (action.type) {
    case SET_STATUS:
      return action.status
    default:
      return state
  }
}

module.exports = {status, setStatus}

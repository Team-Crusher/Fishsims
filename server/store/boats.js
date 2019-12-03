const SET_BOAT = 'SET_BOAT'

const setBoat = boat => ({type: SET_BOAT, boat})

const init = {}

const boat = (state = init, action) => {
  switch (action.type) {
    case SET_BOAT:
      return action.boat
    default:
      return state
  }
}

module.exports = {boat, setBoat}

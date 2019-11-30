const ADD_DOCK = 'ADD_DOCK'

const addDock = (pId, coords) => ({type: ADD_DOCK, dock: {pId, coords}})

const init = []

const docks = (state = init, action) => {
  switch (action.type) {
    case ADD_DOCK:
      return [...state, action.dock]
    default:
      return state
  }
}

module.exports = {docks, addDock}

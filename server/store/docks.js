const ADD_DOCK = 'ADD_DOCK'

const addDock = (pId, pName, coords) => ({
  type: ADD_DOCK,
  dock: {
    pId,
    pName: pName || `anon${pId.substring(0, 6)}`,
    x: coords.x,
    y: coords.y
  }
})

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

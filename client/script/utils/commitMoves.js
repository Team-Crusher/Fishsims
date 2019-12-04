import {TILE_SIZE} from '../CONSTANTS.js'
import store, {
  addActionToReel,
  removeSelectedObject,
  setStart,
  setEnd
} from '../../store'
import socket from '../../socket'
import {path, putArrowOnMap} from './'

const commitToReel = () => {
  console.log('IN UTIL VERSION')
  const {selectedObject, player} = store.getState() // deleted addAction
  const {maxDistance, fuel} = selectedObject
  const {map} = store.getState()
  const {start, end} = store.getState().pf
  //    const end = range[Math.floor(Math.random() * range.length)] // TODO: dispatch to setEnd on click, get this from the store
  const theWay = path(
    {x: start.col, y: start.row},
    {x: end.col, y: end.row},
    map
  )
  putArrowOnMap(theWay)
  selectedObject.moveReel = theWay.map(tile => ({
    targetX: tile[0] * TILE_SIZE,
    targetY: tile[1] * TILE_SIZE
  }))
  const diff = selectedObject.moveReel.length - maxDistance

  if (diff > 0) {
    selectedObject.moveReel.splice(maxDistance - 1, diff)
  }
  if (selectedObject.moveReel) {
    store.dispatch(
      addActionToReel(
        selectedObject.id,
        socket.id,
        player.name,
        'boatMove',
        selectedObject.moveReel
      )
    )
    selectedObject.moveReel = []
  }
  store.dispatch(removeSelectedObject({}))
  store.dispatch(setStart({}))
  store.dispatch(setEnd({}))
}

export default commitToReel

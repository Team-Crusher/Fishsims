import {stage} from '../game.js'
import store, {
  addActionToReel,
  removeSelectedObject,
  setStart,
  setEnd
} from '../../store'
import socket from '../../socket'
import {path, putArrowOnMap} from './'

const commitToReel = () => {
  const {selectedObject, player, map, pf} = store.getState()
  const {start, end} = pf
  const theWay = path(
    {x: start.col, y: start.row},
    {x: end.col, y: end.row},
    map
  ) // path the boat follows
  putArrowOnMap(theWay, selectedObject.id)

  if (theWay.length) {
    store.dispatch(
      addActionToReel(
        selectedObject.id,
        socket.id,
        player.name,
        'boatMove',
        theWay
      )
    )
  }
  store.dispatch(removeSelectedObject({}))
  store.dispatch(setStart({}))
  store.dispatch(setEnd({}))
}

export default commitToReel

import socket from '../socket'

export const drawBoat = (ctx, boat) => {
  ctx.beginPath()
  ctx.arc(boat.x, boat.y, 30, 0, Math.PI * 2, 0)
  ctx.fillStyle = boat.color
  ctx.fill()
}

export const boatListener = () => {
  document.addEventListener('click', e => {
    socket.emit('boat-add', {socketId: socket.id, x: e.clientX, y: e.clientY})
  })
}

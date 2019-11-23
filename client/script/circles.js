import socket from '../socket'

export const drawCircle = (ctx, circle) => {
  ctx.beginPath()
  ctx.arc(circle.x, circle.y, 30, 0, Math.PI * 2, 0)
  ctx.fillStyle = circle.color
  ctx.fill()
}

export const circleListener = addCircle => {
  document.addEventListener('click', e => {
    // addCircle(e.clientX, e.clientY)
    socket.emit('circle-add', {socketId: socket.id, x: e.clientX, y: e.clientY})
  })
}

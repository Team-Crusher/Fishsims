import React from 'react'

const ManageBoat = props => {
  const boat = props.boat

  return (
    <div>
      <div>{boat.name}</div>
      <div>{boat.capacity}</div>
    </div>
  )
}

export default ManageBoat

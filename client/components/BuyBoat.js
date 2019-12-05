import React from 'react'
import {useSelector} from 'react-redux'
import {Button} from 'semantic-ui-react'

const BuyBoat = ({type, price, range, capacity, handleBuyBoat}) => {
  const {dubloons} = useSelector(state => state.player)
  const outOfSpace = useSelector(state => state.outOfSpace)
  return (
    <div>
      <div className="boat-buy-info">
        <div className="boat-buy-column">
          <div>Capacity</div>
          <div>Range</div>
          <div>Price</div>
        </div>
        <div className="boat-buy-column">
          <div>{capacity}</div>
          <div>{range}</div>
          <div>{price}d</div>
        </div>
      </div>
      <Button
        inverted
        disabled={price > dubloons || outOfSpace}
        onClick={() => {
          handleBuyBoat(type, price, capacity, range)
        }}
        content="Buy"
      />
      {outOfSpace ? (
        <div id="out-of-space">
          {"You're of space at this dock! Save up to expand your fleet."}
        </div>
      ) : null}
    </div>
  )
}

export default BuyBoat

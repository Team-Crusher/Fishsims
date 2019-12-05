import React from 'react'
import {Button} from 'semantic-ui-react'

const BuyBoat = ({type, price, range, capacity, handleBuyBoat}) => {
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

      <Button inverted onClick={() => handleBuyBoat(type, price)}>
        Buy
      </Button>
    </div>
  )
}

export default BuyBoat

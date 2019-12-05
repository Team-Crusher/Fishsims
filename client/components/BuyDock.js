import React from 'react'
import {useSelector} from 'react-redux'
import {Button} from 'semantic-ui-react'

const BuyDock = ({handleBuyDock}) => {
  //  const {dubloons} = useSelector(state => state.player)
  return (
    <>
      <div className="boat-buy-info">
        <div className="boat-buy-column">
          <div>Price</div>
        </div>
        <div className="boat-buy-column">
          <div>{1200}d</div>
        </div>
      </div>
      <Button
        inverted
        disabled={true}
        onClick={() => {
          handleBuyDock()
        }}
        content="Buy"
      />
      <div id="coming-soon">Coming soon. :)</div>
    </>
  )
}

export default BuyDock

import React from 'react'
import {Tab, Button} from 'semantic-ui-react'
import {BasicBoat} from './'

const BuyMenu = props => {
  const boatTypes = ['basic', 'farther', 'bigger']
  let activeIndex
  const panes = [
    {
      menuItem: {
        key: 'basic',
        content: 'Basic Boat'
      },
      render: () => {
        return (
          <Tab.Pane inverted={true}>
            <BasicBoat />
          </Tab.Pane>
        )
      }
    },
    {
      menuItem: {
        key: 'bigger',
        content: `Bigger Boat`
      },
      render: () => {
        return (
          <Tab.Pane inverted={true}>Bigger Boat -- hold more fish!</Tab.Pane>
        )
      }
    },
    {
      menuItem: {
        key: 'farther',
        content: 'Farther Boat'
      },
      render: () => {
        return (
          <Tab.Pane inverted={true}>
            Farther Boat -- expand your range with a farther boat!
          </Tab.Pane>
        )
      }
    }
  ]
  return (
    <Tab
      defaultActiveIndex={activeIndex}
      menu={{
        inverted: true,
        attached: false,
        color: 'grey',
        fluid: true,
        vertical: true,
        tabular: 'right'
      }}
      panes={panes}
    />
  )
}

export default BuyMenu

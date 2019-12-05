import React from 'react'
import {BuyMenu} from './'
import {Container, Tab} from 'semantic-ui-react'

const ControlPanel = () => {
  let activeItem = 'x'
  const panes = [
    /*    {
      menuItem: {
        key: 'stats',
        content: 'Stats',
        onClick: () => {
          activeItem = 'stats'
        }
      },
      render: () => (
        <Tab.Pane active={activeItem === 'stats'} inverted={true}>
          Player Stats Here
        </Tab.Pane>
      )
    },*/
    {
      menuItem: {
        key: 'buy',
        content: 'Buy',
        onClick: () => {
          activeItem = 'buy'
        }
      },
      render: () => (
        <Tab.Pane active={activeItem === 'buy'} inverted={true}>
          <BuyMenu />
        </Tab.Pane>
      )
    },
    {
      menuItem: {
        key: 'upgrade',
        content: 'Upgrade',
        onClick: () => {
          activeItem = 'upgrade'
        }
      },
      render: () => (
        <Tab.Pane active={activeItem === 'upgrade'} inverted={true}>
          <div id="coming-soon">Coming soon. :)</div>
        </Tab.Pane>
      )
    },
    {
      menuItem: {
        key: 'x',
        content: 'x',
        onClick: () => {
          activeItem = ''
        }
      },
      render: () => <Tab.Pane active={false} />
    }
  ]
  return (
    <div id="semantic">
      <Container>
        <Tab
          defaultActiveIndex={-1}
          menu={{
            inverted: true,
            attached: true,
            tabular: 'right'
          }}
          panes={panes}
        />
      </Container>
    </div>
  )
}

export default ControlPanel

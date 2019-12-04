import React from 'react'
import {Table, Button} from 'semantic-ui-react'

const BasicBoat = props => {
  const {handleBuyBoat} = props
  return (
    <Table definition>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell>Capacity</Table.HeaderCell>
          <Table.HeaderCell>Range</Table.HeaderCell>
          <Table.HeaderCell>Price</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Basic Boat</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>set rating</Table.Cell>
          <Table.Cell>rating (integer)</Table.Cell>
          <Table.Cell>
            Sets the current star rating to specified value
          </Table.Cell>
        </Table.Row>
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell>
            <Button onClick={handleBuyBoat}>Buy</Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  )
}

export default BasicBoat

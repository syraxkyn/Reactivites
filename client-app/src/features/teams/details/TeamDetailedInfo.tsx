import { observer } from 'mobx-react-lite';
import { Segment, Grid, Icon, Table } from 'semantic-ui-react'
import { Team } from '../../../app/models/team';
import React from 'react';
import _ from 'lodash';

interface Props {
    team: Team
}

const tableData = [
    { name: 'John', age: 15, gender: 'Male' },
    { name: 'Amber', age: 40, gender: 'Female' },
    { name: 'Leslie', age: 25, gender: 'Other' },
    { name: 'Ben', age: 70, gender: 'Male' },
  ]

  
function exampleReducer(state: any, action: any) {
    switch (action.type) {
      case 'CHANGE_SORT':
        if (state.column === action.column) {
          return {
            ...state,
            data: state.data.slice().reverse(),
            direction:
              state.direction === 'ascending' ? 'descending' : 'ascending',
          }
        }
  
        return {
          column: action.column,
          data: _.sortBy(state.data, [action.column]),
          direction: 'ascending',
        }
      default:
        throw new Error()
    }
  }

export default function TeamDetailedInfo({ team }: Props) {
    const players = team.players?.slice()
    const [state, dispatch] = React.useReducer(exampleReducer, {
        column: null,
        data: players,
        direction: null,
      })
      const { column, data, direction } = state
      console.log(state.data.slice()[0].name)

    return (
        <Segment.Group>
            <Segment attached='top'>
                <Table sortable celled fixed>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>
                                Имя
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                Позиция
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === 'goals' ? direction : null}
                                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'goals' })}
                            >
                                Голы
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === 'assists' ? direction : null}
                                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'assists' })}
                            >
                                Ассисты
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {data?.map(({id, name,position,goals,assists}) => (
                            <Table.Row key={id}>
                                <Table.Cell>{name}</Table.Cell>
                                <Table.Cell>{position}</Table.Cell>
                                <Table.Cell>{goals}</Table.Cell>
                                <Table.Cell>{assists}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </Segment>
        </Segment.Group>
    )
}
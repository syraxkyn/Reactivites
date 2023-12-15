import { observer } from 'mobx-react-lite';
import { Segment, Table } from 'semantic-ui-react'
import { Player } from '../../../app/models/player';

interface Props {
    player: Player
}

export default observer(function PlayerDetailedInfo({ player }: Props) {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Имя</Table.HeaderCell>
                            <Table.HeaderCell>Позиция</Table.HeaderCell>
                            <Table.HeaderCell>Голы</Table.HeaderCell>
                            <Table.HeaderCell>Ассисты</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>{player.name}</Table.Cell>
                            <Table.Cell>{player.position}</Table.Cell>
                            <Table.Cell>{player.goals}</Table.Cell>
                            <Table.Cell>{player.assists}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </Segment>
        </Segment.Group>
    )
})
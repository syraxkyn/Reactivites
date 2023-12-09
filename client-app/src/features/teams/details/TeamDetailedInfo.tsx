import { observer } from 'mobx-react-lite';
import { Segment, Grid, Icon, Table } from 'semantic-ui-react'
import { Team } from '../../../app/models/team';

interface Props {
    team: Team
}

export default observer(function TeamDetailedInfo({ team }: Props) {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Имя</Table.HeaderCell>
                            <Table.HeaderCell>Голы</Table.HeaderCell>
                            <Table.HeaderCell>Ассисты</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {team.players?.map(player => (
                            <Table.Row key={player.id}>
                                <Table.Cell>{player.name}</Table.Cell>
                                <Table.Cell>{player.goals}</Table.Cell>
                                <Table.Cell>{player.assists}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </Segment>
        </Segment.Group>
    )
})
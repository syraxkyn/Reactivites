import { observer } from 'mobx-react-lite';
import { Card, Segment, Table } from 'semantic-ui-react'
import { Player } from '../../../app/models/player';

interface Props {
    player: Player
}

export default observer(function PlayerDetailedInfo({ player }: Props) {
    return (
        // <Card>
        //     <Card.Content>
        //         <Card.Header>{player.name}</Card.Header>
        //         <Card.Meta>{player.position}</Card.Meta>
        //         <Card.Description>
        //             <p>Голы: {player.goals}</p>
        //             <p>Ассисты: {player.assists}</p>
        //         </Card.Description>
        //     </Card.Content>
        // </Card>
        null
    )
})
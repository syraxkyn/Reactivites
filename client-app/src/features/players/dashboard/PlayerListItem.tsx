import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Item, Segment } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import { Player } from '../../../app/models/player';

interface Props {
    player: Player
}

export default function PlayerListItem({ player }: Props) {
    const { playerStore } = useStore();
    // const { deletePost, loading } = postStore;
    const [target, setTarget] = useState('');

    // function handleTeamDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    //     setTarget(e.currentTarget.name);
    //     deletePost(id);
    // }

    return (
        <Segment.Group>
            <Segment style={{ border: 'none', boxShadow: 'none', padding: 0 }}>
                <Item.Header as={Link} to={`/players/${player.id}`}>
                    <Card fluid style={{ border: '1px solid #d4d4d5', borderRadius: 0 }}> 
                        <Card.Content>
                            <Card.Header>{player.name}</Card.Header>
                            <Card.Meta>{player.position}</Card.Meta>
                            <Card.Description>
                                <p>Голы: {player.goals}</p>
                                <p>Ассисты: {player.assists}</p>
                            </Card.Description>
                        </Card.Content>
                    </Card>
                </Item.Header>
            </Segment>
        </Segment.Group>
    )
}
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Item, Segment } from 'semantic-ui-react'
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
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Content>
                            <Item.Header as={Link} to={`/players/${player.id}`}>
                                {player.name}
                            </Item.Header>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
        </Segment.Group>
    )
}
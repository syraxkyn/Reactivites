import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import { Team } from '../../../app/models/team';

interface Props {
    team: Team
}

export default function TeamListItem({ team }: Props) {

    const { postStore } = useStore();
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
                            <Item.Header as={Link} to={`/teams/${team.id}`}>
                                {team.name}
                            </Item.Header>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
        </Segment.Group>
    )
}
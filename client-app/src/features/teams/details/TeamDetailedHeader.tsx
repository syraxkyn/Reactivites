import { observer } from 'mobx-react-lite';
import { Button, Header, Item, Segment } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import { Team } from '../../../app/models/team';
import { useNavigate } from 'react-router-dom';
import { useState, SyntheticEvent } from 'react';

const postImageStyle = {
    filter: 'brightness(30%)'
};

const postImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    team: Team
}

export default observer(function TeamDetailedHeader({ team }: Props) {
    const { teamStore } = useStore();
    const { userStore: { isAdmin } } = useStore();
    const { deleteTeam, loading } = teamStore;
    const navigate = useNavigate()

    const[target, setTarget] = useState('');

    function handleTeamDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteTeam(id);
        navigate(`/teams`)
    }
    return (
        <Segment.Group>
            <Segment clearing attached='top' style={{ padding: '30' }}>
                <Segment basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={team.name}
                                />
                                {isAdmin ? (
                                <Button
                                    name={team.id}
                                    loading={loading && target === team.id}
                                    onClick={(e) => handleTeamDelete(e, team.id)}
                                    floated='right'
                                    color='red'
                                    content='Удалить'
                                />
                            ):(null)}
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
            </Segment>
        </Segment.Group>
    )
})
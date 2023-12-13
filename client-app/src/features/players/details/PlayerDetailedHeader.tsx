import { observer } from 'mobx-react-lite';
import { Button, Header, Item, Segment } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import { Player } from '../../../app/models/player';
import { SyntheticEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
    player: Player
}

export default observer(function PlayerDetailedHeader({ player }: Props) {
    const { userStore: { isAdmin }, playerStore } = useStore();
    const { deletePlayer, loading } = playerStore;
    const navigate = useNavigate()

    const[target, setTarget] = useState('');

    function handlePlayerDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deletePlayer(id);
        navigate(`/players`)
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
                                    content={player.name}
                                />
                            </Item.Content>
                            {isAdmin ? (
                    <>
                        <Button as={Link}
                            to={`/managePlayer/${player.id}`}
                            color='orange'
                            floated='right'>
                            Редактировать
                        </Button>
                        <Button
                            name= {player.id}
                            loading={loading && target === player.id}
                            onClick={(e)=>handlePlayerDelete(e,player.id)}
                            floated='right'
                            color='red'
                            content='Удалить'
                        />
                    </>
                ) : <></>}
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
        </Segment.Group>
    )
})
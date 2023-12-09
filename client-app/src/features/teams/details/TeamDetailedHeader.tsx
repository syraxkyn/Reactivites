import { observer } from 'mobx-react-lite';
import { Header, Item, Segment } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import { Team } from '../../../app/models/team';

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
    const { teamStore: { loading } } = useStore();
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
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                {/* {post.isHost ? (
                    <>
                        <Button as={Link}
                            to={`/manage/${post.id}`}
                            color='orange'
                            floated='right'>
                            Edit Post
                        </Button>
                    </>
                ) : <></>} */}
            </Segment>
        </Segment.Group>
    )
})
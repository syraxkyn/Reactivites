import { observer } from 'mobx-react-lite';
import React from 'react'
import { Button, Header, Item, Segment, Image, Label, Grid, Icon } from 'semantic-ui-react'
import { Post } from "../../../app/models/post";
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useStore } from '../../../app/stores/store';
import { act } from 'react-dom/test-utils';
import { Match } from '../../../app/models/match';

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
    match: Match
}

export default observer(function MatchDetailedHeader({ match }: Props) {
    const { matchStore: { loading } } = useStore();
    return (
        <Segment.Group>
            <Segment clearing attached='top' style={{ padding: '30' }}>
                <Segment basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={match.id}
                                />
                                <br/>
                                <span>
                                    {format(match.date!, 'dd MMM yyyy h:mm aa')}
                                </span>
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
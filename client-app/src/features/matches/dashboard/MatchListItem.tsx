import { SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import { format } from 'date-fns';
import { Post } from '../../../app/models/post';
import { Match } from '../../../app/models/match';

interface Props {
    match: Match
}

export default function MatchListItem({ match }: Props) {

    const { matchStore } = useStore();
    const { deleteMatch, loading } = matchStore;
    const [target, setTarget] = useState('');

    function handlePostDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteMatch(id);
    }
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image style={{marginBottom: 3}}size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/matches/${match.id}`}>
                                {match.id}
                            </Item.Header>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment clearing>
                <span>
                    <Icon name='clock' /> {format(match.date!, 'dd MMM yyyy h:mm aa')}
                </span>
                <Button
                    as={Link}
                    to={`/matches/${match.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}
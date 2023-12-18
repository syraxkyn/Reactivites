import { SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import { format } from 'date-fns';
import { Post } from '../../../app/models/post';
import { Match } from '../../../app/models/match';
import { ru } from 'date-fns/locale';

interface Props {
    match: Match
}

export default function MatchListItem({ match }: Props) {

    const { matchStore } = useStore();
    const [target, setTarget] = useState('');
    console.log(match.ended)
    console.log(match)
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Content>
                            <Item.Header as={Link} to={`/matches/${match.id}`}>
                                {match.firstTeamName} - {match.secondTeamName}
                            </Item.Header>
                            {match.ended && (
                                <Item.Description>
                                    <Label basic color='orange'>
                                        Матч завершен
                                    </Label>
                                </Item.Description>
                            )}
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment clearing>
                <span>
                    <Icon name='clock' /> {format(match.date!, 'dd MMM yyyy h:mm aa', { locale: ru })}
                </span>
                <Button
                    as={Link}
                    to={`/matches/${match.id}`}
                    color='teal'
                    floated='right'
                    content='Подробнее'
                />
            </Segment>
        </Segment.Group>
    )
}
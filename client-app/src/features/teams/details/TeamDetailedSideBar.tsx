import React from 'react'
import { Segment, List, Label, Item, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Team } from '../../../app/models/team';

interface Props {
    team: Team;
}

export default observer(function TeamDetailedSidebar({ team }: Props) {
    if (!team.bestGoalScorer) return null;
    return (
        <>
            <Segment
                textAlign='center'
                style={{ border: 'none' }}
                attached='top'
                secondary
                inverted
                color='blue'
            >
            </Segment>
            <Segment attached>
                <List relaxed divided>
                    <Item style={{ position: 'relative' }}>
                        <Item.Content verticalAlign='middle'>
                            <Item.Extra as='h1' style={{ color: 'orange' }}>Лучший бомбардир</Item.Extra>
                            <Item.Header as='h1'>
                                {/* <Link to={`/profiles/${attendee.username}`}>{attendee.displayName}</Link> */}
                                <Link to={`/players/${team.bestGoalScorer?.id}`}>{team.bestGoalScorer?.name}: {team.bestGoalScorer?.goals}</Link>
                            </Item.Header>
                        </Item.Content>
                        <Item.Content verticalAlign='middle'>
                            <Item.Extra as='h1' style={{ color: 'orange' }}>Лучший ассистент</Item.Extra>
                            <Item.Header as='h1'>
                                {/* <Link to={`/profiles/${attendee.username}`}>{attendee.displayName}</Link> */}
                                <Link to={`/players/${team.bestAssistant?.id}`}>{team.bestAssistant?.name}: {team.bestAssistant?.assists}</Link>
                            </Item.Header>
                        </Item.Content>
                    </Item>
                </List>
            </Segment>
        </>
    )
})
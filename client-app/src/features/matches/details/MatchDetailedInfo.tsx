import { observer } from 'mobx-react-lite';
import React from 'react'
import { Segment, Grid, Icon, Container, Divider, Header } from 'semantic-ui-react'
import { Match } from '../../../app/models/match';

interface Props {
    match: Match
}

export default observer(function MatchDetailedInfo({ match }: Props) {
console.log(match.firstTeamName)

    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Container text>
                        <Segment raised>
                            <Header as='h2'>Матч</Header>
                            <Divider />
                            <p>Команда 1: {match.firstTeamName}</p>
                            <p>Команда 2: {match.secondTeamName}</p>
                        </Segment>
                    </Container>
                    {/* <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='info' />
                    </Grid.Column> */}
                    {/* <Grid.Column width={15}>
                        {match.id}
                    </Grid.Column> */}
                </Grid>
            </Segment>
        </Segment.Group>
    )
})
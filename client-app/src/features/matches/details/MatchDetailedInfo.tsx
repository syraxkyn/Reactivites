import { observer } from 'mobx-react-lite';
import React from 'react'
import { Segment, Grid, Icon, Container, Divider, Header } from 'semantic-ui-react'
import { Match } from '../../../app/models/match';

interface Props {
    match: Match
}

export default observer(function MatchDetailedInfo({ match }: Props) {

    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Container text>
                        {match.ended ? (
                            <div style={{ textAlign: 'center' }}>
                                <h1>Итоговый счёт</h1>
                                <h1>{match.goalsScoredFirstTeam} - {match.goalsScoredSecondTeam}</h1>
                            </div>
                        ):(
                            <div style={{ textAlign: 'center' }}>
                                <h1>Матч не окончен</h1>
                            </div>
                        )
                    }
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
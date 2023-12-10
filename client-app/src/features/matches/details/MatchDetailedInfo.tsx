import { observer } from 'mobx-react-lite';
import React from 'react'
import {Segment, Grid, Icon} from 'semantic-ui-react'
import { Match } from '../../../app/models/match';

interface Props {
    match: Match
}

export default observer(function MatchDetailedInfo({match}: Props) {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='info'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        {match.id}
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
})
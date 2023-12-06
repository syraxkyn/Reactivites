import { observer } from 'mobx-react-lite';
import React from 'react'
import {Segment, Grid, Icon} from 'semantic-ui-react'
import {Post} from "../../../app/models/post";
import { format } from 'date-fns';

interface Props {
    post: Post
}

export default observer(function PostDetailedInfo({post}: Props) {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='info'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        {post.text}
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
})
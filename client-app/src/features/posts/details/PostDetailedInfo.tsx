import { observer } from 'mobx-react-lite';
import React from 'react'
import {Segment, Grid, Icon} from 'semantic-ui-react'
import {Post} from "../../../app/models/post";
import { format } from 'date-fns';

interface Props {
    post: Post
}
function splitTextIntoColumns(text) {
    const maxCharsPerLine = 78;
    const lines = text.split('\n');
    const dividedLines = [];

    lines.forEach((line) => {
        if (line.length > maxCharsPerLine) {
            for (let i = 0; i < line.length; i += maxCharsPerLine) {
                dividedLines.push(line.substr(i, maxCharsPerLine));
            }
        } else {
            dividedLines.push(line);
        }
    });

    return dividedLines;
}

export default observer(function PostDetailedInfo({post}: Props) {
    const dividedText = splitTextIntoColumns(post.text);

    const textColumns = dividedText.map((line, index) => (
        <Grid.Column key={index} width={15}>
            {line}
        </Grid.Column>
    ));
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='info'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        {textColumns}
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
})
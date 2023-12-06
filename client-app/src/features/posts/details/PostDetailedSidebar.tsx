import React from 'react'
import { Segment, List, Label, Item, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Post } from '../../../app/models/post';

interface Props {
    post: Post;
}

export default observer(function PostDetailedSidebar(post: Props) {
    return null
})
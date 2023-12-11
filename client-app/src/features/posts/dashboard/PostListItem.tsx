import { SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import { format } from 'date-fns';
import { Post } from '../../../app/models/post';

interface Props {
    post: Post
}

export default function PostListItem({ post }: Props) {

    const { postStore } = useStore();
    const { deletePost, loading } = postStore;
    const [target, setTarget] = useState('');

    function handlePostDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deletePost(id);
    }
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image style={{marginBottom: 3}}size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/posts/${post.id}`}>
                                {post.title}
                            </Item.Header>
                            <Item.Description>Опубликован пользователем {post.hostUsername} </Item.Description>
                            {post.isHost && (
                                <Item.Description>
                                    <Label basic color='orange'>
                                        You created this post
                                    </Label>
                                </Item.Description>
                            )}
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment clearing>
                <span>
                    <Icon name='clock' /> {format(post.date!, 'dd MMM yyyy h:mm aa')}
                </span>
                <Button
                    as={Link}
                    to={`/posts/${post.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}
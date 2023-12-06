import { Header, Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Fragment } from 'react';
import PostListItem from './PostListItem';

export default observer(function PostList() {
    const { postStore } = useStore();
    const { groupedPosts } = postStore;
    console.log(groupedPosts)

    return (
        <>
            {groupedPosts.map(([group, posts]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                    {posts.map(post => (
                        <PostListItem key={post.id} post={post} />
                    ))}
                </Fragment>
            ))}
        </>
    )
})
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import PostList from './PostList';
import PostFilters from './PostFilters';

export default observer(function PostDashboard() {

    const { postStore } = useStore();
    const { loadPosts, postRegistry } = postStore;

    useEffect(() => {
        if (postRegistry.size <= 1) loadPosts();
    }, [postRegistry.size,loadPosts])

    if (postStore.loadingInitial) return <LoadingComponent content='Loading posts...' />

    return (
        <Grid>
            <Grid.Column width='10'>
                <PostList />
            </Grid.Column>
            <Grid.Column width='6'>
                <PostFilters/>
            </Grid.Column>
        </Grid>
    )
})
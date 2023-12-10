import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import PostList from './MatchList';

export default observer(function MatchDashboard() {

    const { matchStore } = useStore();
    const { loadMatches, matchRegistry } = matchStore;

    useEffect(() => {
        if (matchRegistry.size <= 1) loadMatches();
    }, [matchRegistry.size,loadMatches])

    if (matchStore.loadingInitial) return <LoadingComponent content='Loading matches...' />

    return (
        <Grid>
            <Grid.Column width='10'>
                <PostList />
            </Grid.Column>
        </Grid>
    )
})
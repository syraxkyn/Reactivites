import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import TeamList from './TeamList';

export default observer(function TeamDashboard() {

    const { teamStore } = useStore();
    const { loadTeams, teamRegistry } = teamStore;

    useEffect(() => {
        if (teamRegistry.size <= 1) loadTeams();
    }, [teamRegistry.size,loadTeams])

    if (teamStore.loadingInitial) return <LoadingComponent content='Loading teams...' />

    return (
        <Grid>
            <Grid.Column width='10'>
                <TeamList />
            </Grid.Column>
        </Grid>
    )
})
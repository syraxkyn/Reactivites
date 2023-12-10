import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import PlayerList from './PlayerList';

export default observer(function PlayerDashboard() {

    const { playerStore } = useStore();
    const { loadPlayers, playerRegistry } = playerStore;

    useEffect(() => {
        if (playerRegistry.size <= 1) loadPlayers();
    }, [playerRegistry.size,loadPlayers])

    if (playerStore.loadingInitial) return <LoadingComponent content='Loading players...' />

    return (
        <Grid>
            <Grid.Column width='10'>
                <PlayerList />
            </Grid.Column>
        </Grid>
    )
})
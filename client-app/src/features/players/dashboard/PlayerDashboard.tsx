import { Button, Grid, Loader } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import PlayerList from './PlayerList';
import { PagingParams } from '../../../app/models/pagination';
import InfiniteScroll from 'react-infinite-scroller';

export default observer(function PlayerDashboard() {

    const { playerStore } = useStore();
    const { loadPlayers, playerRegistry, setPagingParams, pagination, players } = playerStore;
    const [loadingNext, setLoadingNext] = useState(false);
    const [loadingPrev, setLoadingPrev] = useState(false);

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1))
        loadPlayers().then(() => setLoadingNext(false));
    }

    // function handleGetNext(){
    //     setLoadingNext(true);
    //     setPagingParams(new PagingParams(pagination!.currentPage + 1))
    //     playerRegistry.clear()
    //     loadPlayers().then(()=> setLoadingNext(false));
    //     console.log('next')
    //     console.log(players)
    // }

    // function handleGetPrev(){
    //     setLoadingPrev(true);
    //     setPagingParams(new PagingParams(pagination!.currentPage - 1))
    //     playerRegistry.clear()
    //     console.log()
    //     console.log(players)
    //     loadPlayers().then(()=> setLoadingPrev(false));
    //     console.log('prev')
    //     console.log(players)
    // }

    useEffect(() => {
        if (playerRegistry.size <= 1) loadPlayers();
    }, [playerRegistry.size, loadPlayers])

    if (playerStore.loadingInitial && !loadingNext) return <LoadingComponent content='Loading players...' />

    return (
        <Grid>
            <Grid.Column width='10'>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={handleGetNext}
                    hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                    initialLoad={false}
                >
                    <PlayerList />
                </InfiniteScroll>
            </Grid.Column>
            <Grid.Column width={10}>
                <Loader active={loadingNext} />
            </Grid.Column>
        </Grid>
    )
})
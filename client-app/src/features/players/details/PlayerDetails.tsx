import { Grid } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import PlayerDetailedHeader from './PlayerDetailedHeader';
import PlayerDetailedInfo from './PlayerDetailedInfo';

export default observer(function PlayerDetails() {
  const { playerStore } = useStore();
  const { selectedPlayer: player, loadPlayer, loadingInitial, clearSelectedPlayer } = playerStore;
  const { id } = useParams();

  useEffect(() => {
    if (id) loadPlayer(id);
    return () => clearSelectedPlayer(); 
  }, [id, loadPlayer])

  if (loadingInitial || !player) return <LoadingComponent />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <PlayerDetailedHeader player={player}/>
        <PlayerDetailedInfo player={player}/>
      </Grid.Column>
      <Grid.Column width={6}>
        <PlayerDetailedHeader player={player}/>
      </Grid.Column>
    </Grid>
  )
})
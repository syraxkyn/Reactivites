import { Grid } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import TeamDetailedHeader from './TeamDetailedHeader';
import TeamDetailedInfo from './TeamDetailedInfo';
import TeamDetailedSideBar from './TeamDetailedSideBar';

export default observer(function TeamDetails() {
  const { teamStore } = useStore();
  const { selectedTeam: team, loadTeam, loadingInitial, clearSelectedTeam } = teamStore;
  const { id } = useParams();

  useEffect(() => {
    if (id) loadTeam(id);
    return () => clearSelectedTeam(); 
  }, [id, loadTeam])

  if (loadingInitial || !team) return <LoadingComponent />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <TeamDetailedHeader team={team}/>
        <TeamDetailedInfo team={team}/>
      </Grid.Column>
      <Grid.Column width={6}>
        <TeamDetailedSideBar team={team}/>
      </Grid.Column>
    </Grid>
  )
})
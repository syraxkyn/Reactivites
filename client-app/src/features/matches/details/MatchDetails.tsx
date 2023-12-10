import { Grid } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import MatchDetailedHeader from './MatchDetailedHeader';
import MatchDetailedInfo from './MatchDetailedInfo';

export default observer(function MatchDetails() {
  const { matchStore } = useStore();
  const { selectedMatch: match, loadMatch, loadingInitial, clearSelectedMatch } = matchStore;
  const { id } = useParams();

  useEffect(() => {
    if (id) loadMatch(id);
    return () => clearSelectedMatch(); 
  }, [id, loadMatch])

  if (loadingInitial || !match) return <LoadingComponent />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <MatchDetailedHeader match={match}/>
        <MatchDetailedInfo match={match}/>
        {/* <PostDetailedChat postId={match.id}/> */}
      </Grid.Column>
      <Grid.Column width={6}>
        {/* <PostDetailedSideBar/> */}
      </Grid.Column>
    </Grid>
  )
})
import { Grid } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import PostDetailedChat from './PostDetailedChat';
import PostDetailedHeader from './PostDetailedHeader';
import PostDetailedInfo from './PostDetailedInfo';

export default observer(function PostDetails() {
  const { postStore } = useStore();
  const { selectedPost: post, loadPost, loadingInitial, clearSelectedPost } = postStore;
  const { id } = useParams();

  useEffect(() => {
    if (id) loadPost(id);
    return () => clearSelectedPost(); 
  }, [id, loadPost])

  if (loadingInitial || !post) return <LoadingComponent />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <PostDetailedHeader post={post}/>
        <PostDetailedInfo post={post}/>
        <PostDetailedChat postId={post.id}/>
      </Grid.Column>
      <Grid.Column width={6}>
        {/* <PostDetailedSideBar/> */}
      </Grid.Column>
    </Grid>
  )
})
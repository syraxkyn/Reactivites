import { Header, Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Fragment } from 'react';
import MatchListItem from './MatchListItem';

export default observer(function MatchList() {
    const { matchStore } = useStore();
    const { groupedMatches } = matchStore;
    console.log(groupedMatches)

    return (
        <>
            {groupedMatches.map(([group, matches]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                    {matches.map(match => (
                        <MatchListItem key={match.id} match={match} />
                    ))}
                </Fragment>
            ))}
        </>
    )
})
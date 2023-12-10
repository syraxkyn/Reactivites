import { Header, Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Fragment } from 'react';
import TeamListItem from './TeamListItem';

export default observer(function TeamList() {
    const { teamStore } = useStore();
    const { teams } = teamStore;
    console.log(teams)

    return (
        <>
            <Fragment>
                {teams.map(team => (
                    <TeamListItem key={team.id} team={team} />
                ))}
            </Fragment>
        </>
    )
})
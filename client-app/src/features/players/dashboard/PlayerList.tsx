import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Fragment } from 'react';
import PlayerListItem from './PlayerListItem';

export default observer(function PlayerList() {
    const { playerStore } = useStore();
    const { players } = playerStore;
    console.log(players)

    return (
        <>
            <Fragment>
                {players.map(player => (
                    <PlayerListItem key={player.id} player={player} />
                ))}
            </Fragment>
        </>
    )
})
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Fragment, useEffect } from 'react';
import PlayerListItem from './PlayerListItem';

export default observer(function PlayerList() {
    const { playerStore } = useStore();
    const { players, loadPlayers } = playerStore;
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
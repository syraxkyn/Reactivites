import { observer } from 'mobx-react-lite'
import { Team } from '../../../app/models/team';
import { Player } from '../../../app/models/player';

interface Props {
    player: Player;
}

export default observer(function PlayerDetailedSidebar({ player }: Props) {
    return null;
})
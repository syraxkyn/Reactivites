import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Player, PlayerFormValues } from "../models/player";
import { Pagination, PagingParams } from "../models/pagination";
import { store } from "./store";

export default class PlayerStore {
    playerRegistry = new Map<string, Player>();
    selectedPlayer: Player | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    pagination: Pagination | null = null;
    pagingParams = new PagingParams();
    predicate = new Map().set('all', true);

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.predicate.keys(),
            () => {
                this.pagingParams = new PagingParams();
                this.playerRegistry.clear();
                this.loadPlayers();
            }
        )
    }

    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }

    setPredicate = (predicate: string, value: string | Date) => {
        const resetPredicate = () => {
            this.predicate.forEach((value, key) => {
                this.predicate.delete(key);
            })
        }
        switch (predicate) {
            case 'All':
                resetPredicate();
                this.predicate.set('All', true);
                break;
            case 'Attacker':
                resetPredicate();
                this.predicate.set('Position', 'attacker');
                break;
            case 'Midfielder':
                resetPredicate();
                this.predicate.set('Position', 'midfielder');
                break;
            case 'Defender':
                resetPredicate();
                this.predicate.set('Position', 'defender');
                break;
            case 'Goalkeeper':
                resetPredicate();
                this.predicate.set('Position', 'goalkeeper');
                break;
        }
    }

    get axiosParams() {
        const params = new URLSearchParams();
        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pageSize.toString());
        this.predicate.forEach((value, key) => {
            params.append(key, value);
        })
        return params;
    }

    get players() {
        return Array.from(this.playerRegistry.values());
    }

    loadPlayers = async () => {
        this.setLoadingInitial(true);
        try {
            const result = await agent.Players.list(this.axiosParams);
            result.data.forEach(player => {
                this.setPlayer(player)
            })
            this.setPagination(result.pagination);
            this.setLoadingInitial(false);
        }
        catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    setPagination = (pagination: Pagination) => {
        this.pagination = pagination;
    }

    loadPlayer = async (id: string) => {
        let player = this.getPlayer(id);
        if (player) {
            this.selectedPlayer = player
            return player;
        }
        else {
            this.setLoadingInitial(true);
            try {
                player = await agent.Players.details(id);
                this.setPlayer(player);
                runInAction(() => {
                    this.selectedPlayer = player;
                })
                this.setLoadingInitial(false);
                return player;
            } catch (error) {
                console.log(error)
                this.setLoadingInitial(false);
            }
        }
    }

    private setPlayer = (player: Player) => {
        this.playerRegistry.set(player.id, player);
    }

    private getPlayer = (id: string) => {
        return this.playerRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createPlayer = async (player: PlayerFormValues) => {
        try {
            const team = store.teamStore;
            await agent.Players.create(player);
            const newPlayer = new Player(player);
            this.setPlayer(newPlayer);
            runInAction(() => {
                this.selectedPlayer = newPlayer;
                team.loadTeams()
            })
        }
        catch (error) {
            console.log(error);
        }
    }

    updatePlayer = async (player: PlayerFormValues) => {
        try {
            const team = store.teamStore;
            await agent.Players.update(player);
            runInAction(() => {
                if (player.id) {
                    const updatedPlayer = { ...this.getPlayer(player.id), ...player }
                    this.playerRegistry.set(player.id, updatedPlayer as Player)
                    this.selectedPlayer = updatedPlayer as Player;
                }
                team.loadTeams()
            })
        } catch (error) {
            console.log(error)
        }
    }

    deletePlayer = async (id: string) => {
        this.loading = true;
        try {
            const team = store.teamStore;
            await agent.Players.delete(id);
            runInAction(() => {
                this.playerRegistry.delete(id);
                this.loading = false;
                team.loadTeams()
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    clearSelectedPlayer = () => {
        this.selectedPlayer = undefined;
    }
}
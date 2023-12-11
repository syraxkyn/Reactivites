import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Player, PlayerFormValues } from "../models/player";
import { Pagination, PagingParams } from "../models/pagination";

export default class PlayerStore {
    playerRegistry = new Map<string, Player>();
    selectedPlayer: Player | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    pagination: Pagination | null = null;
    pagingParams = new PagingParams();

    constructor() {
        makeAutoObservable(this);
    }

    setPagingParams = (pagingParams:PagingParams) => {
        this.pagingParams = pagingParams;
    }

    get axiosParams() {
        const params = new URLSearchParams();
        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pageSize.toString());
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

    loadPlayer= async (id: string) => {
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
            await agent.Players.create(player);
            const newPlayer = new Player(player);
            this.setPlayer(newPlayer);
            runInAction(() => {
                this.selectedPlayer = newPlayer;
            })
        }
        catch (error) {
            console.log(error);
        }
    }

    updatePlayer = async (player: PlayerFormValues) => {
        try {
            await agent.Teams.update(player);
            runInAction(() => {
                if (player.id) {
                    const updatedPlayer = { ...this.getPlayer(player.id), ...player }
                    this.playerRegistry.set(player.id, updatedPlayer as Player)
                    this.selectedPlayer = updatedPlayer as Player;
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    deletePlayer= async (id: string) => {
        this.loading = true;
        try {
            await agent.Players.delete(id);
            runInAction(() => {
                this.playerRegistry.delete(id);
                this.loading = false;
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
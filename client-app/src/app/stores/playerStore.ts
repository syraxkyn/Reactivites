import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { store } from "./store";
import { Player, PlayerFormValues } from "../models/player";

export default class PlayerStore {
    playerRegistry = new Map<string, Player>();
    selectedPlayer: Player | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }

    get players() {
        return Array.from(this.playerRegistry.values());
    }

    loadPlayers = async () => {
        this.setLoadingInitial(true);
        try {
            const players = await agent.Players.list();
            console.log(players)
            players.forEach(player => {
                this.setPlayer(player)
            })
            this.setLoadingInitial(false);
        }
        catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
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
        const user = store.userStore.user;
        // if (user) {
        //     team.isHost = team.hostUsername === user.username;
        //     // post.host = activity.attendees?.find(x => x.username === post.hostUsername);
        // }
        this.playerRegistry.set(player.id, player);
    }

    private getPlayer = (id: string) => {
        return this.playerRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createPlayer = async (player: PlayerFormValues) => {
        const user = store.userStore.user;
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

    updateTeam = async (player: PlayerFormValues) => {
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

    deleteTeam = async (id: string) => {
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

    clearSelectedTeam = () => {
        this.selectedPlayer = undefined;
    }
}
import { makeAutoObservable, runInAction } from "mobx";
import { Team, TeamFormValues } from "../models/team";
import agent from "../api/agent";
import { store } from "./store";

export default class TeamStore {
    teamRegistry = new Map<string, Team>();
    selectedTeam: Team | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }

    get teams() {
        return Array.from(this.teamRegistry.values());
    }

    loadTeams = async () => {
        this.setLoadingInitial(true);
        try {
            const teams = await agent.Teams.list();
            console.log(teams)
            teams.forEach(team => {
                this.setTeam(team)
            })
            this.setLoadingInitial(false);
        }
        catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadTeam = async (id: string) => {
        let team = this.getTeam(id);
        if (team) {
            this.selectedTeam = team
            return team;
        }
        else {
            this.setLoadingInitial(true);
            try {
                team = await agent.Teams.details(id);
                this.setTeam(team);
                runInAction(() => {
                    this.selectedTeam = team;
                })
                this.setLoadingInitial(false);
                return team;
            } catch (error) {
                console.log(error)
                this.setLoadingInitial(false);
            }
        }
    }

    private setTeam = (team: Team) => {
        runInAction(() => {
            let players = team.players;
            if (team.players?.length != 0) {
                const bestAssistant = players?.reduce((prevPlayer, currentPlayer) => {
                    if (!prevPlayer) {
                        return currentPlayer;
                    }
                    return (prevPlayer.assists !== undefined && currentPlayer.assists !== undefined && prevPlayer.assists > currentPlayer.assists)
                        ? prevPlayer
                        : currentPlayer;
                });
                const bestGoalScorer = players?.reduce((prevPlayer, currentPlayer) => {
                    if (!prevPlayer) {
                        return currentPlayer;
                    }
                    return (prevPlayer.assists !== undefined && currentPlayer.goals !== undefined && prevPlayer.goals > currentPlayer.goals)
                        ? prevPlayer
                        : currentPlayer;
                });
                console.log(bestGoalScorer)
                team.bestAssistant = bestAssistant;
                team.bestGoalScorer = bestGoalScorer;
            }
        })
        this.teamRegistry.set(team.id, team);
    }

    private getTeam = (id: string) => {
        return this.teamRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createTeam = async (team: TeamFormValues) => {
        const user = store.userStore.user;
        try {
            await agent.Teams.create(team);
            const newTeam = new Team(team);
            this.setTeam(newTeam);
            runInAction(() => {
                this.selectedTeam = newTeam;
            })
        }
        catch (error) {
            console.log(error);
        }
    }

    updateTeam = async (team: TeamFormValues) => {
        try {
            await agent.Teams.update(team);
            runInAction(() => {
                if (team.id) {
                    const updatedTeam = { ...this.getTeam(team.id), ...team }
                    this.teamRegistry.set(team.id, updatedTeam as Team)
                    this.selectedTeam = updatedTeam as Team;
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    deleteTeam = async (id: string) => {
        this.loading = true;
        try {
            await agent.Teams.delete(id);
            await store.playerStore.loadPlayers();
            runInAction(() => {
                this.teamRegistry.delete(id);
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
        this.selectedTeam = undefined;
    }
}
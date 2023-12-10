import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Match, MatchFormValues } from "../models/match";
import { format } from "date-fns";

export default class MatchStore {
    matchRegistry = new Map<string, Match>();
    selectedMatch: Match | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }

    get matchesByDate() {
        return Array.from(this.matchRegistry.values()).sort((a, b) =>
            a.date!.getTime() - b.date!.getTime()
        );
    }

    get groupedMatches() {
        return Object.entries(
            this.matchesByDate.reduce((matches, match) => {
                const date = format(match.date!, 'dd MMM yyyy')
                matches[date] = matches[date] ? [...matches[date], match] : [match];
                return matches;
            }, {} as { [key: string]: Match[] })
        )
    }

    get matches() {
        return Array.from(this.matchRegistry.values());
    }

    loadMatches = async () => {
        this.setLoadingInitial(true);
        try {
            const matches = await agent.Matches.list();
            console.log(matches)
            matches.forEach(match => {
                this.setMatch(match)
            })
            this.setLoadingInitial(false);
        }
        catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadMatch= async (id: string) => {
        let match = this.getMatch(id);
        if (match) {
            this.selectedMatch = match
            return match;
        }
        else {
            this.setLoadingInitial(true);
            try {
                match = await agent.Matches.details(id);
                this.setMatch(match);
                runInAction(() => {
                    this.selectedMatch = match;
                })
                this.setLoadingInitial(false);
                return match;
            } catch (error) {
                console.log(error)
                this.setLoadingInitial(false);
            }
        }
    }

    private setMatch = (match: Match) => {
        this.matchRegistry.set(match.id, match);
    }

    private getMatch = (id: string) => {
        return this.matchRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createMatch = async (match: MatchFormValues) => {
        try {
            await agent.Matches.create(match);
            const newMatch = new Match(match);
            this.setMatch(newMatch);
            runInAction(() => {
                this.selectedMatch = newMatch;
            })
        }
        catch (error) {
            console.log(error);
        }
    }

    updateMatch = async (match: MatchFormValues) => {
        try {
            await agent.Matches.update(match);
            runInAction(() => {
                if (match.id) {
                    const updatedMatch = { ...this.getMatch(match.id), ...match }
                    this.matchRegistry.set(match.id, updatedMatch as Match)
                    this.selectedMatch = updatedMatch as Match;
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    deleteMatch= async (id: string) => {
        this.loading = true;
        try {
            await agent.Matches.delete(id);
            runInAction(() => {
                this.matchRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    clearSelectedMatch = () => {
        this.selectedMatch = undefined;
    }
}
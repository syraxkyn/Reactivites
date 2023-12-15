import { Player } from "./player";

export interface ITeam {
  id: string;
  name: string;
  players?: Player[];
  scoredGoals?: number;
  concededGoals?: number;
  points?:number;
}

export class Team implements ITeam {
  constructor(init: TeamFormValues) {
    this.id = init.id!
    this.name = init.name
  }

  id: string;
  name: string;
  players?: Player[];
  bestGoalScorer?: Player
  bestAssistant?: Player
  scoredGoals?: number;
  concededGoals?: number;
  points?:number;
}

export class TeamFormValues {
  id?: string = undefined;
  name: string = '';

  constructor(team?: TeamFormValues) {
    if (team) {
      this.id = team.id;
      this.name = team.name;
    }
  }
}
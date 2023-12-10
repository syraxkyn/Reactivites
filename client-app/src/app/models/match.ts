export interface IMatch {
  id: string;
  date: Date | null;
  firstTeamName: string;
  secondTeamName: string;
  goalsScoredFirstTeam?: number;
  goalsScoredSecondTeam?: number;
}

export class Match implements IMatch {
  constructor(init: MatchFormValues) {
    this.id = init.id!
    this.date = init.date
    this.firstTeamName = init.firstTeamName
    this.secondTeamName = init.secondTeamName
  }

  id: string;
  date: Date | null;
  firstTeamName: string;
  secondTeamName: string;
  goalsScoredFirstTeam?: number;
  goalsScoredSecondTeam?: number;
}

export class MatchFormValues {
  id?: string = undefined;
  date: Date | null = null;
  firstTeamName: string = '';
  secondTeamName: string = '';

  constructor(match?: MatchFormValues) {
    if (match) {
      this.id = match.id;
      this.date = match.date;
      this.firstTeamName = match.firstTeamName;
      this.secondTeamName = match.secondTeamName;
    }
  }
}
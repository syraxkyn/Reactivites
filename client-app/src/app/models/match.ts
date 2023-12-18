export interface IMatch {
  id: string;
  date: Date | null;
  firstTeamName: string;
  secondTeamName: string;
  firstTeamid: string;
  secondTeamid: string;
  ended: boolean;
  goalsScoredFirstTeam?: number;
  goalsScoredSecondTeam?: number;
}

export class Match implements IMatch {
  ended: boolean;
  constructor(init: MatchFormValues) {
    this.id = init.id!
    this.date = init.date
    this.firstTeamName = init.firstTeamName
    this.secondTeamName = init.secondTeamName
    this.ended = init.ended
    this.firstTeamid = init.firstTeamId
    this.secondTeamid = init.secondTeamId
  }

  id: string;
  date: Date | null;
  firstTeamName: string;
  secondTeamName: string;
  firstTeamid: string;
  secondTeamid: string;
  goalsScoredFirstTeam?: number;
  goalsScoredSecondTeam?: number;
}

export class MatchFormValues {
  id?: string = undefined;
  date: Date | null = null;
  firstTeamName: string = '';
  secondTeamName: string = '';
  firstTeamId?: string = undefined;
  secondTeamId?: string = undefined;

  constructor(match?: MatchFormValues) {
    if (match) {
      this.ended = match.ended
      this.id = match.id;
      this.date = match.date;
      this.firstTeamName = match.firstTeamName;
      this.secondTeamName = match.secondTeamName;
      this.firstTeamId = match.firstTeamId;
      this.secondTeamId = match.secondTeamId;
    }
  }
}
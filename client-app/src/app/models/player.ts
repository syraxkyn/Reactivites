export interface IPlayer {
  id: string;
  name: string;
  position: string;
  goals?: number;
  assists?: number;
}

export class Player implements IPlayer {
  constructor(init: PlayerFormValues) {
    this.id = init.id!
    this.name = init.name
    this.position= init.position
  }

  id: string;
  name: string;
  position: string;
  goals?: number;
  assists?: number;
}

export class PlayerFormValues {
  id?: string = undefined;
  name: string = '';
  position: string = '';
  goals: number = 0;
  assists: number = 0;
  constructor(player?: PlayerFormValues) {
    if (player) {
      this.id = player.id;
      this.name = player.name;
      this.position = player.position;
      this.goals = player.goals;
      this.assists = player.assists;
    }
  }
}
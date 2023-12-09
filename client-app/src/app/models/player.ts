export interface IPlayer {
  id: string;
  name: string;
  goals?: number;
  assists?: number;
}

export class Player implements IPlayer {
  constructor(init: PlayerFormValues) {
    this.id = init.id!
    this.name = init.name
  }

  id: string;
  name: string;
  goals?: number;
  assists?: number;
}

export class PlayerFormValues {
  id?: string = undefined;
  name: string = '';

  constructor(player?: PlayerFormValues) {
    if (player) {
      this.id = player.id;
      this.name = player.name;
    }
  }
}
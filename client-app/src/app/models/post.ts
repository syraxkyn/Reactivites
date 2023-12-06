import { Profile } from "./profile";

export interface IPost {
  id: string;
  title: string;
  text: string;
  date: Date | null;
  hostUsername: string;
  host?: Profile;
}

export class Post implements IPost {
  constructor(init: PostFormValues) {
    this.id = init.id!
    this.title = init.title
    this.date = init.date
    this.text = init.text
  }

  id: string;
  title: string;
  date: Date | null;
  text: string;
  hostUsername: string = '';
  isHost: boolean = false;
  host?: Profile;
}

export class PostFormValues {
  id?: string = undefined;
  title: string = '';
  date: Date | null = null;
  text: string = '';

  constructor(post?: PostFormValues) {
    if (post) {
      this.id = post.id;
      this.title = post.title;
      this.text = post.text;
      this.date = post.date;
    }
  }
}
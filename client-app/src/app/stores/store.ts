import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import ModalStore from "./modalStore";
import CommentStore from "./commentStore";
import PostStore from "./postStore";
import TeamStore from "./teamStore";
import PlayerStore from "./playerStore";
import MatchStore from "./matchStore";
import MessageStore from "./messageStore";

interface Store{
    postStore: PostStore
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    commentStore: CommentStore;
    teamStore: TeamStore;
    playerStore: PlayerStore;
    matchStore: MatchStore;
    messageStore: MessageStore;
}

export const store: Store = {
    postStore: new PostStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    commentStore: new CommentStore(),
    teamStore: new TeamStore(),
    playerStore: new PlayerStore(),
    matchStore: new MatchStore(),
    messageStore: new MessageStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
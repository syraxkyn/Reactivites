import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { makeAutoObservable, runInAction } from "mobx";
import { store } from "./store";
import { ChatMessage } from "../models/message";

export default class MessageStore {
    messages: ChatMessage[] = [];
    hubConnection: HubConnection | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    createHubConnection = (matchId: string) => {
        if (store.matchStore.selectedMatch) {
            this.hubConnection = new HubConnectionBuilder()
                .withUrl('http://localhost:5000/messagesChat?matchId=' + matchId, {
                    accessTokenFactory: () => store.userStore.user?.token!
                })
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build();

            this.hubConnection.start().catch(error => console.log('Error establishing the connection: ', error));

            this.hubConnection.on('LoadMessages', (messages: ChatMessage[]) => {
                runInAction(() => {
                    messages.forEach(message => {
                        message.createdAt = new Date(message.createdAt + 'Z');
                    })
                    this.messages = messages
                });
            })

            this.hubConnection.on('ReceiveMessage', (message: ChatMessage) => {
                runInAction(() => {
                    message.createdAt = new Date(message.createdAt)
                    this.messages.unshift(message)
                });
            })
        }
    }

    stopHubConnection = () => {
        this.hubConnection?.stop().catch(error => console.log('Error stopping connection: ', error));
    }

    clearComments = () => {
        this.messages = [];
        this.stopHubConnection();
    }

    addMessage = async (values: any) => {
        values.matchId = store.matchStore.selectedMatch?.id;
        try {
            await this.hubConnection?.invoke('SendMessage', values);
        } catch (error) {
        }
    }
}
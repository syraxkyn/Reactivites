export interface ChatMessage {
    id: number;
    createdAt: Date;
    body: string;
    username: string;
    displayName: string;
    image: string;
}
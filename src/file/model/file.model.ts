export interface FileModel{
    urls: any;
    entity_id: number,
    entity_name: FileModelName,
}

export enum FileModelName{
    USER = 'user',
    GAME = 'game',
    ACHIEVEMENT = 'achievement',
    LEADERBOARD = 'leaderboard',
}
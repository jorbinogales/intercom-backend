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

export enum DevAddImage{
    USER = 'user_add_image',
    GAME = 'game_add_image',
    ACHIEVEMENT = 'achievement_add_image',
    LEADERBOARD = 'leaderboard_add_image',
}
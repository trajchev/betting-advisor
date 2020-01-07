// Saved match interface
export interface SavedGame {
    status: String;
    data: {
        savedGame: {
            id: Number;
            userId: Number;
            matchId: Number;
            updatedAt: Date;
            createdAT: String;
        }
    };
}

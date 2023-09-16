import { gameName } from "../const/gameInfo";

type GameData = {
  longestStreak: number;
};

export class GameStorage {
  public save(data: GameData): void {
    window.highscores.setScore(data.longestStreak);
  }

  public load(): GameData {
    return { longestStreak: window.highscores.getScore() };
  }
}

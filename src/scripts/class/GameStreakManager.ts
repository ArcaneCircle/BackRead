import { GameStorage } from "./GameStorage";
import { GameHtmlElement } from "./GameHtmlElement";
import { GameSignal } from "./GameSignal";

export class GameStreakManager {
  static get currentStreak(): number {
    return this._currentStreak;
  }

  static set currentStreak(value: number) {
    this._currentStreak = value;
    GameHtmlElement.currentStreakElement.innerText = this._currentStreak.toString();
    this.longestStreak = Math.max(this.currentStreak, this.longestStreak);
  }

  static get longestStreak(): number {
    return this._longestStreak;
  }

  static set longestStreak(value: number) {
    if (value == this._longestStreak) return;
    this._longestStreak = value;
    GameHtmlElement.longestStreakElement.innerText = this._longestStreak.toString();
    GameStorage.save({ longestStreak: this._longestStreak });
  }

  private static _currentStreak = 0;
  private static _longestStreak = 0;

  public static initialize(): void {
    const gameData = GameStorage.load();

    if (gameData) this.longestStreak = gameData.longestStreak;

    GameSignal.answeredCorrectly.add(() => this.currentStreak++);

    GameSignal.gamePlayCountDownTimeOver.add(() => (this.currentStreak = 0));
  }
}

import { TypedEvent, TypedEventDispatcher } from "typed-event-dispatcher";
import { tokens } from "typed-inject";
import { GamePlayScene } from "./GamePlayScene";

export class GameCountDownTimer {
  public get onGamePlayCountDownStopped(): TypedEvent {
    return this.onGamePlayCountDownStoppedDispatcher.getter;
  }

  public get onGamePlayCountDownUpdated(): TypedEvent<number> {
    return this.onGamePlayCountDownUpdatedDispatcher.getter;
  }

  public get onGamePlayCountDownStarted(): TypedEvent<number> {
    return this.onGamePlayCountDownStartedDispatcher.getter;
  }

  public static inject = tokens("gamePlayScene");

  private onGamePlayCountDownStartedDispatcher =
    new TypedEventDispatcher<number>();

  private onGamePlayCountDownUpdatedDispatcher =
    new TypedEventDispatcher<number>();

  private onGamePlayCountDownStoppedDispatcher = new TypedEventDispatcher();

  private initialCount = 0;

  private deadline = 0;

  private intervalTimerId: NodeJS.Timeout = null;

  private isRunning = false;

  constructor(private gamePlayScene: GamePlayScene) {
    this.gamePlayScene.onAnsweredCorrectly.addListener(() =>
      this.addBonusTime(4),
    );
    this.gamePlayScene.onAnsweredWrongly.addListener(() => this.deductTime(4));
  }

  public addBonusTime(bonus: number): void {
    this.deadline += bonus * 1000;
    if (this.deadline - +new Date() > this.initialCount) {
      this.deadline = +new Date() + this.initialCount;
    }
  }

  public deductTime(deduction: number): void {
    this.deadline -= deduction * 1000;
  }

  public start(initialCount: number): void {
    if (this.isRunning) return;

    this.initialCount = initialCount * 1000;
    this.deadline = +new Date() + this.initialCount;
    this.intervalTimerId = setInterval(() => {
      const count = this.deadline - +new Date();
      if (count > 0) {
        this.onGamePlayCountDownUpdatedDispatcher.dispatch(
          Math.floor(count / 1000),
        );
      } else {
        this.stop();
      }
    }, 30);
    this.isRunning = true;
    this.onGamePlayCountDownStartedDispatcher.dispatch(initialCount);
  }

  public stop(): void {
    clearInterval(this.intervalTimerId);
    this.isRunning = false;
    this.onGamePlayCountDownStoppedDispatcher.dispatch();
  }
}

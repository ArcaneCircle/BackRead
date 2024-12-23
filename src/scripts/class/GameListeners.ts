import { tokens } from "typed-inject";
import { backgroundMusic } from "../const/backgroundMusic";
import { Scene } from "../enum/Scene";
import { GameAudio } from "./GameAudio";
import { GameCountDownTimer } from "./GameCountDownTimer";
import { GameHtmlElement } from "./GameHtmlElement";
import { GamePlayScene } from "./GamePlayScene";
import { GameSceneManager } from "./GameSceneManager";
import { GameStreakManager } from "./GameStreakManager";
import { GameTopBar } from "./GameTopBar";
import { Random } from "./Random";

export class GameListeners {
  public static inject = tokens(
    "gameHtmlElement",
    "gameSceneManager",
    "gameTopBar",
    "gameStreakManager",
    "gamePlayScene",
    "gameCountDownTimer",
    "gameAudio",
  );

  constructor(
    private gameHtmlElement: GameHtmlElement,
    private gameSceneManager: GameSceneManager,
    private gameTopBar: GameTopBar,
    private gameStreakManager: GameStreakManager,
    private gamePlayScene: GamePlayScene,
    private gameCountDownTimer: GameCountDownTimer,
    private gameAudio: GameAudio,
  ) {
    this.listenToBackToMenuClicks();
    this.listenToButtonsHoversAndClicks();
    this.listenToCountDownStopped();
    this.listenToFirstInteractionToStartBackgroundMusic();
    this.listenToSceneChanges();
    this.listenToCorrectlyAnsweredQuestions();
  }

  private listenToBackToMenuClicks(): void {
    Array.from(this.gameHtmlElement.backToMenuButtons).forEach(
      (backToStartButton) => {
        backToStartButton.addEventListener("click", () => {
          this.gameSceneManager.displayScene(Scene.Menu);
        });
      },
    );
  }

  private listenToButtonsHoversAndClicks(): void {
    if (!window.AudioContext) return;

    const audioContext = new AudioContext(),
      buffer = audioContext.createBuffer(1, 96e3, 48e3),
      channelData = buffer.getChannelData(0),
      t: (i, n) => number = (i, n) => (n - i) / n,
      n = 4e4,
      gainNode = audioContext.createGain();
    gainNode.gain.value = 0.1;
    gainNode.connect(audioContext.destination);

    const clickSound: (i) => null | number = (i) =>
        i > n
          ? null
          : Math.sin(i / 8000 - Math.sin(i / 60) * Math.sin(i / 61)) * t(i, n),
      hoverSound: (i) => null | number = (i) =>
        i > n
          ? null
          : Math.sin(i / 6000 - Math.sin(i / 90) * Math.sin(i / 91)) * t(i, n);

    Array.from(this.gameHtmlElement.allButtons).forEach((button) => {
      button.addEventListener("click", () => {
        if (this.gameTopBar.isAudioDisabled()) return;
        for (let i = 96e3; i--; ) channelData[i] = clickSound(i);
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(gainNode);
        source.start();
      });

      button.addEventListener("mouseenter", () => {
        if (this.gameTopBar.isAudioDisabled()) return;
        for (let i = 96e3; i--; ) channelData[i] = hoverSound(i);
        const s = audioContext.createBufferSource();
        s.buffer = buffer;
        s.connect(gainNode);
        s.start();
      });
    });
  }

  private listenToSceneChanges(): void {
    this.gameSceneManager.onSceneDisplayed.addListener((scene: Scene) => {
      switch (scene) {
        case Scene.Menu:
          this.gameTopBar.displayNotification("Welcome! Ready to start?");
          break;
        case Scene.Tutorial:
          this.gameTopBar.displayNotification("Ah, finally someone here!");
          break;
        case Scene.About:
          this.gameTopBar.displayNotification("Curious, huh!?");
          break;
        case Scene.GamePlay:
          this.gameTopBar.displayNotification("Good Luck!");
          this.gameStreakManager.currentStreak = 0;
          this.gamePlayScene.preparePhase();
          this.gameCountDownTimer.start(15);
          break;
        case Scene.GameOver:
          this.gameTopBar.displayNotification("Oh no! Time's over!");
          this.gameStreakManager.saveStreak();
          break;
      }
    });
  }

  private listenToCountDownStopped(): void {
    this.gameCountDownTimer.onGamePlayCountDownStopped.addListener(() => {
      this.gameSceneManager.displayScene(Scene.GameOver);
    });
  }

  private listenToFirstInteractionToStartBackgroundMusic(): void {
    const startSong = (): void => {
      this.gameAudio.create(backgroundMusic, 0.2, true, true);
      document.removeEventListener("mousedown", startSong);
      document.removeEventListener("touchstart", startSong);
    };

    document.addEventListener("mousedown", startSong);
    document.addEventListener("touchstart", startSong);
  }

  private listenToCorrectlyAnsweredQuestions(): void {
    this.gamePlayScene.onAnsweredCorrectly.addListener(() => {
      this.gameStreakManager.increaseStreak();
      this.gameTopBar.displayNotification(
        Random.pickElementFromArray([
          "Awesome!",
          "Perfect!",
          "Amazing!",
          "Outstanding!",
          "Splendid!",
          "Marvelous!",
          "Superb!",
          "Fabulous!",
          "Fantastic!",
          "Phenomenal!",
          "Wonderful!",
        ]),
      );
    });
  }
}

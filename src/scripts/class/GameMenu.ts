import { tokens } from "typed-inject";
import { Scene } from "../enum/Scene";
import { GameHtmlElement } from "./GameHtmlElement";
import { GameSceneManager } from "./GameSceneManager";

export class GameMenu {
  public static inject = tokens("gameSceneManager", "gameHtmlElement");

  constructor(
    private gameSceneManager: GameSceneManager,
    private gameHtmlElement: GameHtmlElement,
  ) {
    Array.from(this.gameHtmlElement.mainMenu.children).forEach(
      (menuOption: HTMLDivElement) => {
        menuOption.addEventListener("click", () => {
          this.gameSceneManager.displayScene(
            menuOption.dataset.option as Scene,
          );
        });
      },
    );
  }
}

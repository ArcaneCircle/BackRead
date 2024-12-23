import { Scene } from "../enum/Scene";

export class GameHtmlElement {
  public readonly menuCarousel: HTMLDivElement;

  public readonly headerCenter: HTMLDivElement;

  public readonly headerRight: HTMLDivElement;

  public readonly speaker: HTMLDivElement;

  public readonly sentenceElement: HTMLDivElement;

  public readonly questionElement: HTMLDivElement;

  public readonly currentStreakElements: NodeListOf<HTMLDivElement>;

  public readonly longestStreakElements: NodeListOf<HTMLDivElement>;

  public readonly answerButtons: NodeListOf<HTMLDivElement>;

  public readonly backToMenuButtons: NodeListOf<HTMLDivElement>;

  public readonly allButtons: NodeListOf<HTMLDivElement>;

  constructor() {
    this.mainMenu = document.querySelector("#main-menu");
    this.headerCenter = document.querySelector(".header .center");
    this.headerRight = document.querySelector(".header .right");
    this.speaker = document.querySelector(".speaker");
    this.sentenceElement = document.querySelector(".sentence");
    this.questionElement = document.querySelector(".question");
    this.currentStreakElements = document.querySelectorAll(".current-streak");
    this.longestStreakElements = document.querySelectorAll(".longest-streak");
    this.answerButtons = document.querySelectorAll(".answer");
    this.backToMenuButtons = document.querySelectorAll(".back-to-menu.button");
    this.allButtons = document.querySelectorAll(".button");
  }

  public getScene(scene: Scene): HTMLDivElement {
    return document.querySelector(`div[data-scene="${scene}"]`);
  }

  public getAnswerButton(id: number): HTMLDivElement {
    return document.querySelector(`.answer[data-id="${id}"]`);
  }
}

import "../styles/index.scss";
import "@webxdc/highscores"
import { GameListeners } from "./class/GameListeners";
import { GameMenu } from "./class/GameMenu";
import { injector } from "./const/injector";

const scoreboard = document.getElementById("scoreboard");
window.highscores.init({
  onHighscoresChanged: () => {
    scoreboard.innerHTML = window.highscores.renderScoreboard().innerHTML;
  },
}).then(() => {
  injector.injectClass(GameMenu);
  injector.injectClass(GameListeners);
});

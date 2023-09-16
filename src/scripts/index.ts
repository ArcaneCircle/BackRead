import "../styles/index.scss";
import "webxdc-scores";
import { GameListeners } from "./class/GameListeners";
import { GameMenu } from "./class/GameMenu";
import { injector } from "./const/injector";

window.highscores.init("Back Read", "scoreboard").then(()=>{
    injector.injectClass(GameMenu);
    injector.injectClass(GameListeners);

});

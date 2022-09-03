import { Component } from "../../Abstract/component";
import { EGames, TGameAnswer, TServices } from "../../Interfaces/Types";
import { AudioCallGame } from "./Components/AudioCallGame";
import './audiocall.scss';
import { SelectDifficultGame } from "../../Components/SelectDifficult/SelectDifficult";
import StatisticPopup from "../../Components/Statistic/StatisticPopup";
import APIService from "../../Services/APIService";
import WriteStatisticService from "../../Services/WriteStatisticService";

export class AudioCall extends Component {

  private statistic: StatisticPopup | undefined;

  constructor(parent: HTMLElement, private readonly services: TServices) {
    super(parent, 'div', ['audiocall-wrapper']);

    const selectDifficultGame =  new SelectDifficultGame(
      this.root, 'audiocall', 'Аудиовызов',
      `<p>Тренировка Аудиовызов развивает словарный запас.</p>
      <p>Вы должны выбрать перевод услышанного слова.</p>`,
      (group) => this.services.audioGame.startGame(group, -1)
    );

    new AudioCallGame(this.root, services);

    this.startGame();

    window.addEventListener('hashchange', () => {
      if (document.location.hash === '#audiocall') {
        this.startGame();
      } else {
        this.services.audioGame.resetTimer();
      }
    });

    this.services.audioGame.addListener('audioCallGame', (stage) => {
      if (stage === 'select') {
        this.statistic?.remove();
        selectDifficultGame.render();
      } else {
        selectDifficultGame.remove();
      }
    });

    this.services.audioGame.addListener('result', (words) => {
      if (APIService.getAuthUser() && APIService.isAuthorizedUser()) {
        WriteStatisticService.writeResults(words as TGameAnswer[], EGames.audioCall);
      }
      this.statistic = new StatisticPopup(
        this.root,
        words as TGameAnswer[],
        this.startGame.bind(this)
        // this.render.bind(this)
      );
    });

  }

  startGame(): void {
    this.services.audioGame.selectGame();
  }

  startGameFromTexbook(cat: number, page: number) {
    this.services.audioGame.startGame(cat, page, 'textbook');
  }
}

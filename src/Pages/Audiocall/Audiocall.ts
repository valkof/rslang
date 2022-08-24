import { Component } from "../../Abstract/component";
import { TServices } from "../../Interfaces/Types";
import { AudioCallGame } from "./Components/AudioCallGame";
import { ResultGame } from "./Components/ResultGame";
import './audiocall.scss';
import { SelectDifficultGame } from "../../Components/SelectDifficult/SelectDifficult";

export class AudioCall extends Component {
  
  constructor(parent: HTMLElement, private readonly services: TServices) {
    super(parent, 'div', ['audiocall-wrapper']);

    const selectDifficultGame =  new SelectDifficultGame(
      this.root, 'audiocall', 'Аудиовызов',
      `<p>Тренировка Аудиовызов развивает словарный запас.</p>
      <p>Вы должны выбрать перевод услышанного слова.</p>`,
      (group) => this.services.audioGame.startGame(group)
    );
    
    new AudioCallGame(this.root, services);
    
    new ResultGame(this.root, services);
    
    this.startGame();

    window.addEventListener('hashchange', () => {
      if (document.location.hash === '#audiocall') this.startGame();
    });

    this.services.audioGame.addListener('audioCallGame', (stage) => {
      if (stage === 'select') {
        selectDifficultGame.render();
      } else {
        selectDifficultGame.remove();
      }
    });
  }
  
  startGame(): void {
    this.services.audioGame.selectGame();
  }
}
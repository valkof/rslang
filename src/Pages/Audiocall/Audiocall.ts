import { Component } from "../../Abstract/component";
import { TServices } from "../../Interfaces/Types";
import { AudioCallGame } from "./Components/AudioCallGame";
import { ResultGame } from "./Components/ResultGame";
import { SelectBook } from "./Components/SelectBook";
import './audiocall.scss';

export class AudioCall extends Component {
  
  constructor(parent: HTMLElement, private readonly services: TServices) {
    super(parent, 'div', ['audiocall-wrapper']);

    new SelectBook(this.root, services);
    
    new AudioCallGame(this.root, services);
    
    new ResultGame(this.root, services);
    
    this.startGame();

    window.addEventListener('hashchange', () => {
      if (document.location.hash === '#audiocall') this.startGame();
    });
  }
  
  startGame(): void {
    this.services.audioGame.selectGame();
  }
}
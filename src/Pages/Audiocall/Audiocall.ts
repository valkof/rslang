import { Component } from "../../Abstract/component";
import { TServices } from "../../Interfaces/Types";
import { AudioCallGame } from "./Components/AudioCallGame";
import { ResultGame } from "./Components/ResultGame";
import { SelectBook } from "./Components/SelectBook";

export class AudioCall extends Component {
  
  selectBook: Component;
  
  audioCallGame: Component;
  
  resultGame: Component;
  
  constructor(parent: HTMLElement, private readonly services: TServices) {
    super(parent, 'div', ['audiocall-wrapper']);

    this.selectBook = new SelectBook(this.root, services);
    
    this.audioCallGame = new AudioCallGame(this.root, services);
    
    this.resultGame = new ResultGame(this.root, services);
    
    this.services.audioGame.selectGame();
    
    window.addEventListener('hashchange', () => {
      if (document.location.hash === '#audiocall') {
        this.services.audioGame.selectGame();
      };
    })
  }
}
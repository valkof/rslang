import { Component } from "../../../Abstract/component";
import { TServices } from "../../../Interfaces/Types";

export class ResultGame extends Component {
  
  divSelectBook: Component;
  
  button: Component;
  
  constructor(parent: HTMLElement, private readonly services: TServices) {
    super(parent, 'div', ['audiocall-wrapper']);

    this.divSelectBook = new Component(this.root, 'div')
    this.button = new Component(this.divSelectBook.root, 'button', ['button'], '3');

    this.button.root.onclick = () => this.services.audioGame.selectGame();
    
    this.services.audioGame.addListener('audioCallGame', (stage) => {
      if (stage === 'result') {
        this.render();
      } else {
        this.remove();
      }
    })
  }
}
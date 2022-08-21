import { Component } from "../../../Abstract/component";
import { TServices } from "../../../Interfaces/Types";

export class SelectBook extends Component {
  
  divSelectBook: Component;
  
  button: Component;
  
  constructor(parent: HTMLElement, private readonly services: TServices) {
    super(parent, 'div', ['audiocall-wrapper']);

    this.divSelectBook = new Component(this.root, 'div')
    this.button = new Component(this.divSelectBook.root, 'button', ['button'], '1');

    this.button.root.onclick = () => this.services.audioGame.startGame();
    
    this.services.audioGame.addListener('audioCallGame', (stage) => {
      if (stage === 'select') {
        this.render();
      } else {
        this.remove();
      }
    })

  }
}
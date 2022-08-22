import { Component } from "../../../Abstract/component";
import { TServices } from "../../../Interfaces/Types";

export class SelectBook extends Component {
  
  constructor(parent: HTMLElement, private readonly services: TServices) {
    super(parent, 'div', ['audiocall__select_game']);

    const divSelectBook = new Component(this.root, 'div', ['select_game__popup'])
    
    new Component(divSelectBook.root, 'h2', ['popup__title'], 'Аудиовызов');

    new Component(divSelectBook.root, 'div', ['popup__rules'],
      '<p>Тренировка Аудиовызов развивает словарный запас.</p>' +
      '<p>Вы должны выбрать перевод услышанного слова.</p>');
    
    const divSetButtons = new Component(divSelectBook.root, 'div', ['popup__set_buttons']);

    [1, 2, 3, 4, 5, 6].forEach(group => {
      const button = new Component(divSetButtons.root, 'button', ['set_buttons__button'], `${group}`);
      button.root.onclick = () => this.services.audioGame.startGame(group - 1);
    });
    
    this.services.audioGame.addListener('audioCallGame', (stage) => {
      if (stage === 'select') {
        this.render();
      } else {
        this.remove();
      }
    });

  }
}
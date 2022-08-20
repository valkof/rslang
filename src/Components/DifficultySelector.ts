import { Component } from '../Abstract/component';

export class DifficultySelector extends Component {
  constructor(parent: HTMLElement, style: string, title: string, text: string, callback: (arg: number) => void ) {
    super(parent, 'div', [`${style}-dificulty`, 'dificulty']);
    const dificultyTitle = new Component(this.root, 'h2', [`${style}-dificulty__title`, 'dificulty__title']);
    dificultyTitle.root.textContent = title;
    const dificultyDescription = new Component(this.root, 'h3', [
      `${style}-dificulty__description`,
      'dificulty__description',
    ]);
    dificultyDescription.root.textContent = text;
    const levelContainer = new Component(this.root, 'div', [`dificulty__level-container`]);
    for (let i = 0; i < 6; i++) {
      const item = new Component(levelContainer.root, 'div', [
        `dificulty__level-container__item`,
        `dificulty__level-container__item${i + 1}`,
      ]);
      item.root.textContent = (i + 1).toString();
      item.root.onclick = () => callback(i);
    }
  }
}

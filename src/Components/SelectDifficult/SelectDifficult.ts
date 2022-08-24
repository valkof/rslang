import { Component } from "../../Abstract/component";
import { GROUP } from "../../config";

export class SelectDifficultGame extends Component {
  
  title: Component;
  
  description: Component;
  
  constructor(parent: HTMLElement, style: string, title: string, textHTML: string, callback: (arg: number) => void ) {
    super(parent, 'div', ['dificulty', `dificulty_${style}`]);
    
    this.title = new Component(this.root, 'h2', ['dificulty__title'], title);
    
    this.description = new Component(this.root, 'div', ['dificulty__description'], textHTML);

    const divSetButtons = new Component(this.root, 'div', ['dificulty__set_buttons']);

    Array.from(Array(GROUP).keys()).forEach(group => {
      const button = new Component(divSetButtons.root, 'button', [`set_buttons__button${group + 1}`], `${group + 1}`);
      button.root.onclick = () => callback(group);
    });
  }
}
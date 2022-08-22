import { Component } from "../../../Abstract/component";

export class HardWord extends Component {
    
  inputHardWord: Component;
    
  constructor(parent: HTMLElement) {
    super(parent, 'div', ['add-word']);
    this.inputHardWord = new Component(this.root, 'input', ['hard-word'], null, 'type', 'checkbox');
    this.inputHardWord.root.setAttribute('data-title-word', 'Сложное слово');

    this.inputHardWord = new Component(this.root, 'input', ['learn-word'], null, 'type', 'checkbox');
    this.inputHardWord.root.setAttribute('data-title-word', 'Слово изучено')
   
    this.inputHardWord.root.onclick = () => {
      const top = (this.inputHardWord.root as HTMLInputElement).checked;
      
    }
  }
}
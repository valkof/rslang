import { Component } from "../../../Abstract/component";

export class RowResults extends Component {
  
  colNumber: Component;
  
  colWord: Component;
  
  colTranscription: Component;
  
  colTranslate: Component;

  constructor(parent: HTMLElement) {
    super(parent, 'div', ['table__row']);

    this.colNumber = new Component(this.root, 'span', ['number']);
    this.colWord = new Component(this.root, 'span', ['word']);
    this.colTranscription = new Component(this.root, 'span', ['transcription']);
    this.colTranslate = new Component(this.root, 'span', ['translate']);

  }
}
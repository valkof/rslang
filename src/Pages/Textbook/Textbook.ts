import { Component } from "../../Abstract/component";

export class TextBook extends Component {
  constructor(parent: HTMLElement) {
    super(parent, 'div', ['textbook-wrapper']);
        
  }
}
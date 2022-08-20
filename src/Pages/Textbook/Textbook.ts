import { Component } from "../../Abstract/component";
import { TServices } from "../../Interfaces/Types";

export class TextBook extends Component {
  constructor(parent: HTMLElement, private readonly services: TServices) {
    super(parent, 'div', ['textbook-wrapper']);
        
  }
}
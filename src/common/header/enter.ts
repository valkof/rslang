import { Component } from "../../Abstract/component";

export class Enter extends Component {
  enterButton: Component;

  constructor(parent: HTMLElement) {
    super(parent, 'div', ['enter-wrapper']);
    this.enterButton = new Component(this.root, 'button', [], 'Войти');
  }
}

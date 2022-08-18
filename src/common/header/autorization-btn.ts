import { Component } from "../../Abstract/component";

export class AuturizationButton extends Component {
  autorizationButton: Component;

  constructor(parent: HTMLElement) {
    super(parent, 'div', ['enter-wrapper']);
    this.autorizationButton = new Component(this.root, 'button', [], 'Авторизация');
  }
}

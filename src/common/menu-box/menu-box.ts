import { Component } from "../../Abstract/component";


export class MenuBox extends Component {
  menuInput: Component;

  labelMenu: Component;

  spanMenu: Component;

  constructor(parent: HTMLElement) {
    super(parent, 'div', ['menu-box']);
    this.menuInput = new Component(this.root, 'input', [], null, 'id', 'menu-toggle');
    this.menuInput.root.setAttribute('type', "checkbox");
    this.labelMenu = new Component(this.root, 'label', ['menu-btn'], null, 'for', 'menu-toggle');
    this.spanMenu = new Component(this.labelMenu.root, 'span', [])
  }
}




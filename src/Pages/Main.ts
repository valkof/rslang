import { BaseComponent } from "../Abstract/BaseComponent";
import { Services } from "../Interfaces/Types";

export class Main {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {}

  render(): void {
    this.parent.innerHTML = '';

    const container = new BaseComponent('div', ['main']).element;
    container.innerHTML = `<h1>Page Main</h1>`;

    this.parent.appendChild(container);
  }
}
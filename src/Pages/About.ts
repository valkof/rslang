import { BaseComponent } from "../Abstract/BaseComponent";
import { Services } from "../Interfaces/Types";

export class About {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {}

  render(): void {
    this.parent.innerHTML = '';

    const container = new BaseComponent('div', ['about']).element;
    container.innerHTML = `<h1>Page About</h1>`;

    this.parent.appendChild(container);
  }
}
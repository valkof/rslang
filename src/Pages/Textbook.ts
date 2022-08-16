import { BaseComponent } from "../Abstract/BaseComponent";
import { Services } from "../Interfaces/Types";

export class Textbook {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {}

  render(): void {
    this.parent.innerHTML = '';

    const container = new BaseComponent('div', ['textbook']).element;
    container.innerHTML = `<h1>Page Textbook</h1>`;

    this.parent.appendChild(container);
  }
}
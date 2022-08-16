import { BaseComponent } from "../../Abstract/BaseComponent";
import { TServices } from "../../Interfaces/Types";

export class Textbook {
  constructor(private readonly parent: HTMLElement, private readonly services: TServices) {}

  render(): void {
    this.parent.innerHTML = '';

    const container = new BaseComponent('div', ['textbook']).element;
    container.innerHTML = `<h1>Page Textbook</h1>`;

    this.parent.appendChild(container);
  }
}
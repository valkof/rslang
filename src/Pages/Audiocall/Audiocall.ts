import { BaseComponent } from "../../Abstract/BaseComponent";
import { TServices } from "../../Interfaces/Types";

export class Audiocall {
  constructor(private readonly parent: HTMLElement, private readonly services: TServices) {}

  render(): void {
    this.parent.innerHTML = '';

    const container = new BaseComponent('div', ['audiocall']).element;
    container.innerHTML = `<h1>Page Audiocall</h1>`;

    this.parent.appendChild(container);
  }
}
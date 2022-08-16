import { BaseComponent } from "../Abstract/BaseComponent";
import { Services } from "../Interfaces/Types";

export class Sprint {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {}

  render(): void {
    this.parent.innerHTML = '';

    const container = new BaseComponent('div', ['sprint']).element;
    container.innerHTML = `<h1>Page Sprint</h1>`;

    this.parent.appendChild(container);
  }
}
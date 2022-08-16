import { BaseComponent } from "../Abstract/BaseComponent";
import { Services } from "../Interfaces/Types";

export class Statistic {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {}

  render(): void {
    this.parent.innerHTML = '';

    const container = new BaseComponent('div', ['statistic']).element;
    container.innerHTML = `<h1>Page Statistic</h1>`;

    this.parent.appendChild(container);
  }
}
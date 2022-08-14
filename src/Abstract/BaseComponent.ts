interface IBaseComponent {
  readonly element: HTMLElement;
}

export class BaseComponent implements IBaseComponent {
  readonly element: HTMLElement;

  constructor(tag: keyof HTMLElementTagNameMap = 'div', styles: string[] = []) {
    this.element = document.createElement(tag);
    if (styles.length) {
      this.element.classList.add(...styles);
    }
  }
}

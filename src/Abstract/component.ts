export class Component {  
  root: HTMLElement;

  constructor(public parent: HTMLElement | null | undefined, tag: keyof HTMLElementTagNameMap = 'div', styles: string[] = [], content?: string | null, attr?: string, attrVal?: string) {
    this.root = document.createElement(tag);
    if (styles.length > 0) this.root.classList.add(...styles);
    if (content) this.root.innerHTML = `${content}`;
    if (attr) this.root.setAttribute(attr, `${attrVal}`);
    if (parent) parent.appendChild(this.root);
  }

  remove(): void {
    this.root.remove();
  }
  
  render(): void {
    if (this.parent) this.parent.append(this.root);
  }
    
}

 
import { BaseComponent } from "./Abstract/BaseComponent";
import { Services } from "./Interfaces/Types";
import { LangService } from "./Services/LangService";

interface IApp {
  render: () => void;
}

export class App implements IApp {
  private readonly services: Services;

  constructor(private readonly root: HTMLElement) {
    this.services = {
      Lang: new LangService
    };
  }

  render(): void {
    const h1 = new BaseComponent('h1');
    h1.element.innerText = 'Hello, RSlang';

    const p = new BaseComponent('p');

    this.root.appendChild(h1.element);
    this.root.appendChild(p.element);

    this.services.Lang.getWordsOfBD().then(words => {
      const firstWord = words[0].word;
      p.element.innerText = `Первое слово в БД - ${firstWord}`;
    })
  }
}

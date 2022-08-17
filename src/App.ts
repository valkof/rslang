import { BaseComponent } from "./Abstract/BaseComponent";
import { Footer } from "./common/footer/footer";
import { Header } from "./common/header/header";

import { Router } from "./Components/Router";
import { TServices } from "./Interfaces/Types";
import { AboutUsMore } from "./Pages/main_pages/about-us/about-us-more";

import { Main } from "./Pages/main_pages/main";
import { LangService } from "./Services/LangService";
import { RouterService } from "./Services/RouterService";

interface IApp {
  render: () => void;
}

export class App implements IApp {
  private readonly services: TServices;
  
  header: Header;
  //main: Main;
  //aboutUsMore: AboutUsMore;
  footer: Footer;

  constructor(private readonly root: HTMLElement) {
    this.header = new Header(document.body);
   // this.aboutUsMore = new AboutUsMore(document.body)
    //this.main = new Main(document.body);
    this.footer = new Footer(document.body);

    this.services = {
      lang: new LangService,
      router: new RouterService
    };
  }

  render(): void {
    const h1 = new BaseComponent('h1');
    h1.element.innerText = 'Hello, RSlang';

    const p = new BaseComponent('p');

    this.root.appendChild(h1.element);
    this.root.appendChild(p.element);

    this.services.lang.getWordsOfBD().then(words => {
      const firstWord = words?.data[0].word || '';
      p.element.innerText = `Первое слово в БД - ${firstWord}`;
    })

    const main = new BaseComponent('main').element;
    this.root.appendChild(main);

    new Router(main, this.services).render();
  }
}

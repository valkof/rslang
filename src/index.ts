declare global {
  interface Window {
    app: App;
  }
}

import './style.scss';
import { Router } from './Components/Router';
import { Header } from './common/header/header';
import { Footer } from './common/footer/footer';
import { Component } from './Abstract/component';
import { Developers } from './Pages/developers/developers';
import { AudioCall } from './Pages/Audiocall/Audiocall';
import { Sprint } from './Pages/Sprint/Sprint';
import { Statistic } from './Pages/Statistic/Statistic';
import { About } from './Pages/About/About';
import { Main } from './Pages/Main/Main';
import { TextBook } from './Pages/Textbook/Textbook';

class App {
  header = new Header(this.parent);

  pageContainer = new Component(this.parent, 'main');

  footer = new Footer(this.parent);

  main = new Main(this.pageContainer.root);

  about = new About(this.pageContainer.root);

  textBook = new TextBook(this.pageContainer.root);

  developers = new Developers(this.pageContainer.root);

  audiocall = new AudioCall(this.pageContainer.root);

  sprint = new Sprint(this.pageContainer.root);

  statistic = new Statistic(this.pageContainer.root);

  constructor(private parent: HTMLElement) {    
    const pages = {
      '': this.main,
      about: this.about,
      TextBook: this.textBook,
      Developers: this.developers,
      Audiocall: this.audiocall,
      Sprint: this.sprint,
      Statistic: this.statistic,
    };

    new Router(pages);
    this.header.addLinks(Object.keys(pages));
  }
}

window.app = new App(document.body);

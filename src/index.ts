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
import { Authorization } from './Pages/Authorization/Authorization';
import { TServices } from './Interfaces/Types';
import { LangService } from './Services/LangService';
import { AudioGameService } from './Services/AudioGameService';
import SprintService from './Services/SprintService';
import APIService from './Services/APIService';

class App {
  private readonly services = {
    lang: new LangService(),
    audioGame: new AudioGameService(),
    sprint: new SprintService(),
  } as TServices;

  header = new Header(this.parent, this.services);

  pageContainer = new Component(this.parent, 'main');

  footer = new Footer(this.parent, this.services);

  main = new Main(this.pageContainer.root, this.services);

  about = new About(this.pageContainer.root, this.services);

  textBook = new TextBook(this.pageContainer.root, this.services);

  developers = new Developers(this.pageContainer.root, this.services);

  audiocall = new AudioCall(this.pageContainer.root, this.services);

  sprint = new Sprint(this.pageContainer.root, this.services);

  statistic = new Statistic(this.pageContainer.root, this.services);

  authorization = new Authorization(this.pageContainer.root, this.services);

  constructor(private parent: HTMLElement) {
    const pages = {
      '#': this.main,
      about: this.about,
      textbook: this.textBook,
      developers: this.developers,
      audiocall: this.audiocall,
      sprint: this.sprint,
      statistic: this.statistic,
      authorization: this.authorization,
    };

    new Router(pages, this.footer, this.header.statLink!, this.header.authLink!);

    this.textBook.pagination.emitGame = (game: string, cat: number, page: number) => {
      if (game === 'audiocall') this.audiocall.startGameFromTexbook(cat, page);
      if (game === 'sprint') this.sprint.startGameFromTexbook(cat, page)
    }
  }

  static async updateUser(): Promise<void> {
    return APIService.updateUserToken();
  }
}

App.updateUser()
  .then(() => {
    window.app = new App(document.body);
  })
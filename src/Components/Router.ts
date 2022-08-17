import { TServices, TRoutes } from "../Interfaces/Types";
import { About } from "../Pages/About/About";
import { Audiocall } from "../Pages/Audiocall/Audiocall";
import { Authorization } from "../Pages/Authorization/Authorization";
import { Developers } from "../Pages/Developers/developers";
import { MainPage } from "../Pages/Main/main_pages/main-page";
//import { Main } from "../Pages/Main/Main";
import { Sprint } from "../Pages/Sprint/Sprint";
import { Statistic } from "../Pages/Statistic/Statistic";
import { Textbook } from "../Pages/Textbook/Textbook";

export class Router {
  private readonly routes: TRoutes[];

  constructor(private readonly root: HTMLElement, private readonly services: TServices) {
    this.routes = [
      { path: '', component: new MainPage(this.root) },
      { path: '/about', component: new About(this.root, this.services) },
      //{ path: '/developers', component: new Developers(this.root, this.services) },
      { path: '/authorization', component: new Authorization(this.root, this.services) },
      { path: '/textbook', component: new Textbook(this.root, this.services) },
      { path: '/audiocall', component: new Audiocall(this.root, this.services) },
      { path: '/sprint', component: new Sprint(this.root, this.services) },
      { path: '/statistic', component: new Statistic(this.root, this.services) }
    ];
  }

  render(): void {
    window.addEventListener('hashchange', this.rounting.bind(this));
    window.addEventListener('load', this.rounting.bind(this));
  }

  rounting(): void {
    const path = document.location.hash.slice(1).toLowerCase() || '';

    this.services.router.setRouter(path);
    const currentRount = this.routes.find(item => item.path === path) || this.routes[0];
   // currentRount.component.render();
  }
}

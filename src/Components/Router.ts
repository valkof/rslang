import { Services, TRoutes } from "../Interfaces/Types";
import { About } from "../Pages/About";
import { Audiocall } from "../Pages/Audiocall";
import { Authorization } from "../Pages/Authorization";
import { Main } from "../Pages/Main";
import { Sprint } from "../Pages/Sprint";
import { Statistic } from "../Pages/Statistic";
import { Textbook } from "../Pages/Textbook";

export class Router {
  private readonly routes: TRoutes[];

  constructor(private readonly root: HTMLElement, private readonly services: Services) {
    this.routes = [
      { path: '', component: new Main(this.root, this.services) },
      { path: '/about', component: new About(this.root, this.services) },
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

    this.services.Router.setRouter(path);
    const currentRount = this.routes.find(item => item.path === path) || this.routes[0];
    currentRount.component.render();
  }
}
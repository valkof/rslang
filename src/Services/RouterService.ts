import { Observer } from '../Abstract/Observer';

export class RouterService extends Observer {
  router?: string;

  setRouter(router: string): void {
    this.router = router;
    this.dispath('router', this.router);
  }
}

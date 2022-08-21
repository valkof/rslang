import { Component } from "../Abstract/component";
import { Footer } from "../common/footer/footer";

export class Router {
  constructor(private routes: Record<string, Component>, private footer: Footer) {
    window.onhashchange = () => this.handleRoute();
    this.handleRoute();
  }

  handleRoute(): void {
    this.clearPage();
    const route = window.location.hash.replace('#', '');
    const page = this.routes[route];    
    if (page) {
      page.render()
    } else this.routes['#'].render();

    if(route === 'audiocall' || route === 'sprint') {
      this.footer.remove();
    } else {
      this.footer.render();
    }
  }

  clearPage(): void {
    Object.values(this.routes).forEach(page => page.remove());
  }
}
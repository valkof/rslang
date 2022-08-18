import { Component } from "../Abstract/component";

export class Router {
  constructor(private routes: Record<string, Component>) {
    window.onhashchange = () => this.handleRoute();
    this.handleRoute();
  }

  handleRoute(): void {
    this.clearPage();
    const route = window.location.hash.replace('#', '');
    const page = this.routes[route];    
    if (page) {
      page.render()
    } else this.routes.page404.render();
  }

  clearPage(): void {
    Object.values(this.routes).forEach(page => page.remove());
  }
}
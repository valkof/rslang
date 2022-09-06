import { Component } from "../Abstract/component";
import { Footer } from "../common/footer/footer";

export class Router {
  constructor(
    private routes: Record<string, Component>,
    private footer: Footer,
    private statLink: Component,
    private authLink: Component
  ) {
    window.onhashchange = () => this.handleRoute();
    this.handleRoute();
  }

  handleRoute(): void {
    this.clearPage();
    this.checkAuth();

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

  checkAuth() {
    const authData = localStorage.getItem('rslang');

    if (authData == null) {
      this.statLink.remove();
      this.authLink.render();

    } else {
      this.statLink.render();
      this.authLink.remove();
    }
  }

}
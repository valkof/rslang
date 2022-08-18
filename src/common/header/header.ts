
import { Component } from "../../Abstract/component";
import { AuturizationButton } from "./autorization-btn";


export class Header extends Component {
  headerWrapper: Component;

  title: Component;

  navigationWrapper: Component;

  //navigation: Component;
  //ul: Component;
  autorisationButton: AuturizationButton;
  
  constructor(parent: HTMLElement) {
    super(parent, "header");
    this.headerWrapper = new Component(this.root, "div", ["header-wrapper"]);
    this.title = new Component(this.headerWrapper.root, 'img', [], null,'src', 'assets/logo.png');

    this.title.root.onclick = () => {
      document.location = '';
    }

    this.navigationWrapper = new Component(this.headerWrapper.root, 'div', ['navigation-wrapper']);
    
    //this.navigation = new Component(this.navigationWrapper.root, 'nav', []);
    // this.ul = new Component(this.navigation.root, 'ul');
  
    /* ['Наша команда', 'Учебник', 'Спринт', 'Аудиовызов', 'Статистика'].forEach((el) => {
      const navigation = new Component(this.ul.root, 'li', [], el)
    });*/

    this.autorisationButton = new AuturizationButton(this.headerWrapper.root);
  }

  addLinks(pages: string[]): void {
    const exclude = ['page404', 'about', ''];
    pages.forEach(page => (exclude.includes(page)) ? '' : 
    new Component(this.navigationWrapper.root, 'a', ['page-link'], page,  'href', `#${page}` ));
  }
}
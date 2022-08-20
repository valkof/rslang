
import { Component } from "../../Abstract/component";
import { AuturizationButton } from "./autorization-btn";


export class Header extends Component {
  headerWrapper: Component;

  title: Component;

  navigationWrapper: Component;

  autorisationButton: AuturizationButton;

  pathTitle: Component;
  
  constructor(parent: HTMLElement) {
    super(parent, "header");
    this.headerWrapper = new Component(this.root, "div", ["header-wrapper"]);
    this.pathTitle = new Component(this.headerWrapper.root, 'a', [], null, 'href', '#')
    this.title = new Component(this.pathTitle.root, 'img', [], null,'src', 'assets/logo.png');
  

    this.navigationWrapper = new Component(this.headerWrapper.root, 'div', ['navigation-wrapper']);
    
    
  const nav = [{name: 'Наша команда', href: 'developers'}, {name: 'Учебник', href: 'textbook'}, {name:'Спринт', href: 'sprint'}, {name: 'Аудиовызов', href: 'audiocall'}, {name:'Статистика', href: 'statistic'}];
     nav.forEach(({name, href}) => {
      const navigation = new Component(this.navigationWrapper.root, 'a', [], name, 'href', '#' + href)
    });

    this.autorisationButton = new AuturizationButton(this.headerWrapper.root);
  }
}
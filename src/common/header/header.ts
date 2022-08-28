
import { Component } from "../../Abstract/component";
import { TServices } from "../../Interfaces/Types";
import { AuturizationButton } from "./autorization-btn";


export class Header extends Component {
  headerWrapper: Component;

  title: Component;

  navigationWrapper: Component;

  autorisationButton: AuturizationButton;

  pathTitle: Component;
  
  constructor(parent: HTMLElement, private readonly services: TServices) {
    super(parent, "header");
    this.headerWrapper = new Component(this.root, "div", ["header-wrapper"]);
    this.pathTitle = new Component(this.headerWrapper.root, 'a', [], null, 'href', '#')
    this.title = new Component(this.pathTitle.root, 'img', [], null,'src', 'assets/logo.png');
  
    this.navigationWrapper = new Component(this.headerWrapper.root, 'div', ['navigation-wrapper']);
        
    const nav = [
      {name: 'Наша команда', href: 'developers'},
      {name: 'Учебник', href: 'textbook'},
      {name:'Спринт', href: 'sprint'},
      {name: 'Аудиовызов', href: 'audiocall'},
      {name:'Статистика', href: 'statistic'}];

    const links = nav.map(({name, href}) => {
      const navigation = new Component(this.navigationWrapper.root, 'a', [], name, 'href', '#' + href);

      navigation.root.onclick = () => {
        links.forEach(el => el.root.classList.remove('active-link'));
        navigation.root.classList.add('active-link'); 
      }
      return navigation
    });

        this.autorisationButton = new AuturizationButton(this.headerWrapper.root);
  }
}
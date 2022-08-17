
import { Component } from "../../Abstract/component";
import { Enter } from "./enter";

export class Header extends Component {
  headerWrapper: Component;
  title: Component;
  navigationWrapper: Component;
  navigation: Component;
  ul: Component;
  enter: Enter;
  

  constructor(parent: HTMLElement) {
    super(parent, "header", []);
    this.headerWrapper = new Component(this.root, "div", ["header-wrapper"]);
    this.title = new Component(this.headerWrapper.root, 'img', [], null,'src', 'assets/logo.png');
    this.navigationWrapper = new Component(this.headerWrapper.root, 'div', ['navigation-wrapper']);
    this.navigation = new Component(this.navigationWrapper.root, 'nav', []);
    this.ul = new Component(this.navigation.root, 'ul');
  
    ['Наша команда', 'Электронный учебник', 'Спринт', 'Аудиовызов', 'Статистика'].forEach((el) => {
      const navigation = new Component(this.ul.root, 'li', [], el)
       
    });

    this.enter = new Enter(this.headerWrapper.root);
    
  }

  
}
import { Component } from '../../Abstract/component';
import { TServices } from '../../Interfaces/Types';
import { MenuBox } from '../menu-box/menu-box';

export class Header extends Component {
  headerWrapper: Component;

  title: Component;

  navigationWrapper: Component;

  pathTitle: Component;

  menuBox: MenuBox;

  links: Component[] = [];

  statLink: Component | undefined;

  authLink: Component | undefined;

  constructor(parent: HTMLElement, private readonly services: TServices) {
    super(parent, 'header');
    this.headerWrapper = new Component(this.root, 'div', ['header-wrapper']);
    this.pathTitle = new Component(this.headerWrapper.root, 'a', ['logo'], null, 'href', '#');
    this.title = new Component(this.pathTitle.root, 'img', [], null, 'src', 'assets/logo.png');

    this.menuBox = new MenuBox(this.headerWrapper.root);

    this.navigationWrapper = new Component(this.menuBox.root, 'div', ['navigation-wrapper']);

    const nav = [
      { name: 'Наша команда', href: 'developers' },
      { name: 'Учебник', href: 'textbook' },
      { name: 'Спринт', href: 'sprint' },
      { name: 'Аудиовызов', href: 'audiocall' },
      { name: 'Статистика', href: 'statistic' },
      { name: 'Авторизация', href: 'authorization' },
    ];

    this.links = nav.map(({ name, href }) => {
      const navigation = new Component(this.navigationWrapper.root, 'a', [], name, 'href', '#' + href);

      navigation.root.onclick = () => {
        this.links.forEach(el => el.root.classList.remove('active-link'));
        navigation.root.classList.add('active-link');
      };
      return navigation;
    });

    this.statLink = this.links.find(l => l.root.textContent === 'Статистика');  
    
    this.authLink = this.links.find(l => l.root.textContent === 'Авторизация');  
  }
}

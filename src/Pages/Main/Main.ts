
import { Component } from "../../Abstract/component";
import { TServices } from "../../Interfaces/Types";
import { mainMenu } from "./main-menu-obj";

export class Main extends Component {
  aboutSite: Component;

  title: Component;

  aboutText: Component;

  button: Component;

  mainMenu: Component;

  mainWrapper: Component;
  
  constructor(parent: HTMLElement, private readonly services: TServices) {
    super(parent);
    this.mainWrapper = new Component(this.root, 'div', ['main-wrapper'])
    this.aboutSite = new Component(this.mainWrapper.root, 'div', ['about-site']);
    this.title = new Component(this.aboutSite.root, 'h2', [], 'ABC Language');
    this.aboutText = new Component(this.aboutSite.root, 'p', [],
      'С "ABC Language" изучение английского языка будет интересным, легким и весьма продуктивным. ' +
      'Попробуй изучение английских слов в игровой форме, и ты удивишься, как быстро пополнится твой словарный запас.' +
      ' Выбирая нас, ты убеждаешься в том, что эффективное обучение не может быть скучным!')
    this.button = new Component(this.aboutSite.root, 'button', [], 'Узнать больше');

    this.button.root.onclick = () => {
      document.location = '#about'
    }

    this.mainMenu = new Component(this.mainWrapper.root, 'div', ['main-menu']);
        
    mainMenu.forEach((el, i) => {
      const a = new Component(this.mainMenu.root, 'div', ['menu-img' + i], null, 'data-title', el.title);
      const b = new Component(a.root, 'button', [], null)
      b.root.style.backgroundImage = `url(${el.src})`
      b.root.onclick = () => {
        document.location = `#${el.hash}`
      }       
    })    
  }
}
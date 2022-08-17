import { Component } from "../../../Abstract/component";
import { mainMenu } from "./main-menu-obj";


export class MainPage extends Component {
    aboutSite: Component;
    title: Component;
    aboutText: Component;
    button: Component;
    mainMenu: Component;
    mainWrapper: Component;
    
    
    constructor(parent: HTMLElement) {
        super(parent, 'main');
        this.mainWrapper = new Component(this.root, 'div', ['main-wrapper'])
        this.aboutSite = new Component(this.mainWrapper.root, 'div', ['about-site']);
        this.title = new Component(this.aboutSite.root, 'h2', [], 'ABC Language');
        this.aboutText = new Component(this.aboutSite.root, 'p', [], 'С "ABC Language" изучение английского языка будет интересным, легким и весьма продуктивным. Попробуй изучение английских слов в игровой форме, и ты удивишься, как быстро пополнится твой словарный запас. Эффективное обучение не должно быть скучным!')
        this.button = new Component(this.aboutSite.root, 'button', [], 'Узнать больше');

        this.button.root.onclick = () => {
            document.location.hash = '/about'
        }

        this.mainMenu = new Component(this.mainWrapper.root, 'div', ['main-menu']);
        
        mainMenu.forEach((el, i) => {
            const a = new Component(this.mainMenu.root, 'div', ['menu-img' + i], null, 'data-title', el.title);
            a.root.style.backgroundImage = `url(${el.src})`
        })
        
        
    }
}
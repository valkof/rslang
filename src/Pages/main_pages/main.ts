import { Component } from "../../Abstract/component";


export class Main extends Component {
    mainWrapper: Component;
    aboutSite: Component;
    title: Component;
    aboutText: Component;
    button: Component;
    
    
    constructor(parent: HTMLElement) {
        super(parent, 'main', []);
        this.mainWrapper = new Component(this.root, 'div', ['main-wrapper']);
        this.aboutSite = new Component(this.mainWrapper.root, 'div', ['about-site']);
        this.title = new Component(this.aboutSite.root, 'h2', [], 'ABC Language');
        this.aboutText = new Component(this.aboutSite.root, 'p', [], 'С "ABC Language" изучение английского языка будет интересным, легким и весьма продуктивным. Попробуй изучение английских слов в игровой форме, и ты удивишься, как быстро пополнится твой словарный запас. Эффективное обучение не должно быть скучным!')
        this.button = new Component(this.aboutSite.root, 'button', [], 'Узнать больше');
        
        
    }
}
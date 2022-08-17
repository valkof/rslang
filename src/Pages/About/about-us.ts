
import { Component } from "../../Abstract/component";
import { aboutUsObj } from "./about-us-object";

export class AboutUs extends Component {
    title: Component;
    infoWrapper: Component;
    
    constructor(parent: HTMLElement,) {
        super(parent, 'div', ['about-us-wrapper']);
        this.title = new Component(this.root, 'h2', [], 'Наши преимущества');
        this.infoWrapper = new Component(this.root, 'div', ['info-wrapper']);
       
        aboutUsObj.forEach(el => {
            const info = new Component(this.infoWrapper.root, 'div', ['info']);
            const img = new Component(info.root, 'img', [], null, 'src', el.src);
            const titles = new Component(info.root, 'h3', [], el.title);
            const text = new Component(info.root, 'p', [],  el.text);
            
        });
        


    }
}
import { Component } from "../../Abstract/component";
import { TServices } from "../../Interfaces/Types";
import { aboutUs } from "./about-us-obj";

export class About extends Component {
  title: Component;

  infoWrapper: Component;
    
  constructor(parent: HTMLElement, private readonly services: TServices) {
    super(parent, 'div', ['about-us-wrapper']);
    this.title = new Component(this.root, 'h2', [], 'Наши преимущества');
    this.infoWrapper = new Component(this.root, 'div', ['info-wrapper']);
       
    aboutUs.forEach(el => {
      const info = new Component(this.infoWrapper.root, 'div', ['info']);
      new Component(info.root, 'img', [], null, 'src', el.src);
      new Component(info.root, 'h3', [], el.title);
      new Component(info.root, 'p', [],  el.text);
            
    });
        
  }
}
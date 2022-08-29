import { Component } from "../../Abstract/component";
import { TServices } from "../../Interfaces/Types";
import { developers } from "./developers-obj";

export class Developers extends Component {
  titleDevelopers: Component;

  developers: Component;
        
  constructor(parent: HTMLElement, private readonly services: TServices) {
    super(parent, 'div', ['developers-wrapper']);
    this.titleDevelopers = new Component(this.root, 'h2', [], 'Наша команда');
    this.developers = new Component(this.root, 'div', ['developers']);
       
    developers.forEach((el, i) => {
      const developer = new Component(this.developers.root, 'div', ['developer']);
      const img = new Component(developer.root, 'img' , ['developer' + i], null, 'src', el.src);
      const name = new Component(developer.root, 'h3', [], `${el.name}`);
      const description = new Component(developer.root, 'p', [], `${el.description}`);
    });       
  }
}
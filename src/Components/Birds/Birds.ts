import { Component } from '../../Abstract/component';
import './birds.scss';

export class Birds extends Component {
  
  branch: Component;

  birds: Record<'one' | 'two' | 'three' | 'four', Component>;

  constructor(parent: HTMLElement, style: string) {
    super(parent, 'div', [style, 'birds'])

    this.branch = new Component(
      this.root, 'img', [`birds__branch`], null, 'src', 'assets/sprint/branch29deg.png',
    );

    const birds1 = new Component(
      this.root, 'img', [`birds__bird`], null, 'src', 'assets/sprint/bird1.png',
    );

    const birds2 = new Component(
      this.root, 'img', [`birds__bird`], null, 'src', 'assets/sprint/bird2.png',
    );

    const birds3 = new Component(
      this.root, 'img', [`birds__bird`], null, 'src', 'assets/sprint/bird3.png',
    );

    const birds4 = new Component(
      this.root, 'img', [`birds__bird`], null, 'src', 'assets/sprint/bird4.png',
    );
    
    this.birds = {
      'one': birds1,
      'two': birds2,
      'three': birds3,
      'four': birds4,
    }

    this.show(0);
  }

  show(count: number): void {
    if (count > 0) { this.birds.one.render() } else this.birds.one.remove(); 
    if (count > 1) { this.birds.two.render() } else this.birds.two.remove(); 
    if (count > 2) { this.birds.three.render() } else this.birds.three.remove(); 
    if (count > 3) { this.birds.four.render() } else this.birds.four.remove(); 
  }
}
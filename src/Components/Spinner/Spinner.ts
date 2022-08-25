import { Component } from '../../Abstract/component';
import './spinner.scss';

export class Spinner extends Component {
  constructor(parent: HTMLElement) {
    super(parent, 'div', ['spinner']);
    this.root.innerHTML = '<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>';
  }
}
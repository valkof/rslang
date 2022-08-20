
import { Component } from "../../Abstract/component";

export class Sprint extends Component {
  constructor(parent: HTMLElement) {
    super(parent, 'div', ['sprint-wrapper']);
  }
}
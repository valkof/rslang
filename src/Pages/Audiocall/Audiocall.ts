import { Component } from "../../Abstract/component";

export class AudioCall extends Component {
  constructor(parent: HTMLElement) {
    super(parent, 'div', ['audiocall-wrapper']);
  }
}
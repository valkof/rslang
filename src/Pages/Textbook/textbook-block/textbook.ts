import { Component } from "../../../Abstract/component";


export class Textbook extends Component {
    constructor(parent: HTMLElement) {
        super(parent, 'div', ['extbook-wrapper']);
        
    }
}

import { Component } from "../../Abstract/component";
import { TServices } from "../../Interfaces/Types";

export class Statistic extends Component {
  constructor(parent: HTMLElement, private readonly services: TServices) {
    super(parent, 'div', ['statistic-wrapper']);

  }
}
import { Component } from "../../Abstract/component";
import { TServices } from "../../Interfaces/Types";
import APIService from "../../Services/APIService";
import { Card } from "./components/Card";
import { Pagination } from "./components/Pagination";

export class TextBook extends Component {
  cardsBlock: Component;

  pagination: Pagination;
  
  constructor(parent: HTMLElement, private readonly services: TServices) {
    super(parent, 'div', ['textbook-wrapper']);
    this.pagination = new Pagination(this.root);
    this.pagination.changeCategory = (data) => {
      this.renderCards(data)
    }
    this.cardsBlock = new Component(this.root, 'div', ['cards-block']);
    this.renderCards();
  }

  async renderCards(data?: {group: number, page: number}) {
    const cards = await APIService.getWords(data?.page ?? 0, data?.group ?? 0);
    this.cardsBlock.root.innerHTML = '';
    cards?.data.map(card => new Card(this.cardsBlock.root, card));
  }  
}
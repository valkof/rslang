import { Component } from '../../Abstract/component';
import { IResponse } from '../../Interfaces/Interfaces';
import { TAggregatedWords, TAuthData, TServices } from '../../Interfaces/Types';
import APIService from '../../Services/APIService';
import { Card } from './components/Card';
import { Pagination } from './components/Pagination';

export class TextBook extends Component {

  cardsBlock: Component;

  cards: Card[] = [];

  pagination: Pagination;

  constructor(parent: HTMLElement, private readonly services: TServices) {
    super(parent, 'div', ['textbook-wrapper']);
    this.pagination = new Pagination(this.root);

    this.pagination.changeCategory = async data => {
      if (data.glossary) {
        await this.renderGlossary();
      } else await this.renderCards(data);
    };

    this.cardsBlock = new Component(this.root, 'div', ['cards-block']);

    this.pagination.changeBackg = (color: string) => {
      this.cardsBlock.root.style.backgroundColor = color;
      this.cardsBlock.root.classList.add('active-page')
    }

    this.renderCards();
  }

  async renderCards(data?: { group: number; page: number; glossary?: boolean }): Promise<void> {
    const [cardsData, glossData] = await Promise.all([APIService.getWords(data?.page ?? 0, data?.group ?? 0), this.getGlossaryData(
        `{"$or":[{"$and":[{"group":${data?.group ?? 0}, "page":${data?.page ?? 0}}]},{"userWord.difficulty":"hard"}]}`
      )]
    );

    if (cardsData == null) return;
    this.cardsBlock.root.innerHTML = '';

    this.cards = cardsData.data.map(cardData => {
      if (glossData) {
        const glossaryData = glossData.data[0].paginatedResults.find(el => el._id === cardData.id);
        if (glossaryData != null) {
          const card = new Card(this.cardsBlock.root, glossaryData);
          card.renderInputs();

          const difficulty = glossaryData.userWord?.difficulty;
          card.hardWord.setInputs(difficulty === 'hard', difficulty === 'learned');
          return card
        }
      };

      const card = new Card(this.cardsBlock.root, cardData);
      card.hardWord.checkCardsDashboard = () => this.checkForLearningWord();
      card.removeInputs()
      return card
    });

    this.checkForLearningWord(data?.glossary);
  }

  async render(): Promise<void> {
    this.parent!.append(this.root);

    const isAuthorized = await APIService.getUserWords();

    if (isAuthorized == null) return this.pagination.addRemoveGlossary(false);

    this.pagination.addRemoveGlossary();
  }

  async renderGlossary(): Promise<void> {
    this.cardsBlock.root.innerHTML = '';
    this.cardsBlock.root.classList.remove('cards-all-learning')
    const glosData = await this.getGlossaryData(`{"$and":[{"userWord.difficulty":"hard"}]}`);
    if (glosData == null || glosData.data[0].totalCount.length === 0) return;
    glosData.data[0].paginatedResults.forEach(cardData => {
      const card = new Card(this.cardsBlock.root, cardData, true);
      card.hardWord.setInputs(cardData.userWord?.difficulty === 'hard', cardData.userWord?.difficulty === 'learned');
    });
  }

  async getGlossaryData(filter: string): Promise<IResponse<TAggregatedWords[]> | null> {
    return await APIService.getAgrWords({ filter, wordsPerPage: '3600' }) as IResponse<TAggregatedWords[]> | null;
  }

  checkForLearningWord(glossary?: boolean) {
    const isAllLearning = this.cards.every(card => (card.hardWord.inputHardWord.root as HTMLInputElement).checked);
    const isAllHard = this.cards.every(card => (card.hardWord.inputIsLearning.root as HTMLInputElement).checked);

    if (isAllHard || isAllLearning) {
      this.cardsBlock.root.classList.add('cards-all-learning');
    } else this.cardsBlock.root.classList.remove('cards-all-learning');
  }
}

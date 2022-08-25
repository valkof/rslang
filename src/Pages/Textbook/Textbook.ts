import { Component } from '../../Abstract/component';
import { IUserWords } from '../../Interfaces/Interfaces';
import { TServices } from '../../Interfaces/Types';
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

    this.pagination.changeBackg = (color: string) => {
      this.cardsBlock.root.style.backgroundColor = color;
    }
    
    this.pagination.changeCategory = data => {      
      if (data.glossary) {
        this.renderGlossary();
      } else this.renderCards(data);
    };

    this.cardsBlock = new Component(this.root, 'div', ['cards-block']);

    this.renderCards();
  }

  async renderCards(data?: { group: number; page: number; glossary?: boolean }) {
    const [cardsData, glossData] = await Promise.all([APIService.getWords(data?.page ?? 0, data?.group ?? 0), this.getGlossaryData()]);
    if (cardsData == null) return;
    this.cardsBlock.root.innerHTML = '';
    
    this.cards = cardsData.data.map(cardData => {
      const card = new Card(this.cardsBlock.root, cardData);
      card.hardWord.checkCardsDashboard = () => this.checkForLearningWord();
      if (glossData == null) { card.removeInputs() } else card.renderInputs();

      const glossaryData = glossData?.data.find(el => el.wordId == card.data.id);      
      if (glossaryData != null) {        
        const {optional: {isHardWord, isLearningWord}} = glossaryData;
        card.hardWord.setInputs(isHardWord, isLearningWord)
      }

      return card
    });

    this.checkForLearningWord(data?.glossary);
  }

  async render(): Promise<void> {
    this.parent!.append(this.root);
    const authData = window.localStorage.getItem('rslang');
    if (authData == null) return this.pagination.addRemoveGlossary(false);
    const { userId, token } = JSON.parse(authData);
    const isAuthorized = await APIService.getUserWords(userId, token);
    if (isAuthorized == null) return this.pagination.addRemoveGlossary(false);

    this.pagination.addRemoveGlossary();
  }

  async renderGlossary() {
    this.cardsBlock.root.innerHTML = '';
    this.cardsBlock.root.classList.remove('cards-all-learning')
    const glosData = await this.getGlossaryData();  
    if (glosData == null) return;  
    const cards = glosData.data.map(({optional}) => optional).filter(({isHardWord}) => isHardWord);
    cards.forEach(({cardData, isHardWord, isLearningWord}) => {
    const card = new Card(this.cardsBlock.root, cardData);
    card.hardWord.setInputs(isHardWord, isLearningWord);
    });   
  }

  async getGlossaryData(): Promise<IUserWords | undefined> {
    const authData = window.localStorage.getItem('rslang');
    if (authData == null) return;
    const {userId, token} = JSON.parse(authData);
    return await APIService.getUserWords(userId, token);      
  }

  checkForLearningWord(glossary?: boolean) {
    const isAllLearning = this.cards.every(card => (card.hardWord.inputHardWord.root as HTMLInputElement).checked);
    const isAllHard = this.cards.every(card => (card.hardWord.inputIsLearning.root as HTMLInputElement).checked);

    if (isAllHard || isAllLearning) {
      this.cardsBlock.root.classList.add('cards-all-learning');
    } else this.cardsBlock.root.classList.remove('cards-all-learning');
  }
}

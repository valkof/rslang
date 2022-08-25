import { Component } from "../../../Abstract/component";
import { TWord } from "../../../Interfaces/Types";
import APIService from '../../../Services/APIService';

export class HardWord extends Component {    
  inputHardWord: Component;
  inputIsLearning: Component;
  checkCardsDashboard: () => void = () => {};

  constructor(parent: HTMLElement, private cardData: TWord) {
    super(parent, 'div', ['add-word']);
    this.inputHardWord = new Component(this.root, 'input', ['hard-word'], null, 'type', 'checkbox');
    this.inputHardWord.root.setAttribute('data-title-word', 'Сложное слово');

    this.inputIsLearning = new Component(this.root, 'input', ['learn-word'], null, 'type', 'checkbox');
    this.inputIsLearning.root.setAttribute('data-title-word', 'Слово изучено')
   
    this.inputHardWord.root.onclick = () => this.addWordToServer();
    this.inputIsLearning.root.onclick = () => this.addWordToServer()
  }

  async addWordToServer() {
    this.checkCardsDashboard();
    const isHardWord = (this.inputHardWord.root as HTMLInputElement).checked;
    const isLearningWord = (this.inputIsLearning.root as HTMLInputElement).checked;
    const authData = window.localStorage.getItem('rslang');
    if (authData == null) return;
    const {userId, token} = JSON.parse(authData);
    const hasCardId = await APIService.getUserWordsById(userId, this.cardData.id, token);
    if (hasCardId == null) {
      await APIService.createUserWord(userId, this.cardData.id, {difficulty: this.cardData.group.toString(), optional: {isHardWord, isLearningWord, cardData: this.cardData}}, token);       
    } else {
      if (!isHardWord && !isLearningWord) {
        await APIService.deleteUserWord(userId, this.cardData.id, token);
      }
      await APIService.updateUserWord(userId, this.cardData.id, {difficulty: this.cardData.group.toString(), optional: {isHardWord, isLearningWord, cardData: this.cardData}}, token);
    }
  }

  setInputs(hard: boolean, learn: boolean) {
    (this.inputHardWord.root as HTMLInputElement).checked = hard;
    (this.inputIsLearning.root as HTMLInputElement).checked = learn;
  }
}

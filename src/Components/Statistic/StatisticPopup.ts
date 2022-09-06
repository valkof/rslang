import { Component } from '../../Abstract/component';
import { TGameAnswer, TWord } from '../../Interfaces/Types';
import './StatisticPopup.scss';

export default class StatisticPopup extends Component {
  answers: TGameAnswer[];

  correctAnswers: TWord[] =[];

  incorrectAnswers: TWord[] =[];

  repeatbtn: Component | undefined;

  backBtn: Component | undefined;

  btnContainer: Component;

  constructor(
    parent: HTMLElement,
    answers: TGameAnswer[],

    repeatGame?: () => void,
    back?: () => void) {

    super(parent, 'div', ['statistic-popup']);
    this.answers = answers;

    this.btnContainer = new Component(this.root, 'div', ['statistic-popup__btnContainer']);

    if (repeatGame) {
      this.repeatbtn = new Component(this.btnContainer.root, 'div', ['repeat-btn'], 'Сложность');
      this.repeatbtn.root.onclick = repeatGame;
    }

    if (back) {
      this.backBtn = new Component(this.btnContainer.root, 'div', ['repeat-btn'], 'Учебник');
      this.backBtn.root.onclick = back;
    }

    this.makeAnswersArrays(this.answers);
    this.renderAnswers(this.correctAnswers, true);
    this.renderAnswers(this.incorrectAnswers, false);
  }

  private renderAnswers(answers: TWord[], iCorrect: boolean) {
    const text = iCorrect ? 'Правильных ответов:' : 'Неправильных ответов:';
    const title = new Component(this.root, 'h2', ['statistic-title'], `${text} ${answers.length}`);
    for (let i = 1; i < answers.length + 1; i++) {
      this.renderRow(answers[i - 1], i, iCorrect);
    }
  }

  private renderRow(word: TWord, index: number, correct: boolean) {
    const status = correct ? 'row-container_correct' : 'row-container_incorrect';
    const container = new Component(this.root, 'div', ['row-container', status]);
    const indexEl = new Component(container.root, 'h3', ['row-index'], `${index}`);
    const enWord = new Component(container.root, 'h3', ['row-word'], ` ${word.word}`);
    const enTranscription = new Component(container.root, 'h3', ['row-word'], ` ${word.transcription}`);
    const enTranslate = new Component(container.root, 'h3', ['row-word'], ` ${word.wordTranslate}`);
  }

  private makeAnswersArrays(answers: TGameAnswer[]) {
    answers.forEach((el) =>{
      if(el.correct) {
        this.correctAnswers.push(el.word as TWord);
      } else this.incorrectAnswers.push(el.word as TWord);
    } )
  }
}

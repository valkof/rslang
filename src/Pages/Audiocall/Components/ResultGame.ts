import { Component } from "../../../Abstract/component";
import { TGameAnswer, TServices } from "../../../Interfaces/Types";
import { RowResults } from "./RowResults";

export class ResultGame extends Component {

  constructor(parent: HTMLElement, private readonly services: TServices) {
    super(parent, 'div', ['audiocall__result_game']);

    const divResult = new Component(this.root, 'div', ['result_game__result']);

    new Component(divResult.root, 'h2', ['result__title'], 'Результаты');

    const divTable = new Component(divResult.root, 'div', ['result__table']);

    const table = new Array(20).fill(0).map((_, i) => {
      const rowResult = new RowResults(divTable.root);
      rowResult.colNumber.root.innerText = `${i + 1}`;
      return rowResult;
    })

    const divSetButtons = new Component(divResult.root, 'div', ['result__set_buttons']);

    const button = new Component(divSetButtons.root, 'button', ['button'], 'Старт Аудиовызов');
    button.root.onclick = () => this.services.audioGame.selectGame();

    this.services.audioGame.addListener('result', (words) => {
      if (words) {
        const learnWords = words as TGameAnswer[];
        const countWords = learnWords.length;
        table.forEach((row, i) => {
          if (countWords >= i + 1) {
            row.root.style.backgroundColor = learnWords[i].correct ? 'green' : 'red';
            row.colWord.root.innerText = learnWords[i].word.word;
            row.colTranscription.root.innerText = learnWords[i].word.transcription;
            row.colTranslate.root.innerText = learnWords[i].word.wordTranslate;
            row.render();
          } else {
            row.remove();
          }
        })
      }
    });

    this.services.audioGame.addListener('audioCallGame', (stage) => {
      if (stage === 'result') {
        this.render();
      } else {
        this.remove();
      }
    })
  }
}

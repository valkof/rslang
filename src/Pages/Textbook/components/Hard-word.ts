import { Component } from '../../../Abstract/component';
import { TAggregatedWord } from '../../../Interfaces/Types';
import APIService from '../../../Services/APIService';
import WriteStatisticService from '../../../Services/WriteStatisticService';
import { createDate } from '../../../utils';

export class HardWord extends Component {
  inputHardWord: Component;

  inputIsLearning: Component;

  checkCardsDashboard: () => void = () => {};

  constructor(
    parent: HTMLElement,
    private cardData: TAggregatedWord,
    private switchActiveStatus: (isHard: boolean, isLearn: boolean) => void,
  ) {
    super(parent, 'div', ['add-word']);
    this.inputHardWord = new Component(this.root, 'input', ['hard-word'], null, 'type', 'checkbox');
    this.inputHardWord.root.setAttribute('data-title-word', 'Сложное слово');

    this.inputIsLearning = new Component(this.root, 'input', ['learn-word'], null, 'type', 'checkbox');
    this.inputIsLearning.root.setAttribute('data-title-word', 'Слово изучено');

    this.inputHardWord.root.onclick = () => {
      (this.inputIsLearning.root as HTMLInputElement).checked = false;
      this.addWordToServer();
    };
    this.inputIsLearning.root.onclick = () => {
      (this.inputHardWord.root as HTMLInputElement).checked = false;
      this.addWordToServer();
    };
  }

  async addWordToServer() {
    const user = await APIService.getAuthUser();
    this.checkCardsDashboard();
    const isHardWord = (this.inputHardWord.root as HTMLInputElement).checked;
    const isLearningWord = (this.inputIsLearning.root as HTMLInputElement).checked;
    const difficulty = isHardWord ? 'hard' : isLearningWord ? 'learned' : 'easy';
    const authData = APIService.isAuthorizedUser();
    if (!authData) return;
    const hasCardId = await APIService.getUserWordsById(this.cardData._id);

    if (hasCardId == null) {
      if (user) {
        WriteStatisticService.writeStatistic(user, createDate(), 1, 1);
      }
      await APIService.createUserWord(this.cardData._id, {
        difficulty: difficulty,
        optional: {
          count: 0,
          maxCount: difficulty === 'hard' ? 5 : 3,
          guessed: 0,
          shown: 1,
        },
      });
    } else {
      if (difficulty === 'easy') {
        await APIService.deleteUserWord(this.cardData._id);
      } else {
        if (user) {
          WriteStatisticService.writeStatistic(user, createDate(), 0, 1);
        }
        await APIService.updateUserWord(this.cardData._id, {
          difficulty: difficulty,
          optional: {
            count: hasCardId.data.optional.count,
            maxCount: difficulty === 'hard' ? 5 : 3,
            guessed: hasCardId.data.optional.guessed,
            shown: hasCardId.data.optional.shown,
          },
        });
      }
    }
    this.switchActiveStatus(
      (this.inputHardWord.root as HTMLInputElement).checked,
      (this.inputIsLearning.root as HTMLInputElement).checked,
    );
  }

  setInputs(hard: boolean, learn: boolean) {
    (this.inputHardWord.root as HTMLInputElement).checked = hard;
    (this.inputIsLearning.root as HTMLInputElement).checked = learn;

    this.switchActiveStatus(hard, learn);
  }
}

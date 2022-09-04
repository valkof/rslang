import { Component } from '../../../Abstract/component';
import { EGames } from '../../../Interfaces/Types';
import APIService from '../../../Services/APIService';
import { validateNum } from '../../../utils';

export class GamesStatistic extends Component {
  game: EGames;

  numberPercent: Component;

  rightAnswersPercent: Component;

  bestGameCount: Component;

  constructor(parent: HTMLElement, title: string, game: EGames) {
    super(parent, 'div', ['games-statistic-wrapper']);

    this.game = game;

    const gameStatisticTitle = new Component(this.root, 'h3', [], title);

    const statistiFromGames = new Component(this.root, 'div', ['statistic-games']);
    const learnedWords = new Component(statistiFromGames.root, 'div', ['learned-words']);
    const countWords = new Component(learnedWords.root, 'div', ['count-words']);
    const countTitle = new Component(countWords.root, 'p', [], 'Количество новых слов');
    this.numberPercent = new Component(countWords.root, 'p', [], '0');

    const rightAnswers = new Component(statistiFromGames.root, 'div', ['right-answers']);
    const percetnrigrhtAnswers = new Component(rightAnswers.root, 'div', ['percent-right-ancwers']);
    const rightAnswersTitle = new Component(percetnrigrhtAnswers.root, 'p', [], 'Процент правильных ответов');
    this.rightAnswersPercent = new Component(percetnrigrhtAnswers.root, 'p', [], ` %`);

    const bestGameBlock = new Component(statistiFromGames.root, 'div', ['best-game-block']);
    const bestGame = new Component(bestGameBlock.root, 'div', ['best-game']);
    const bestGameTitle = new Component(bestGame.root, 'p', [], 'Лучшая игра');
    this.bestGameCount = new Component(bestGame.root, 'p', [], '0');
  }

  async getStatistic() {
    const stat = await APIService.getUserSetting();
    if (stat) {
      const percent = Math.floor(
        (stat.data.optional[this.game].correctAnswers / stat.data.optional[this.game].answersCount) * 100,
      );
      this.numberPercent!.root.textContent = validateNum(stat.data.optional[this.game].newWords);
      this.rightAnswersPercent!.root.textContent = `${validateNum(percent)} %`;
      this.bestGameCount!.root.textContent = validateNum(stat.data.optional[this.game].streak);
    } else {
      this.numberPercent!.root.textContent = '0';
      this.rightAnswersPercent!.root.textContent = '0';
      this.bestGameCount!.root.textContent = '0';
    }
  }
}

import { Component } from '../../../Abstract/component';
import APIService from '../../../Services/APIService';
import { gitDevelopers } from './../../../common/footer/git-developers';
import { AudioCall } from './../../Audiocall/Audiocall';

export class WordsStatistic extends Component {
  wordStatisticTitle: Component;

  statistiFromWords: Component;

  learnedWords: Component;

  countWords: Component;

  countTitle: Component;

  newWords: Component;

  percentWords: Component;

  percetnRigrhtWords: Component;

  rightWordsTitle: Component;

  rightWordsPercent: Component;

  numberNew: Component;

  numberLearned: Component;

  totalLearnedWords: Component;

  totalCountWords: Component;

  totalCountTitle: Component;

  totalNumberLearned: Component;

  constructor(parent: HTMLElement) {
    super(parent, 'div', ['words-statistic-wrapper']);
    this.wordStatisticTitle = new Component(this.root, 'h3', [], 'Статистика по изученным словам');

    this.statistiFromWords = new Component(this.root, 'div', ['statistic-words']);

    this.totalLearnedWords = new Component(this.statistiFromWords.root, 'div', ['learned-words']);
    this.totalCountWords = new Component(this.totalLearnedWords.root, 'div', ['count-words']);
    this.totalCountTitle = new Component(this.totalCountWords.root, 'p', [], ' Общее количество изученных слов');
    this.totalNumberLearned = new Component(this.totalCountWords.root, 'p', [], '');

    this.newWords = new Component(this.statistiFromWords.root, 'div', ['new-words']);
    this.countWords = new Component(this.newWords.root, 'div', ['count-words']);
    this.countTitle = new Component(this.countWords.root, 'p', [], 'Количество новых слов за день');
    this.numberNew = new Component(this.countWords.root, 'p', [], '');

    this.learnedWords = new Component(this.statistiFromWords.root, 'div', ['learned-words']);
    this.countWords = new Component(this.learnedWords.root, 'div', ['count-words']);
    this.countTitle = new Component(this.countWords.root, 'p', [], 'Количество изученных слов за день');
    this.numberLearned = new Component(this.countWords.root, 'p', [], '');

    this.percentWords = new Component(this.statistiFromWords.root, 'div', ['percent-rhight-words-block']);
    this.percetnRigrhtWords = new Component(this.percentWords.root, 'div', ['percent-right-words']);
    this.rightWordsTitle = new Component(this.percetnRigrhtWords.root, 'p', [], 'Процент правильных ответов за день');
    this.rightWordsPercent = new Component(this.percetnRigrhtWords.root, 'p', [], '%');

    this.getStat();
  }

  private async getStat() {
    const stat = await APIService.getUserStatistics();
    const set = await APIService.getUserSetting();
    let correct = 0;
    let answCount = 0;
    const length = stat ? stat?.data.optional.data.dataPerDay.length : 0;
    if (stat && length > 0) {
      this.numberNew.root.textContent = stat?.data.optional.data.dataPerDay[0].newWords.toString();
      this.numberLearned.root.textContent = stat?.data.optional.data.dataPerDay[0].learnedWords.toString();
      this.totalNumberLearned .root.textContent = stat?.data.learnedWords.toString();
    }
    if (set) {
      correct = set.data.optional.sprint.correctAnswers + set.data.optional.sprint.correctAnswers;
      answCount = set.data.optional.sprint.answersCount + set.data.optional.sprint.answersCount;
      this.rightWordsPercent.root.textContent = `${Math.round((correct / answCount) * 100)} %`;
    }
  }
}

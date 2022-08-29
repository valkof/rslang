import { Component } from '../../../Abstract/component';

export class WordsStatistic extends Component {
  
  wordStatisticTitle: Component;
  
  statistiFromWords: Component;
  
  learnedWords: Component;
  
  countWords: Component;
  
  countTitle: Component;
  
  numberPercent: Component;
  
  newWords: Component;
  
  percentWords: Component;
  
  percetnRigrhtWords: Component;
  
  rightWordsTitle: Component;
  
  rightWordsPercent: Component;

  constructor(parent: HTMLElement) {
    super(parent, 'div', ['words-statistic-wrapper']);
    this.wordStatisticTitle = new Component(this.root, 'h3', [], 'Статистика по изученным словам');

    this.statistiFromWords = new Component(this.root, 'div', ['statistic-words']);

    this.newWords = new Component(this.statistiFromWords.root, 'div', ['new-words']);
    this.countWords = new Component(this.newWords.root, 'div', ['count-words']);
    this.countTitle = new Component(this.countWords.root, 'p', [], 'Количество новых слов');
    this.numberPercent = new Component(this.countWords.root, 'p', [], '');

    this.learnedWords = new Component(this.statistiFromWords.root, 'div', ['learned-words']);
    this.countWords = new Component(this.learnedWords.root, 'div', ['count-words']);
    this.countTitle = new Component(this.countWords.root, 'p', [], 'Количество изученных слов');
    this.numberPercent = new Component(this.countWords.root, 'p', [], '');

    this.percentWords = new Component(this.statistiFromWords.root, 'div', ['percent-rhight-words-block']);
    this.percetnRigrhtWords = new Component(this.percentWords.root, 'div', ['percent-right-words']);
    this.rightWordsTitle = new Component(this.percetnRigrhtWords.root, 'p', [], 'Процент правильных ответов');
    this.rightWordsPercent = new Component(this.percetnRigrhtWords.root, 'p', [], '%');
  }
}

import { Component } from '../../Abstract/component';
import { SPRINT_DURATION } from '../../config';
import { TDifficulty, TServices, TSprintAnswers, TWord } from '../../Interfaces/Types';
import { ESprintEvents } from '../../Services/SprintService';
import { DifficultySelector } from './../../Components/DifficultySelector';
import StatisticPopup from './../../Components/Statistic/StatisticPopup';

export class Sprint extends Component {
  private service: TServices;

  private dificulty: Component;

  private game = new Component(this.root, 'div', ['sprint-game-wrapper']);

  private gameHeader = new Component(this.game.root, 'div', ['sprint-game__header']);

  private gameCenter = new Component(this.game.root, 'div', ['sprint-game__center']);

  private gameFooter = new Component(this.game.root, 'div', ['sprint-game__footer']);

  private timerContainer = new Component(this.gameHeader.root, 'div', ['sprint-game__timer-container']);

  private timerText = new Component(this.timerContainer.root, 'h3', ['sprint-game__timer-container__text']);

  private timerTime = new Component(this.timerContainer.root, 'h3', ['sprint-game__timer-container__text']);

  private scoreContainer = new Component(this.gameHeader.root, 'div', ['sprint-game__score-container']);

  private scoreText = new Component(this.scoreContainer.root, 'h3', ['sprint-game__timer-container__text']);

  private scoreValue = new Component(this.scoreContainer.root, 'h3', ['sprint-game__timer-container__text']);

  private rewardContainer = new Component(this.gameCenter.root, 'div', ['sprint-game__reward-container']);

  private comboContainer = new Component(this.gameCenter.root, 'div', ['sprint-game__combo-container']);

  private word = new Component(this.gameCenter.root, 'h3', ['sprint-game__word']);

  private wordTranslane = new Component(this.gameCenter.root, 'h3', ['sprint-game__translate']);

  private buttons = new Component(this.gameFooter.root, 'div', ['sprint-game__button-container']);

  private trueBtn = new Component(this.buttons.root, 'div', ['sprint-game__true-btn']);

  private falseBtn = new Component(this.buttons.root, 'div', ['sprint-game__false-btn']);

  private combo1 = new Component(this.comboContainer.root, 'div', ['sprint-game__combo']);

  private combo2 = new Component(this.comboContainer.root, 'div', ['sprint-game__combo']);

  private combo3 = new Component(this.comboContainer.root, 'div', ['sprint-game__combo']);

  private rewardBranch: Component;

  private rewardBird1: Component;

  private rewardBird2: Component;

  private rewardBird3: Component;

  private rewardBird4: Component;

  private statistic: StatisticPopup | undefined;

  constructor(parent: HTMLElement, private readonly services: TServices) {
    super(parent, 'div', ['sprint-wrapper']);
    this.service = services;
    this.dificulty = new DifficultySelector(
      this.root,
      'sprint',
      'Спринт',
      'Тренирует навык быстрого перевода с английского языка на русский. Вам нужно выбрать соответствует ли перевод предложенному слову.',
      this.startGameWithDificulty.bind(this),
    );

    this.rewardBranch = new Component(
      this.rewardContainer.root,
      'img',
      ['sprint-game__reward__branch'],
      null,
      'src',
      'assets/sprint/branch29deg.png',
    );

    this.rewardBird1 = new Component(
      this.rewardContainer.root,
      'img',
      ['sprint-game__reward__bird'],
      null,
      'src',
      'assets/sprint/bird1.png',
    );

    this.rewardBird2 = new Component(
      this.rewardContainer.root,
      'img',
      ['sprint-game__reward__bird'],
      null,
      'src',
      'assets/sprint/bird2.png',
    );

    this.rewardBird3 = new Component(
      this.rewardContainer.root,
      'img',
      ['sprint-game__reward__bird'],
      null,
      'src',
      'assets/sprint/bird3.png',
    );

    this.rewardBird4 = new Component(
      this.rewardContainer.root,
      'img',
      ['sprint-game__reward__bird'],
      null,
      'src',
      'assets/sprint/bird4.png',
    );

    this.init();
  }

  private init() {
    this.timerText.root.textContent = 'Время: ';
    this.timerTime.root.textContent = SPRINT_DURATION.toString();
    this.scoreText.root.textContent = '0';
    this.scoreValue.root.textContent = 'Очков';
    this.falseBtn.root.textContent = '2 Неверно';
    this.falseBtn.root.onclick = () => this.service.sprint.answer(false);
    this.trueBtn.root.textContent = '1 Верно';
    this.trueBtn.root.onclick = () => this.service.sprint.answer(true);

    this.rewardBird1.remove();
    this.rewardBird2.remove();
    this.rewardBird3.remove();
    this.rewardBird4.remove();

    this.service.sprint.addListener(ESprintEvents.timerTick, this.setTimer.bind(this));
    this.service.sprint.addListener(ESprintEvents.score, this.setScore.bind(this));
    this.service.sprint.addListener(ESprintEvents.startGame, this.start.bind(this));
    this.service.sprint.addListener(ESprintEvents.changeWord, this.setWord.bind(this));
    this.service.sprint.addListener(ESprintEvents.changeTranslate, this.setTranslate.bind(this));
    this.service.sprint.addListener(ESprintEvents.changeCombo, this.setCombo.bind(this));
    this.service.sprint.addListener(ESprintEvents.changeReward, this.setReward.bind(this));
    this.service.sprint.addListener(ESprintEvents.renderStatistic, this.renderStatistic.bind(this));

    this.game.remove();
    window.addEventListener('keydown', this.keyHandler.bind(this));
  }

  private startGameWithDificulty(i: number): void {
    const dificultyLevel = i < 7 && i >= 0 ? i : 0;
    this.service.sprint.generateWords(dificultyLevel as TDifficulty).then(() => this.service.sprint.startGame());
  }

  private start() {
    this.dificulty.remove();
    this.game.render();
  }

  private setTimer(time: string): void {
    this.timerTime.root.textContent = time;
  }

  private setScore(score: string): void {
    this.scoreText.root.textContent = score;
  }

  private setWord(word: string) {
    this.word.root.textContent = word.replace('"', '').replace('"', '').toUpperCase();
  }

  private setTranslate(word: string) {
    this.wordTranslane.root.textContent = word.replace('"', '').replace('"', '').toUpperCase();
  }

  private setCombo(combo: string) {
    switch (combo) {
      case '0':
        this.combo1.root.classList.remove('sprint-game__combo_active');
        this.combo2.root.classList.remove('sprint-game__combo_active');
        this.combo3.root.classList.remove('sprint-game__combo_active');
        break;

      case '1':
        this.combo1.root.classList.add('sprint-game__combo_active');
        break;

      case '2':
        this.combo1.root.classList.add('sprint-game__combo_active');
        this.combo2.root.classList.add('sprint-game__combo_active');
        break;

      case '3':
        this.combo1.root.classList.add('sprint-game__combo_active');
        this.combo2.root.classList.add('sprint-game__combo_active');
        this.combo3.root.classList.add('sprint-game__combo_active');
        break;
    }
  }

  private setReward(combo: string) {
    switch (combo) {
      case '0':
        this.rewardBird1.remove();
        this.rewardBird2.remove();
        this.rewardBird3.remove();
        this.rewardBird4.remove();
        break;

      case '10':
        this.rewardBird1.render();
        break;

      case '20':
        this.rewardBird2.render();
        break;

      case '30':
        this.rewardBird3.render();
        break;
      case '40':
        this.rewardBird4.render();
        break;
    }
  }

  private keyHandler(e: KeyboardEvent) {
    if (window.location.hash === '#sprint') {
      switch (e.key) {
        case '2':
          this.service.sprint.answer(false);
          break;
        case '1':
          this.service.sprint.answer(true);
          break;
      }
    }
  }

  private renderStatistic(data: string) {
    this.game.remove();
    this.dificulty.remove();
    const answers = JSON.parse(data) as TSprintAnswers ;
    this.statistic = new StatisticPopup(this.root, answers.correct, answers.incorrect);
  }

  render(): void {
    super.render();
    this.statistic?.remove();
    this.game.remove();
    this.dificulty.render();
  }
}

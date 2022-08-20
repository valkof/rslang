import { Component } from '../../Abstract/component';
import { TServices } from '../../Interfaces/Types';
import SprintService from '../../Services/SprintService';
import { DifficultySelector } from './../../Components/DifficultySelector';

export class Sprint extends Component {
  private dificulty: Component;

  private service: SprintService;

  constructor(parent: HTMLElement, private readonly services: TServices) {
    super(parent, 'div', ['sprint-wrapper']);
    this.service = new SprintService();
    this.dificulty = new DifficultySelector(
      this.root,
      'sprint',
      'Спринт',
      'Тренирует навык быстрого перевода с английского языка на русский. Вам нужно выбрать соответствует ли перевод предложенному слову.',
    );

    console.log(this.service.generateWords(2));
  }
}

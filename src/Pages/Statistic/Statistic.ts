
import { Component } from "../../Abstract/component";
import { TServices } from "../../Interfaces/Types";
import { GamesStatistic } from "./Statistics-block/Games-statistic";
import { WordsStatistic } from "./Statistics-block/Word-statistic";

export class Statistic extends Component {
  
  titleStatistic: Component;
 
  avatarStatisticsBlock: Component;
  
  avatar: Component;
  
  imgAvatar: Component;
 
  formAvatar: Component;
  
  nameAvatar: Component;
  
  buttonSaveName: Component;
  
  nameWrapper: Component;
 
  exit: Component;
  
  avatarContent: Component;
  
  gamesStatistic: GamesStatistic;
 
  wordsStatistic: WordsStatistic;

  constructor(parent: HTMLElement, private readonly services: TServices) {
   
      super(parent, 'div', ['statistic-wrapper']);
      this.titleStatistic = new Component(this.root, 'h2', [], 'Статистика');

      this.avatarStatisticsBlock = new Component(this.root, 'div', ['avatar-statistics-block']);
      this.avatar = new Component(this.avatarStatisticsBlock.root, 'div', ['avatar-wrapper']);
      this.avatarContent = new Component(this.avatar.root, 'div', ['avatar-content']);
      this.imgAvatar = new Component(this.avatarContent.root, 'img', [], null, 'src', 'assets/icon/savanna.png');

      this.nameWrapper = new Component(this.avatarContent.root, 'div', ['avatar-name']);
      this.formAvatar = new Component(this.nameWrapper.root, 'form');
      this.nameAvatar = new Component(this.formAvatar.root, 'input', [], null, 'placeholder', 'Имя');
      this.buttonSaveName = new Component(this.nameWrapper.root, 'button', [], 'Сохранить');
      this.exit = new Component(this.avatarContent.root, 'a', [], 'Выйти из аккаунта','href');

      this.gamesStatistic = new GamesStatistic(this.avatarStatisticsBlock.root);

      this.wordsStatistic = new WordsStatistic(this.avatarStatisticsBlock.root);

      


  }
}
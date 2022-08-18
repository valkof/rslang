import { Component } from "../../Abstract/component";
import { Spinner } from "../../Components/Spinner/Spinner";
import { TServices } from "../../Interfaces/Types";
import './authorization.scss';

export class Authorization extends Component {

  section: Component;
  
  divSpinner: Component;

  header: Component;

  divEmail: Component;

  inputEmail: Component;

  spanEmail: Component;

  divPass: Component;

  inputPass: Component;

  spanPass: Component;

  spanMessage: Component;

  divButtons: Component;

  buttonReg: Component;

  buttonLog: Component;

  constructor(parent: HTMLElement, private readonly services: TServices) {
    super(parent, 'div', ['autorization-wrapper']);

    this.section = new Component(this.root, 'section', ['section_authorization']);
    
    this.divSpinner = new Component(this.section.root, 'div', ['section__spinner']);
    new Spinner(this.divSpinner.root);

    this.header = new Component(this.section.root, 'h2', [], 'Вход');
    
    this.divEmail = new Component(this.section.root, 'div', ['email', 'section__email']);
    this.inputEmail = new Component(this.divEmail.root, 'input', ['email__input']);
    this.spanEmail = new Component(this.divEmail.root, 'span', ['email__span'], 'Адрес электронной почты');

    this.divPass = new Component(this.section.root, 'div', ['password', 'section__password']);
    this.inputPass = new Component(this.divPass.root, 'input', ['password__input'], '', 'type', 'password');
    this.spanPass = new Component(this.divPass.root, 'span', ['password__span'], 'Пароль');
    
    this.spanMessage = new Component(this.section.root, 'span', ['section__massage'], '');
    
    this.divButtons = new Component(this.section.root, 'div', ['buttons', 'section__buttons']);
    this.buttonReg = new Component(this.divButtons.root, 'button', ['button'], 'Регистрация');
    this.buttonLog = new Component(this.divButtons.root, 'button', ['button'], 'Вход');
  
    this.buttonReg.root.addEventListener('click', () => {
      this.services.lang.userAuthorization(
        (this.inputEmail.root as HTMLInputElement).value,
        (this.inputPass.root as HTMLInputElement).value,
        true);
    })
    
    this.buttonLog.root.addEventListener('click', () => {
      this.services.lang.userAuthorization(
        (this.inputEmail.root as HTMLInputElement).value,
        (this.inputPass.root as HTMLInputElement).value);
    })
  
    this.services.lang.addListener('authorization', (phase) => {
      if (phase === 'start') {
        this.spanMessage.root.innerText = '';
        this.section.root.classList.add('disable');
        this.divSpinner.root.classList.add('disable');
      } else if (phase === 'error') {
        this.spanMessage.root.innerText = 'Неверный адрес электронной почты или пароль';
        this.section.root.classList.remove('disable');
        this.divSpinner.root.classList.remove('disable');
      } else {
        this.spanMessage.root.innerText = '';
        this.inputEmail.root.innerText = '';
        this.inputPass.root.innerText = '';
        this.section.root.classList.remove('disable');
        this.divSpinner.root.classList.remove('disable');
      }
    })

  }

}
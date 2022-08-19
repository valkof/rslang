import { Component } from "../../Abstract/component";

/* Обратите внимание: сама кнопка "Авторизация" создана в heder. Здесь, я думаю, 
нужно писать непосредственно логику для страницы авторизации и взаимоувязать ее с кнопкой "Авторизация" из hedera */
export class Autorization extends Component {
    constructor(parent: HTMLElement) {
        super(parent, 'div', ['autorization-wrapper']);
    }
}
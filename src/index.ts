import { App } from './App';
import './style.scss';
import APIService from './Services/APIService';

new App(document.body).render();
 APIService.loginUser({ "email": "hell@user.com", "password": "12345678"}).then((a) => console.log(a));


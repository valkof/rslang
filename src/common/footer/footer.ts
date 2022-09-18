
import { Component } from "../../Abstract/component";
import { TServices } from "../../Interfaces/Types";
import { gitDevelopers, IGitDeveloper } from "./git-developers";


export class Footer extends Component{
  footerWrapper: Component;

  copyright: Component;

  footerSpan: Component;

  footerGitWrapper: Component;

  rsName: Component;

  rsSrc: Component

  rsImg: Component;
   
  constructor (parent: HTMLElement, private readonly services: TServices) {
    super (parent, 'footer', []);
    this.footerWrapper = new Component (this.root, 'div', ['footer-wrapper']);
    this.copyright = new Component (this.footerWrapper.root, 'div', ['footer-copy']);
    this.footerSpan = new Component (this.copyright.root, 'span', [], '&copy; &nbsp; 2022' );

    this.footerGitWrapper = new Component (this.footerWrapper.root, 'div', ['footer-developers']);
    
    gitDevelopers.forEach((el, i) => {
      const div = new Component(this.footerGitWrapper.root, 'div', ['footer-developer' + i]);
      const a = new Component (div.root, 'a', [], el.gitName, 'href', el.href);
    })
             
    this.rsName = new Component (this.footerWrapper.root, 'div', ['rolling-name']);
    this.rsSrc = new Component (this.rsName.root, 'a', [], null, 'href', 'https://rs.school/js/');
    this.rsImg = new Component (this.rsSrc.root, 'img', [], null, 'src', 'assets/rss.svg');
  }
}

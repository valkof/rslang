import { BaseComponent } from "./Abstract/BaseComponent";
import { Footer } from "./common/footer/footer";

import { Header } from "./common/header/header";
import { Router } from "./Components/Router";
import { TServices } from "./Interfaces/Types";
import { MainPage } from "./Pages/Main/main_pages/main-page";
//import { Main } from "./Pages/Main/Main";
import { LangService } from "./Services/LangService";
import { RouterService } from "./Services/RouterService";

interface IApp {
  render: () => void;
}

export class App  {
  private readonly services: TServices;
  
  //  header: Header;
  // // main: MainPage;
  //  footer: Footer;

  constructor(private readonly root: HTMLElement) {
   this.services = {
      lang: new LangService,
      router: new RouterService
    };
  }

    render(): void {
      new Header(document.body);

      const main = new BaseComponent('main').element;
      this.root.appendChild(main);
       
       new Footer(document.body);
    new Router(main, this.services).render()



    //this.header = new Header(document.body);
   // this.main = new MainPage(document.body);
    //this.footer = new Footer(document.body);


    
  }
  
}

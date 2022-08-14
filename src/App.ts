import { Services } from "./Interfaces/Types";
import { LangService } from "./Services/LangService";

interface IApp {
  render: () => void;
}

export class App implements IApp {
  private readonly services: Services;

  constructor(private readonly root: HTMLElement) {
    this.services = {
      Lang: new LangService
    };
  }

  render(): void {
    // new Header(this.root, this.services).render();
    
    // new Winners(this.root, this.services).render();

    // new Garage(this.root, this.services).render();
  }
}

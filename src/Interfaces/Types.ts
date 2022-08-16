import { About } from "../Pages/About";
import { Audiocall } from "../Pages/Audiocall";
import { Authorization } from "../Pages/Authorization";
import { Main } from "../Pages/Main";
import { Sprint } from "../Pages/Sprint";
import { Statistic } from "../Pages/Statistic";
import { Textbook } from "../Pages/Textbook";
import { LangService } from "../Services/LangService";
import { RouterService } from "../Services/RouterService";

export type Services = {
  Lang: LangService,
  Router: RouterService,
}

export type Word = {
  "id": string,
  "group": number,
  "page": number,
  "word": string,
  "image": string,
  "audio": string,
  "audioMeaning": string,
  "audioExample": string,
  "textMeaning": string,
  "textExample": string,
  "transcription": string,
  "textExampleTranslate": string,
  "textMeaningTranslate": string,
  "wordTranslate": string
}

export type Page = Main | About | Authorization | Textbook | Audiocall | Sprint | Statistic;

export type TRoutes = {
  path: string;
  component: Page;
}
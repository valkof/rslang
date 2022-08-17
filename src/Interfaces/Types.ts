import { About } from "../Pages/About/About";
import { Audiocall } from "../Pages/Audiocall/Audiocall";
import { Authorization } from "../Pages/Authorization/Authorization";
import { Main } from "../Pages/Main/Main";
import { Sprint } from "../Pages/Sprint/Sprint";
import { Statistic } from "../Pages/Statistic/Statistic";
import { Textbook } from "../Pages/Textbook/Textbook";
import { LangService } from "../Services/LangService";
import { RouterService } from "../Services/RouterService";

export type TServices = {
  lang: LangService,
  router: RouterService,
}

export type TWord = {
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



export type TPage = Main | About | Authorization | Textbook | Audiocall | Sprint | Statistic;

export type TRoutes = {
  path: string;
  component: TPage;
}

export type TUser = {
  email: string,
  password: string,
  name?: string,
}

export type TAuthResponse = {
    message: string,
    token: string,
    refreshToken: string,
    userId: string,
    name: string,
  }

export type TUserStatistic = {
    learnedWords: number,
    optional: any
  }

export type TUserSetting = {
    wordsPerDay: number,
    optional: any
  }

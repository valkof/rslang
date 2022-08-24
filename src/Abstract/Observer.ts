import { TParams } from "../Interfaces/Types";

type TObserver = {
  name: string;
  callback: (...params: TParams[]) => void;
}

interface IObserver {
  addListener: (name: string, callback: (...params: TParams[]) => void) => void;
  dispatch: (name: string, ...params: TParams[]) => void;
}

export class Observer implements IObserver {
  private listeners: TObserver[] = [];

  addListener(name: string, callback: (...params: TParams[]) => void): void {
    this.listeners.push({ name, callback });
  }

  dispatch(name: string, ...params: TParams[]): void {
    this.listeners.filter(it => it.name === name).forEach(it => it.callback(...params));
  }
}

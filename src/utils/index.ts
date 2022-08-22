export function logError(message: string, error: unknown) {
  const errMessage = (error instanceof Error) ? error.message : 'Unknown Error';
  console.error(`[${message}]: ${errMessage}`);
}

// Функция перемешивания массивов https://en.wikipedia.org/wiki/Fisher–Yates_shuffle
export function shuffle<T>(arr: Array<T>) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

export function getRandomNumber(max: number) {
  return Math.floor(Math.random() * max );
}

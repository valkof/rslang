export function throwConsoleError(message: string, error: unknown) {
  const errMessage = (error instanceof Error) ? error.message : 'Unknown Error';
  console.error(`${message} ${errMessage}`);
}
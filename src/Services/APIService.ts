import { Word } from "../Interfaces/Types";

const host = 'http://127.0.0.1:8075'; // http://localhost:8075/';


export async function getWords(page = 0, group = 0): Promise<Word[]> {
  const response = await fetch(`${host}/words?group=${group}&page=${page}`);
  return response.json();
}
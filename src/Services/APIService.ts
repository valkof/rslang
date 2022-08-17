import { TAuthResponse, TUser, TWord } from "../Interfaces/Types";


const host = 'https://app-rsslang.herokuapp.com'; // http://localhost:8075/';


export async function getWords(page = 0, group = 0): Promise<TWord[]> {
  const response = await fetch(`${host}/words?group=${group}&page=${page}`);
  return response.json();
}

export async function getWord(id: string): Promise<TWord> {
  const response = await fetch(`${host}/words/${id}`);
  const content: TWord = await response.json();
  return content;
}

// Users
export async function getUser(id: string, token: string): Promise<TUser> {
  const rawResponse = await fetch(`${host}/users/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  const content: TUser = await rawResponse.json();
  console.log(content);
  return content;
};

export async function createUser(user: TUser) {
  const rawResponse = await fetch(`${host}/users`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  const content: TUser = await rawResponse.json();
  console.log(content);
  return content;
};

export async function updateUser(id: string, user: TUser, token: string) {
  const rawResponse = await fetch(`${host}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  const content: TUser = await rawResponse.json();
  console.log(content);
  return content;
};

export async function deleteUser(id: string, token: string) {
  const rawResponse = await fetch(`${host}/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  const content = await rawResponse.status;
  console.log(content);
  return content;
};

export async function getNewToken(id: string, token: string) {
  const rawResponse = await fetch(`${host}/users/${id}/tokens`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  const content = await rawResponse.json();
  console.log(content);
  return content;
};

// Login
export async function loginUser(user: TUser) {
  const rawResponse = await fetch(`${host}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  const content: TAuthResponse = await rawResponse.json();
  console.log(content);
  return content;
};

// Users/Words
export async function getUserWords(id: string, token: string) {
  const rawResponse = await fetch(`${host}/users/${id}/words`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  const content = await rawResponse.json();
  console.log(content);
  return content;
};

export async function createUserWord(id: string, wordId: string, word: any, token: string) {
  const rawResponse = await fetch(`${host}/users/${id}/words/${wordId}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(word)
  });
  const content = await rawResponse.json();
  console.log(content);
  return content;
};

export async function updateUserWord(id: string, wordId: string, word: any, token: string) {
  const rawResponse = await fetch(`${host}/users/${id}/words/${wordId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(word)
  });
  const content = await rawResponse.json();
  console.log(content);
  return content;
};

export async function deleteUserWord(id: string, wordId: string, token: string) {
  const rawResponse = await fetch(`${host}/users/${id}/words/${wordId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  const content = await rawResponse.json();
  console.log(content);
  return content;
};

export async function getUserWordsById(id: string,wordId: string, token: string) {
  const rawResponse = await fetch(`${host}/users/${id}/words/${wordId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  const content = await rawResponse.json();
  console.log(content);
  return content;
};
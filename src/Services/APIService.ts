import { TAuthResponse, TUser, TUserSetting, TUserStatistic, TWord } from "../Interfaces/Types";


const host = 'https://app-rsslang.herokuapp.com'; // http://localhost:8075/';

export default class APIService {
  private readonly host: string;
  constructor(host: string) {
    this.host = host;
  }
  // Words
  async getWords(page = 0, group = 0): Promise<TWord[]> {
    const response = await fetch(`${host}/words?group=${group}&page=${page}`);
    return response.json();
  }

  async getWord(id: string): Promise<TWord> {
    const response = await fetch(`${host}/words/${id}`);
    const content: TWord = await response.json();
    return content;
  }

  // Users
  async getUser(id: string, token: string): Promise<TUser> {
    const rawResponse = await fetch(`${host}/users/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const content: TUser = await rawResponse.json();
    return content;
  };

  async createUser(user: TUser) {
    const rawResponse = await fetch(`${host}/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    const content: TUser = await rawResponse.json();
    return content;
  };

  async updateUser(id: string, user: TUser, token: string) {
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
    return content;
  };

  async deleteUser(id: string, token: string) {
    const rawResponse = await fetch(`${host}/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const content = await rawResponse.status;
    return content;
  };

  async getNewToken(id: string, token: string) {
    const rawResponse = await fetch(`${host}/users/${id}/tokens`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const content = await rawResponse.json();
    return content;
  };

  // Login
  async loginUser(user: TUser) {
    const rawResponse = await fetch(`${host}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    const content: TAuthResponse = await rawResponse.json();
    return content;
  };

  // Users/Words
  async getUserWords(id: string, token: string) {
    const rawResponse = await fetch(`${host}/users/${id}/words`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const content = await rawResponse.json();
    return content;
  };

  async createUserWord(id: string, wordId: string, word: any, token: string) {
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
    return content;
  };

  async updateUserWord(id: string, wordId: string, word: any, token: string) {
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
    return content;
  };

  async deleteUserWord(id: string, wordId: string, token: string) {
    const rawResponse = await fetch(`${host}/users/${id}/words/${wordId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const content = await rawResponse.json();
    return content;
  };

  async getUserWordsById(id: string, wordId: string, token: string) {
    const rawResponse = await fetch(`${host}/users/${id}/words/${wordId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const content = await rawResponse.json();
    return content;
  };

  async getUserStatistics(id: string, token: string): Promise<TUserStatistic> {
    const rawResponse = await fetch(`${host}/users/${id}/statistics`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const content: TUserStatistic = await rawResponse.json();
    return content;
  };

  async upsertUserStatistics(id: string, stat: TUserStatistic, token: string) {
    const rawResponse = await fetch(`${host}/users/${id}/statistics`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(stat)
    });
    const content = await rawResponse.json();
    return content;
  };

  async getUserSetting(id: string, token: string): Promise<TUserSetting> {
    const rawResponse = await fetch(`${host}/users/${id}/settings`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const content: TUserSetting = await rawResponse.json();
    return content;
  };

  async upsertUserSetting(id: string, stat: TUserSetting, token: string) {
    const rawResponse = await fetch(`${host}/users/${id}/settings`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(stat)
    });
    const content = await rawResponse.json();
    return content;
  };

}

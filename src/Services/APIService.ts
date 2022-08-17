import { IAgrQerry } from "../Interfaces/Interfaces";
import { TAuthResponse, TUser, TUserSetting, TUserStatistic, TWord } from "../Interfaces/Types";


export default class APIService {
  private readonly host: string;
  constructor(host: string) {
    this.host = host;
  }
  // Words
  async getWords(page = 0, group = 0): Promise<TWord[]> {
    const response = await fetch(`${this.host}/words?group=${group}&page=${page}`);
    return response.json();
  }

  async getWord(id: string): Promise<TWord> {
    const response = await fetch(`${this.host}/words/${id}`);
    const content: TWord = await response.json();
    return content;
  }

  // Users
  async getUser(userId: string, token: string): Promise<TUser> {
    const rawResponse = await fetch(`${this.host}/users/${userId}`, {
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
    const rawResponse = await fetch(`${this.host}/users`, {
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

  async updateUser(userId: string, user: TUser, token: string) {
    const rawResponse = await fetch(`${this.host}/users/${userId}`, {
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

  async deleteUser(userId: string, token: string) {
    const rawResponse = await fetch(`${this.host}/users/${userId}`, {
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

  async getNewToken(userId: string, token: string) {
    const rawResponse = await fetch(`${this.host}/users/${userId}/tokens`, {
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
    const rawResponse = await fetch(`${this.host}/signin`, {
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
  async getUserWords(userId: string, token: string) {
    const rawResponse = await fetch(`${this.host}/users/${userId}/words`, {
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

  async createUserWord(userId: string, wordId: string, word: any, token: string) {
    const rawResponse = await fetch(`${this.host}/users/${userId}/words/${wordId}`, {
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

  async updateUserWord(userId: string, wordId: string, word: any, token: string) {
    const rawResponse = await fetch(`${this.host}/users/${userId}/words/${wordId}`, {
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

  async deleteUserWord(userId: string, wordId: string, token: string) {
    const rawResponse = await fetch(`${this.host}/users/${userId}/words/${wordId}`, {
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

  async getUserWordsById(userId: string, wordId: string, token: string) {
    const rawResponse = await fetch(`${this.host}/users/${userId}/words/${wordId}`, {
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

  async getUserStatistics(userId: string, token: string): Promise<TUserStatistic> {
    const rawResponse = await fetch(`${this.host}/users/${userId}/statistics`, {
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

  async upsertUserStatistics(userId: string, stat: TUserStatistic, token: string) {
    const rawResponse = await fetch(`${this.host}/users/${userId}/statistics`, {
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

  async getUserSetting(userId: string, token: string): Promise<TUserSetting> {
    const rawResponse = await fetch(`${this.host}/users/${userId}/settings`, {
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

  async upsertUserSetting(userId: string, stat: TUserSetting, token: string) {
    const rawResponse = await fetch(`${this.host}/users/${userId}/settings`, {
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

  async getAgrWordById(userId: string, wordId: string, token: string): Promise<TWord> {
    const rawResponse = await fetch(`${this.host}/users/${userId}/aggregatedWords/${wordId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const content: TWord = await rawResponse.json();
    return content;
  };

  async getAgrWord(userId: string, token: string, qerry?: IAgrQerry) {
    const base = `${this.host}/users/${userId}/aggregatedWords/`
    let qerryStr = '';
    let flag = false;
    if (qerry) qerryStr = `?`
    if (qerry?.page) {
      if (!flag) {
        flag = true
        qerryStr += `page=${qerry?.page}`;
      } else qerryStr += `&page=${qerry?.page}`;
    }
    if (qerry?.group) {
      if (!flag) {
        flag = true
        qerryStr += `group=${qerry?.group}`;
      } else qerryStr += `&group=${qerry?.group}`;
    }
    if (qerry?.wordsPerPage) {
      if (!flag) {
        flag = true
        qerryStr += `wordsPerPage=${qerry?.wordsPerPage}`;
      } else qerryStr += `&wordsPerPage=${qerry?.wordsPerPage}`;
    }
    if (qerry?.filter) {
      if (!flag) {
        flag = true
        qerryStr += `filter=${qerry?.filter}`;
      } else qerryStr += `&filter=${qerry?.filter}`;
    }

    const rawResponse = await fetch(`${base}${qerryStr}`, {
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
}

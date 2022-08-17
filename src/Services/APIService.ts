import { IAgrQerry } from "../Interfaces/Interfaces";
import { TUser, TUserSetting, TUserStatistic, TWord } from "../Interfaces/Types";
import { host } from "../config";


export default class APIService {
  // Words
  static async getWords(page = 0, group = 0): Promise<TWord[]> {
    try {
      const response = await fetch(`${host}/words?group=${group}&page=${page}`);
      return response.json();
    } catch (error) {
      console.error(error);
      throw new Error("Ошибка запроса getWords");
    }
  }

  static async getWord(id: string): Promise<TWord> {
    const response = await fetch(`${host}/words/${id}`);
    return await response.json();
  }

  // Users
  static async getUser(userId: string, token: string): Promise<TUser> {
    const rawResponse = await fetch(`${host}/users/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return await rawResponse.json();
  };

  static async createUser(user: TUser) {
    const rawResponse = await fetch(`${host}/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    return await rawResponse.json();
  };

  static async updateUser(userId: string, user: TUser, token: string) {
    const rawResponse = await fetch(`${host}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    return await rawResponse.json();
  };

  static async deleteUser(userId: string, token: string) {
    const rawResponse = await fetch(`${host}/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return await rawResponse.json();
  };

  static async getNewToken(userId: string, token: string) {
    const rawResponse = await fetch(`${host}/users/${userId}/tokens`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return await rawResponse.json();
  };

  // Login
  static async loginUser(user: TUser) {
    const rawResponse = await fetch(`${host}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    return await rawResponse.json();
  };

  // Users/Words
  static async getUserWords(userId: string, token: string) {
    const rawResponse = await fetch(`${host}/users/${userId}/words`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return await rawResponse.json();
  };

  static async createUserWord(userId: string, wordId: string, word: any, token: string) {
    const rawResponse = await fetch(`${host}/users/${userId}/words/${wordId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(word)
    });
    return await rawResponse.json();
  };

  static async updateUserWord(userId: string, wordId: string, word: any, token: string) {
    const rawResponse = await fetch(`${host}/users/${userId}/words/${wordId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(word)
    });
    return await rawResponse.json();
  };

  static async deleteUserWord(userId: string, wordId: string, token: string) {
    const rawResponse = await fetch(`${host}/users/${userId}/words/${wordId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return await rawResponse.json();
  };

  static async getUserWordsById(userId: string, wordId: string, token: string) {
    const rawResponse = await fetch(`${host}/users/${userId}/words/${wordId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return await rawResponse.json();
  };

  static async getUserStatistics(userId: string, token: string): Promise<TUserStatistic> {
    const rawResponse = await fetch(`${host}/users/${userId}/statistics`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return await rawResponse.json();
  };

  static async upsertUserStatistics(userId: string, stat: TUserStatistic, token: string) {
    const rawResponse = await fetch(`${host}/users/${userId}/statistics`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(stat)
    });
    return await rawResponse.json();
  };

  static async getUserSetting(userId: string, token: string): Promise<TUserSetting> {
    const rawResponse = await fetch(`${host}/users/${userId}/settings`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return await rawResponse.json();
  };

  static async upsertUserSetting(userId: string, stat: TUserSetting, token: string) {
    const rawResponse = await fetch(`${host}/users/${userId}/settings`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(stat)
    });
    return await rawResponse.json();
  };

  static async getAgrWordById(userId: string, wordId: string, token: string): Promise<TWord> {
    const rawResponse = await fetch(`${host}/users/${userId}/aggregatedWords/${wordId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return await rawResponse.json();
  };

  static async getAgrWord(userId: string, token: string, qerry?: IAgrQerry) {
    const base = `${host}/users/${userId}/aggregatedWords/`
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
    return await rawResponse.json();
  };
}

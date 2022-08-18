import { IAgrParams, IResponse } from '../Interfaces/Interfaces';
import { TAgrWordById, TAuthResponse, TUser, TUserSetting, TUserStatistic, TWord } from '../Interfaces/Types';
import { HOST } from '../config/index';

export default class APIService {
  // Words
  static async getWords(page = 0, group = 0): Promise<IResponse<TWord[]> | null> {
    try {
      const response = await fetch(`${HOST}/words?group=${group}&page=${page}`);
      return {
        status: response.status,
        data: await response.json()
      }
    } catch (error) {
      console.error(`getWords ${error}`);
      return null;
    }
  }

  static async getWord(id: string): Promise<IResponse<TWord> | null> {
    try {
      const response = await fetch(`${HOST}/words/${id}`);
      return {
        status: response.status,
        data: await response.json()
      }
    } catch (error) {
      console.error(`getWord ${error}`);
      return null;
    }
  }

  // Users
  static async getUser(userId: string, token: string): Promise<IResponse<TUser> | null> {
    try {
      const rawResponse = await fetch(`${HOST}/users/${userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      return {
        status: rawResponse.status,
        data: await rawResponse.json()
      }
    } catch (error) {
      console.error(`getUser ${error}`);
      return null;
    }
  }

  static async createUser(user: TUser): Promise<IResponse<TUser> | null> {
    try {
      const rawResponse = await fetch(`${HOST}/users`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      return {
        status: rawResponse.status,
        data: await rawResponse.json()
      }
    } catch (error) {
      console.error(`createUser ${error}`);
      return null;
    }
  }

  static async updateUser(userId: string, user: TUser, token: string): Promise<IResponse<TUser> | null> {
    try {
      const rawResponse = await fetch(`${HOST}/users/${userId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      return {
        status: rawResponse.status,
        data: await rawResponse.json()
      }
    } catch (error) {
      console.error(`updateUser ${error}`);
      return null;
    }
  }

  static async deleteUser(userId: string, token: string): Promise<number | null> {
    try {
      const rawResponse = await fetch(`${HOST}/users/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      return rawResponse.status;
    } catch (error) {
      console.error(`deleteUser ${error}`);
      return null;
    }
  }

  static async getNewToken(userId: string, token: string): Promise<IResponse<TAuthResponse> | null> {
    try {
      const rawResponse = await fetch(`${HOST}/users/${userId}/tokens`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      return {
        status: rawResponse.status,
        data: await rawResponse.json()
      }
    } catch (error) {
      console.error(`getNewToken ${error}`);
      return null;
    }
  }

  // Login
  static async loginUser(user: TUser): Promise<IResponse<TAuthResponse> | null>  {
    try {
      const rawResponse = await fetch(`${HOST}/signin`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      return {
        status: rawResponse.status,
        data: await rawResponse.json()
      }
    } catch (error) {
      console.error(`loginUser ${error}`);
      return null;
    }
  }

  // Users/Words
  static async getUserWords(userId: string, token: string) {
    try {
      const rawResponse = await fetch(`${HOST}/users/${userId}/words`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      return {
        status: rawResponse.status,
        data: await rawResponse.json()
      }
    } catch (error) {
      console.error(`getUserWords ${error}`);
      return null;
    }
  }

  static async createUserWord(userId: string, wordId: string, word: any, token: string) {
    try {
      const rawResponse = await fetch(`${HOST}/users/${userId}/words/${wordId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(word),
      });
      return {
        status: rawResponse.status,
        data: await rawResponse.json()
      }
    } catch (error) {
      console.error(`createUserWord ${error}`);
      return null;
    }
  }

  static async updateUserWord(userId: string, wordId: string, word: any, token: string) {
    try {
      const rawResponse = await fetch(`${HOST}/users/${userId}/words/${wordId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(word),
      });
      return {
        status: rawResponse.status,
        data: await rawResponse.json()
      }
    } catch (error) {
      console.error(`updateUserWord ${error}`);
      return null;
    }
  }

  static async deleteUserWord(userId: string, wordId: string, token: string): Promise<number | null> {
    try {
      const rawResponse = await fetch(`${HOST}/users/${userId}/words/${wordId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      return rawResponse.status;
    } catch (error) {
      console.error(`deleteUserWord ${error}`);
      return null;
    }
  }

  static async getUserWordsById(userId: string, wordId: string, token: string) {
    try {
      const rawResponse = await fetch(`${HOST}/users/${userId}/words/${wordId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      return {
        status: rawResponse.status,
        data: await rawResponse.json()
      }
    } catch (error) {
      console.error(`getUserWordsById ${error}`);
      return null;
    }
  }

  static async getUserStatistics(userId: string, token: string): Promise<IResponse<TUserStatistic> | null> {
    try {
      const rawResponse = await fetch(`${HOST}/users/${userId}/statistics`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      return {
        status: rawResponse.status,
        data: await rawResponse.json()
      }
    } catch (error) {
      console.error(`getUserStatistics ${error}`);
      return null;
    }
  }

  static async upsertUserStatistics(userId: string, stat: TUserStatistic, token: string): Promise<IResponse<TUserStatistic> | null> {
    try {
      const rawResponse = await fetch(`${HOST}/users/${userId}/statistics`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(stat),
      });
      return {
        status: rawResponse.status,
        data: await rawResponse.json()
      }
    } catch (error) {
      console.error(`upsertUserStatistics ${error}`);
      return null;
    }
  }

  static async getUserSetting(userId: string, token: string): Promise<IResponse<TUserSetting> | null> {
    try {
      const rawResponse = await fetch(`${HOST}/users/${userId}/settings`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      return {
        status: rawResponse.status,
        data: await rawResponse.json()
      }
    } catch (error) {
      console.error(`getUserSetting ${error}`);
      return null;
    }
  }

  static async upsertUserSetting(userId: string, stat: TUserSetting, token: string): Promise<IResponse<TUserSetting> | null> {
    try {
      const rawResponse = await fetch(`${HOST}/users/${userId}/settings`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(stat),
      });
      return {
        status: rawResponse.status,
        data: await rawResponse.json()
      };
    } catch (error) {
      console.error(`upsertUserSetting ${error}`);
      return null;
    }
  }

  static async getAgrWordById(userId: string, wordId: string, token: string): Promise<IResponse<TAgrWordById> | null> {
    try {
      const rawResponse = await fetch(`${HOST}/users/${userId}/aggregatedWords/${wordId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      return {
        status: rawResponse.status,
        data: await rawResponse.json()
      };
    } catch (error) {
      console.error(`getAgrWordById ${error}`);
      return null;
    }
  }

  static async getAgrWord(userId: string, token: string, params?: IAgrParams) {
    try {
      const base = `${HOST}/users/${userId}/aggregatedWords`;
      const buf = params ? Object.entries(params).map((item) => [`${item[0]}=${item[1]}`]) : [];
      const paramsStr = buf[0] ? `?${buf.join('&')}` : '';
      const rawResponse = await fetch(`${base}${paramsStr}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      return {
        status: rawResponse.status,
        data: await rawResponse.json()
      };
    } catch (error) {
      console.error(`getAgrWord Error`);
      return null;
    }
  }
}

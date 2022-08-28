import { IAgrParams, IResponse } from '../Interfaces/Interfaces';
import { TAggregatedWord, TAggregatedWords, TAuthResponse, TUser, TUserSetting, TUserStatistic, TUserWord, TWord } from '../Interfaces/Types';
import { HOST } from '../config/index';
import { logError } from '../utils';

export default abstract class APIService {
  // Words
  static async getWords(page = 0, group = 0): Promise<IResponse<TWord[]> | null> {
    try {
      const response = await fetch(`${HOST}/words?group=${group}&page=${page}`);
      const data = await response.json();
      return {
        status: response.status,
        data
      };
    } catch (error) {
      logError('APIService.getWords', error);
      return null;
    }
  }

  static async getWord(id: string): Promise<IResponse<TWord> | null> {
    try {
      const response = await fetch(`${HOST}/words/${id}`);
      const data = await response.json();
      return {
        status: response.status,
        data
      };
    } catch (error) {
      logError('APIService.getWord', error);
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
      const data = await rawResponse.json();
      return {
        status: rawResponse.status,
        data
      };
    } catch (error) {
      logError('APIService.getUser', error);
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
      const data = await rawResponse.json();
      return {
        status: rawResponse.status,
        data
      };
    } catch (error) {
      logError('APIService.createUser', error);
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
      const data = await rawResponse.json();
      return {
        status: rawResponse.status,
        data
      };
    } catch (error) {
      logError('APIService.updateUser', error);
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
      logError('APIService..deleteUser', error);
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
      const data = await rawResponse.json();
      return {
        status: rawResponse.status,
        data
      };
    } catch (error) {
      logError('APIService.getNewToken', error);
      return null;
    }
  }

  // Login
  static async loginUser(user: TUser): Promise<IResponse<TAuthResponse> | null> {
    try {
      const rawResponse = await fetch(`${HOST}/signin`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const data = await rawResponse.json();
      return {
        status: rawResponse.status,
        data
      };
    } catch (error) {
      logError('APIService.loginUser', error);
      return null;
    }
  }

  // Users/Words
  static async getUserWords(userId: string, token: string): Promise<IResponse<TUserWord[]> | null> {
    try {
      const rawResponse = await fetch(`${HOST}/users/${userId}/words`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const data = await rawResponse.json();
      return {
        status: rawResponse.status,
        data
      };
    } catch (error) {
      logError('APIService.getUserWords', error);
      return null;  
    }
  }

  static async createUserWord(
    userId: string,
    wordId: string,
    word: TUserWord,
    token: string
  ): Promise<IResponse<TUserWord> | null> {
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
      const data = await rawResponse.json();
      return {
        status: rawResponse.status,
        data
      };
    } catch (error) {
      logError('APIService.createUserWord', error);
      return null;
    }
  }

  static async updateUserWord(
    userId: string,
    wordId: string,
    word: TUserWord,
    token: string
  ): Promise<IResponse<TUserWord> | null> {
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
      const data = await rawResponse.json();
      return {
        status: rawResponse.status,
        data
      };
    } catch (error) {
      logError('APIService.updateUserWord', error);
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
      logError('APIService.deleteUserWord', error);
      return null;
    }
  }

  static async getUserWordsById(userId: string, wordId: string, token: string): Promise<IResponse<TUserWord> | null> {
    try {
      const rawResponse = await fetch(`${HOST}/users/${userId}/words/${wordId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const data = await rawResponse.json();
      return {
        status: rawResponse.status,
        data
      };
    } catch (error) {
      logError('APIService.getUserWordsById', error);
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
      const data = await rawResponse.json();
      return {
        status: rawResponse.status,
        data
      };
    } catch (error) {
      logError('APIService.getUserStatistics', error);
      return null;
    }
  }

  static async upsertUserStatistics(
    userId: string,
    stat: TUserStatistic,
    token: string
  ): Promise<IResponse<TUserStatistic> | null> {
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
      const data = await rawResponse.json();
      return {
        status: rawResponse.status,
        data
      };
    } catch (error) {
      logError('APIService.upsertUserStatistics', error);
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
      const data = await rawResponse.json();
      return {
        status: rawResponse.status,
        data
      };
    } catch (error) {
      logError('APIService.getUserSetting', error);
      return null;
    }
  }

  static async upsertUserSetting(
    userId: string,
    stat: TUserSetting,
    token: string
  ): Promise<IResponse<TUserSetting> | null> {
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
      const data = await rawResponse.json();
      return {
        status: rawResponse.status,
        data
      };
    } catch (error) {
      logError('APIService.upsertUserSetting', error);
      return null;
    }
  }

  static async getAgrWordById(
    userId: string,
    wordId: string,
    token: string
  ): Promise<IResponse<TAggregatedWord> | null> {
    try {
      const rawResponse = await fetch(`${HOST}/users/${userId}/aggregatedWords/${wordId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const data = await rawResponse.json() as TAggregatedWord[];
      return {
        status: rawResponse.status,
        data: data[0]
      };
    } catch (error) {
      logError('APIService.getAgrWordById', error);
      return null;
    }
  }

  static async getAgrWords(
    userId: string,
    token: string,
    params?: IAgrParams
  ): Promise<IResponse<TAggregatedWords[]> | null> {
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
      const data = await rawResponse.json() as TAggregatedWords[];
      return {
        status: rawResponse.status,
        data
      };
    } catch (error) {
      logError('APIService.getAgrWord', error);
      return null;
    }
  }
}

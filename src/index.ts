import { App } from './App';
import  APIService  from './Services/APIService';
import './style.scss';

const host = 'https://app-rsslang.herokuapp.com'; // http://localhost:8075/';
new App(document.body).render();
//getWord(`5e9f5ee35eb9e72bc21af4a5`).then((word)=> console.log(word));
//createUser({ "email": "hell@user.com", "password": "12345678" });
//loginUser({ "email": "hell@user.com", "password": "12345678" });
//getUser("62fb597ab24caa0016fc64ea", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZmI1OTdhYjI0Y2FhMDAxNmZjNjRlYSIsImlhdCI6MTY2MDY0MDM1NywiZXhwIjoxNjYwNjU0NzU3fQ.f1IJCYbzPHL2giXwD5WGzGZizNoM_du5FbVbAd-zaNw")
/*
getUserWords("62fb597ab24caa0016fc64ea",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZmI1OTdhYjI0Y2FhMDAxNmZjNjRlYSIsImlhdCI6MTY2MDY1NDkxNSwiZXhwIjoxNjYwNjY5MzE1fQ.lHtygKLAMH30pfn9VoX0lX-qE5YUrF2aUlVkh17iAMw" );
getUserWordsById("62fb597ab24caa0016fc64ea",
"5e9f5ee35eb9e72bc21af4a5",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZmI1OTdhYjI0Y2FhMDAxNmZjNjRlYSIsImlhdCI6MTY2MDY1NDkxNSwiZXhwIjoxNjYwNjY5MzE1fQ.lHtygKLAMH30pfn9VoX0lX-qE5YUrF2aUlVkh17iAMw"
)
*/
const api = new APIService(host);
//api.loginUser({ "email": "hell@user.com", "password": "12345678" });
api.getUserStatistics(
  '62fb597ab24caa0016fc64ea',
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZmI1OTdhYjI0Y2FhMDAxNmZjNjRlYSIsImlhdCI6MTY2MDcxOTcxMSwiZXhwIjoxNjYwNzM0MTExfQ.5rjOaQutPHmU9a0NslBdKbvdpQsK1kTaIRhsYHf4UaU"
)

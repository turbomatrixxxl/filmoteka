export default {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NWIyM2Q3ZGY4MTY5YTRmYTJlNmY5YjAzYjZmZGY1OCIsInN1YiI6IjY2NjQ0ODdiM2ZiNTViYmExODA5ZWQ5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KeSc5hLobWtGaw46ZiucUM4d-MwlPh_Hd_I9wfwm5gw',
  },
  // url Api ar trebui sa il punem string gol https://api.themoviedb.org/3/configuration
  urlApi: 'https://api.themoviedb.org/3/configuration',
  query: '',
  page: 1,
  keyApi: '75b23d7df8169a4fa2e6f9b03b6fdf58',
  language: 'en-US',
  currentRequest: '',

  fetchReturn(url, options) {
    return fetch(url, options)
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.error('error:' + err));
  },
};
const heroLoad = key => {
try {
    const heroSerializedKey = localStorage.getItem(key);
    return heroSerializedKey === null ? undefined : JSON.parse(heroSerializedKey);
} catch (error) {
    console.log('Get state error:', error);
    };
}
export { heroLoad };

class MovieJs {
  constructor({ headers, baseUrl }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _resToJSON(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Произошла ошибка");
  }

  getInitialMovie() {
    return fetch(`${this._baseUrl}`, {
      method: "GET",
      headers: this._headers,
    }).then(this._resToJSON);
  }
}

const movieJs = new MovieJs({
  headers: {
    "Content-Type": "Application/JSON",
  },
  baseUrl: process.env.REACT_APP_MOVIE_API_URL,
});

export default movieJs;

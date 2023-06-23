class MainApi {
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

  getInitialLikeMovie() {
    return fetch(`${this._baseUrl}movies`, {
      headers: this._headers,
    })
      .then(this._resToJSON)
      .then((respawns) => {
        return respawns.data;
      });
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: this._headers,
    })
      .then(this._resToJSON)
      .then((respawns) => {
        return respawns.data;
      });
  }

  addLikeMovie(movie) {
    return fetch(`${this._baseUrl}movies`, {
      method: "POST",
      headers: this._headers,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        trailerLink: movie.trailerLink,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
      }),
    }).then(this._resToJSON);
  }

  removeLikeMovie(movieId) {
    return fetch(`${this._baseUrl}movies/${movieId}`, {
      method: "DELETE",
      headers: this._headers,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });
  }

  setUserInfo(name, email) {
    return fetch(`${this._baseUrl}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    })
      .then(this._resToJSON)
      .then((respawns) => {
        return respawns.data;
      });
  }

  changeAuthToken(token) {
    this._headers["authorization"] = `Bearer ${token}`;
  }

  signUp(name, email, password) {
    return fetch(`${this._baseUrl}signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    }).then(this._resToJSON);
  }

  checkJwtToken(token) {
    return fetch(`${this._baseUrl}users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._resToJSON);
  }

  signIn(email, password) {
    return fetch(`${this._baseUrl}signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then(this._resToJSON);
  }
}

const mainApi = new MainApi({
  headers: {
    "Content-Type": "Application/JSON",
  },
  baseUrl: process.env.REACT_APP_API_URL,
});

export default mainApi;

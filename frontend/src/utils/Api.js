class Api {
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
    return fetch(`${this._baseUrl}cards`, {
      headers: this._headers,
    })
      .then(this._resToJSON)
       .then((respawns) => {return respawns.data})
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: this._headers,
    }).then(this._resToJSON)
    .then((respawns) => {return respawns.data})
  }

  addLikeMovie(id) {
    return fetch(
      `${this._baseUrl}cards/` + id + "/likes",
      {
        method: "PUT",
        headers: this._headers,
      }
    )
      .then(this._resToJSON)
      .then((respawns) => {return respawns.data})
  }

  removeLikeMovie(id) {
    return fetch(
      `${this._baseUrl}cards/` + id + "/likes",
      {
        method: "DELETE",
        headers: this._headers,
      }
    )
      .then(this._resToJSON)
      .then((respawns) => {return respawns.data})
  }

  setUserInfo(formvalue) {
    return fetch(`${this._baseUrl}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: formvalue.name,
        email: formvalue.email,
      }),
    })
    .then(this._resToJSON)
    .then((respawns) => {return respawns.data});
  }

  changeAuthToken(token) {
    this._headers["authorization"] = `Bearer ${token}`;
  }
}

const api = new Api({
  headers: {
    "Content-Type": "Application/JSON",
  },
  baseUrl: process.env.JWT_SECRET,
});

export default api;

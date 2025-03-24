export default class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _isResponseOk(response) {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(`Ошибка: ${response.status}`);
        }
    }

     getInitialCards() {
        return fetch(`https://api.termoblok.ru/data/blogCards`, {
            headers: this._headers,
        })
        .then((response) => {
            return this._isResponseOk(response);
        })
    }


    getNews() {
      return fetch(`https://api.termoblok.ru/news`, {
          headers: this._headers,
      })
      .then((response) => {
          return this._isResponseOk(response);
      })
  }

    getInitiatPartners() {
      return fetch(`https://api.termoblok.ru/data/partners`, {
          headers: this._headers,
      })
      .then((response) => {
          return this._isResponseOk(response);
      })

  }


    sendCallForm(formDataJson) {
        return fetch(`${this._baseUrl}/forms/small-form`, {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataJson),
            isBase64Encoded: false
        })
        .then((response) => {
            console.log(response);
            return this._isResponseOk(response);
        })
    }

    sendBigForm(formDataJson) {
      return fetch(`${this._baseUrl}/forms/big-form`, {
        method : 'POST',
        headers: {

          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataJson),
        //isBase64Encoded: false
    })
    .then((response) => {
        return this._isResponseOk(response);
    })
  }
}

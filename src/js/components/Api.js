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
        return fetch(`https://functions.yandexcloud.net/d4eivnnhtfhet7j0nvoh`, {
            headers: this._headers,
        })
        .then((response) => {
            return this._isResponseOk(response);
        })
    }

    sendCallForm(formDataJson) {
        return fetch(`${this._baseUrl}`, {
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
      return fetch(`${this._baseUrl}`, {
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

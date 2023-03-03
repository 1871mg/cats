class CatsApi {
    constructor(apiName) {
        this.url = `https://cats.petiteweb.dev/api/single/${apiName}`
    }

    getAllCats() {
        return fetch(`${this.url}/show`)
    }

    getCurrentCat(id) {
        return fetch(`${this.url}/show/${id}`)
    }
}

const dbName = '1871mg';
const api = new CatsApi(dbName);


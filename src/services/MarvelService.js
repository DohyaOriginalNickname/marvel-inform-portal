export default class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    _apiKey = 'apikey=143cce2e4de36b8f206ef4882e97f08b'
    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        } 

        return await res.json()
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`)
        return res.data.results.map(this._transformCharacter)
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`)
        return this._transformCharacter(res.data.results[0])
    }

    _transformCharacter = (res) => {
        return {
            id: res.id,
            name: res.name,
            description: res.description ? res.description.slice(0, 175) + '...' : "At the moment the character has no description",
            thumbnail: res.thumbnail.path + `.${res.thumbnail.extension}` ,
            homePage: res.urls[0].url,
            wiki: res.urls[1].url,
            comics: res.comics.items.length !== 0 ? res.comics.items.slice(0,9) : "There is no comics with this character"
        }
    }
}

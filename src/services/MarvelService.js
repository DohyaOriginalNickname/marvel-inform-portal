import { useHttp } from "../hooks/http.hook"


const useMarvelService = () => {

    const {loading, request, error, clearError} = useHttp()

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    const _apiKey = 'apikey=143cce2e4de36b8f206ef4882e97f08b'
    const _baseOffset = 210
    

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformCharacter)
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)
        return _transformCharacter(res.data.results[0])
    }

    const _transformCharacter = (res) => {
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

    return {loading, error, getAllCharacters, getCharacter, clearError}
}

export default useMarvelService
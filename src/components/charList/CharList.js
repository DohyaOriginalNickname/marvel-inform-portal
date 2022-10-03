import { Component } from 'react';

import ErrorMessage from '../ErrorMessage/ErrorMessage'
import MarvelService from '../../services/MarvelService';
import './charList.scss';

class CharList extends Component {
    state = {
        dataList: [],
        charList: [],
        error: false,
        newItemLoading: false,
        offset: 210
    }
    marvelService = new MarvelService()

    componentDidMount(){
        this.onRequestChar()
    }

    onRequestChar = (offset) => {
        this.onCharLoading()
        this.marvelService.getAllCharacters(offset)
            .then(res => this.setState(({dataList, offset}) => ({
                dataList: [...dataList, ...res],
                offset: offset + 9
            })))
            .then(this.createUiElements)
            .catch(this.onError)
    }

    onCharLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onError = () => {
        this.setState({error: true})
    }

    createUiElements = () => {
        this.setState({
            charList:this.state.dataList.map((item) => {
                let objectFit = 'cover'
                if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                    objectFit = 'unset'
                }
                return (
                    <li className="char__item" key={item.id} onClick={() => this.props.onCharSelected(item.id)}>
                        <img src={item.thumbnail} alt={item.name} style={{objectFit}}/>
                        <div className="char__name">{item.name}</div>
                    </li>
                )
            }),
            newItemLoading: false
        })
    }

    render() {
        const {charList, error, newItemLoading, offset} = this.state
        const errorMessage = error ? <ErrorMessage/> : null
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {errorMessage}
                    {charList}
                </ul>
                <button 
                    className="button button__main button__long"
                    disabled = {newItemLoading}
                    onClick = {() => this.onRequestChar(offset)}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;
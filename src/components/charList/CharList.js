import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import './charList.scss';

class CharList extends Component {
    state = {
        dataList: [],
        charList: [],
    }
    marvelService = new MarvelService()

    componentDidMount(){
        this.marvelService.getAllCharacters()
            .then(res => this.setState({dataList: res}))
            .then(this.createUiElements)
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
            })
        })
    }

    render() {
        const {charList,} = this.state
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {charList}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;
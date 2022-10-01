import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';


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
            charList:this.state.dataList.map((item, id) => {
                return (
                    <li className="char__item" key={id}>
                        <img src={item.thumbnail} alt="abyss"/>
                        <div className="char__name">{item.name}</div>
                    </li>
                )
            })
        })
    }

    render() {
        const {charList} = this.state
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
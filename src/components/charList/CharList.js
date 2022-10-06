import { Component } from 'react';
import PropTypes from 'prop-types'

import ErrorMessage from '../ErrorMessage/ErrorMessage'
import MarvelService from '../../services/MarvelService';
import './charList.scss';

class CharList extends Component {
    state = {
        dataList: [],
        charList: [],
        error: false,
        newItemLoading: false,
        offset: 210,
        charEnded: false
    }   

    arrayOfRefs = []

    marvelService = new MarvelService()

    componentDidMount(){
        this.onRequestChar()
    }

    onRequestChar = (offset) => {
        this.onCharLoading()
        this.marvelService.getAllCharacters(offset)
            .then(res => {
                let ended = false
                if(res.length < 9){
                    ended = true
                }
                this.setState(({dataList, offset}) => ({
                    dataList: [...dataList, ...res],
                    offset: offset + 9,
                    charEnded: ended
                })
            )})
            .then(this.createUiElements)
            .catch(this.onError)
    }

    onCharLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    function = (id,numRef) => {
        this.props.onCharSelected(id)

        this.arrayOfRefs.forEach(item => item.classList.remove('char__item_selected'))
        this.arrayOfRefs[numRef].classList.add('char__item_selected')
        this.arrayOfRefs[numRef].focus()
    }

    setRef = (ref) => {
        this.arrayOfRefs.push(ref)
    }

    onError = () => {
        this.setState({error: true})
    }

    createUiElements = () => {
        this.setState({
            charList:this.state.dataList.map((item, numIndex) => {
                let objectFit = 'cover'
                if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                    objectFit = 'unset'
                }
                return (
                    <li 
                        className="char__item" 
                        tabIndex={0}
                        ref={this.setRef} 
                        key={item.id} 
                        onClick = {() => this.function(item.id, numIndex)}
                        onKeyDown = {(e) => {
                            if (e.key === ' ' || e.key === "Enter") {
                                this.function(item.id, numIndex)
                            }
                        }}
                    >
                        <img src={item.thumbnail} alt={item.name} style={{objectFit}}/>
                        <div className="char__name">{item.name}</div>
                    </li>
                )
            }),
            newItemLoading: false
        })
    }

    render() {
        const {charList, error, newItemLoading, offset, charEnded} = this.state
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
                    style={{'display': charEnded ? 'none': 'block'}}
                    onClick = {() => this.onRequestChar(offset)}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propType = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;
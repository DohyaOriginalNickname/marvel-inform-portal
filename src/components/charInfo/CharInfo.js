import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton'

import useMarvelService from '../../services/MarvelService';
import './charInfo.scss';

const CharInfo = (props) => {
    const [character, setChar] = useState(null)
    // const [loading, setLoading] = useState(false)
    // const [error, setError] = useState(false)

    const {error,loading,getCharacter,clearError} = useMarvelService()

    useEffect(() => {
        updateChar()
    }, [])


    useEffect(() => {
        if (props.charId !== character) {
            updateChar()
        }
    }, [props.charId])

    const updateChar = () => {
        clearError()
        const { charId } = props
        if (!charId) {
            return
        }

        getCharacter(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char)
    }


    const skeleton = character || loading || error ? null : <Skeleton />
    const errorMessage = error ? <ErrorMessage /> : null
    const spinner = loading ? <Spinner /> : null
    const content = !(loading || error || !character) ? <View char={character} /> : null

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({ char }) => {
    const { name, description, thumbnail, homePage, wiki, comics } = char
    let objectFit = 'cover'
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        objectFit = 'unset'
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={{objectFit}}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homePage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {
                    Array.isArray(comics) ? comics.map((item,i) => {
                        return (
                            <li className="char__comics-item" key={i}>
                                {item.name}
                            </li>
                        )
                    }) : comics
                }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;
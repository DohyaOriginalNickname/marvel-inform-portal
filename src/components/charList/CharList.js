import { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types'

import useMarvelService from '../../services/MarvelService';
import setContentForList from '../../utils/setContentForList';

import './charList.scss';

const CharList = (props) => {

    const [dataList, setDataList] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [charEnded, setCharEnded] = useState(false)

    const arrayOfRefs = useRef([])

    const { process, setProcess, error, getAllCharacters } = useMarvelService()

    useEffect(() => {
        RequestChar()
    }, [])

    const RequestChar = (offset) => {
        setNewItemLoading(true)
        getAllCharacters(offset)
            .then((res) => {
                let ended = false
                if (res.length < 9) {
                    ended = true
                }
                setDataList(dataList => dataList.concat(res))
                setOffset(offset => offset + 9)
                setCharEnded(charEnded => ended)
                setNewItemLoading(newItemLoading => false)
            })
            .then(() => setProcess('confirmed'))
    }

    const workWithRef = (id, idRef) => {
        props.onCharSelected(id)

        arrayOfRefs.current.forEach(item => item.classList.remove('char__item_selected'))
        arrayOfRefs.current[idRef].classList.add('char__item_selected')
        arrayOfRefs.current[idRef].focus()
    }

    function renderItems(dataList) {
        const items = dataList.length > 0 ? dataList.map((item, refIndex) => {
            let objectFit = 'cover'
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                objectFit = 'unset'
            }
            return (
                <li
                    className="char__item"
                    tabIndex={0}
                    ref={el => arrayOfRefs.current[refIndex] = el}
                    key={item.id}
                    onClick={() => workWithRef(item.id, refIndex)}
                    onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            workWithRef(item.id, refIndex)
                        }
                    }}
                >
                    <img src={item.thumbnail} alt={item.name} style={{ objectFit }} />
                    <div className="char__name">{item.name}</div>
                </li>
            )
        }) : null

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const elements = useMemo(() => {
        return setContentForList(process, ()=>renderItems(dataList), newItemLoading)
    }, [process])

    return (
        <div className="char__list">
            {elements}
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{ 'display': charEnded ? 'none' : 'block' }}
                onClick={() => RequestChar(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propType = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;
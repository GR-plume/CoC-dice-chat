import { Store } from '../store'
import { useContext } from 'react'
import {SvgDice} from '../svg'

const dice = (roll, max, add = 0) => {
    return [...Array(roll)].map(() => Math.floor(Math.random() * max + 1)).reduce((s, e) => s + e) + add
}

const DiceBtn = props => {
    const { dispatch } = useContext(Store)

    let roll, add = 0
    switch(props.attr){
        case 'str':
        case 'con':
        case 'pow':
        case 'dex':
        case 'app':
            roll = 3
            add = 0
            break
        case 'siz':
        case 'int':
            roll = 2
            add = 6
            break
        case 'edu':
            roll = 3
            add = 3
            break
        default:
            break
    }
        

    const handleClick = () => {
        dispatch({
            type: 'updateAttr',
            attr: props.attr,
            value: {
                ...props.item,
                orig: dice(roll, 6, add)
            }
        })
    }

    return (
        <>
            <button className="c-btn p-diceBtn" onClick={handleClick}>
                <SvgDice />
            </button>
        </>
    )
}

const DiceAll = props => {
    const { dispatch } = useContext(Store)

    const handleClick = () => {
        const arr = [
            {attr: 'str', roll: 3, add: 0},
            {attr: 'con', roll: 3, add: 0},
            {attr: 'pow', roll: 3, add: 0},
            {attr: 'dex', roll: 3, add: 0},
            {attr: 'app', roll: 3, add: 0},
            {attr: 'siz', roll: 2, add: 6},
            {attr: 'int', roll: 2, add: 6},
            {attr: 'edu', roll: 3, add: 3},
        ]
        for(let e of arr){
        dispatch({
                type: 'updateAttr',
                attr: e.attr,
                value: {
                    ...props.item[e.attr],
                    orig: dice(e.roll, 6, e.add)
                }
            })
        }
    }

    return (
        <>
            <button style={{borderRadius: "6px"}} className="c-btn p-diceBtn" onClick={handleClick}>ALL</button>
        </>
    )
}

export { DiceBtn, DiceAll }
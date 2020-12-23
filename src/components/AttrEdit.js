import { useContext } from 'react'
import { Store } from '../store'
import { DiceBtn, DiceAll} from './DiceBtn'

const Row = props => {
    const { dispatch } = useContext(Store)

    const handleInput = (e, v) => {
        if(e.target.value.length > 4){ return }
        dispatch({
            type: 'updateAttr',
            attr: props.attr,
            value: {
                ...props.item,
                [v]: e.target.value
            }
        })
    }

    return (
        <div>
            {!props.disabled && <DiceBtn attr={props.attr} item={props.item} />}
            <span>{props.item.label}</span>
            {/* <span> */}
                <input
                    type="number"
                    style={{width: 50}}
                    onChange={e => handleInput(e, 'orig')}
                    value={props.item.orig}
                    disabled={props.disabled}
                />
                <input
                    type="number"
                    style={{width: 50}}
                    onChange={e => handleInput(e, 'adj')}
                    value={props.item.adj}
                />
                <input
                    style={{width: 50}}
                    value={props.item.sum}
                    disabled
                />
            {/* </span> */}
        </div>
    )
}

const AttrEdit = () => {
    const { state, dispatch } = useContext(Store)

    const createRows = (arr, disabled = false) => {
        return arr.map(e => (<Row key={e} item={{...state.chara[e]}} attr={e} disabled={disabled} />))
    }

    const primary = createRows([
        'str',
        'con',
        'pow',
        'dex',
        'app',
        'siz',
        'int',
        'edu',
    ])

    const secondary = createRows([
        'san',
        'hp',
        'mp',
        'idea',
        'luck',
        'know',
    ], true)

    return (
        <>
            <DiceAll item={state.chara} />
            <div>{primary}</div>
            <div>
                {secondary}
                <div>
                    <span>db</span>
                    <input
                        value={state.chara.db}
                        disabled
                    />
                </div>
            </div>
            <div>
                {
                    state.chara.sanP !== null &&
                    <>
                    <span>SAN値</span>
                    <input
                        type='number'
                        value={state.chara.sanP}
                        onChange={e => {
                            if(e.target.value.length > 4){return}
                            dispatch({type: 'updateSanP', value: e.target.value})
                        }}
                    />
                    </>
                }
            </div>
        </>
    )
}

export default AttrEdit
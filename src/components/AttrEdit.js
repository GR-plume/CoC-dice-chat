import { useContext } from 'react'
import { Store } from '../store'
import { DiceBtn, DiceAll } from './DiceBtn'

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

    const EvenOdd = (() => {
        if(props.index%2 === 0){
            return 'p-attrEditCol-even'
        }
        return ''
    })()

    return (
        <div className="c-pseudoTbl_row">
            {
                !props.disabled &&
                <div className={`p-attrEditCol p-attrEditCol-btnWrap ${EvenOdd}`}>
                <DiceBtn attr={props.attr} item={props.item} />
                </div>
            }
            <div className={`p-attrEditCol p-attrEditCol-name ${EvenOdd}`}>{props.item.label}</div>
                <input
                    type="number"
                    className={`p-attrEditCol p-attrEditCol-num c-textField ${EvenOdd}`}
                    onChange={e => handleInput(e, 'orig')}
                    value={props.item.orig}
                    disabled={props.disabled}
                />
                <input
                    type="number"
                    className={`p-attrEditCol p-attrEditCol-num c-textField ${EvenOdd}`}
                    onChange={e => handleInput(e, 'adj')}
                    value={props.item.adj}
                />
                <input
                    className={`p-attrEditCol p-attrEditCol-num c-textField ${EvenOdd}`}
                    value={props.item.sum}
                    disabled
                />
        </div>
    )
}

const AttrEdit = () => {
    const { state, dispatch } = useContext(Store)

    const createRows = (arr, disabled = false) => {
        return arr.map((e, i) => (<Row key={e} item={{...state.chara[e]}} attr={e} disabled={disabled} index={i} />))
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
        <div className="c-pseudoTbl">
        <div className="c-pseudoTbl_row">
            <DiceAll item={state.chara} />
            <div className="p-skillEditTbl c-pseudoTbl">{primary}</div>
            <div className="p-skillEditTbl c-pseudoTbl">
                {secondary}
                <div className="c-pseudoTbl_row">
                    <div className="p-attrEditCol p-attrEditCol-name p-attrEditCol-even">db</div>
                    <input
                        style={{width: "120px", textAlign: "center"}}
                        className="p-attrEditCol p-attrEditCol-num c-textField"
                        value={state.chara.db}
                        disabled
                    />
                </div>
            {/* <div> */}
                {
                    state.chara.sanP !== null &&
                    <>
                    <div className="c-pseudoTbl_row">
                        <div className="p-attrEditCol p-attrEditCol-name">SAN値</div>
                        <input
                            type="number"
                            style={{width: "120px"}}
                            className="p-attrEditCol p-attrEditCol-num c-textField"
                            value={state.chara.sanP}
                            onChange={e => {
                                if(e.target.value.length > 4){return}
                                dispatch({type: 'updateSanP', value: e.target.value})
                            }}
                        />
                    </div>
                    </>
                }
            </div>
            {/* </div> */}
        </div>
        </div>
        </>
    )
}

export default AttrEdit
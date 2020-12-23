import { Store } from '../store'
import { useContext } from 'react'

const ItemRow = props => {
    const { dispatch } = useContext(Store)

    const handleChange = (e, v) => {
        dispatch({
            type: 'updateItem',
            value: {
                ...props.item,
                [v]: e.target.value
            }
        })
    }

    return (
        <>
            <div>
                <span>アイテム名</span>
                <input type="text" value={props.item.name}   onChange={e => handleChange(e, 'name')} />
                <span>数</span>
                <input type="text" value={props.item.amount} onChange={e => handleChange(e, 'amount')} />
            </div>
            <div>
                <span>詳細</span>
                <textarea value={props.item.detail} onChange={e => handleChange(e, 'detail')} ></textarea>
            </div>
            <button onClick={() => dispatch({type: 'rmItem', id: props.item.id})} >-</button>
        </>
    )
}

const ItemEdit = () => {
    const { state, dispatch } = useContext(Store)
    
    const Items = state.interimItems.map(
        e => (<ItemRow key={e.id} item={e} />)
    )
    return (
        <>
            <button onClick={() => dispatch({type: 'addItem'})} >+</button>
            {Items}
        </>
    )
}

export default ItemEdit
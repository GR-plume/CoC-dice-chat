import { useContext } from 'react'
import { Store } from '../store'

const ProfEdit = () => {
    const { state , dispatch } = useContext(Store)

    const handleChange = (e, key) => {
        dispatch({
            type: 'updateProf',
            key: key,
            value: e.target.value
        })
    }

    return (
        <>
        <div>
            <span>名前</span>
            <input
                type="text"
                value={state.chara.name}
                onChange={e => handleChange(e, 'name')}
            />
        </div>
        <div>
            <span>職業</span>
            <input
                type="text"
                value={state.chara.occupation}
                onChange={e => handleChange(e, 'occupation')}
            />
        </div>
        <div>
            <span>出身</span>
            <input
                type="text"
                value={state.chara.birthplace}
                onChange={e => handleChange(e, 'birthplace')}
            />
        </div>
        <div>
            <span>年齢</span>
            <input
                type="text"
                value={state.chara.age}
                onChange={e => handleChange(e, 'age')}
            />
            <span>性別</span>
            <input
                type="text"
                value={state.chara.sex}
                onChange={e => handleChange(e, 'sex')}
            />
        </div>
        <div>メモ</div>
        <textarea
            value={state.chara.description}
            onChange={e => handleChange(e, 'description')}
        ></textarea>
        </>
    )
}

export default ProfEdit
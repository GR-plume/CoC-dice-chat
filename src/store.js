import React, { useReducer } from 'react'
import reducer from './reducer'
import chara from './state/chara'
import presetSkills from './state/presetSkills'

const timeId = new Date().getTime()
const initialState = {
    chara: {...chara},
    presetSkills: [...presetSkills],
    interimSkills: [{name: '', init: '', occ: '', inte: '', adj: '', sum: 0, id: `orig${'0' + timeId}`}],
    interimItems: [{name: '', amount: '', detail: '', id: `item${'0' + timeId}`}],
}

const Store = React.createContext()

const Provider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return <Store.Provider value={{state, dispatch}}>{children}</Store.Provider>
}

export {Store, Provider}
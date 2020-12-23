import toNum from './toNum'

const subAttrCalc = {}
subAttrCalc.db = s => {
    let str_siz = toNum(s.str.sum) + toNum(s.siz.sum)
    s.db = (
        str_siz <= 12 ? '-1d6' :
        str_siz <= 16 ? '-1d4' :
        str_siz <= 24 ? '+0' :
        str_siz <= 32 ? '+1d4' :
        str_siz <= 40 ? '+1d6' :
        `+${ Math.ceil( ( (str_siz - 40) / 16) ) + 1 }d6`
    )
    return s
}
subAttrCalc.times5 = (s, key, basic) => {
    s[key].orig = toNum(s[basic].sum) * 5
    s[key].sum = toNum(s[key].orig) + toNum(s[key].adj) + toNum(s[key].temp)
    return s
}
subAttrCalc.hp = s => {
    s.hp.orig = Math.ceil( ( toNum(s.con.sum) + toNum(s.siz.sum) ) / 2 )
    s.hp.sum = toNum(s.hp.orig) + toNum(s.hp.adj) + toNum(s.hp.temp)
    return s
}

const timeStamp = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = (('' + (now.getMonth() + 1)).length < 2 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1)
    const date = (('' + now.getDate()).length < 2 ? '0' + now.getDate() : now.getDate())
    const hours = (('' + now.getHours()).length < 2 ? '0' + now.getHours() : now.getHours())
    const minutes = (('' + now.getMinutes()).length < 2 ? '0' + now.getMinutes() : now.getMinutes())
    const seconds = (('' + now.getSeconds()).length < 2 ? '0' + now.getSeconds() : now.getSeconds())
    return `${year}/${month}/${date} ${hours}:${minutes}:${seconds}`
}

const reducer = (state = {}, action) => {
    let _state, index, result, preOccSum, origOccSum, preInteSum, origInteSum, timeText
    switch(action.type){
        case 'updateAttr':
            if(action.attr){
                action.value.sum = toNum(action.value.orig) + toNum(action.value.adj) + toNum(action.value.temp)
                _state = JSON.parse(JSON.stringify(state))
                _state.chara[action.attr] = action.value

                switch(action.attr){
                    case 'str':
                        // update db
                        _state.chara = subAttrCalc.db(_state.chara)
                        return _state
                    case 'con':
                        // update hp
                        _state.chara = subAttrCalc.hp(_state.chara)
                        return _state
                    case 'pow':
                        // update san
                        _state.chara = subAttrCalc.times5(_state.chara, 'san', 'pow')
                        // update luck
                        _state.chara = subAttrCalc.times5(_state.chara, 'luck', 'pow')
                        // update mp
                        _state.chara.mp.orig = toNum(_state.chara.pow.sum)
                        _state.chara.mp.sum = toNum(_state.chara.mp.orig) + toNum(_state.chara.mp.adj) + toNum(_state.chara.mp.temp)
                        return _state
                    case 'dex':
                        // update preset dodge
                        index = _state.presetSkills.findIndex(e => e.id === 'pre0') // id: pre0 is name: '回避'
                        _state.presetSkills[index].init = toNum(_state.chara.dex.sum) * 2
                        result = toNum(_state.presetSkills[index].init) + toNum(_state.presetSkills[index].occ) + toNum(_state.presetSkills[index].inte) + toNum(_state.presetSkills[index].adj)
                        _state.presetSkills[index].sum = result
                        // if exist dodge in chara.skills, update
                        index = _state.chara.skills.pre.findIndex(e => e.id === 'pre0')
                        if(index === -1) return _state
                        _state.chara.skills.pre[index].init = toNum(_state.chara.dex.sum) * 2
                        _state.chara.skills.pre[index].sum = result
                        return _state
                    case 'siz':
                        // update db
                        _state.chara = subAttrCalc.db(_state.chara)
                        // update hp
                        _state.chara = subAttrCalc.hp(_state.chara)
                        return _state
                    case 'int':
                        // update idea
                        _state.chara = subAttrCalc.times5(_state.chara, 'idea', 'int')
                        // update max Skill Point
                        _state.chara.sp.max.inte = toNum(_state.chara.int.sum) * 10
                        return _state
                    case 'edu':
                        // update know
                        _state.chara = subAttrCalc.times5(_state.chara, 'know', 'edu')
                        // update max Skill Point
                        _state.chara.sp.max.occ = toNum(_state.chara.edu.sum) * 20
                        // update preset native lang
                        index = _state.presetSkills.findIndex(e => e.id === 'pre43') // id: pre43 is name: '母国語'
                        _state.presetSkills[index].init = toNum(_state.chara.edu.sum) * 5
                        result = toNum(_state.presetSkills[index].init) + toNum(_state.presetSkills[index].occ) + toNum(_state.presetSkills[index].inte) + toNum(_state.presetSkills[index].adj)
                        _state.presetSkills[index].sum = result
                        // if exist native lang in chara.skills, update
                        index = _state.chara.skills.pre.findIndex(e => e.id === 'pre43')
                        if(index === -1) return _state
                        _state.chara.skills.pre[index].init = toNum(_state.chara.edu.sum) * 5
                        _state.chara.skills.pre[index].sum = result
                        return _state
                    default:
                        return _state
                }
            }
            return state
        case 'updateSanP':
            _state = JSON.parse(JSON.stringify(state))
            _state.chara.sanP = action.value
            return _state
        case 'updateProf':
            return {
                ...state,
                chara: {
                    ...state.chara,
                    [action.key]: action.value
                }
            }
        case 'updatePreSkill':
            _state = JSON.parse(JSON.stringify(state))
            // update "preset"
            action.value.sum = toNum(action.value.init) + toNum(action.value.occ) + toNum(action.value.inte) + toNum(action.value.adj)
            index = _state.presetSkills.findIndex(e => e.id === action.value.id)
            _state.presetSkills[index] = action.value
            // if all values are empty or 0, remove value from chara.skills
            index = _state.chara.skills.pre.findIndex(e => e.id === action.value.id)
            if(!toNum(action.value.occ) && !toNum(action.value.inte) && !toNum(action.value.adj)){
                if(index !== -1) state.chara.skills.pre.splice(index, 1)
            }else{
                if(index === -1){
                    // values aren't empty and can't find in chara.skills, push new value
                    _state.chara.skills.pre.push(action.value)
                }else{
                    // value already exist in chara.skills, replace value
                    _state.chara.skills.pre.splice(index, 1, action.value)
                }
            }
            // update used skill point
            preOccSum = _state.chara.skills.pre.reduce((s, e) => s + toNum(e.occ), 0)
            origOccSum = _state.chara.skills.orig.reduce((s, e) => s + toNum(e.occ), 0)
            preInteSum = _state.chara.skills.pre.reduce((s, e) => s + toNum(e.inte), 0)
            origInteSum = _state.chara.skills.orig.reduce((s, e) => s + toNum(e.inte), 0)
            _state.chara.sp.used.occ = preOccSum + origOccSum
            _state.chara.sp.used.inte = preInteSum + origInteSum
            return _state
        case 'updateOrigSkill':
            _state = JSON.parse(JSON.stringify(state))
            // update "interim"
            action.value.sum = toNum(action.value.init) + toNum(action.value.occ) + toNum(action.value.inte) + toNum(action.value.adj)
            index = _state.interimSkills.findIndex(e => e.id === action.value.id)
            _state.interimSkills.splice(index, 1, action.value)
            // if all values are empty or 0, remove value from chara.skills
            index = _state.chara.skills.orig.findIndex(e => e.id === action.value.id)
            if(!action.value.name && !action.value.init && !action.value.occ && !action.value.inte && !action.value.adj){
                if(index !== -1) state.chara.skills.orig.splice(index, 1)
            }else{
                if(index === -1){
                    // values aren't empty and can't find in chara.skills, push new value
                    _state.chara.skills.orig.push(action.value)
                }else{
                    // value already exist in chara.skills, replace value
                    _state.chara.skills.orig.splice(index, 1, action.value)
                }
            }
            // update used skill point
            preOccSum = _state.chara.skills.pre.reduce((s, e) => s + toNum(e.occ), 0)
            origOccSum = _state.chara.skills.orig.reduce((s, e) => s + toNum(e.occ), 0)
            preInteSum = _state.chara.skills.pre.reduce((s, e) => s + toNum(e.inte), 0)
            origInteSum = _state.chara.skills.orig.reduce((s, e) => s + toNum(e.inte), 0)
            _state.chara.sp.used.occ = preOccSum + origOccSum
            _state.chara.sp.used.inte = preInteSum + origInteSum
            return _state
        case 'addOrigSkill':
            _state = JSON.parse(JSON.stringify(state))
            _state.chara.countAddSkill++
            _state.interimSkills.push({id: `orig${_state.chara.countAddSkill + '' + new Date().getTime()}`, name: '', init: '', occ: '', inte: '', adj: '', sum: 0})
            return _state
        case 'rmOrigSkill':
            _state = JSON.parse(JSON.stringify(state))
            index = _state.interimSkills.findIndex(e => e.id === action.id)
            if(index !== -1) _state.interimSkills.splice(index, 1)
            // if removed skill exist in chara.skills, remove it too
            index = _state.chara.skills.orig.findIndex(e => e.id === action.id)
            if(index !== -1) _state.chara.skills.orig.splice(index, 1)
            // update used skill point
            preOccSum = _state.chara.skills.pre.reduce((s, e) => s + toNum(e.occ), 0)
            origOccSum = _state.chara.skills.orig.reduce((s, e) => s + toNum(e.occ), 0)
            preInteSum = _state.chara.skills.pre.reduce((s, e) => s + toNum(e.inte), 0)
            origInteSum = _state.chara.skills.orig.reduce((s, e) => s + toNum(e.inte), 0)
            _state.chara.sp.used.occ = preOccSum + origOccSum
            _state.chara.sp.used.inte = preInteSum + origInteSum
            return _state
        case 'updateItem':
            _state = JSON.parse(JSON.stringify(state))
            // update "interim"
            index = _state.interimItems.findIndex(e => e.id === action.value.id)
            _state.interimItems.splice(index, 1, action.value)
            // if empty name & detail, remove it from chara.items
            index = _state.chara.items.findIndex(e => e.id === action.value.id)
            if(!action.value.name && !action.value.detail){
                if(index !== -1) _state.chara.items.splice(index, 1)
            }else{
                if(index === -1){
                    _state.chara.items.push(action.value)
                }else{
                    _state.chara.items.splice(index, 1, action.value)
                }
            }
            return _state
        case 'addItem':
            _state = JSON.parse(JSON.stringify(state))
            _state.chara.countAddItem++
            _state.interimItems.push({id: `item${_state.chara.countAddItem + '' + new Date().getTime()}`, name: '', amount: '', detail: ''})
            return _state
        case 'rmItem':
            _state = JSON.parse(JSON.stringify(state))
            index = _state.interimItems.findIndex(e => e.id === action.id)
            if(index !== -1) _state.interimItems.splice(index, 1)
            // if removed skill exist in chara.items, remove it too
            index = _state.chara.items.findIndex(e => e.id === action.id)
            if(index !== -1) _state.chara.items.splice(index, 1)
            return _state
        case 'stampCreationDate':
            timeText = timeStamp()
            return {
                ...state,
                chara: {
                    ...state.chara,
                    creationDate: timeText,
                    lastUpdate: timeText
                }
            }
        case 'stampLastUpdate':
            timeText = timeStamp()
            return {
                ...state,
                chara: {
                    ...state.chara,
                    lastUpdate: timeText
                }
            }
        default:
            return state
    }
}

export default reducer
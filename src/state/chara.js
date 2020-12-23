const attributes = {
    str: {label: 'STR', orig: '', adj: '', temp: '', sum: 0},
    con: {label: 'CON', orig: '', adj: '', temp: '', sum: 0},
    pow: {label: 'POW', orig: '', adj: '', temp: '', sum: 0},
    dex: {label: 'DEX', orig: '', adj: '', temp: '', sum: 0},
    app: {label: 'APP', orig: '', adj: '', temp: '', sum: 0},
    siz: {label: 'SIZ', orig: '', adj: '', temp: '', sum: 0},
    int: {label: 'INT', orig: '', adj: '', temp: '', sum: 0},
    edu: {label: 'EDU', orig: '', adj: '', temp: '', sum: 0},
    // 
    hp:   {label: '耐久力',   orig: 0, adj: '', temp: '', sum: 0},
    mp:   {label: 'MP',       orig: 0, adj: '', temp: '', sum: 0},
    san:  {label: 'SAN',      orig: 0, adj: '', temp: '', sum: 0},
    idea: {label: 'アイデア', orig: 0, adj: '', temp: '', sum: 0},
    luck: {label: '幸運',     orig: 0, adj: '', temp: '', sum: 0},
    know: {label: '知識',     orig: 0, adj: '', temp: '', sum: 0},
    // 
    db: '-1d6',
    sanP: null,
    tempHP: 0,
    tempMP: 0
}

const skillPoints = {
    used: {occ: 0, inte: 0},
    max:  {occ: 0, inte: 0}
}

const chara = {
    id: '',
    creationDate: '',
    lastUpdate: '',
    // 
    name: '',
    age: '',
    sex: '',
    occupation: '',
    birthplace: '',
    description: '',
    // 
    ...attributes,
    sp: {...skillPoints},
    skills: {
        pre: [],
        orig: []
    }, // expected assignment:
    // {name: '', init: '', occ: '', inte: '', adj: '', sum: ''}
    items: [], // expected assignment:
    // {name: '', amount: '', detail: ''}
    countAddSkill: 0,
    countAddItem: 0
}

export default chara
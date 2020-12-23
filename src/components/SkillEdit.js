import { Store } from '../store'
import { useContext } from 'react'
import toNum from '../toNum'
import { SvgTimes, SvgPlus } from '../Svg'
import '../css/index.css'

const SPview = () => {
    const {state} = useContext(Store)

    return (
        <>
            <div>{state.chara.sp.used.occ} / {state.chara.sp.max.occ}</div>
            <div>{state.chara.sp.used.inte} / {state.chara.sp.max.inte}</div>
        </>
    )
}

const SkillRow = props => {
    const {dispatch} = useContext(Store)

    const handleChange = (e, v) => {
        let typeText = `update${props.cat}Skill`
        dispatch({
            type: typeText,
            value: {
                ...props.item,
                [v]: e.target.value
            }
        })
    }

    const judgeEntered = () => {
        if(props.cat === 'Pre'){
            if(
                toNum(props.item.occ) ||
                toNum(props.item.inte) ||
                toNum(props.item.adj)
            ){
                return 'is-entered'
            }else{
                return ''
            }
        }else if(
            props.item.name ||
            toNum(props.item.init) ||
            toNum(props.item.occ) ||
            toNum(props.item.inte) ||
            toNum(props.item.adj)
        ){
            return 'is-entered'
        }else{
            return ''
        }
    }

    const detail = (
        props.item.hasDetail ? (<input type="text" value={props.item.detail} className="c-textField p-skillEditCol_detail" onChange={e => handleChange(e, 'detail')} />) :
        null
    )

    const EvenOdd = ((props.index +1) % 2 === 0 ? 'p-skillEditCol-even' : '')
    const isEntered = judgeEntered()
    const className_num = `c-textField p-skillEditCol p-skillEditCol-num ${EvenOdd} ${isEntered}`
    const className_name = `p-skillEditCol p-skillEditCol-name ${EvenOdd} ${isEntered}`
    const className_nameInput = `c-textField p-skillEditCol p-skillEditCol-nameInput ${EvenOdd} ${isEntered}`

    return (
        <div className="c-pseudoTbl_row">
            {
                props.cat === "Pre" ?
                <div className={className_name}>{props.item.name}{detail}</div> :
                <input type="text" className={className_nameInput} value={props.item.name} onChange={e => handleChange(e, 'name')} placeholder="技能名" />
            }
            <input type="text" className={className_num} value={props.item.init} onChange={e => handleChange(e, 'init')} disabled={props.cat === "Pre"} placeholder={props.cate === 'Pre' ? '' : '0'} />
            <input type="text" className={className_num} value={props.item.occ}  onChange={e => handleChange(e, 'occ')} />
            <input type="text" className={className_num} value={props.item.inte} onChange={e => handleChange(e, 'inte')} />
            <input type="text" className={className_num} value={props.item.adj}  onChange={e => handleChange(e, 'adj')} />
            <input type="text" className={className_num} value={props.item.sum} disabled />
            {props.cat === "Orig" &&
                <div className={`p-skillEditCol p-skillEditCol-btnWrap ${EvenOdd}`}>
                    <button className="c-btn p-skillRmBtn" onClick={() => dispatch({type: 'rmOrigSkill', id: props.item.id})}>
                        <SvgTimes />
                    </button>
                </div>
            }
        </div>
    )
}

const ChosenSkill = props => {

    const skillName = (
        props.item.hasDetail ? `${props.item.name}(${props.item.detail})` :
        props.item.name ? `${props.item.name}` :
        '未入力'
    )

    return (
        <div>{skillName}: {props.item.sum}</div>
    )
}

const SkillEdit = () => {
    const {state, dispatch} = useContext(Store)

    const PresetSkills = state.presetSkills.map(
        (e, i) => (<SkillRow key={e.id} item={e} cat={"Pre"} index={i} />)
    )

    const OriginalSkills = state.interimSkills.map(
        (e, i) => (<SkillRow key={e.id} item={e} cat={"Orig"} index={i} />)
    )

    const ChosenPreset = state.chara.skills.pre.map(
        e => (<ChosenSkill key={e.id} item={e} />)
    )
    const ChosenOriginal = state.chara.skills.orig.map(
        e => (<ChosenSkill key={e.id} item={e} />)
    )

    return (
        <>
        <SPview />
        <div style={{border: "solid 1px"}}>
        {ChosenPreset}
        {ChosenOriginal}
        </div>
        <div className="p-skillEditTbl c-pseudoTbl">
           {PresetSkills}
        </div>
        <span style={{display: "flex", alignItems: "center"}}>
        <button className="p-skillAddBtn c-btn" onClick={() => dispatch({type: 'addOrigSkill'})}>
            <SvgPlus />
        </button>
        追加する</span>
        <div className="p-skillEditTbl c-pseudoTbl">
           {OriginalSkills}
        </div>
        </>
    )
}

export default SkillEdit
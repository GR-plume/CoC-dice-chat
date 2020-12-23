import './css/mock/m-index.css'

const MockTest = () => {

    const Columns = props => {

        const EvenOdd = ((props.index +1) % 2 === 0 ? 'p-skillEditCol-even' : '')

        return (
            <>
            <div className={`p-skillEditCol p-skillEditCol-name ${EvenOdd}`}>マーシャルアーツ</div>
            <input className={`c-textField p-skillEditCol p-skillEditCol-num ${EvenOdd}`} disabled />
            <input className={`c-textField p-skillEditCol p-skillEditCol-num ${EvenOdd}`} />
            <input className={`c-textField p-skillEditCol p-skillEditCol-num ${EvenOdd}`} />
            <input className={`c-textField p-skillEditCol p-skillEditCol-num ${EvenOdd}`} />
            <input className={`c-textField p-skillEditCol p-skillEditCol-num ${EvenOdd}`} disabled />
            </>
        )
    }

    const OrigColumns = props => {

        const EvenOdd = ((props.index +1) % 2 === 0 ? 'p-skillEditCol-even' : '')

        return (
            <>
            <input className={`c-textField p-skillEditCol p-skillEditCol-nameInput ${EvenOdd}`} placeholder="技能名" />
            <input className={`c-textField p-skillEditCol p-skillEditCol-num ${EvenOdd}`} placeholder="0" />
            <input className={`c-textField p-skillEditCol p-skillEditCol-num ${EvenOdd}`} />
            <input className={`c-textField p-skillEditCol p-skillEditCol-num ${EvenOdd}`} />
            <input className={`c-textField p-skillEditCol p-skillEditCol-num ${EvenOdd}`} />
            <input className={`c-textField p-skillEditCol p-skillEditCol-num ${EvenOdd}`} disabled />
            </>
        )
    }

    const Row = [...Array(8)].map(
            (e, i) => (
                <div className="c-pseudoTbl_row" key={i}>
                    <Columns key={i} index={i} />
                </div>
            )
        )
    const OrigRow = [...Array(8)].map(
            (e, i) => (
                <div className="c-pseudoTbl_row" key={i}>
                    <OrigColumns key={i} index={i} />
                </div>
            )
        )

    return(
        <>
            <div className="p-skillEditTbl c-pseudoTbl">
                {Row}
                <div className="c-pseudoTbl_row">
                    <div className="p-skillEditCol p-skillEditCol-name">
                        ほかの言語
                        <input className="c-textField p-skillEditCol_detail" />
                    </div>
                    <input className="c-textField p-skillEditCol p-skillEditCol-num" disabled />
                    <input className="c-textField p-skillEditCol p-skillEditCol-num" />
                    <input className="c-textField p-skillEditCol p-skillEditCol-num" />
                    <input className="c-textField p-skillEditCol p-skillEditCol-num" />
                    <input className="c-textField p-skillEditCol p-skillEditCol-num" disabled />
                </div>
                <div className="c-pseudoTbl_row">
                    <div className="is-entered p-skillEditCol p-skillEditCol-name">
                        芸術
                        <input className="c-textField p-skillEditCol_detail" />
                    </div>
                    <input className="is-entered c-textField p-skillEditCol p-skillEditCol-num" disabled />
                    <input className="is-entered c-textField p-skillEditCol p-skillEditCol-num" />
                    <input className="is-entered c-textField p-skillEditCol p-skillEditCol-num" />
                    <input className="is-entered c-textField p-skillEditCol p-skillEditCol-num" />
                    <input className="is-entered c-textField p-skillEditCol p-skillEditCol-num" disabled />
                </div>
                {Row}
            </div>
            <div className="p-skillEditTbl c-pseudoTbl">
                {OrigRow}
            </div>
        </>
    )
}

export default MockTest
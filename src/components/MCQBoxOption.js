import React, {useState} from 'react'

function MCQBoxOption( {id, callBack}) {
    const [val, setVal] = useState("");
    const updateData = (value) => {
        setVal(value);
        callBack(val, id);
    }
    return (
        <div className="mcqBoxOption">
            <label>Option: </label>
            <input type="text" value={val} onChange={(e) => updateData(e.target.value)}></input>
        </div>
    )
}

export default MCQBoxOption

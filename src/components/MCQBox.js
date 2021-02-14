import React, { useState } from 'react';
import MCQBoxOption from "./MCQBoxOption";

function MCQBox( {id, callBack} ) {
    const [name, setName] = useState("");
    const [val, setVal] = useState([]);
    const [numOptions, setNumOptions] = useState(0);
    const options = [];

    const generateOptions = (options) => {
        for (let i = 0; i < numOptions; i++) {
            options.push(<MCQBoxOption id={i+1} key={i+1} callBack={updateData}></MCQBoxOption>);
        }
        return options;
    }

    const updateName = (input, index) => {
        setName(input);
        const temp = val;
        temp[index] = input;
        setVal(temp);
        callBack(val, id);
    }

    const updateData = (input, index) => {
        const temp = val;
        temp[index] = input;
        setVal(temp);
        callBack(val, id);
    }

    const incrementOptions = () => {
        setNumOptions(numOptions + 1);
        const temp = val;
        temp.push("");
        setVal(temp);
    }

    const decrementOptions = () => {
        if (numOptions > 0) {
            setNumOptions(numOptions - 1);
        }
    }

    return (
        <div className="mcqBox">
            <label>Multiple Choice Question</label>
            <input type="text" value={name} onChange={(e) => updateName(e.target.value, 0)}></input>
            {generateOptions(options)}
            <button type="button" onClick={() => incrementOptions()}>Add Option</button>
            <button type="button" onClick={() => decrementOptions()}>Remove Option</button>
        </div>
    )
}

export default MCQBox

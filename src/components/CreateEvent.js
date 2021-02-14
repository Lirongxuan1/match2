import React, {useState} from 'react';
import axios from "axios";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./InfoForm.css";
import FRQBox from "./FRQBox";
import MCQBox from "./MCQBox";
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser, selectUser } from '../context/reducer';

function CreateEvent() {
    const user = useSelector(selectUser);
    // state for number of frq questions
    const [numFRQ, setNumFRQ] = useState(0);
    // array to hold frqBox components
    const frqs = [];

    // state for number of mcq questions
    const [numMCQ, setNumMCQ] = useState(0);
    // array to hold mcqBox components
    const mcqs = [];

    // array to hold data for frqs and mcqs
    const [frqData, setFRQData] = useState([]);
    const [mcqData, setMCQData] = useState([]);

    const frqCallback = (childData, id) => {
        const copy = frqData;
        copy[id] = childData;
        setFRQData(copy);
        console.log(frqData);
    }

    const mcqCallBack = (childData, id) => {
        const copy = mcqData;
        copy[id] = childData;
        setMCQData(copy);
        console.log(mcqData);
    }

    const getFRQs = (frqs) => {
        for (let i = 0; i < numFRQ; i++) {
            frqs.push(<FRQBox key={i} id={i} callBack={frqCallback} />);
        }
        return frqs;
    }

    const getMCQs = (mcqs) => {
        for (let i = 0; i < numMCQ; i++) {
            mcqs.push(<MCQBox key={i} id={i} callBack={mcqCallBack}></MCQBox>);
        }
        return mcqs;
    }

    const decrementFRQ = () => {
        if (numFRQ - 1 >= 0) {
            setNumFRQ(numFRQ - 1);
        }
        frqs.pop();
    }

    const decrementMCQ = () => {
        if (numMCQ - 1 >= 0) {
            setNumMCQ(numMCQ - 1);
        } 
        mcqs.pop();
    }

    const fq = {
        FRQS: [],
        MCQS: [],
    }

    const event = {
        name: "",
        date: new Date(),
        fieldQuestions: fq,
        responses: []
    };

    const [name, setName] = useState("");
    const [date, setDate] = useState(new Date());

    const onSubmit = () => {
        event.name = name;
        event.date = date;
        for (let i = 0; i < numFRQ; i++) {
            fq.FRQS.push(frqData[i]);
        }
        for (let i = 0; i < numMCQ; i++) {
            fq.MCQS.push(mcqData[i]);
        }
        event.fieldQuestions = fq;
        axios.post("https://warm-dusk-08113.herokuapp.com/events/add", event)
            .then(res => console.log(res.data))
            .catch(err => console.error(err));
    }


   return (
        <div className="infoForm">
            <div className="infoForm__questions">
            <form onSubmit={onSubmit}>
                <label>Name of Event</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)}></input>
                <label>Date</label>
                <DatePicker selected = {date} onChange={(date) => setDate(date)}></DatePicker>
                {getFRQs(frqs)}
                {getMCQs(mcqs)}
                <input type="submit" value="create event"></input>
            </form>
            </div>
            <div className="infoForm__configure">
            <label>Number of Free Response Questions</label>
            <div className="infoForm__counter">
                <button onClick={() => decrementFRQ()}>-</button>
                <div className="infoForm__frqcounter__display">{numFRQ}</div>
                <button onClick={() => setNumFRQ(numFRQ + 1)}>+</button>
            </div>
            <label>Number of Multiple Choice Questions</label>
            <div className="infoForm__counter">
                <button onClick={() => decrementMCQ()}>-</button>
                <div className="infoForm__mcqcounter__display">{numMCQ}</div>
                <button onClick={() => setNumMCQ(numMCQ + 1)}>+</button>
            </div>
            </div>
      </div>
    )
}

export default CreateEvent;

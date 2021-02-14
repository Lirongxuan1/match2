import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../context/reducer';
import { selectEvents } from "../context/eventReducer";
import "./Dashboard.css";
import EventInfoBox from "./EventInfoBox";

function Dashboard() {
    const user = useSelector(selectUser);
    const events = useSelector(selectEvents);
    const eventList = [];

    const generateEvents = () => {
        if (user) {
            eventList.push(<EventInfoBox key="a" id="6028f004837df47dd66b94f3"></EventInfoBox>);
            eventList.push(<EventInfoBox key="b" id="60290bf9b195a72841c33a89"></EventInfoBox>);
        }
       return eventList;
    }

    return (
        <div className="dashboard">
            {user ? (<h2>Matches:</h2>) : (<h2>Sign In to See Events</h2>)}
            {generateEvents()}
        </div>
    )
}

export default Dashboard;

import React, {useEffect, useState} from 'react';
import axios from "axios";
import "./EventInfoBox.css";
import {selectUser} from "../context/reducer";
import {useSelector} from "react-redux";
import {Avatar} from "@material-ui/core";

function EventInfoBox( {id}) {
    const [name, setName] = useState("No Match");
    const [email, setEmail] = useState("");
    const [photo, setPhoto] = useState("");
    const user = useSelector(selectUser);



    useEffect(() => {
        axios.get("https://warm-dusk-08113.herokuapp.com/matchings/getMatch/" + id)
            .then(res => {
                for (let i = 0; i < res.data.matchings.length; i++) {
                    if (res.data.matchings[i].email == user.email) {
                        setName(res.data.matchings[i].match.name);
                        setEmail(res.data.matchings[i].match.email);
                        getAvatar(res.data.matchings[i].match.email);
                        break;
                    }
                }
            })
            .catch(err => alert(err));
    });

    const getAvatar = (email) => {
            axios.get("https://warm-dusk-08113.herokuapp.com/users/getUser/" + email)
                .then(res => {
                    if (res.data.length !== 0) {
                        setPhoto(res.data[0].photo);
                    }
                })
                .catch(err => alert(err));
    }

    return (
        <div className="eventInfoBox">
            <Avatar src={photo} />
            <div classame="text">
                <h2>{name}</h2>
                <h3>{email}</h3>
            </div>
       </div>
    )
}

export default EventInfoBox

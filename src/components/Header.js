import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import {auth, provider} from "../firebaseConfig";
import {selectUser, setUser, clearUser} from "../context/reducer";
import { setEvents, clearEvents} from "../context/eventReducer"; 
import axios from 'axios';
import "./Header.css";
import {Avatar, Button} from "@material-ui/core";



function Header() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch(); 
   
    const newUser = {
        displayName: "",
        email: "",
        photo: "",
        events: []
    }

    const signIn = () => {
        auth.signInWithPopup(provider).then( res => {
            console.log(res.user);
            const currUser = {
                email: res.user.email,
                name: res.user.displayName,
                photoURL: res.user.photoURL,
            }
            dispatch(setUser(currUser));
        }).catch( (err) => alert(err.message));

    }

    const signOut= () => {
        dispatch(clearUser());
        dispatch(clearEvents());
    }

    const createNewUser = (user) => {
        newUser.displayName = user.name;
        newUser.email = user.email;
        newUser.photo = user.photoURL;
        newUser.events = [];
        console.log(newUser);
        axios.post("https://warm-dusk-08113.herokuapp.com/users/add", newUser)
            .then(res => console.log(res.data))
            .catch(err => alert(err));

    }

    const fetchLogin = () => {
        if (user) {
            axios.get("https://warm-dusk-08113.herokuapp.com/users/getUser/" + user.email)
                .then(res => {
                    if (res.data.length > 0){
                        dispatch(setEvents(res.data[0].events));
                    } else {
                        console.log("creating new user");
                        createNewUser(user);
                    }})
                .catch(err => alert(err));
            return (<>
            <Button variant="contained" color="primary" onClick={() => signOut()}>sign out</Button>
            </>)
        } else {
            return (<Button variant="contained" color="primary" onClick={() => signIn()}>sign in</Button>)
        }
    }

    return (
        <div className="header">
            <h1>Buddy Match</h1>
            {fetchLogin()}
            <div className="avatarBox">
                {user ? (<Avatar src={user.photoURL}/>) : <Avatar />}
            </div>
        </div>
    )
}

export default Header

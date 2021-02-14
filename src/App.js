import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import CreateEvent from "./components/CreateEvent";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import EventDash from "./components/EventDash";

function App() {
    return (
      <div className="app">
        <Header />
        <Router>
         <Route path="/create" component={CreateEvent}></Route>
         <Route path="/" exact component={Dashboard}></Route>
         <Route path="/event" component={EventDash}></Route>
        </Router>
      </div>
 );
}

export default App;

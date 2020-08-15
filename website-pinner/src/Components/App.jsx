import React from "react";
import Layout from "./Layout";
import Home from "./Home"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
const App = (props) => {
  return (
    <Router>
        <Switch>
            <Route path="/app" exact  render={(props) => (<Layout {...props}/> )}/>
            <Route path="/" exact component={Home}/>
            <Redirect to="/" />
        </Switch>
    </Router>
  );
};
export default App;

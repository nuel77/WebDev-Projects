import React, { Component, Fragment } from "react";
import {Header,Footer} from './Layouts'
import Exercise from './Excercises'

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header></Header>
        <Exercise/>
        <Footer></Footer>
      </Fragment>
    );
  }
}

export default App;

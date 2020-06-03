import React, { Component, Fragment } from "react";
import { Header, Footer } from "./Layouts";
import Exercise from "./Excercises";
import { muscles, exercises } from "../store";

class App extends Component {
  state = {
    exercises,
  };

  getExcercisesByMuscles() {
    return this.state.exercises.reduce((accumilator, exercise) => {
      const { muscles } = exercise;

      accumilator[muscles] = accumilator[muscles]
        ? [...accumilator[muscles], exercise]
        : [exercise];

      return accumilator;
    }, {});
  }
  render() {
    console.log(this.getExcercisesByMuscles());
    return (
      <Fragment>
        <Header></Header>
        <Exercise />
        <Footer muscles={muscles}></Footer>
      </Fragment>
    );
  }
}

export default App;

import React, { Component, Fragment } from "react";
import { Header, Footer } from "./Layouts";
import Exercise from "./Excercises";
import { muscles, exercises } from "../store";

class App extends Component {
  state = {
    exercises,
  };

  getExcercisesByMuscles() {
    /*
    Object.entries is ES8 fucntion to convert Object returned by reduce method to an array 
    where each element is an array with the first element as key and second element as the value
    of the Object
    */
    return Object.entries(
      /*
      loops over all the elements in the excercices array and creates an object 
      with the muscles as key and value as an array of excercies related to 
      that muscle
      */
      this.state.exercises.reduce((accumilator, exercise) => {
        const { muscles } = exercise;
        // check and add excercise which affects the muscle
        accumilator[muscles] = accumilator[muscles]
          ? [...accumilator[muscles], exercise]
          : [exercise];

        return accumilator;
      }, {}) //inital value of accumilator
    );
  }
  render() {
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

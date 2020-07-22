/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { questions, personas } from './questions';

import copper from './copper.jpg';
import steel from './steel.jpg';
import aluminum from './aluminum.jpg';
import zinc from './zinc.jpg';
import brass from './brass.jpg';
import nickel from './nickel.jpg';

const lookup = {
  copper,
  steel,
  aluminum,
  zinc,
  brass,
  nickel,
};
const App = () => {
  const [qindex, setQindex] = useState(0);
  const [total, setTotal] = useState(0);
  const getValueFromString = (str) => {
    const choices = questions[qindex].Choices;
    const choice = choices.find((c) => c.Choice === str);
    return choice.Value;
  };
  const getQuestion = () => {
    if (qindex >= questions.length) {
      return null;
    }
    return questions[qindex];
  };
  const onItemClickHandler = (e) => {
    let choice = e.target.textContent;
    if (!choice) { // if user clicks radio button rather than text
      choice = e.currentTarget.textContent;
    }
    setTimeout(() => {
      const value = Number(getValueFromString(choice));
      setTotal((prevTotal) => prevTotal + value);
      setQindex((prevIndex) => prevIndex + 1);
    }, 240);
  };

  const handleReset = () => {
    setQindex(0);
    setTotal(0);
  };

  const listChoices = (question) => ((question === null) ? <li>None</li>
    : question.Choices.map((choice) => (
      <li style={{ fontSize: 'larger' }} key={choice.Choice} onClick={onItemClickHandler}>
        <input className="slim" type="radio" value={choice.Choice} />
        {choice.Choice}
      </li>
    )));

  return (

    <div className="App">

      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap" rel="stylesheet" />

      <h1 className="text-primary">What kind of metal rod are you?</h1>
      { qindex < questions.length && (
      <h4 className="text-secondary">Take this quiz to find out!</h4>)}
      { qindex < questions.length && (
      <p>
        {qindex + 1}
        {' '}
        of
        {' '}
        {questions.length}
      </p>
      )}

      { getQuestion()
   && (
   <>
     <p className="text-info" style={{ fontSize: '1.3em' }}>
       {' '}
       {getQuestion().Question}
     </p>
     <ol style={{ listStyle: 'none' }}>
       {listChoices(getQuestion())}
     </ol>
   </>
   )}

      {(qindex > questions.length - 1
      && (
      <>
        <h3 className="text-info">
          {personas[total % personas.length][1]}
        </h3>
        <h3 className="text-secondary">
          You are definitely
          {' '}
          {personas[total % personas.length][0]}
          .
          <div>
            <img width="200px" src={lookup[personas[total % personas.length][0]]} alt={personas[total % personas.length][0]} />

          </div>
        </h3>
        <button className="btn btn-primary" onClick={handleReset} type="button">Try Again</button>
      </>
      )
      )}
      { qindex > questions.length - 1 && (
      <>
        <hr />
        <small><a href="https://github.com/smycynek/quiz">https://github.com/smycynek/quiz</a></small>
      </>
      )}
    </div>

  );
};

export default App;

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

const CasualQuiz = ({ title, questions, personas }) => {
  const [qindex, setQindex] = useState(0);
  const [answers, setAnswers] = useState({});

  const getWinnerIndex = () => {
    const keys = Object.keys(answers);
    const max = Math.max(...Object.values(answers));
    const index = keys.findIndex((key) => answers[key] === max);
    return keys[index];
  };

  const getIndexValueFromChoice = (str) => {
    const choices = questions[qindex].Choices;
    const choiceIndex = choices.findIndex((c) => c === str);
    return choiceIndex.toString();
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
      const indexValue = getIndexValueFromChoice(choice);
      setAnswers((prevAnswers) => {
        const prevAnswersCopy = {};
        Object.assign(prevAnswersCopy, prevAnswers);
        if (prevAnswersCopy[indexValue] === undefined) {
          prevAnswersCopy[indexValue] = 1;
        } else {
          prevAnswersCopy[indexValue] = Number(prevAnswersCopy[indexValue]) + 1;
        }
        return prevAnswersCopy;
      });
      setQindex((prevIndex) => prevIndex + 1);
    }, 300);
  };

  const handleReset = () => {
    setQindex(0);
    setAnswers({});
  };

  const listChoices = (question) => ((question === null) ? <li>None</li>
    : question.Choices.map((choice) => (
      <li style={{ fontSize: 'larger' }} key={`choice${Math.random().toString().substring(2)}`} onClick={onItemClickHandler}>
        <input className="slim" type="radio" value={choice} />
        {choice}
      </li>
    )));

  return (

    <div className="App">

      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap" rel="stylesheet" />

      <h1 className="text-primary">{title}</h1>
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
          {personas[getWinnerIndex()][1]}
        </h3>
        <h3 className="text-secondary">
          You are definitely
          {' '}
          {personas[getWinnerIndex()][0]}
          .
          <div>
            <img width="200px" src={personas[getWinnerIndex()][2]} alt={getWinnerIndex()[0]} />

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

export default CasualQuiz;

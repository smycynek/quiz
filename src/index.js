/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';

import CasualQuiz from './CasualQuiz';
import * as serviceWorker from './serviceWorker';
import { questions, personas } from './questions';

ReactDOM.render(
  <React.StrictMode>
    <CasualQuiz
      class="App"
      title="What kind of metal rod are you??"
      personas={personas}
      questions={questions}
    />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

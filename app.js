/*
* This quiz app is designed to test your knowledge on movies.
* Written by Yousef and Muhiddin
*/

'use strict';

const store = {
  questions: [
    {
      question: 'I mean, funny like I\'m a clown? I amuse you?',
      answers: ['Goodfellas', 'Star Wars', 'Jurassic Park', 'Green Mile'],
      correctAnswer: 'Goodfellas'
    },
    {
      question: 'Mama says, Stupid is as stupid does.',
      answers: ['1917', 'Forrest Gump', 'Casalanca', 'The Whole Nine Yards'],
      correctAnswer: 'Forrest Gump'
    },
    {
      question: 'The greatest trick the devil ever pulled was convincing the world he didn\'t exist',
      answers: ['Rocky', 'Avengers', 'The Usual Suspects', 'A quiet place'],
      correctAnswer: 'The Usual Suspects'
    },
    {
      question: 'Say hello to my little friend!',
      answers: ['Goodfellas', 'Scarface', 'John Wick', 'Fast & Furious'],
      correctAnswer: 'Scarface'
    },
    {
      question: 'Carpe diem. Seize the day, boys.',
      answers: ['Venom', 'Mission Impossible', 'Dead poets society','Black Panther'],
      correctAnswer: 'Dead poets society'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
  wrong: 0
};


function startQuizApp() {
  $('header').html('<h1>Movie Quiz</h1>');
  $('main').html('<button class="start-button">AND ACTION</button>');
  $('.start-button').on('click', function() {
    store.quizStarted = true;
    render();
  });
}

function renderQuestion() {
  return `${store.questions[store.questionNumber].question}`;
}

function renderSubmit() {
  $('.questionForm').on('submit', function(e) {
    e.preventDefault();
    renderFeedback();
  });
}

function render() {
  let html = '';
  if(store.quizStarted === false) {
    $('main').html(startQuizApp());
  } else if(store.questionNumber < store.questions.length) {
    html = renderOptions();
    $('main').html(html);
    renderSubmit();
  } else {
    $('main').html(renderFeedback());
  }
  
}

function resetQuiz() {
  store.quizStarted = false;
  store.questionNumber = 0;
  store.score = 0;
  store.wrong = 0;
}

function renderFeedback() {
  let html = '';
  let score = store.score;
  let questionNum = store.questionNumber;
  store.questionNumber++;
  let userAnswer = $('input:checked').val();
  let correctAnswer = store.questions[questionNum].correctAnswer;
  if(userAnswer === correctAnswer) {
    html += renderCorrectAnswer(score, questionNum + 1);
    store.score++;
  } else {
    html += renderWrongAnswer(score, questionNum + 1, correctAnswer);
    store.wrong++;
  }
  html +=  `<span class="correct">${store.score} Correct </span> |
    <span class="incorrect">${store.wrong} Incorrect</span>`;
  if(store.questionNumber === 5) {
    html += '<button class="finish">FINISH</button>';
    $('main').html(html);
    $('button').on('click', function() {
      endQuiz();
    });
  } else {
    html += '<button class="next">NEXT</button>';
    $('main').html(html);
    $('button').on('click', function() {
      render();
    });
  }
}

function endQuiz() {
  $('main').html(`<p class="correct">CORRECT: <span class="totalCorrect">${store.score}</span></p>
  <p class="incorrect">INCORRECT: <span class="totalIncorrect">${store.questions.length - store.score}</span></p>
  <button class="again">TRY AGAIN</button><button class="exit">EXIT</button>`);
  $('.again').on('click', function() {
    resetQuiz();
    store.quizStarted = true;
    render();
  });
  $('.exit').on('click', function() {
    resetQuiz();
    startQuizApp();
  });
}

function renderOptions() {
  return `
  <section class="questionScreen">
    <form class="questionForm">
        <legend class="question"><h3><span class="qNum">${store.questionNumber + 1}.</span>
         "${renderQuestion()}"</h3></legend><br>
        ${store.questions[store.questionNumber].answers.map(option => {
    return `<label>
          <input type="radio" value="${option}" name="answer" required>
          ${option}
        </label><br>`;
  }).join('')}	
      <button type="submit">Submit</button>
    </form>
  </section>
  `;
}

function renderCorrectAnswer(score, questionNum) {
  return `<h3>Score: <span class="score">${++score}</span></h3>
    <h3>Question ${questionNum} of 5 remaining</h3> 
    <p class="correct">CORRECT!</p>`;
}

function renderWrongAnswer(score, questionNum, correctAnswer) {
  return `<h3>Score: <span class="score">${score}</span></h3>
    <h3>Question ${questionNum} of 5 remaining</h3>
    <p class="wrong">Sorry, wrong answer!</p><h3>Correct answer: <span class="special">
    ${correctAnswer}!</span></h3>`;
}

function handleQuizApp() {
  startQuizApp();
}

$(handleQuizApp);

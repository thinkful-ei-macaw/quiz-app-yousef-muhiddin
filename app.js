/**
 * Example store structure
 */
'use strict';
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'I mean, funny like I\'m a clown? I amuse you?',
      answers: ['Goodfellas', 'Star Wars', 'Jurassic Park', 'Green Mile'],
      correctAnswer: 'Goodfellas'
    },
    {
      question: '"Mama says, Stupid is as stupid does.',
      answers: ['1917', 'Forrest Gump', 'Casalanca', 'The Whole Nine Yards'],
      correctAnswer: 'Forrest Gump'
    },
    {
      question:
        'The greatest trick the devil ever pulled was convincing the world he didn\'t exist',
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
      answers: [
        'Venom',
        'Mission Impossible',
        'Dead poets society',
        'Black Panther'
      ],
      correctAnswer: 'Dead poets society'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
};



function renderIntroView() {
  $('header').html('<h1>Movie Quiz</h1>');
  $('main').html('<button>START QUIZ</button>');
  $('button').on('click', function() {
    renderQuestion();
  });
}

function getCurrentQuestion() {
  let questions = store['questions'];
  let question = questions[store.questionNumber];
  return question;
}

function renderQuestion() {
  let q = getCurrentQuestion();
  $('main').html(`
<section class="questionScreen">
	<form class="questionForm">
      <legend>${q.question}</legend><br>
      ${q.answers.map(answer => {
    return `<label>
				<input type="radio" value="${answer}" name="answer" required>
				${answer}
      </label><br>`;
  }).join('')}	
		<button type="submit">Submit</button>
	</form>
</section>
`);
  $('form').submit(function(e){
    e.preventDefault();
    nextQuestion();
  });
  getFeedback();
}


function getFeedback() {
  let correctAnswer = getCurrentQuestion().correctAnswer;
  //let currentScore = store.score;
  store.questionNumber++;
  let currentQuestionNumber = store.questionNumber;
  $('button'). click(function(){
    var radioValue = $(':checked'). val();
    if(radioValue === correctAnswer) {
      $('main').html(`<h2>Score: ${++store.score}</h2> <h2>Question ${currentQuestionNumber}/5</h2> 
      <p>You got it correct!</p><button>Next</button>`);
    } else {
      $('main').html(`<h2>Score: ${store.score}</h2> <h2>Question ${currentQuestionNumber}/5</h2>
       <p>You got it wrong!</p><h3>Correct answer is ${correctAnswer}!<button>Next</button>`);
    }
    if(currentQuestionNumber === 5) {
      restartQuiz();
    } else {
      nextQuestion();
    }
  });
 
}

function nextQuestion(){
  $('button').on('click', function(){
    renderQuestion();   
  });
}

function restartQuiz() {
  store.score = 0;
  store.questionNumber = 0;
  $('button').html('Try Again').on('click', function() {
    renderIntroView();
  });      
}



function handleQuizApp() {
  renderIntroView();  
}

$(handleQuizApp);

/**
 *
 * Your app should include a render() function, that regenerates
 * the view each time the store is updated. See your course
 * material, consult your instructor, and reference the slides
 * for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 */

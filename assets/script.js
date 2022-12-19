let questions = [
  {
    numb: 1,
    question: "What is JavaScript?",
    answer: "An object oriented programming language that allows users to interact with an application.",
    options: [
      "Hypertext markup language that builds the framework of a web application.",
      "Cascading Style Sheets that allows a developer to give their web page a unique look.",
      "A fast and feature rich language",
      "An object oriented programming language that allows users to interact with an application."
    ]
},
  {
    numb: 2,
    question: "What is does a console.log do and what type of action is log?",
    answer: "The console.log writes a message to the console and log is a method.",
    options: [
      "The console.log is needed to run your code correctly on a webpage and is a function.",
      "The console.log writes a message to the console and log is a method.",
      "The console.log is a math object that allows you to write mathematical functions.",
      "The console.log connects web applications to a gaming console such as a Playstation or Xbox."
    ]
},
  {
    numb: 3,
    question: "Which tag does an external JavaScript file need in the HTML file?",
    answer: "A <script src=(js file here)></script>.",
    options: [
      "A <link src=(js file here)>",
      "A <meta src=(js file here)>",
      "A <script src=(js file here)></script>",
      "A <div src=(js file here)></div>"
    ]
},
  {
    numb: 4,
    question: "Which of the following is the correct way to call a function?",
    answer: "function myFunction()",
    options: [
      "function myFunction()",
      "function-my-function()",
      "function myFunction {}",
      "function myFunction []"
    ]
},
  {
    numb: 5,
    question: "Which of the following is true about a string?",
    answer: "A string must have single or double quotes.",
    options: [
      "A string must have the phrase string: written before.",
      "A string must be in parenthesis.",
      "A string must have brackets and an addition sign.",
      "A string must have curly brackets, followed by brackets, followed by parenthesis."
    ]
},
];

const startButton = document.querySelector(".start-button button");
const infoContainer = document.querySelector(".info-container");
const exitButton = infoContainer.querySelector(".buttons .quit-quiz");
const continueButton = infoContainer.querySelector(".buttons .restart");
const quizContainer = document.querySelector(".quiz-container");
const resultsContainer = document.querySelector(".results-container");
const optionsList = document.querySelector(".list-options");
const timerLine = document.querySelector("header .timer-line");
const timerText = document.querySelector(".timer .time-left-sec");
const timeCount = document.querySelector(".timer .timer-sec");

startButton.onclick = ()=>{
  infoContainer.classList.remove("activeInfo");
}

continueButton.onclick = ()=>{
  infoContainer.classList.remove("activeInfo");
  quizContainer.classList.add("activeQuiz");
  showQuestions(0);
  queCounter(1);
  startTimer(30);
  startTimerLine(0);
}

let timeValue = 30;
let queCount = 0;
let queNumb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restartQuiz = resultsContainer.querySelector(".buttons .restart-quiz");
const quitQuiz = resultsContainer.querySelector(".buttons .quit");

restartQuiz.onclick = ()=>{
  quizContainer.classList.add("activeQuiz");
  resultsContainer.classList.remove("activeResult");
  timeValue = 30;
  queCount = 0;
  queNumb = 1;
  userScore = 0;
  widthValue = 0;
  showQuestions(queCount);
  queCounter(queNumb);
  clearInterval(counter);
  clearInterval(counterLine);
  startTimer(timeValue);
  startTimerLine(widthValue);
  timerText.textContent = "Time Left";
  nextButton.classList.remove("show");
}

quitQuiz.onclick = ()=>{
  window.location.reload();
}

const nextButton = document.querySelector("footer .next-button");
const bottomQuesCounter = document.querySelector("footer .que-time-total");

nextButton.onclick = ()=>{
  if(queCount < questions.length - 1){
    queCount++;
    queNumb++;
    showQuestions(queCount);
    queCounter(queNumb);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue);
    startTimerLine(widthValue);
    timerText.textContent = "Time Left";
    nextButton.classList.remove("show");
  }else{
    clearInterval(counter);
    clearInterval(counterLine);
    showResult();
  }
}

function showQuestions(index){
  const queText = document.querySelector(".que-text");

  let queTag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
  let optionTag = '<div class="option"></span>'+ questions[index].question[0] + '</span></div>'
  + '<div class="option"><span>'+ questions[index].question[1] +'</span></div>'
  + '<div class="option"><span>'+ questions[index].question[2] +'</span></div>'
  + '<div class="option"><span>'+ questions[index].question[3] +'</span></div>';
  queText.innerHTML = queTag;
  optionsList.innerHTML = optionTag;

  const option = optionsList.querySelectorAll("option");
}

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';

function optionSelected(answer){
  clearInterval(counter);
  clearInterval(counterLine);
  let userAnswer = answer.textContent;
  let correctAnswer = questions[queCount].answer;
  const allOptions = optionsList.children.length;

  if(userAnswer == correctAnswer){
    userScore += 1;
    answer.classList.add("correct");
    answer.insertAdjacentHTML("beforeend", tickIconTag);
    console.log("Correct")
    console.log("Your correct answers=" + userScore);
  }else{
    answer.classList.add("incorrect");
    answer.insertAdjacentHTML("beforeend", crossIconTag);
    console.log("Incorrect");

    for(i=0; i < allOptions; i++){
      if(optionsList.children[i].textContent == correctAnswer){
         optionsList.children[i].setAttribute("class", "option correct");
         optionsList.children[i].insertAdjacentHTML("beforeend", tickIconTag);
         console.log("Auto selected the correct Answer to the question")
      }
    }
  }
  for(i=0; i < allOptions; i++){
    optionsList.children[i].classList.add("disabled");
  }
  nextButton.classList.add("show");
}

function showResult() {
  infoContainer.classList.remove("activeInfo");
  quizContainer.classList.remove("removeQuiz");
  resultsContainer.classList.add("activeResult");
  const scoreText = resultsContainer.querySelector(".score-text");
  if (userScore > 3){ 
    let scoreTag = '<span>and congrats! , You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
    scoreText.innerHTML = scoreTag;
  }else if(userScore > 1){ 
    let scoreTag = '<span>and nice , You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
    scoreText.innerHTML = scoreTag;
  }else{ 
    let scoreTag = '<span>and sorry , You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
    scoreText.innerHTML = scoreTag;
  }
}

function startTimer(time){
  counter = setInterval(timer, 1000);
  function timer(){
      timeCount.textContent = time;
      time--; 
      if(time < 9){ 
          let addZero = timeCount.textContent; 
          timeCount.textContent = "0" + addZero; 
      }
      if(time < 0){ 
          clearInterval(counter); 
          timerText.textContent = "Time Off"; 
          const allOptions = optionsList.children.length; 
          let correctAnswer= questions[queCount].answer; 
          for(i=0; i < allOptions; i++){
              if(optionsList.children[i].textContent == correctAnswer){ 
                  optionsList.children[i].setAttribute("class", "option correct"); 
                  optionsList.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                  console.log("Time Off: Auto selected correct answer.");
              }
          }
          for(i=0; i < allOptions; i++){
            optionsList.children[i].classList.add("disabled");
          }
          nextButton.classList.add("show"); 
      }
  }
}

function startTimerLine(time){
  counterLine = setInterval(timer, 29);
  function timer(){
      time += 1; 
      timerLine.style.width = time + "px"; 
      if(time > 549){
          clearInterval(counterLine);
      }
  }
}

function queCounter(index){
  let totalQueCount = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
  bottomQuesCounter.innerHTML = totalQueCount;  
}
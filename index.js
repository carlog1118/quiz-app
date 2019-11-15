const STORE = [//1
      {
        question: "What was the Philadelphia Eagles first year in the NFL?",
        options: [
          "1933", 
          "1956", 
          "1941", 
          "1945"
        ],
        answer: "1933"
      },
      //2
      {
        question: "Who is the Eagles all time leading passer?",
        options: [
          "Randall Cuningham",
          "Norm Van Brocklin", 
          "Donovan McNabb",
          "Ron Jaworski"
        ],
        answer: "Donovan McNabb"
      },
      //3
      {
        question: "Which Philadelphia Eagle was the first player in NFL history to record a sack, fumble recovery, TD, and an interception in the same game?",
        options: [
          "Reggie White", 
          "Andre Waters", 
          "Chuck Bednarik", 
          "Brian Dawkins"
        ],
        answer: "Brian Dawkins"
      },
      //4
      {
        question: "Nick Foles shares the NFL record for TD passes in a single game. What is the record?", 
        options: [
            "8", 
            "7",
            "5",
            "4"
        ],
        answer: "7"
      },
      //5
      {
        question: "What is the name of the Eagles mascot?",
        options: [
          "Swoop", 
          "Baldy", 
          "Aquila", 
          "Franklin"
        ],
        answer: "Swoop"
      },
      //6
      {
        question: "What was the first Super Bowl appearance for the Eagles?",
        options: [
          "Super Bowl XV", 
          "Super Bowl XI", 
          "Super Bowl XXXIX", 
          "Super Bowl XXIV"
        ],
        answer: "Super Bowl XV"
      },
      //7
      {
        question: "Who did the Eagles play in Super Bowl XXXIX?",
        options: [
          "Indianapolis Colts", 
          "New England Patriots", 
          "Baltimore Ravens", 
          "Pittsburgh Steelers"
        ],
        answer: "New England Patriots"
      },
      //8
      {
        question: "Who was the first Eagles running back to toal more than 1,000 yard rushing in a season?", 
        options: [
          "Wilbert Montgomery", 
          "Lesean McCoy", 
          "Steve Van Buren", 
          "Brian Westbrook"
        ],
        answer: "Steve Van Buren"
      },
      //9
      {
        question: "Which former Eagle was the inspiration for the movie “Invincible”?",
        options: [
          "Jerome Brown", 
          "Sonny Jurgense", 
          "Tommy McDonald", 
          "Vince Papale"
        ], 
        answer: "Vince Papale"
      },
      //10
      {
        question: "Which Eagle was the last full-time two-way player in NFL history?",
        options: [
          "Pete Retzlaff", 
          "Pete Pihos", 
          "Al Wistert", 
          "Chuck Bednarik"
        ],
        answer: "Chuck Bednarik"
      }
      
    ];

let currentQuestionNumber= 0;
let score= 0;


//This function starts quiz
function startQuiz(){
$('.js-box').on('click', '.js-start', function(event){
    renderQuestion();
    updateProgress();
    });
}

//This function renders question
function renderQuestion(){
    let questionText= STORE[currentQuestionNumber];
    let questionHtml= `<form class="js-question"><fieldset>
    <legend>${questionText.question}</legend>
    <br>              
    <input type="radio" id="${questionText.options[0]}" value="${questionText.options[0]}"name="answer" required> 
    <label for="${questionText.options[0]}">${questionText.options[0]}</label>
    <br>                    
    <input type="radio" id="${questionText.options[1]}" value="${questionText.options[1]}"name="answer" required> 
    <label for="${questionText.options[1]}">${questionText.options[1]}</label>
    <br>      
    <input type="radio" id="${questionText.options[2]}" value="${questionText.options[2]}" name="answer" required>
    <label for="${questionText.options[2]}">${questionText.options[2]}</label>
    <br>
    <input type="radio" id="${questionText.options[3]}" value="${questionText.options[3]}" name="answer" required>
    <label for="${questionText.options[3]}">${questionText.options[3]}</label>
    <br>
    <button type="submit" class="js-submit submit">Submit</button>
    </fieldset>
    </form>`;
   $('.js-box').html(questionHtml);   
}
 
//this function checks answer
function checkAnswer(){
    $('.js-box').on('submit', '.js-question', function(event){
    event.preventDefault();
    let selected= $('input:checked')
    let answer= selected.val();
    let correct= STORE[currentQuestionNumber].answer;
    if (answer===correct){
        correctAnswer();
    } else {
        wrongAnswer();
    }
    updateProgress();
    });
}

//updates progress tracker
function updateProgress(){
    let progressHtml= `<ul>
    <li>Question ${currentQuestionNumber+1}/10</li>
    <li>Score: ${score}</li>
    </ul>`
    $('.js-progress').html(progressHtml);
}

//displays html when answer is correct
function correctAnswer(){
    const correct= `<h2>It's Good!</h2>
    <section class="image">
        <img src="img/td.jpg" alt="referee signaling touchdown" class="container-img">
    </section>
    <section class="js-button">
        <button type="button" class="js-next">Next</button>
    </section>`
    $('.js-box').html(correct);
    score++;
}
//displays html when answer is wrong
function wrongAnswer(){
    answerText= STORE[currentQuestionNumber];
    const wrong= `<h2>No good!</h2>
    <section class="image">
        <img src="img/missed.jpg" alt="david akers on knees after missing field goal" class="container-img">
    </section>
    <p>The correct answer was ${answerText.answer}.</p>
    <section class="js-button">
        <button type="button" class="js-next">Next</button>
    </section>`
    $('.js-box').html(wrong);
}

//determines whether to move onto another question or display final results
function nextQuestion(){
    $('.js-box').on('click', '.js-next', function(event){
        currentQuestionNumber++;
        if (currentQuestionNumber+1<=STORE.length){
        renderQuestion();
        updateProgress();
        } else {
            showResults();
        };
    });
}

//displays final quiz results
function showResults(){
    const great= [
        '#1 Fan!',
        'img/nick-foles.jpg',
        'Nick Foles holding the Super Bowl trophy'
    ];
    const good= [
        'Close But No Cigar!',
        'img/mcnabb.jpg',
        'Mcnabb walking off field after losing Super Bowl'
    ];
    const bad= [
        'You must be a Cowgirl fan...',
        'img/romo.jpg',
        'Romo laying injured on field'
    ];
    
    if (score>=8){
        array = great;
    } else if (score < 8 && score >= 6) {
        array = good;
    } else {
        array = bad;
    }

    $('.js-box').html(`
    <h2>${array[0]}</h2>
    <img src="${array[1]}" class="container-img" alt="${array[2]}">
    <button type="button" class="js-restart">Restart</button>`);
}

//restarts quiz
function restartQuiz(){
    $('.js-box').on('click', '.js-restart', function(event){
        resetStats();
        $('.js-progress').html(``);
        $('.js-box').html(`<h2>Prove You're the #1 Eagles Fan</h2>
        <section class="image">
            <img src="img/logo.jpg" alt="Eagles logo" class="container-img">
        </secton>
        <section class="js-button">
            <button type="button" class="js-start">Start</button>
        </section>`);
    });
   
}

//resets score and current question
function resetStats(){
    score = 0;
    currentQuestionNumber = 0;
}


function domReady(){
    startQuiz();
    checkAnswer();
    nextQuestion();
    restartQuiz();
    resetStats(); 
}


$(domReady);




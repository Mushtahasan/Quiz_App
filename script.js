const questions=[
    {
        question:"Which is largest animal in the world?",
        answers:[
            {text:"shark", correct : false},
            {text:"Blue Whale", correct : true},
            {text:"Elephant", correct : false},
            {text:"Girrafe", correct : false},
        ]
    },
    {
        question:"Which is the smallest country in the world?",
        answers:[
            {text:"Vatican city", correct : true},
            {text:"Bhutan", correct : false},
         
            {text:"Nepal", correct : false},
            {text:"Shri Lanka", correct : false},
        ]
    },
    {
        question:"Which is largest desert in the world?",
        answers:[
            {text:"kalhari", correct : false},
            {text:"Gobi", correct : false},
            {text:"Sahara", correct : false},
            {text:"Antartica", correct : true},
        ]
    },

    {
        question:"Which is smallest continent in the world?",
        answers:[
            {text:"Asia", correct : false},
            {text:"Australia", correct : true},
            {text:"Antartica", correct : false},
            {text:"Africa", correct : false},
        ]
    },

    {
        question:"Which is the National River of India?",
        answers:[
            {text:"Ganga", correct : true},
            {text:"Brahamputra", correct : false},
            {text:"Godavari", correct : false},
            {text:"Yamuna", correct : false},
        ]
    },
    {
        question:"Who was the first Prime Minister of India?",
        answers:[
            {text:"Atal Bihari Vajpayee", correct : false},
            {text:"Pandit Jawaharlal Nehru", correct : true},
            {text:"Lal Bahadur Shastri", correct : false},
            {text:"Indira Gandhi", correct : false},
        ]
    },
    {
        question:"Who is the first citizen of India?",
        answers:[
            {text:"Prime Minister of India", correct : false},
            {text:"Cabinet Secretary", correct : false},
            {text:"Every one", correct : false},
            {text:"The President of India", correct : true},
        ]
    },

    {
        question:"Name the first man to walk on the Moon?",
        answers:[
            {text:"Pete Conrad", correct : false},
            {text:"Buzz Aldrin", correct : false},
            {text:"Neil Armstrong", correct : true},
            {text:"Charles Duke", correct : false},
        ]
    },
    {
        question:"What type of gas is absorbed by plants?",
        answers:[
            {text:"Carbon Dioxide", correct :true},
            {text:"Oxygen", correct : false},
            {text:"Nitrigen", correct : false},
            {text:"Helium", correct : false},
        ]
    },
    {
        question:" How many millimetres are there in a centimetre?",
        answers:[
            {text:"0.1 mm", correct :false},
            {text:"100 mm", correct : false},
            {text:"1000 mm", correct : false},
            {text:"10 mm", correct : true},
        ]
    }
];

const questionElement=document.getElementById("question");
const ansButton=document.getElementById("ans-buttons");
const nextButton=document.getElementById("next-btn")

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();

    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex + 1;
    questionElement.innerHTML= questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        ansButton.appendChild(button);

        if(answer.correct){
            button.dataset.correct =answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    })
}

function resetState(){
    nextButton.style.display="none";
    while(ansButton.firstChild){
        ansButton.removeChild(ansButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedbtn=e.target;
    const isCorrect=selectedbtn.dataset.correct==="true";
    if(isCorrect){
        selectedbtn.classList.add("correct");
        score++;
    }else{
        selectedbtn.classList.add("incorrect")
    }
    Array.from(ansButton.children).forEach(button =>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;

    })
    nextButton.style.display="block";
}

function showScore(){
    resetState();

    if(score<5){
        questionElement.innerHTML=`😭 You scored ${score} out of ${questions.length}! It is not good.
        You should pay attention towards your study.`;
    }
    else if(score<=8 && score>5){
        questionElement.innerHTML=`🤘 You scored ${score} out of ${questions.length}!. Good , keep Going.`;
    }
    else{
        questionElement.innerHTML=`🥳 You scored ${score} out of ${questions.length}!. Excellent 🤩, You did awesome , keep Going.`;   
    }
    
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex< questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();
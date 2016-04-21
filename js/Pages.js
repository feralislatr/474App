var pages = ["question", "prediction"];

var ques1 = "What is your first Name";
var ans1 = "";
var question1 = new Question(ques1,ans1);

var ques2 = "What is your age";
var ans2 = "";
var question2 = new Question(ques2,ans2);

<<<<<<< HEAD
var ques3 = "What is your sex";
=======
var ques3 = "What is your gender";
var ans3 = "";
var question3 = new Question(ques3,ans3);
>>>>>>> 362ed4b796171af16feb963046bbe33422c20373

var ques4 = "Where do you currently live";
var ans4 = "";
var question4 = new Question(ques4,ans4);

var ques5 = "What is your Marital Status";
var ans5 = "";
var question5 = new Question(ques5, ans5);

var ques6 = "What is your Ethnicity";
var ans6 = "";
var question6 = new Question(ques6,ans6);

var ques7 = "What Days of the week do you exercise";
var ans7 = "";
var question7 = new Question(ques7, ans7);

var ques8 = "What is your Height";
var ans8 = "";
var question8 = new Question(ques8, ans8);

var ques9 = "What is your Weight";
var ans9 = "";
var question9 = new Question(ques9,ans9);


var questions = [question1,question2,question3,question4,question5,question6,question7,question8,question9];
var displayQuestions = function(){
    var $div = document.getElementById("survey_ques");
    questions.forEach(aQues){
        var $quescont = document.createElement("div");
        var $question = document.createElement("p");
        $question.innerHTML = aQues.question;
        var $response = document.createElement("input");
        $response.addEventListener("blur",function(ev){
            aQues.answer =
        });
        $quescount.appendChild($question);
        $quescount.appendChild($response);
        $div.appendChild($quescount);
    }
};


var calculateBMI = function(){
    
};

var appStart = function(){
    
};
document.addEventListener('DCOMContentLoaded', appStart);

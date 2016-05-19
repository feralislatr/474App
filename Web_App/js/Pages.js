var pages = ["question", "prediction"];

var ques1 = "What is your name";
var ans1 = "";
var question1 = new Question(ques1,ans1);

var ques2 = "What is your sex";
var ans2 = "";
var question2 = new Question(ques2,ans2);

var ques3 = "What is your age";
var ans3 = "";
var question3 = new Question(ques3,ans3);

var ques4 = "How many years of post-secondary education do you have?";
var ans4 = "";
var question4 = new Question(ques4,ans4);


var questions = [question1,question2,question3,question4];
var displayQuestions = function(){
    var $div = document.getElementById("survey_ques");
    questions.forEach(aQues){
        var $quescont = document.createElement("div");
        var $question = document.createElement("p");
        $question.innerHTML = aQues.question;
        var $response = document.createElement("input");
        $response.addEventListener("blur",function(ev){
            aQues.answer = $response.value();
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

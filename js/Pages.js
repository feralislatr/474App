var pages = ["question", "prediction"];

var ques1 = "What is your first Name";

var ques2 = "What is your age";

var ques3 = "What is your sex";

var ques4 = "Where do you currently live";

var ques5 = "What is your Marital Status";

var ques6 = "What is your Ethnicity";

var ques7 = "What Days of the week do you exercise";

var ques8 = "What is your Height";

var ques9 = "What is your Weight";


var questions = [ ];
var displayQuestions = function(){
    var $div = document.getElementById("survey_ques");
    questions.forEach(aQues){
        var $quescont = document.createElement("div");
        var $question = document.createElement("p");
        
        var $option = document.createElement("p");
        
        $quescount.appendChild($question);
        $quescount.appendChild($option);
        $div.appendChild($quescount);
    }
};


var calculateBMI = function(){
    
};

var appStart = function(){
    
};
document.addEventListener('DCOMContentLoaded', appStart);

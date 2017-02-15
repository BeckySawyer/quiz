var questions = [
["What does CSS stand for?", 1],
["Which attributes can set text to bold?", 2],
["Which tag is used to link an external CSS file?", 1],
["Which attribute sets the underline property?", 1],
["Which measurement is NOT relative?", 1],
["Which measurement IS relative?", 0],
["What attribute is used to move an elements content away from it's border?", 1],
["Which attribute does not contribute to a block element's total width?", 2],
["What property changes positioned elements display order?", 2],
["Which value of background-repeat will cause a background to repeat vertically?", 2]
]

var answers = [
["Cascading CSS", "Cascading style sheets", "Cascading separate style"],
["Text decoration", "Font style","Font weight"],
["Script", "Link", "Rel"],
["Font style", "Text decoration", "Font weight"],
["Px", "Cm", "%", "Em"],
["Em", "Cm", "MM", "Inch"],
["Margin", "Padding", "Border", "Width"],
["Width", "Border", "Background image", "Padding"],
["Width", "Background", "Z index", "Azimuth"],
["Repeat-x", "Repeat", "Repeat-y", "No-repeat"]
]

function validate() {
	mailAddress = document.getElementById('email').value;
	name = document.getElementById('name').value;
	pos1 = mailAddress.indexOf("@");
	pos2 = mailAddress.indexOf(".");
	pos3 = name.indexOf(" ");
	valEl = document.getElementById('validate');
	if (pos1 >= 0 && pos2 >= 0 && pos3 >= 0) {
		document.getElementById('quizbackground').style.display = "block";
		document.getElementById('validatebackground').style.display = "none";
		}
	else if (pos1 >= 0 && pos2 >= 0) {
			valEl.innerHTML = "Please enter a valid name";
		}
	else if (pos3 >= 0) {
		valEl.innerHTML = "Please enter a valid email";
	}
	else {
		valEl.innerHTML = "Please enter a valid name & email"
	}
}

document.addEventListener("DOMContentLoaded", generateQuiz);
document.getElementById('check').addEventListener("click", nextQuestion);

var total = 0;

function checkAnswers() {
 	total = 0;
	var notAnswered = "";
	for (var questionNumber = 0; questionNumber < questions.length; questionNumber++) 
	{
		var radioAnswers = document.getElementsByName('answer' + questionNumber);
		var isChecked = false;
		for (var radioButton = 0; radioButton < radioAnswers.length; radioButton++) 
		{
			if(radioAnswers[radioButton].checked) 
			{
				total += parseInt(radioAnswers[radioButton].value);
				isChecked = true;
			}
		}
		if (isChecked === false) 
		{
			notAnswered += (questionNumber + 1) + " ";
		}
	}
}

function generateQuiz() {
	var outputEl = document.getElementById('quiz');
	var html = "";

	for (var i = 0; i < questions.length; i++) {
		html += '<div id="question'+i+'">';
		html += '<h2>' + questions[i][0] + '</h2>'

		for (var j = 0; j < answers[i].length; j++) {
			var isCorrect = (questions[i][1] === j) ? 1 : 0;
			html += '<input type="radio" id="q'+i+'a'+j+ '"name="answer' +i+ '" value="' + isCorrect + '"><label for="q'+i+'a'+j+'"> ' + answers[i][j] + '</label><br>';
		}

		html += '</div>';
		outputEl.innerHTML = html;

	}
}

var currentQuestion = 0;

function nextQuestion() {
	document.getElementById('question' + currentQuestion).style.display = "none";
	currentQuestion++;
	if (currentQuestion >= 9) {
		checkAnswers();
		document.getElementById('finalAnswer').innerHTML += " You scored <b>" + total + "</b> questions correct! <br> Refresh to try again.";
		document.getElementById('check').style.display = "none";
		return;
	}
	document.getElementById('question' + currentQuestion).style.display = "block";
}
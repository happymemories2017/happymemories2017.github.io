// Maintains count for current question number
var quesCount = 0;
// Used to handle radio button toggle behaviour
var answerChecked = false;
// Check if quiz was submitted and if reset or not
var needsReset = false;
// Stores all radio buttons
var radButtons = new Array(5);
// This array contains the questions.... duh *-*
var questions = ["Let P(at^2,2at),Q, R(ar^2,2ar)  be 3 pts on the parabola y^2=4ax. If PQ be a focal chord and PK is parallel to QR where coordinates of K be (2a,0) then value of 'r' is",
                 "From a set of 20 consecutive natural numbers, 4 are selected such that they are not consecutive. The number of such selections is",
                 "Sixteen players P1, P2,... P16 play in a tournament. They are divided into eight pairs at random. From each pair, a winner is decided on the basis of a game played between the two players of the pair. Assuming that all the players are of equal strength, the probability that exactly one of the players P1 and P2 is among the eight winners is",
                 "What is the remainder when 6^99 + 8^99 is divided with 49",
                 "If f(x)=3x^10-7x^8+5x^6-21x^3+6x+7, then find the value of lim(h->0)(f(1-h)-f(1)/(h^2+3h)",
                 "In order to get heads atleast once with probability >= 0.9, minimum number of times an unbiased coin needs to tossed is",
                 "Let y(x) be a solution of (1+x^2)dy/dx + 2xy - 4x^2=0 and y(0)=-1 then y(1) is equal to",
                " If x+log(1+2^x)=xlog5+log6 then the value of x is",
                " For what values of k the following system of equations has no solution: x+y=4; kx+2y+3z=1; 2x+y+kz=5",
                "For what what value of a will x+a/x have a relative maximum at x=2?"    
            ];
// Array to store user responses
var answers = new Array(questions.length);

//=============How to add Questions================//
/*
- Add your question to array above (script will adjust numbers automatically)
- Add your options (should be exactly 4) to the cases in function "options" (look below)
- Add correct response to array inside "calcScore" function (the 4th last function of this script)
*/
//===================================================

// Options to be presented to user
function options(questNo) {
    switch (questNo) {
        case 0:
            setValue('aOptl', 't/(1-t^2)');
            setValue('bOptl', '(1-t^2)/t');
            setValue('cOptl', '(t^2+1)/t');
            setValue('dOptl', '(t^2-1)/t');
            break;
        case 1:
            setValue('aOptl', '284x17');
            setValue('bOptl', '285x17');
            setValue('cOptl', '284x16');
            setValue('dOptl', '285x16');
            break;
        case 2:
            setValue('aOptl', '4/15');
            setValue('bOptl', '8/15');
            setValue('cOptl', '12/15');
            setValue('dOptl', 'None of these');
            break;
        case 3:
            setValue('aOptl', '1');
            setValue('bOptl', '2');
            setValue('cOptl', '14');
            setValue('dOptl', '48');
            break;
        case 4:
            setValue('aOptl', '0');
            setValue('bOptl', '-53/3');
            setValue('cOptl', '53/3');
            setValue('dOptl', '67/3');
            break;
        case 5:
            setValue('aOptl', '3');
            setValue('bOptl', '4');
            setValue('cOptl', '5');
            setValue('dOptl', '6');
            break;
        case 6:
            setValue('aOptl', '1/2');
            setValue('bOptl', '1/3');
            setValue('cOptl', '1/6');
            setValue('dOptl', '-1');
            break;
        case 7:
            setValue('aOptl', '1/2');
            setValue('bOptl', '1/3');
            setValue('cOptl', '1');
            setValue('dOptl', '2');
            break;
        case 8:
            setValue('aOptl', '1,3');
            setValue('bOptl', '-3,-1');
            setValue('cOptl', '3,-1');
            setValue('dOptl', '-3,1');
            break;
        case 9:
            setValue('aOptl', '2');
            setValue('bOptl', '-2');
            setValue('cOptl', '0');
            setValue('dOptl', 'None');
            break;

    }

}

addListeners();
next();

function addListeners() {
    document.getElementById('previous').addEventListener('click', previous, false);
    document.getElementById("next").addEventListener('click', next, false);
    document.getElementById('next').addEventListener('mouseover', TooltipIn, false);
    document.getElementById('next').addEventListener('mouseout', TooltipOut, false);
    document.getElementById('previous').addEventListener('mouseover', TooltipIn, false);
    document.getElementById('previous').addEventListener('mouseout', TooltipOut, false);
    document.getElementById('submit').addEventListener('mouseover', function () { document.getElementById('SubmitTooltip').style.display = 'block' }, false);
    document.getElementById('submit').addEventListener('mouseout', function () { document.getElementById('SubmitTooltip').style.display = 'none' }, false);
    document.getElementById('submit').addEventListener('click', submit, false);
    document.getElementById('yesChoice').addEventListener('click', yes, false);
    document.getElementById('noChoice').addEventListener('click', no, false);
    document.getElementById('review').addEventListener('click',review,false);
    // Listeners for radion buttons
    radButtons = document.getElementsByClassName('Opt');
    for (var i = 0; i < radButtons.length; i++) {
        radButtons[i].addEventListener('click', handleToggle, false);
        radButtons[i].addEventListener('click', resetMessage, false);
        radButtons[i].addEventListener('mouseout', resetMessageOut, false);
    }
}

// Some functions to easily get and set labels' values
function getValue(element) {
    return document.getElementById(element).textContent;
}
function setValue(element, value) {
    document.getElementById(element).textContent = value;
}

// Button functions
function changeQ(elem){
    var val = elem.id;
    console.log(val);
    quesCount=val;
    console.log(quesCount);
    
    setValue('quesCount', 'Question ' + quesCount + ' of ' + questions.length);
    setValue('ques', questions[val - 1]);
    options(val - 1);

    if (!needsReset)
        setValue('score', 'Your score: ' + 0);
    handleSwitchToggle();
}

function review(){
    $(".box:nth-child(" + quesCount + ")").animate().css({
        backgroundColor: "purple"
      }, 2500);
}

function next() {
    if (quesCount == questions.length-1) {
        document.getElementById('next').setAttribute('disabled', 'disabled');
        document.getElementById('NextTooltip').style.display = 'none';
    }

    setValue('quesCount', 'Question ' + ++quesCount + ' of ' + questions.length);
    setValue('ques', questions[quesCount - 1]);
    options(quesCount - 1);
    if (quesCount > 1)
        document.getElementById('previous').removeAttribute('disabled');

    if (!needsReset)
        setValue('score', 'Your score: ' + 0);
    handleSwitchToggle();
}
function previous() {
    if (quesCount == 2) {
        document.getElementById('previous').setAttribute('disabled', 'disabled');
        document.getElementById('PreviousTooltip').style.display = 'none';
    }

    setValue('quesCount', 'Question ' + --quesCount + ' of ' + questions.length);
    setValue('ques', questions[quesCount - 1]);
    options(quesCount - 1);
    document.getElementById('next').removeAttribute('disabled');

    if (!needsReset)
        setValue('score', 'Your score: ' + 0);
    handleSwitchToggle();
}
function submit() {
    for (var i = 0; i < answers.length; i++)
        if (answers[i] == null) {
            document.getElementById('confBox').style.display = 'block';
            return;
        }
    handleSubmit();
}

// The confirmation dialog functions if user tries to submit without completing all questions
function yes() {
    document.getElementById('confBox').style.display = 'none';
    handleSubmit();
}
function no() {
    document.getElementById('confBox').style.display = 'none';
}

// Handle toggle events for radio buttons
function handleToggle(evt) {
    // Prevent user for choosing/changing options after submission
    if (needsReset) {
        for (var i = 0; i < radButtons.length; i++)
            if (i == answers[quesCount - 1] - 1)
                radButtons[i].checked = true;
            else
                radButtons[i].checked = false;
        return;
    }

    if (answerChecked && answers[quesCount - 1] == evt.target.value) {
        evt.target.checked = false;
        answerChecked = false;
        answers[quesCount - 1] = null;
        $(".box:nth-child(" + quesCount + ")").animate().css({
            backgroundColor: "pink"
          }, 2500);
    }
    else {
        evt.target.checked = true;
        answerChecked = true;
        answers[quesCount - 1] = evt.target.value;
        $(".box:nth-child(" + quesCount + ")").animate().css({
            backgroundColor: "green"
          }, 2500);
    }

}
// Radio button toggle handler when moving to another question
function handleSwitchToggle() {
    answerChecked = false;
    for (var i = 0; i < radButtons.length; i++)
        if (!(answers[quesCount - 1] != null && answers[quesCount - 1] - 1 == i))
            radButtons[i].checked = false;
        else {
            radButtons[i].checked = true;
            answerChecked = true;
        }
}

// The mouseover tooltips shown on buttons
function TooltipIn(evt) {
    document.getElementById(evt.target.value + 'Tooltip').style.display = 'block';
}
function TooltipOut(evt) {
    document.getElementById(evt.target.value + 'Tooltip').style.display = 'none';
}

// Calculates and displays final score, called by submit() or yes() functions
function handleSubmit() {
    needsReset = true;
    setValue('score', 'Your final quiz score: ' + calcScore() + '/' + questions.length);
    document.getElementById('submit').value = 'Reset';
    document.getElementById('submit').removeEventListener('click', submit, false);
    document.getElementById('submit').addEventListener('click', reset, false);
    document.getElementById('SubmitTooltip').textContent = 'Reset Quiz and Retry';
}

function calcScore() {
    var score = 0;
    var correctAnswers = [3, 0, 1, 2, 2, 1,2,2,2,3];
    for (var i = 0; i < answers.length; i++)
        if (answers[i] - 1 == correctAnswers[i])
            score++;
        else if(answers[i]!=null)
            score=score-0.25;
    return score;
}

function reset() {
    needsReset = false;
    document.getElementById('submit').value = 'Submit';
    document.getElementById('submit').removeEventListener('click', reset, false);
    document.getElementById('submit').addEventListener('click', submit, false);
    document.getElementById('SubmitTooltip').textContent = 'Submit Answers';
    quesCount = 0;
    for (var i = 0; i < answers.length; i++)
        answers[i] = null;
    document.getElementById('next').removeAttribute('disabled');
    document.getElementById('previous').setAttribute('disabled', 'disabled');
    setValue('score', null);
    next();
}

// If user tries to change answers after submitting quiz and without resetting, display an info message.
function resetMessage() {
    if (needsReset)
        document.getElementById('resetMessage').style.display = 'block';
}
function resetMessageOut() {
    if (needsReset)
        document.getElementById('resetMessage').style.display = 'none';
}

document.getElementById('timer').innerHTML =
  30 + ":" + 05;
startTimer();

function startTimer() {
  var presentTime = document.getElementById('timer').innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond((timeArray[1] - 1));
  if(s==59){m=m-1}
  if(m<0){
      alert("Time finished");
      handleSubmit();
    }
  
  document.getElementById('timer').innerHTML =
    m + ":" + s;
  setTimeout(startTimer, 1000);
}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
  if (sec < 0) {sec = "59"};
  return sec;
}

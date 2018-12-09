$(document).ready(function () {
    //tracks the question user is on
    var questionCounter = 0;

    // time between questions
    var ansTimeout = 3500;

    //score
    var correct = 0;
    var incorrect = 0;
    var skipped = 0;

    //array of user answers
    var userAns = [];

    //array containing all the trivia questions for the game
    var questions = [
        {
            question: "What is the capital of Finland?",
            choices: ["Havana", "Helsinki", "Jamestown", "Helena", "Finlandia"],
            choicesAnswer: 1
        },
        {
            question: "In what country will you find the city of Tblisi?",
            choices: ["South Africa", "Canada", "Brazil", "Georgia", "Russia"],
            choicesAnswer: 3
        },
        {
            question: "How tall is the Eiffel Tower?",
            choices: ["200 ft.", "750 ft.", "27 ft.", "984 ft.", "2,000 ft."],
            choicesAnswer: 3
        },
        {
            question: "What are the primary languages spoke in Belgium?",
            choices: ["Waffles/Beer", "Belgian/German", "German/French", "Pig Latin/Esperanto", "Dutch/French"],
            choicesAnswer: 4
        },
        {
            question: "Who is the Prime Minister of Great Britain?",
            choices: ["Robert Stack", "Edmund Hillary", "Prince Charles", "Meghan Markle", "Theresa May"],
            choicesAnswer: 4
        },
        {
            question: "What is the population of Canada?",
            choices: ["15 mil.", "37 mil.", "150 mil.", "600K", "14 mil."],
            choicesAnswer: 1
        },
        {
            question: "What is the capital of Armenia?",
            choices: ["Yosem", "Krandar", "Yerevan", "Jonestown", "San Diego"],
            choicesAnswer: 2
        }];


        //submit user answer function
        function submitAns() {
            $("#submit").on("click", function (e) {
                e.preventDefault();
                userAns.length = 0;

                //capture user answer
                var userSelection = $("#responses input:radio[name=optionsRadios]:checked").val();
                userAns.push(userSelection);
                console.log(userAns);
                nextQ();
            });
        };

    //question timer
    var timeLeft = 15;
    var increment;

    function runTimer() {
        increment = setInterval(decrement, 1000);
    };

    function decrement() {
        timeLeft--;
        $("#time-left").html("Time: " + timeLeft + " seconds");
        if (timeLeft === 0) {
            stopTimer();
            userAns.length = 0;
            //captures user selection
            var userSelection = $("#responses input:radio[name=optionsRadios]:checked").val();
            userAns.push(userSelection);
            console.log(userAns);
            nextQ();
        };
    };

    function resetTimer() {
        timeLeft = 15;
        $("#time-left").html("Time: " + timeLeft + " seconds");
    };

    function displayTimer() {
        $("#time-left").html("");
    };

    function stopTimer() {
        clearInterval(increment);
    };

    //response options > radio buttons
    function createRadios() {
        var responseOptions = $("#responses");
        
        responseOptions.empty();

        for (var i = 0; i < questions[questionCounter].choices.length; i++) {
            responseOptions.append('<label><input type="radio" name="optionsRadios" id="optionsRadios2" value="' + [i] + '"><div class="twd-opt">' + questions[questionCounter].choices[i] + '</div></input><br></label>');
        };
    };

    //displays the current question
    function displayQ() {
        clearQ();
        resetTimer();
        $(".question").html(questions[questionCounter].question);
        //creates question options and radio buttons
        createRadios();
        //submit answer
        $("#submit-div").append('<button type="submit" class="btn btn-default" id="submit">' + "submit" + '</button>');
        runTimer()
        submitAns();
    };

    //start page
    function displayStart() {
        $("#start-it").append('<a href="#" class="btn btn-primary btn-lg" id="start-button">' + "start" + '</a>');
        //start the gae
        $("#start-button").on("click", function (event) {
            event.preventDefault();
            //the first question
            firstQ();
            resetTimer();
        });
    };

    //game reset
    function reset() {
        questionCounter = 0;
        correct = 0;
        incorrect = 0;
        skipped = 0;
        userAns = [];
        resetTimer();
    };

    //display final results of game
    function displayEnd() {
        clearQ();
        $("#content").append('<h3>' + "correct: " + correct + '</h3><br><h3>' + "incorrect : " + incorrect + '</h3><br><h3>' + "skipped: " + skipped + '</h3><br><br><a href="#" class="btn btn-primary btn-lg" id="restart-button">' + "play again" + '</a>');
        //play again, restart
        $("#restart-button").on("click", function (event) {
            event.preventDefault();
            //back to question 1
            reset();
            clearQ();
            displayStart();
        });
    };

    //clear
    function clearQ() {
        var questionDiv = $(".question");
        questionDiv.empty();

        var responsesDiv = $("#responses");
        responsesDiv.empty();

        var submitDiv = $("#submit-div");
        submitDiv.empty();

        var contentDiv = $("#content");
        contentDiv.empty();

        var contentDiv = $("#start-it");
        contentDiv.empty();

        stopTimer();
    };

    //check the answer, correct / incorrect
    function checkQ() {
        clearQ();
        var correctAnswer = questions[questionCounter].choicesAnswer;
        if (userAns[0] == questions[questionCounter].choicesAnswer) {
            $("#content").append('<h3>' + "CORRECT!!" + '</h3>');
            correct++;
            displayTimer();
        }
        else if (userAns[0] === undefined) {
            $("#content").append('<h3>' + "TIME!" + '</h3><br><br><h3>' + "the answer was: " + questions[questionCounter].choices[correctAnswer] + '</h3>');
            skipped++;
            displayTimer();
        }
        else {
            $("#content").append('<h3>' + "sorry, that's not quite right." + '</h3><br><br><h3>' + "the correct answer was: " + questions[questionCounter].choices[correctAnswer] + '</h3>');
            incorrect++;
            displayTimer();
        };
    };

    //function to move to the next question
    function nextQ() {
        checkQ();
        //count plus 1
        questionCounter++;
        
        if (questionCounter === questions.length) {
            setTimeout(displayEnd, ansTimeout);
        }
        else {
            setTimeout(displayQ, ansTimeout);
        };
    };

    //start the game, calls q1
    function firstQ() {
        var startContent = $("#content");
        startContent.empty();
        displayQ();
    };

    //display start page
    displayStart();

});
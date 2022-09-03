let hiddenName = "Jamie Vardy";
let hiddenTeam = "Leicester City";
let hiddenNationality = "ENG";
let hiddenPosition = "ST";
let hiddenRating = 86;

if(localStorage.getItem("Bool2") == "true"){
    hiddenName = "Trent Alexander-Arnold";
    hiddenPosition = "RB";
    hiddenTeam = "Liverpool";
    hiddenRating = 87;
    hiddenNationality = "ENG";
}

let index = -1;
let track = 0;
let realNames = [];
let arrow = "";

let guessName;
let guessCount = 0;
let score = 0;

let messageWon1 = "You Won!";
let messageWon2 = "Correct, the player was indeed ";

let messageLost1 = "You Lost!";
let messageLost2 = "The player was ";

let count = 1;

let bool = false;

let num = 0;

let guesses = [];

let length = 0;

function choice1(){
    window.open("index.html", "_self");
    localStorage.setItem("Button", "All");
}
function choice3(){
    window.open("index2.html", "_self");
    localStorage.setItem("Button", "Prem");
}
function choice2(){
    window.open("index3.html", "_self");
    localStorage.setItem("Button", "Top");
}

function challenge(){
    document.getElementById("popup3").classList.toggle("active");
    document.getElementById("header3").innerHTML = "Mission Impossible";
    document.getElementById("para3").innerHTML = "Earn the Master Detective Badge by guessing all 3 daily players in less than or equal to a combined total of 7 guesses! Each player guessed is worth 10 points minus each guess you made. You need to score at least 23 points to earn the badge. Is this the impossible feat, maybe, let's see if you can make it possible!";
}

function filterList(){
    let touch1 = false;
    let touch2 = false;
    let touch3 = false;
    let touch4 = false;

    document.getElementById("option1").style.display = 'block';
    document.getElementById("option3").style.display = 'block';
    document.getElementById("option4").style.display = 'block';
    document.getElementById("option2").style.display = 'block';


    let value = document.getElementById('txtGuess').value;
    
    if(value.length > 0){
        document.getElementById("box").style.display = 'block';
    }
    else {
        document.getElementById("box").style.display = 'none';
    }
    
    value = value.toUpperCase();
    
      for(var i = names.length - 1; i >= 0; --i){
        let name = names[i];
        name = name.toUpperCase();

        if(name.includes(value)){
            if(count == 1){
                document.getElementById("option1").innerHTML = names[i];
                touch1 = true;
            }
            else if(count == 2){
                document.getElementById("option2").innerHTML = names[i];
                touch2 = true;
            }
            else if(count == 3){
                document.getElementById("option3").innerHTML = names[i];
                touch3 = true;
            }
            else if(count == 4){
                document.getElementById("option4").innerHTML = names[i];
                touch4 = true;
            }
            ++num;
            ++count;
        }

        if(count > 4){
            count = 1;
        }
    }

    let option1 = document.getElementById("option1").innerText;
    let option2 = document.getElementById("option2").innerText;
    let option3 = document.getElementById("option3").innerText;
    let option4 = document.getElementById("option4").innerText;

    
    if(touch1 == false){
        option1 = '';
        document.getElementById("option1").style.display = 'none';
    } 
    
    if(touch2 == false){
        option2 = '';
        document.getElementById("option2").style.display = 'none';
    } 

    if(touch3 == false){
        option3 = '';
        document.getElementById("option3").innerText = '';
        document.getElementById("option3").style.display = 'none';
    } 
    
    if(touch4 == false){
        option4 = '';
        document.getElementById("option4").style.display = 'none';
    } 



    if(option1 == option2 || option1 == option3 || option1 == option4){
        document.getElementById("option1").style.display = 'none';
    }
    
    if(option2 == option4 || option3 == option4){
        document.getElementById("option4").style.display = 'none';
    }

    if(option3 == option2 ){
        document.getElementById("option2").style.display = 'none';
    }


    if(bool == false){
        document.getElementById("textButton").disabled = true;
    }

    if(num == 0){
        document.getElementById("box").style.display = 'none';
    }

    num = 0;
}

function input(elem){
    document.getElementById("txtGuess").value = elem.innerHTML;
    document.querySelector("#box").style.display = 'none';
    bool = true;
    document.getElementById("textButton").disabled = false;
}

function clicked(){
    localStorage.setItem("result2", "");

    guessName = document.getElementById("txtGuess").value;

    if(guessName == ""){
        return;
    }
    document.getElementById("option1").value = guessName;

    if(guessCount == 0 || guessCount == null){
        guessCount += 2;
    }
    else {
        ++guessCount;
    }

    localStorage.setItem("GuessCount2", guessCount);

    console.log("Count: " + guessCount);

    guesses.push(guessName);
    
    if(guessCount <= 9){
        document.getElementById("txtGuess").setAttribute("placeholder", "Guess " + (guessCount) + " of 8");
        validatingGuess();
        displayingGuess();
    }

    if(guessCount == 9 && localStorage.getItem("result2") != "won"){
        togglePopup(messageLost1, messageLost2);
        document.getElementById("txtGuess").setAttribute("placeholder", "Game Over!");
        localStorage.setItem("result2", "lost");
        displayCorrect();
    }

    ++length;
    localStorage.setItem("length", length);
    saveData();
}

function validatingGuess(){
    for(var j = 0; j < names.length; ++j){
        realNames.push(names[j]);
        realNames[j] = realNames[j].toUpperCase();
        guessName = guessName.toUpperCase();
        if(guessName == realNames[j]){
            index = j;
        }
    }
    makeArrow();
}

function displayingGuess(num){
    if(index == -1){
        if(num != 100){
            --guessCount;
        }
        if(localStorage.getItem("result2") == "won"){
            document.getElementById("txtGuess").setAttribute("placeholder", "You solved it in " + (guessCount) + "!");
        }
        else if(localStorage.getItem("result2") == "lost"){
            document.getElementById("txtGuess").setAttribute("placeholder", "Game Over!");
        }
        else if(guessCount == null){
            guessCount = null;
        }
        else {
            document.getElementById("txtGuess").setAttribute("placeholder", "Guess " + (guessCount) + " of 8");
        }
        clear();
        return;
    }
    var table = document.getElementById("mainTable");
    var row = table.insertRow();
    var cell1 = row.insertCell();
    var cell2 = row.insertCell();
    var cell3 = row.insertCell();
    var cell4 = row.insertCell();
    var cell5 = row.insertCell();
    
    cell1.innerHTML = names[index];
    cell2.innerHTML = nationality[index];
    cell3.innerHTML = teams[index];
    cell4.innerHTML = position[index];
    cell5.innerHTML = rating[index] + arrow;
    
    if(hiddenName == names[index]){
        cell1.style.backgroundColor = "green";
        ++track;
    }
    if(hiddenNationality == nationality[index]){
        cell2.style.backgroundColor = "green";
        ++track;
    }
    
    if(hiddenTeam == teams[index]){
        cell3.style.backgroundColor = "green";
        ++track;
    }
    
    if(hiddenPosition == position[index]){
        cell4.style.backgroundColor = "green";
        ++track;
    }
    
    if(hiddenRating == rating[index]){
        cell5.style.backgroundColor = "green";
        ++track;
    }
    else if((hiddenRating - rating[index] == 2) || (hiddenRating - rating[index] == -2) || (hiddenRating - rating[index] == -1) || (hiddenRating - rating[index] == 1)){
        cell5.style.backgroundColor = "yellow";
    }
    
    if(track == 5){
        --guessCount;
        if(localStorage.getItem("result2") != "won"){
            score = localStorage.getItem("Score");
            score = parseInt(localStorage.Score);   
            score = score + 10 - (guessCount - 1);
            localStorage.setItem("Score", score);
            document.getElementById("Score").innerHTML = "Score: " + score;
        }
        localStorage.setItem("result2", "won");
        togglePopup(messageWon1, messageWon2);
        if(score >= 23){
            badge();
        }
    }
    else {
        clear();
    }
    
    track = 0;

    index = -1;
}

function badge(){
    document.getElementById("popup4").classList.toggle("active");
    document.getElementById("header4").innerHTML = "Congratulations!";
    document.getElementById("para4").innerHTML = "You have earned the Master Detective badge by accomplishing the impossible by scoring more than 22 points, well done!";
}

function togglePopup(message1, message2){
    if(localStorage.getItem("Bool2") == "true"){
        document.getElementById("player").src = "images/skysports-trent-alexander-arnold_5502269.jpg";
    }
    
    document.getElementById("txtGuess").value = "";
    
    if(localStorage.getItem("result2") == "won"){
        document.getElementById("txtGuess").setAttribute("placeholder", "You solved it in " + (guessCount) + "!");
    }

    document.getElementById("popup1").classList.toggle("active");
    
    document.getElementById("header1").innerHTML = message1;
    document.getElementById("para").innerHTML = message2 + hiddenName + "!";
    
    document.getElementById("txtGuess").setAttribute("readOnly", "readOnly");
    document.getElementById("textButton").setAttribute("disabled", "disabled");

    document.getElementById("box").style.display = 'none';
    document.getElementById("player").style.display = "block";

    let x  = setInterval(function() {

        let countdownDate = new Date();
        countdownDate.setHours(23, 59, 59);

        if(localStorage.getItem("Bool") == "true"){
            countdownDate = new Date();
            countdownDate.setHours(23, 59, 59);
        }

        let now = new Date();

        let distance = countdownDate - now;

        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if(hours < 10){
            hours = "0" + hours;
        }
        
        if(minutes < 10){
            minutes = "0" + minutes;
        }

        if(seconds < 10){
            seconds = "0" + seconds;
        }

        document.getElementById("time").innerHTML = hours + " : " + minutes + " : " + seconds;

        if(distance <= 0){
            localStorage.clear();
            localStorage.setItem("Bool2", "true");
            window.location.reload();
            document.getElementById("player").src = "images/skysports-trent-alexander-arnold_5502269.jpg";
            console.log("Midnight");
         }

    }, 1000);
    
}

function rulesPopup(){
    document.getElementById("popup2").classList.toggle("active");
    
    document.getElementById("header2").innerHTML = "How to Play";
    document.getElementById("para2").innerHTML = "Find the mystery player in 8 guesses to win the game. Start by guessing a random player and find out information about the mystery player. If a characteristic turns green, then that means the mystery player has the same characteristic. If it turns yellow, then the mystery player is close to this characteristic. If the block remains white, then the mystery player is not related to the characteristic. Now, get out there and find this mysterious player!";
}

function clear(){
    let text = document.getElementById("txtGuess");
    text.value = "";
}

function displayCorrect(){
    var table = document.getElementById("mainTable");
    var row = table.insertRow();

    var cell1 = row.insertCell();
    var cell2 = row.insertCell();
    var cell3 = row.insertCell();
    var cell4 = row.insertCell();
    var cell5 = row.insertCell();

    cell1.innerHTML = hiddenName;
    cell2.innerHTML = hiddenNationality;
    cell3.innerHTML = hiddenTeam;
    cell4.innerHTML = hiddenPosition;
    cell5.innerHTML = hiddenRating;

    cell1.style.backgroundColor = "red";
    cell2.style.backgroundColor = "red";
    cell3.style.backgroundColor = "red";
    cell4.style.backgroundColor = "red";
    cell5.style.backgroundColor = "red";
}

function saveData(){
    for(var i = 0; i < localStorage.getItem("length"); ++i){
        if(i == 0){
            localStorage.setItem("name1B", guesses[i]);
        }
        if(i == 1){
            localStorage.setItem("name2B", guesses[i]);
        }

        if(i == 2){
            localStorage.setItem("name3B", guesses[i]);
        }

        if(i == 3){
            localStorage.setItem("name4B", guesses[i]);
        }

        if(i == 4){
            localStorage.setItem("name5B", guesses[i]);
        }

        if(i == 5){
            localStorage.setItem("name6B", guesses[i]);
        }

        if(i == 6){
            localStorage.setItem("name7B", guesses[i]);
        }

        if(i == 7){
            localStorage.setItem("name8B", guesses[i]);
        }
    }
}

function loadData(){
    document.getElementById("Prem").style.backgroundColor = "beige";

    let now = new Date();
    let tomorrow = new Date("August 2, 2022 00:00:00");

    if(localStorage.getItem("Bool2") == "true"){
        hiddenName = "Trent Alexander-Arnold";
        hiddenPosition = "RB";
        hiddenTeam = "Liverpool";
        hiddenRating = 87;
        hiddenNationality = "ENG";
    }

    length = localStorage.getItem("length");

    guessCount = localStorage.getItem("GuessCount2");

    i = guessCount;

    if(i == 1){
        guesses.push(localStorage.getItem("name1B"));
    }
    else if(i == 2){
        guesses.push(localStorage.getItem("name1B"));
        guesses.push(localStorage.getItem("name2B"));
    }
    else if(i == 3){
        guesses.push(localStorage.getItem("name1B"));
        guesses.push(localStorage.getItem("name2B"));
        guesses.push(localStorage.getItem("name3B"));
    }
    else if(i == 4){
        guesses.push(localStorage.getItem("name1B"));
        guesses.push(localStorage.getItem("name2B"));
        guesses.push(localStorage.getItem("name3B"));
        guesses.push(localStorage.getItem("name4B"));
    }
    else if(i == 5){
        guesses.push(localStorage.getItem("name1B"));
        guesses.push(localStorage.getItem("name2B"));
        guesses.push(localStorage.getItem("name3B"));
        guesses.push(localStorage.getItem("name4B"));
        guesses.push(localStorage.getItem("name5B"));
    }
    else if(i == 6){
        guesses.push(localStorage.getItem("name1B"));
        guesses.push(localStorage.getItem("name2B"));
        guesses.push(localStorage.getItem("name3B"));
        guesses.push(localStorage.getItem("name4B"));
        guesses.push(localStorage.getItem("name5B"));
        guesses.push(localStorage.getItem("name6B"));
    }
    else if(i == 7){
        guesses.push(localStorage.getItem("name1B"));
        guesses.push(localStorage.getItem("name2B"));
        guesses.push(localStorage.getItem("name3B"));
        guesses.push(localStorage.getItem("name4B"));
        guesses.push(localStorage.getItem("name5B"));
        guesses.push(localStorage.getItem("name6B"));
        guesses.push(localStorage.getItem("name7B"));
    }
    else if(i == 8){
        guesses.push(localStorage.getItem("name1B"));
        guesses.push(localStorage.getItem("name2B"));
        guesses.push(localStorage.getItem("name3B"));
        guesses.push(localStorage.getItem("name4B"));
        guesses.push(localStorage.getItem("name5B"));
        guesses.push(localStorage.getItem("name6B"));
        guesses.push(localStorage.getItem("name7B"));
        guesses.push(localStorage.getItem("name8B"));
    }
    
    check(localStorage.getItem("name1B"));
    check(localStorage.getItem("name2B"));
    check(localStorage.getItem("name3B"));
    check(localStorage.getItem("name4B"));
    check(localStorage.getItem("name5B"));
    check(localStorage.getItem("name6B"));
    check(localStorage.getItem("name7B"));
    check(localStorage.getItem("name8B"));

    if(localStorage.getItem("result2") == "lost"){
        displayCorrect();
        togglePopup(messageLost1, messageLost2);
        document.getElementById("txtGuess").setAttribute("placeholder", "Game Over!");
    }

    console.log("Count(): " + guessCount);

    if(localStorage.getItem("Score") == null){
        localStorage.setItem("Score", 0);
    }
    
    document.getElementById("Score").innerHTML = "Score: " + localStorage.getItem("Score");

}

function check(name){
    for(var i = 0; i < names.length; ++i){
        if(names[i] == name){
            index = i;
            makeArrow();
            break;
        }
    }
    displayingGuess(100);
}

function makeArrow(){
    if(rating[index] < hiddenRating){
        arrow = "  ↑";
    }
    else if(rating[index] == hiddenRating){
        arrow = "";
    }
    else {
        arrow = "  ↓";
    }
}


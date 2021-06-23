let url = "http://numbersapi.com/random/year?json&fragment";

let score = 0;

function startGame(){
    for(i = 1; i < 5; i++){
        document.getElementById("btn" + i).style.visibility = "visible";
    }

    return getInfo(url);
}

async function getInfo(url) {

    let response = await fetch(url);
    let text = await response.text();
    
    let eventObj = JSON.parse(text);

    console.log(eventObj);

    let eventText = "____:" + " " + eventObj.text;

    document.getElementById("startBtn").style.visibility = "hidden";
    document.getElementById("event").innerText = eventText + ".";

    return generateAnswers(eventObj);
}

function generateAnswers(eventObj){
    let correctAnswer = eventObj.number;
    let min = -25;
    let max = 25;

    const answers = [correctAnswer];

    //Generate answers
    let i = 1
    while(i < 4){
        randNum = eventObj.number + Math.floor(Math.random() * (max - min + 1) ) + min;
        if(!(answers.includes(randNum))){
            answers[i] = randNum;
            i++;
        }
    }
    
    console.log(answers);

    //Randomize answers by shuffling
    for(j = answers.length - 1; j > 1; j --){
        let randIndex = Math.floor(Math.random() * (j + 1));
        [answers[j], answers[randIndex]] = [answers[randIndex], answers[j]];
    }
    console.log(answers);

    document.getElementById("btn1").innerText = answers[0];
    document.getElementById("btn2").innerText = answers[1];
    document.getElementById("btn3").innerText = answers[2];
    document.getElementById("btn4").innerText = answers[3];

    return getAnswer(correctAnswer);
}

function getAnswer(correctAnswer){
    document.getElementById("answer").value = correctAnswer;
}

function evaluateAnswer(answer){
    let correctAnswer = document.getElementById("answer").value;
    console.log(typeof(correctAnswer));
    
    if(Number(answer) == correctAnswer){
        $('.toast').toast('show')
        document.getElementById("score").innerText = score += 1;
        return getInfo(url);
    } else{
        for(i = 1; i < 5; i++){
            document.getElementById("btn" + i).style.visibility = "hidden";
        }
        document.getElementById("event").innerText = "Incorrect. The answer was " + correctAnswer + ". " + "The number of questions you answered correctly was " + score + ".";
        document.getElementById("startBtn").style.visibility = "visible";
        document.getElementById("score").innerText =  0;
        score = 0;
    }
}
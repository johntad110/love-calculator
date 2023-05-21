
const yourName = document.forms["info-form"]["yours"];
const loversName = document.forms["info-form"]["lovers"];

String.prototype.count = function(char) {
    let count = 0;

    this.split('').forEach(item => {
        if (item === char) {
            count++;
        }
    });
    return count;
}

function sanitize(list) {
    sanitized_list = [];
    list.forEach(function(num) {
        let digits = num.toString().split('');
        digits.map(Number).forEach((n) => {
            sanitized_list.push(n);
        });
    });
    return sanitized_list;
}

function calculate() {
    let love_str = (yourName.value + "loves" + loversName.value).toLowerCase();

    // Each unique char in love string.
    let unique_chars = [];
    love_str.split('').forEach(char => {
        if (!unique_chars.includes(char)) {
            unique_chars.push(char)
        }
    });

    // How many times each unique char occurs in the love string.
    let char_count = [];
    for (const c of unique_chars) {
        char_count.push(love_str.count(c));
    }
    char_count = sanitize(char_count);
    console.log(char_count);

    do {
        char_count[0] += char_count.pop();
        char_count = sanitize(char_count);
    } while (char_count.length > 2)

    return `${(char_count[0] * 10) + char_count[1]}%`

}

function show_love_score() {

    document.querySelector('.tell-me').style.display = "none";
    if (yourName.value === '' || loversName.value === '') {
        console.log("Clicked and is empty");
        document.querySelector('.tell-me').style.display = "block";
        return false;
    }

    const love_stmnt = document.querySelector(".love-stmnt");
    love_stmnt.style.fontSize = "160%";
    document.querySelectorAll(".share-stmnt")[1].innerHTML = "Wow! Amazing Score. Want to share?";
    document.querySelector(".share-score-area").style.display = "none";

    var dont_calculate = ['yoseph', 'yohannes', 'joseph', 'john', 'josi', 'jo'];

    if (dont_calculate.includes(yourName.value.toLowerCase()) || dont_calculate.includes(loversName.value.toLowerCase())) {
        console.log("I know I don't have to calcualte that.");
        love_stmnt.innerHTML = "Sorry! But, I can't calculate that.🤨 My maker forbids me from doing so.☹️";
        love_stmnt.style.fontSize = "100%";
        return false;
    }

    var love_score = calculate();

    if (yourName.value.toLowerCase() === loversName.value.toLowerCase()) {
        love_stmnt.innerHTML = `You love yourself this much?😂`
        document.querySelectorAll(".share-stmnt")[1].innerHTML = "You have to share it.🤣";
        document.querySelector(".share-score-area").style.display = "block";
    } else {
        love_stmnt.innerHTML = `${yourName.value} Loves ${loversName.value}`;
    }

    const score = document.querySelector(".score");
    score.innerHTML = love_score;

    if (parseInt(love_score.substring(0, love_score.length - 1)) > 70) {
        document.querySelector(".share-score-area").style.display = "block";
    }

    return false;
}

document.querySelector("button").onclick = show_love_score;

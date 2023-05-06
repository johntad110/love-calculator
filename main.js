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
    const yourName = document.forms["info-form"]["yours"].value;
    const loversName = document.forms["info-form"]["lovers"].value;

    let love_str = (yourName + "loves" + loversName).toLowerCase();

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
    const score = document.querySelector(".score");
    score.innerHTML = calculate();
    
    return false;
}

document.querySelector("button").onclick = show_love_score;
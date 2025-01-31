// Global Values
let userIsTyping = false;
let typingDurationTimer = 20;
let timerInterval;

let userScore = 0;

document.addEventListener('DOMContentLoaded', function() {

    //Functions bar functionality
    const functionElements = document.querySelectorAll('.toggle');
    for (let optionToggle of functionElements) {
        optionToggle.addEventListener('click', function() {
            this.classList.toggle('selected');
            formatText();
        });
    }

    const durationSelect = document.getElementById('duration-select');
    durationSelect.addEventListener('change', function() {
        typingDurationTimer = parseInt(this.value);
        formatText();
    });

    const difficultySelect = document.getElementById('difficulty-select');
    difficultySelect.addEventListener('change', function() {
        formatText();
        // Implement difficulty settings
    });

    formatText();
    getUserInput();
});


function generateText() {
    const words = ['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I', 
        'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
        'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
        'what', 'go', 'their', 'can', 'who', 'get', 'if', 'would', 'my', 'make',
        'about', 'know', 'will', 'up', 'one', 'time', 'there', 'year', 'so', 'think',
        'when', 'which', 'them', 'some', 'me', 'people', 'take', 'out', 'into', 'just'];
    
    const mediumWords = ['abruptly', 'absurd', 'avenue', 'awkward', 'bagpipes', 'bandwagon', 'banjo', 
        'bungler', 'croquet', 'crypt', 'dwarves', 'fervid', 'fishhook', 'fjord', 'gazebo', 'haiku', 'haphazard', 'hyphen', 
        'ivory', 'jazzy', 'jiffy', 'jinx', 'jukebox', 'kayak', 'kiosk', 'klutz', 'memento', 'mystify', 'numbskull', 'ostracize', 
        'oxygen', 'pajama', 'phlegm', 'pixel', 'polka', 'quad', 'quip', 'rhythmic', 'rogue', 'sphinx', 'squawk', 'swivel', 'toady',
        'twelfth', 'unzip', 'waxy', 'wildebeest', 'yacht', 'zealous'];
    
    const hardWords = ['abacinate', 'aberration', 'absquatulate', 'alexithymia', 'anfractuous', 'apocryphal', 'boustrophedon', 
        'callipygian', 'circumlocution', 'contumacious', 'defenestration', 'discombobulate', 'disingenuous', 'dodecahedron', 
        'eleemosynary', 'ephemeral', 'heterogeneous', 'incomprehensibilities', 'indubitably', 'magnanimous', 'multitudinous', 
        'onomatopoeia', 'perspicacious', 'quintessential', 'sesquipedalian', 'uncharacteristically'];
        
    let text = '';

    
    const difficultySelect = document.getElementById('difficulty-select').value;
    let textLength
    let wordList;

    if (difficultySelect === 'easy') {
        wordList = words;
        textLength = Math.min(Math.floor(window.innerWidth / 8), 100);
    } else if (difficultySelect === 'medium') {
        wordList = words.concat(mediumWords);
        textLength = Math.min(Math.floor(window.innerWidth / 10), 80);
    } else if (difficultySelect === 'hard') {
        wordList = words.concat(mediumWords, hardWords);
        textLength = Math.min(Math.floor(window.innerWidth / 12), 60);
    }

    for (let i = 0; i < textLength; i++) {
        text += wordList[Math.floor(Math.random() * wordList.length)] + ' ';
    }

    return text.trim();
}

/**
 * Handles the user input text.
 */
function getUserInput() {
    const typeBox = document.getElementById('type-area');
    const placeholderText = typeBox.querySelector('.placeholder');
    const userTextElement = typeBox.querySelector('.user-text');
    userTextElement.textContent = '';

    document.addEventListener('keydown', function(e) {
        const targetText = placeholderText.textContent;
        const currentText = userTextElement.textContent;
        
        if ((!e.ctrlKey && !e.altKey && !e.metaKey && e.key.length === 1) || e.key === 'Backspace') {

            if (!userIsTyping) {
                userIsTyping = true;
                startTimer();
            }

            if (currentText.length < targetText.length && e.key === targetText[currentText.length]) {
                userTextElement.textContent += e.key;
            }
            
            else if (e.key === 'Backspace') {
                userTextElement.textContent = userTextElement.textContent.slice(0, -1);
            }

            else wrongInput();
        }

        //Caps Lock Alert
        if (e.getModifierState('CapsLock')) {
            document.querySelector('.caps-alert').classList.add('caps-enabled');
        } else {
            document.querySelector('.caps-alert').classList.remove('caps-enabled');
        }

        //Generate new text if user completes the current text
        if(userTextElement.textContent === targetText) {
            formatText();
        }

    });
}

function wrongInput() {
    const userTextElement = document.querySelector('.user-text');
    userTextElement.classList.add('wrong-input');
    setTimeout(() => {
        userTextElement.classList.remove('wrong-input');
    }, 100);
}

/**
 * Creates a paragraph of text for the user to type.
 * Formats depending on any selected formatting options.
 */

function formatText() {
    //If the user is typing, we do not want to reset the timer
    if (!userIsTyping) {
        startTimer()
    }
    //If the user is typing, and this function is called to regenerate text, we want to cache the previous value of user-text before resetting it
    if (userIsTyping) {
        userScore += document.querySelector('.user-text').textContent.split(' ').length;
    }
    //Generate New Text and clear User Input
    let textContent = generateText();
    document.querySelector('.user-text').textContent = '';
    //Check selected options
    let addPunctuation = document.querySelector(`[data-type="punctuation"]`).classList.contains('selected');
    let addNumbers = document.querySelector(`[data-type="numerical"]`).classList.contains('selected');
    //Format text
    if (addPunctuation) {
        formatPunctuation(textContent);
        textContent = document.querySelector('.placeholder').textContent;
    } 
    if (addNumbers) {
        formatNumbers(textContent);
        textContent = document.querySelector('.placeholder').textContent;
    } 
    document.querySelector('.placeholder').textContent = textContent;
}


//Text formatting functions

function formatPunctuation(text) {
    const words = text.split(' ');              // split paragraph into word array
    let result = '';                            // variable to hold new string  
    let shouldCapitalize = true;                // flag to capitalize first word

    for (let i = 0; i < words.length; i++) {

        if (shouldCapitalize) {                 // capitalize first word

            words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
            shouldCapitalize = false;
        }

        result += words[i];                     // append word to result string

        if (i < words.length - 1) {             // if not the last word
            if (Math.random() < 0.1) {          // 10% chance of adding a period
                result += '. ';
                shouldCapitalize = true;        // next word should be capitalized
            }
            else if (Math.random() < 0.05) {     // 5% chance of adding a comma
                result += ', ';
            }
            else result += ' ';                 // else add a space bewteen words
        }

        if (i === words.length - 1) {           // if last word
            result += '.';                      // add a period
        }
    }
    document.querySelector('.placeholder').textContent = result;
}

function formatNumbers(text) {
    const words = text.split(' ');
    let result = '';

    for (let i = 0; i < words.length; i++) {
        result += words[i];

        if (Math.random() < 0.04) {                                     // 4% chance to add a number
            const numLength = Math.floor(Math.random() * 3) + 3;        // random length 3-5
            const num = Math.floor(Math.random() * Math.pow(10, numLength));
            result += ' ' + num;
        }

        if (i < words.length - 1) result += ' ';
    }
    document.querySelector('.placeholder').textContent = result;
}

//Timer functions

function startTimer() {
    const timerElement = document.querySelector('.number');
    timeLeft = typingDurationTimer; 
    
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    timerElement.textContent = timeLeft;

    timerInterval = setInterval(() => {
        if (userIsTyping) {
            if (timeLeft > 0) {
                timeLeft--;
                timerElement.innerText = timeLeft;
            } else {
                clearInterval(timerInterval);
                calculateWPM();
            }
        } 
    }, 1000);
}

function calculateWPM() {
    //Hide Typing Area
    document.getElementById('type-area').classList.add('hidden');
    //replace timer div with WPM result
    document.getElementById('timer').classList.add('hidden');
    document.getElementById('results-area').classList.remove('hidden');
    document.querySelector('#results-area button').addEventListener('click', resetTyper);
    //calculate and set WPM. ((user-text + previous scores) / time ) * 60
    let wordsPerMinute = ((document.querySelector('.user-text').textContent.split(' ').length + userScore) / typingDurationTimer) * 60;
    document.getElementById('results-area').firstElementChild.textContent = `WPM: ${Math.round(wordsPerMinute)}`;
}

function resetTyper() {
    document.getElementById('results-area').classList.add('hidden');
    document.getElementById('timer').classList.remove('hidden');
    //Set bool to false and reset previous additional score count.
    userIsTyping = false;
    userScore = 0;
    //format text
    formatText();
    //show typing area
    document.getElementById('type-area').classList.remove('hidden');
}
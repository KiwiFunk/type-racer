document.addEventListener('DOMContentLoaded', function() {

    //Functions bar functionality
    const functionElements = document.querySelectorAll('.toggle');
    for (let optionToggle of functionElements) {
        optionToggle.addEventListener('click', function() {
            this.classList.toggle('selected');
            formatText();
        });
    }
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

    let text = '';
    // Use VW to calculate the number of words to generate
    for (let i = 0; i < 100; i++) {
        text += words[Math.floor(Math.random() * words.length)] + ' ';
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
            if (currentText.length < targetText.length && e.key === targetText[currentText.length]) {
                userTextElement.textContent += e.key;
            }
            
            else if (e.key === 'Backspace') {
                userTextElement.textContent = userTextElement.textContent.slice(0, -1);
            }

            else wrongInput();
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

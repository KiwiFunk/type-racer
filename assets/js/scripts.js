document.addEventListener('DOMContentLoaded', function() {

    //Functions bar functionality
    const functionElements = document.querySelectorAll('.toggle');
    for (let optionToggle of functionElements) {
        optionToggle.addEventListener('click', function() {
            this.classList.toggle('selected');

            let optionType = this.getAttribute('data-type');
            formatText(optionType);

        });
    }

    populateTextArea();
    getUserInput();
});

function populateTextArea() {
    const typeBox = document.getElementById('type-area');
    const placeholderText = typeBox.querySelector('.placeholder'); 
    const userTextElement = typeBox.querySelector('.user-text');
    placeholderText.textContent = generateText();
}

function generateText() {
    const words = ['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I', 
        'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
        'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she'];

    let text = '';
    const paragraphs = 2 + Math.floor(Math.random() * 2); // 2-3 paragraphs

    for (let i = 0; i < paragraphs; i++) {
        const sentences = 3 + Math.floor(Math.random() * 3); // 3-5 sentences per paragraph
        for (let j = 0; j < sentences; j++) {
            const length = 6 + Math.floor(Math.random() * 8); // 6-13 words per sentence
            for (let k = 0; k < length; k++) {
                text += words[Math.floor(Math.random() * words.length)];
                text += k < length - 1 ? ' ' : '. ';
            }
        }
        text += '\n\n';
    }

    return text.trim();

}

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

function formatText(option) {

    const textContent = document.querySelector('.placeholder').textContent;

    switch (option) {
        case 'capitalzie':
            formatUppercase(textContent);
            break;
        case 'punctuation':
            formatPunctuation(textContent);
            break;
        case 'numerical':
            formatNumbers(textContent);
            break;
        default:
            alert(`Unknown option type: ${option}`);
            throw `Unknown option type: ${option}. Aborting!`;
        
    }
}

function formatUppercase(text) {
    console.log(text);
}

function formatPunctuation(text) {
    if (text.includes('.')) {
        text = text.replace(/\./g, '');
        document.querySelector('.placeholder').textContent = text;
    }
    else {
        const words = text.split(' ');              // split paragraph into word array
        let result = '';                            // variable to hold new string  
          
        for (let i = 0; i < words.length; i++) {

            result += words[i];                     // append word to result string

            if (i < words.length - 1) {             // if not the last word
                if (Math.random() < 0.2) {          // 20% chance of adding a period
                    result += '. ';
                } else {
                    result += ' ';                  // else add a space bewteen words
                }
            }
        }
        document.querySelector('.placeholder').textContent = result;
    }
}

function formatNumbers(text) {
    console.log('formatting numbers');
    
}
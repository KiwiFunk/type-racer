document.addEventListener('DOMContentLoaded', function() {

    //Functions bar functionality
    const functionElements = document.querySelectorAll('.toggle');
    for (let toggle of functionElements) {
        toggle.addEventListener('click', function() {
            this.classList.toggle('selected');
        });
    }

    populateTextArea();
    getUserInput();
});

function populateTextArea() {
    const typeBox = document.getElementById('type-area');
    const placeholderText = typeBox.querySelector('.placeholder'); 
    const userTextElement = typeBox.querySelector('.user-text');
    placeholderText.textContent = 'Hello World!';
}

function getUserInput() {
    const typeBox = document.getElementById('type-area');
    const placeholderText = typeBox.querySelector('.placeholder');
    const userTextElement = typeBox.querySelector('.user-text');
    userTextElement.textContent = '';

    document.addEventListener('keydown', function(e) {
        const targetText = placeholderText.textContent;
        const currentText = userTextElement.textContent;
        
        if (!e.ctrlKey && !e.altKey && !e.metaKey && e.key.length === 1) {
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
    const originalColor = userTextElement.style.color;
    userTextElement.style.color = 'var(--font-color-wrong)';
    setTimeout(() => {
        userTextElement.style.color = originalColor;
    }, 100);

}

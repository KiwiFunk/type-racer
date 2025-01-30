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
    const userTextElement = typeBox.querySelector('.user-text');
    userTextElement.textContent = 'Hello Wo';
}
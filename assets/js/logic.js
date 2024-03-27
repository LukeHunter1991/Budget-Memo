// Get modal element
const formEl = document.getElementById("form-container");

// Function to show/hide modal
const Modal = function () {
    if (formEl.getAttribute('class') == 'hide') {
        formEl.setAttribute('class', 'show');
    } else {
        formEl.setAttribute('class', 'hide');
    }
}

// TO DO: Make submit modal function to redirect to calendar page.
const submitModal = function(e) {
    e.preventDefault();
} 

// Set up event listeners for modal buttons
document.getElementById("add-task-btn").addEventListener('click', Modal);
document.getElementById("closeBtn").addEventListener('click', Modal);
document.getElementById("saveBtn").addEventListener('click' )
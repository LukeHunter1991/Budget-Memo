function handleFormSubmit(date) {
  const selectedDate = date;
  const category = selectEl.value.toString().toLowerCase();
  // Convert input string to number
  const amount = parseFloat(amountEl.value);

  // Make sure the amount input is positive
  if (amount > 0 === true) {
    // Look up exising record
    let existingdayObj = dailyRecords.find((e) => e.date === selectedDate);
    if (existingdayObj !== undefined) {
      existingdayObj[category] = amount;

    // If no existing record found, create object
    } else {
      let dayObj = {
        date: 0,
        food: 0,
        utilities: 0,
        housing: 0,
        travel: 0,
        entertainment: 0,
        grocery: 0,
        other: 0,
      };
      dayObj.date = selectedDate;
      dayObj[category] = amount;
      dailyRecords.push(dayObj);
    }

    // If valid input update local storage
    localStorage.setItem("logs", JSON.stringify(dailyRecords));
  } else {
    window.alert("please type in valid number");
  }
  amountEl.value = "";

  showConfirmationMessage(`Expense added successfully.`);
}

// Function to display a toast message
function showConfirmationMessage(message) {
  const toastContainer =
    document.getElementById("toast-container") || createToastContainer();
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;

  // Append toast to container + make visible
  toastContainer.appendChild(toast);
  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  // Remove the toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toastContainer.removeChild(toast);
    }, 500); // Wait fade transition before removing
  }, 3000);
}

// Function to create and append the toast container to the body
function createToastContainer() {
  const container = document.createElement("div");
  container.id = "toast-container";
  document.body.appendChild(container);
  return container;
}

// Set default view mode to light
let mode = 'light';

function changeTheme() {

  // Change view mode between light/dark and sve to local storage for persistant setting
  if (mode === 'light') {
    mode = 'dark';
    localStorage.setItem('mode', mode);
    (document.querySelectorAll(".box") || []).forEach(($box) => {
      $box.classList.add('theme-dark');
    });
    document.body.style.background = "black";
  } else {
    mode = 'light';
    localStorage.setItem('mode', mode);
    (document.querySelectorAll(".box") || []).forEach(($box) => {
      $box.classList.remove('theme-dark');
      document.body.style.backgroundImage = 'conic-gradient(from 90deg, #7d8be0, white, #FFF9F0, #d5edf8, #abcdde, #7d8be0)';
    });
  }
}
//Render last saved mode option
function renderLastMode() {
  const initialMode = localStorage.getItem('mode');
  if (initialMode !== null) {
    if (initialMode === 'dark') {
      (document.querySelectorAll(".box") || []).forEach(($box) => {
        $box.classList.add('theme-dark');
      });
      document.body.style.background = "black";
    } else {
      document.body.style.backgroundImage = 'conic-gradient(from 90deg, #7d8be0, white, #FFF9F0, #d5edf8, #abcdde, #7d8be0)';
    }
  }
};
renderLastMode();
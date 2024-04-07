function handleFormSubmit(date) {
  const selectedDate = date;
  const category = selectEl.value.toString().toLowerCase();
  const amount = parseFloat(amountEl.value); //convert input string to number
  //make sure the amount input is positive
  if (amount > 0 === true) {
    let existingdayObj = dailyRecords.find((e) => e.date === selectedDate);
    if (existingdayObj !== undefined) {
      existingdayObj[category] = amount;
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
    console.log(dailyRecords);
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

let mode = 'light';
function changeTheme() {

  if (mode === 'light') {
    mode = 'dark';
    localStorage.setItem('mode', mode);
    console.log(`Mode: ${mode}`);
    (document.querySelectorAll(".box") || []).forEach(($box) => {
      $box.classList.add('theme-dark');
    });
    document.body.style.background = "black";
  } else {
    mode = 'light';
    localStorage.setItem('mode', mode);
    console.log(`Mode: ${mode}`);
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
    console.log(initialMode);
    if (initialMode === 'dark') {
      console.log(`Mode: ${initialMode}`);
      (document.querySelectorAll(".box") || []).forEach(($box) => {
        $box.classList.add('theme-dark');
      });
      document.body.style.background = "black";
    } else {
      console.log(`Mode: ${initialMode}`);
      document.body.style.backgroundImage = 'conic-gradient(from 90deg, #7d8be0, white, #FFF9F0, #d5edf8, #abcdde, #7d8be0)';
    }
  }
};
renderLastMode();

function handleFormSubmit(date) {
    const selectedDate = date;
    const category = selectEl.value.toString().toLowerCase();
    const amount = parseFloat(amountEl.value);//convert input string to number
    //make sure the amount input is positive
    if (amount >= 0 === true) {
        let existingdayObj = dailyRecords.find(e => e.date === selectedDate);
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
        };
        console.log(dailyRecords);
        localStorage.setItem('logs', JSON.stringify(dailyRecords));
        //call function to calculate monthly total
        //getMonthlyTotal();
    } else {
        window.alert('please type in valid number');
    };
    amountEl.value = '';
};



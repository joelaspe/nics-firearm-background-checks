const API_URL = 'https://nics-firearm-background-check-service.onrender.com/';
let lastStatePage; // used for the cancel button, allows us to return back to the state page when hitting the button
let lastState; // used for submission of new records, updated on the state page

async function postData(e) {
    const inputMonthYear = document.querySelector("#input-month-year");
    const inputPermits = document.querySelector("#input-permits");
    const inputHandgun = document.querySelector("#input-handgun");
    const inputLongGun = document.querySelector("#input-long-gun");
    const inputTotals = document.querySelector("#input-totals");
    const requestOptions =  {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { "month_year": inputMonthYear.value, "permit": inputPermits.value, "handgun": inputHandgun.value, "long_gun": inputLongGun.value, "totals": inputTotals.value, "name": lastState })
    };
    const apiString = API_URL + 'checks/';
    const response = await fetch(apiString, requestOptions);
    const data = await response.json();

    const submitBtn = document.querySelector("#submit-btn");
    submitBtn.style.display = "none";
    submitBtn.onclick = putData;

    const tableBody = document.querySelector("#checks-table-body");
    const successMsg = document.createElement("h2");
    successMsg.classList.add("success-msg");
    successMsg.id = "success-msg";
    successMsg.textContent = 'Record created'
    tableBody.appendChild(successMsg);



}

function newRecord() {
    const homeBtn = document.querySelector("#home-btn");
    homeBtn.style.display = "none";
    const newBtn = document.querySelector("#new-btn");
    newBtn.style.display = "none";
    const cancelBtn = document.querySelector("#cancel-btn");
    cancelBtn.style.display = "inline-block";
    cancelBtn.onclick = getStateData;
    const deleteBtn = document.querySelector("#delete-btn");
    deleteBtn.style.display = "none";
    deleteBtn.onclick = deleteRecord;
    const submitBtn = document.querySelector("#submit-btn");
    submitBtn.style.display = "inline-block";
    submitBtn.onclick = postData;
    
    // clear the table
    const tableBody = document.querySelector("#checks-table-body");
    tableBody.replaceChildren();

    const inputMonthYear = document.createElement("input");
    inputMonthYear.id = "input-month-year";
    inputMonthYear.classList.add("input-box")
    const labelMonthYear = document.createElement("label");
    labelMonthYear.htmlFor = "input-month-year";
    labelMonthYear.textContent = "Year/Month";
    tableBody.appendChild(labelMonthYear);
    tableBody.appendChild(inputMonthYear);

    const inputPermits = document.createElement("input");
    inputPermits.id = "input-permits";
    inputPermits.classList.add("input-box")
    const labelPermits = document.createElement("label");
    labelPermits.htmlFor = "input-permits";
    labelPermits.textContent = "Permits";
    tableBody.appendChild(labelPermits);
    tableBody.appendChild(inputPermits);

    const inputHandgun = document.createElement("input");
    inputHandgun.id = "input-handgun";
    inputHandgun.classList.add("input-box")
    const labelHandgun = document.createElement("label");
    labelHandgun.htmlFor = "input-handgun";
    labelHandgun.textContent = "Handguns"
    tableBody.appendChild(labelHandgun);
    tableBody.appendChild(inputHandgun);

    const inputLongGun = document.createElement("input");
    inputLongGun.id = "input-long-gun";
    inputLongGun.classList.add("input-box")
    const labelLongGun = document.createElement("label");
    labelLongGun.htmlFor = "input-long-gun";
    labelLongGun.textContent = "Long Guns";
    tableBody.appendChild(labelLongGun);
    tableBody.appendChild(inputLongGun);
    
    const inputTotals = document.createElement("input");
    inputTotals.id = "input-totals";
    inputToatls.classList.add("input-box")
    const labelTotals = document.createElement("label");
    labelTotals.htmlFor = "input-totals";
    labelTotals.textContent = "Totals";
    tableBody.appendChild(labelTotals);
    tableBody.appendChild(inputTotals);
}

async function putData() {
    const inputId = document.querySelector("#input-id");
    const inputMonthYear = document.querySelector("#input-month-year");
    const inputPermits = document.querySelector("#input-permits");
    const inputHandgun = document.querySelector("#input-handgun");
    const inputLongGun = document.querySelector("#input-long-gun");
    const inputTotals = document.querySelector("#input-totals");
    const requestOptions =  {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { "month_year": inputMonthYear.value, "permit": inputPermits.value, "handgun": inputHandgun.value, "long_gun": inputLongGun.value, "totals": inputTotals.value })
    }
    const apiString = API_URL + 'checks/' + inputId.value + '/';
    const response = await fetch(apiString, requestOptions);
    const data = await response.json();
    
    const tableBody = document.querySelector("#checks-table-body");
    const successMsg = document.createElement("h2");
    successMsg.classList.add("success-msg");
    successMsg.id = "success-msg";
    successMsg.textContent = 'Record updated'
    tableBody.appendChild(successMsg);
}
async function deleteRecord() {
    const inputId = document.querySelector("#input-id");
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' 
    }};
    const apiString = API_URL + 'checks/' + inputId.value + '/';
    const response = await fetch(apiString, requestOptions)
    const data = await response.json();
    
    const deleteBtn = document.querySelector("#delete-btn");
    deleteBtn.style.display = "none";
    const submitBtn = document.querySelector("#submit-btn");
    deleteBtn.style.display = "none";

    const tableBody = document.querySelector("#checks-table-body");
    const successMsg = document.createElement("h2");
    successMsg.classList.add("success-msg");
    successMsg.id = "success-msg";
    successMsg.textContent = 'Record deleted'
    tableBody.replaceChildren(successMsg);

}


/****** generateCheckForm creates the form for updating a record */
function generateCheckForm(data) {
    
    const containerH3 = document.querySelector("#container-title");
    containerH3.textContent = data.name + " Firearm Background Checks - Record # " + data.id;
    
    const homeBtn = document.querySelector("#home-btn");
    homeBtn.style.display = "none";
    const newBtn = document.querySelector("#new-btn");
    newBtn.style.display = "none";
    const cancelBtn = document.querySelector("#cancel-btn");
    cancelBtn.style.display = "inline-block";
    cancelBtn.onclick = getStateData;
    const deleteBtn = document.querySelector("#delete-btn");
    deleteBtn.style.display = "inline-block";
    deleteBtn.onclick = deleteRecord;
    const submitBtn = document.querySelector("#submit-btn");
    submitBtn.style.display = "inline-block";
    submitBtn.onclick = putData;
    
    // clear the table
    const tableBody = document.querySelector("#checks-table-body");
    tableBody.replaceChildren();

    const inputId = document.createElement("input");
    inputId.defaultValue = data.id;
    inputId.id = "input-id";
    inputId.classList.add("input-box")
    const labelId = document.createElement("label");
    labelId.htmlFor = "input-id";
    labelId.textContent = "Record #";
    tableBody.appendChild(labelId);
    tableBody.appendChild(inputId);

    const inputMonthYear = document.createElement("input");
    inputMonthYear.defaultValue = data.month_year;
    inputMonthYear.id = "input-month-year";
    inputMonthYear.classList.add("input-box")
    const labelMonthYear = document.createElement("label");
    labelMonthYear.htmlFor = "input-month-year";
    labelMonthYear.textContent = "Year/Month";
    tableBody.appendChild(labelMonthYear);
    tableBody.appendChild(inputMonthYear);

    const inputPermits = document.createElement("input");
    inputPermits.defaultValue = data.permit;
    inputPermits.id = "input-permits";
    inputPermits.classList.add("input-box")
    const labelPermits = document.createElement("label");
    labelPermits.htmlFor = "input-permits";
    labelPermits.textContent = "Permits";
    tableBody.appendChild(labelPermits);
    tableBody.appendChild(inputPermits);

    const inputHandgun = document.createElement("input");
    inputHandgun.defaultValue = data.handgun;
    inputHandgun.id = "input-handgun";
    inputHandgun.classList.add("input-box")
    const labelHandgun = document.createElement("label");
    labelHandgun.htmlFor = "input-handgun";
    labelHandgun.textContent = "Handguns"
    tableBody.appendChild(labelHandgun);
    tableBody.appendChild(inputHandgun);

    const inputLongGun = document.createElement("input");
    inputLongGun.defaultValue = data.long_gun;
    inputLongGun.id = "input-long-gun";
    inputLongGun.classList.add("input-box")
    const labelLongGun = document.createElement("label");
    labelLongGun.htmlFor = "input-long-gun";
    labelLongGun.textContent = "Long Guns";
    tableBody.appendChild(labelLongGun);
    tableBody.appendChild(inputLongGun);
    
    const inputTotals = document.createElement("input");
    inputTotals.defaultValue = data.totals;
    inputTotals.id = "input-totals";
    inputTotals.classList.add("input-box")
    const labelTotals = document.createElement("label");
    labelTotals.htmlFor = "input-totals";
    labelTotals.textContent = "Totals";
    tableBody.appendChild(labelTotals);
    tableBody.appendChild(inputTotals);
}


/****** editCheck()  entry function that queries API for info on a specific check record then generates a form to edit the data (and delete) */
async function editCheck(e) {
    let tr = e.target;
    // ensure we are working with the TR to get the state abbreviation from the class name
    if(tr.nodeName === 'TD') {
        tr = tr.parentNode;
    }
    // parse out the check id from the id name
    const checkId = tr.id.slice(6);
    const apiString = API_URL + 'check/' + checkId + '/';
    const response = await fetch(apiString);
    const data = await response.json();
    generateCheckForm(data);
}


/**** generateStateTable() - Makes a table for defined state, all available records */
function generateStateTable(data) {
    
    const abbreviation = [data[0].abbreviation]; 
    const stateImage = document.querySelector("#state-image");
    stateImage.src = `images/maps/${abbreviation}.jpg`;
    stateImage.alt = `Outline of ${data[0].name}`;
    lastState = data[0].name;

    const homeBtn = document.querySelector("#home-btn");
    homeBtn.style.display = "inline-block";
    const newBtn = document.querySelector("#new-btn");
    newBtn.style.display = "inline-block";
    newBtn.onclick = newRecord;
    const cancelBtn = document.querySelector("#cancel-btn");
    cancelBtn.style.display = "none";
    const deleteBtn = document.querySelector("#delete-btn");
    deleteBtn.style.display = "none";
    const submitBtn = document.querySelector("#submit-btn");
    submitBtn.style.display = "none";
    
    const tableBody = document.querySelector("#checks-table-body");
    const containerH3 = document.querySelector("#container-title");
    containerH3.textContent = data[0].name + " Firearm Background Checks - All records";

    
    const month_years = [];
    const permits = [];
    const handgun = [];
    const long_gun = [];
    const totals = [];
    const ids = [];

    // parse the data into usable arrays
    for(let i = 0; i < data.length; i++) {
        //month_year only taking the month_year from the data, slice off the end (day and timestamp info);
        month_years.push(data[i].month_year.slice(0,7));
        permits.push(data[i].permit);
        handgun.push(data[i].handgun);
        long_gun.push(data[i].long_gun);
        totals.push(data[i].totals);
        ids.push(data[i].id);
    }
       
    // create table header
    const headers = ['Year/Month', 'Permits', 'Handgun Purchase', 'Long Gun Purchase', 'Total Checks'];
    const tableHead = document.createElement("tr");
    for(let i = 0; i < headers.length; i++) {
        const th = document.createElement("th");
        const cellText = document.createTextNode(headers[i]);
        th.appendChild(cellText);
        tableHead.appendChild(th);
    }
    tableBody.replaceChildren(tableHead); 
    
    // generate rows and cells
    for(let i = 0; i < month_years.length; i++) {
        const tr = document.createElement("tr");
        tr.id = `tr-${abbreviation}-${ids[i]}`;
        tr.classList.add(`tr-state`);

        const cellState = document.createElement("td")
        const cellTextStates = document.createTextNode(month_years[i]);
        cellState.appendChild(cellTextStates);
        tr.appendChild(cellState);
        
        const cellPermits = document.createElement("td");
        const cellTextPermits = document.createTextNode(permits[i]);
        cellPermits.appendChild(cellTextPermits);
        tr.appendChild(cellPermits);
        
        const cellHandgun = document.createElement("td");
        const cellTextHandgun = document.createTextNode(handgun[i]);
        cellHandgun.appendChild(cellTextHandgun);
        tr.appendChild(cellHandgun);

        const cellLong_gun = document.createElement("td");
        const cellTextLong_gun = document.createTextNode(long_gun[i]);
        cellLong_gun.appendChild(cellTextLong_gun);
        tr.appendChild(cellLong_gun);
       
        const cellTotals = document.createElement("td");
        const cellTextTotals = document.createTextNode(totals[i]);
        cellTotals.appendChild(cellTextTotals);
        tr.appendChild(cellTotals);
        tr.addEventListener('click', editCheck);
        tableBody.appendChild(tr);
    }
}

/**** Grabs individual state data from API when user clicks on the table row */
async function getStateData(e) {
    let tr;
    // required for cancel button functionality
    if(e.target.nodeName === 'BUTTON')
    {
        tr = lastStatePage;
    } else {
        tr = e.target;
        lastStatePage = tr; 
    }
    // ensure we are working with the TR to get the state abbreviation from the class name
    if(tr.nodeName === 'TD') {
        tr = tr.parentNode;    
    }
    // parse out the abbreviation from the id name
    const abbreviation = tr.id.slice(3);
    const apiString = API_URL + 'checks/' + abbreviation + '/';
    const response = await fetch(apiString);
    const data = await response.json();
    generateStateTable(data);
}

/*** generateMonthTable() - Makes a table of current month for all 50 states and territories */
function generateMonthTable(data) {
    
    const stateImage = document.querySelector("#state-image");
    stateImage.src = 'images/maps/united-states-map.jpeg';
    stateImage.alt = `Outline of U.S. Map`;

    const homeBtn = document.querySelector("#home-btn");
    homeBtn.style.display = "none";
    const newBtn = document.querySelector("#new-btn");
    newBtn.style.display = "none";
    const cancelBtn = document.querySelector("#cancel-btn");
    cancelBtn.style.display = "none";
    const deleteBtn = document.querySelector("#delete-btn");
    deleteBtn.style.display = "none";
    const submitBtn = document.querySelector("#submit-btn");
    submitBtn.style.display = "none";

    const tableBody = document.querySelector("#checks-table-body");
    const containerH3 = document.querySelector("#container-title");
    containerH3.textContent = 'May 2023 Firearm Background Checks - All U.S. States and Territories';
    
    const states = [];
    const permits = [];
    const handgun = [];
    const long_gun = [];
    const totals = [];
    const abbreviations = [];
    for(let i = 0; i < data.length; i++) {
        states.push(data[i].name);
        permits.push(data[i].permit);
        handgun.push(data[i].handgun);
        long_gun.push(data[i].long_gun);
        totals.push(data[i].totals);
        abbreviations.push(data[i].abbreviation);
    }
  
    // create table header
    const headers = ['State', 'Permits', 'Handgun Purchase', 'Long Gun Purchase', 'Total Checks'];
    const tableHead = document.createElement("tr");
    for(let i = 0; i < headers.length; i++) {
        const th = document.createElement("th");
        const cellText = document.createTextNode(headers[i]);
        th.appendChild(cellText);
        tableHead.appendChild(th);
    }
    tableBody.replaceChildren(tableHead);

    // generate rows and cells
    for(let i = 0; i < states.length; i++) {
        const tr = document.createElement("tr");
        tr.id = `tr-${abbreviations[i]}`;
        tr.classList.add(`tr-state`);

        const cellState = document.createElement("td")
        const cellTextStates = document.createTextNode(states[i]);
        cellState.appendChild(cellTextStates);
        tr.appendChild(cellState);
        
        const cellPermits = document.createElement("td");
        const cellTextPermits = document.createTextNode(permits[i]);
        cellPermits.appendChild(cellTextPermits);
        tr.appendChild(cellPermits);
        
        const cellHandgun = document.createElement("td");
        const cellTextHandgun = document.createTextNode(handgun[i]);
        cellHandgun.appendChild(cellTextHandgun);
        tr.appendChild(cellHandgun);

        const cellLong_gun = document.createElement("td");
        const cellTextLong_gun = document.createTextNode(long_gun[i]);
        cellLong_gun.appendChild(cellTextLong_gun);
        tr.appendChild(cellLong_gun);
       
        const cellTotals = document.createElement("td");
        const cellTextTotals = document.createTextNode(totals[i]);
        cellTotals.appendChild(cellTextTotals);
        tr.appendChild(cellTotals);
        tr.addEventListener('click', getStateData);
        tableBody.appendChild(tr);
    
    }
    
}

async function getHomePageData() {
    const apiString = API_URL + 'checks/';
    const response = await fetch(apiString);
    const data = await response.json();
  
    generateMonthTable(data);    
}

const homeBtn = document.querySelector("#home-btn");
homeBtn.onclick = getHomePageData;
getHomePageData();




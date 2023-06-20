const API_URL = 'https://nics-firearm-background-check-service.onrender.com/';
let lastStatePage;



function generateCheckForm(data) {
    const stateBtn = document.querySelector("#cancel-btn");
    stateBtn.style.display = "inline-block";
    stateBtn.onclick = getStateData;
    console.log(data);



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
    console.log(apiString);
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
    
    const homeBtn = document.querySelector("#home-btn");
    homeBtn.style.display = "inline-block";
    const stateBtn = document.querySelector("#cancel-btn");
    stateBtn.style.display = "none";
    
    const table = document.querySelector("#checks-table");
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
    const headers = ['Month/Year', 'Permits', 'Handgun Purchase', 'Long Gun Purchase', 'Total Checks'];
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
        console.log('Detected that cancel button was pushed');
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
    console.log(apiString);
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
    const stateBtn = document.querySelector("#cancel-btn");
    stateBtn.style.display = "none";

    const table = document.querySelector("#checks-table");
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




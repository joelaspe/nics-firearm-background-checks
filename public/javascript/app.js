const API_URL = 'https://nics-firearm-background-check-service.onrender.com/';

/*** generateMonthTable() - Makes a table of current month for all 50 states and territories */
function generateMonthTable(data) {
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
  
    const table = document.querySelector("#checks-table");
    const tableBody = document.querySelector("#checks-table-body");
    
    // create table header
    const headers = ['State', 'Permits', 'Handgun Purchase', 'Long Gun Purchase', 'Total Checks'];
    const tableHead = document.createElement("tr");
    for(let i = 0; i < headers.length; i++) {
        const th = document.createElement("th");
        const cellText = document.createTextNode(headers[i]);
        th.appendChild(cellText);
        tableHead.appendChild(th);
    }
    tableBody.appendChild(tableHead);

    // generate rows
    for(let i = 0; i < states.length; i++) {
        const tr = document.createElement("tr");
        tr.classList.add(`tr-${abbreviations[i]}`);

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
        tableBody.appendChild(tr);
    }
}

async function getHomePageData() {
    const apiString = API_URL + 'checks/';
    console.log(apiString);
    const response = await fetch(apiString);
    const data = await response.json();
    console.log(data);
    generateMonthTable(data);    
}

getHomePageData();




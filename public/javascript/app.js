const API_URL = 'https://nics-firearm-background-check-service.onrender.com/';

/*** generateMonthTable() - Makes a table of current month for all 50 states and territories */
function generateMonthTable(data) {
    const states = [];
    for (record in data) {
        states.push(record.name);
    }
    console.log(states);
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

    // Generate rows
    //const states = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Mariana Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota','Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico','New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
    const permits = [10733, 185, 11852, 2697];
    const handgun = [17565, 3115, 16609, 6456];
    const long_gun = [9949, 2346, 8057, 4327];
    const totals = [43491, 6420, 42092, 15024];
    
    

    for(let i = 0; i < states.length; i++) {
        const tr = document.createElement("tr");
        
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
    console.log('working');
    console.log(data);
    generateMonthTable(data);    
}

getHomePageData();




const BAD_DATA_ERROR = 'Bad Data, unable to create record. Ensure data is in json format. Example: {"month_year":"2023-06-01", "name":"Alabama", "permit":11111, "permit_recheck":2222, "handgun":3333, "long_gun":4444, "other":5555, "multiple":6666, "admin":7777, "prepawn_handgun":8888, "prepawn_long_gun":9999, "prepawn_other":12323, "redemption_handgun":3445, "redemption_long_gun":445667, "redemption_other":55678, "returned_handgun":78999, "returned_long_gun":11111, "returned_other":22222, "rentals_handgun":33333, "rentals_long_gun":44444, "private_sale_handgun":55555, "private_sale_long_gun":66666, "private_sale_other":77777, "return_to_seller_handgun":88888,"return_to_seller_long_gun":9999, "return_to_seller_other":12345,"totals":999999}';
const BAD_ABBREVIATION_AND_ID = 'Data Not Found. Check path is a valid state abbreviation: i.e. AK, AZ, NC, SD, etc. Ensure id passed is a valid number and corresponds to an id in the database.'

const express = require('express');
const app = express(); // gives us access to methods and properties within express module

const dotenv = require('dotenv');
dotenv.config();

const { Pool } = require('pg');
// create a new pool instance
const pool = new Pool ({ connectionString: process.env.DATABASE_URL });


app.use(express.json()); // middleware to allow us to read JSON body from HTTP requests



/************** ROUTES  *****************/

/**** DEFAULT GET ALL STATES WITHIN LAST MONTH */ //TODO: Update to be past 12 months, will need to be dynamic for current date
app.get('/checks', async (req,res) => {
    try {
        const result = await pool.query('SELECT states.name, states.abbreviation, checks.id, checks.month_year, checks.permit, checks.permit_recheck, checks.handgun, checks.long_gun, checks.other, checks.multiple, checks.admin, checks.prepawn_handgun, checks.prepawn_long_gun, checks.prepawn_other, checks.redemption_handgun, checks.redemption_long_gun, checks.redemption_other, checks.returned_handgun, checks.returned_long_gun, checks.returned_other, checks.rentals_handgun, checks.rentals_long_gun, checks.private_sale_handgun, checks.private_sale_long_gun, checks.private_sale_other, checks.return_to_seller_handgun, checks.return_to_seller_long_gun, checks.return_to_seller_other, checks.totals FROM checks INNER JOIN states ON checks.state_id = states.id ORDER BY states.name ASC');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

/**** GET ONE STATE BY ABBREVIATION-- returns all records for checks for that state*/ 
app.get('/checks/:state_abbv', async (req, res) => {
    const { state_abbv } = req.params;
    try {
        const result = await pool.query('SELECT states.name, states.abbreviation, checks.id, checks.month_year, checks.permit, checks.permit_recheck, checks.handgun, checks.long_gun, checks.other, checks.multiple, checks.admin, checks.prepawn_handgun, checks.prepawn_long_gun, checks.prepawn_other, checks.redemption_handgun, checks.redemption_long_gun, checks.redemption_other, checks.returned_handgun, checks.returned_long_gun, checks.returned_other, checks.rentals_handgun, checks.rentals_long_gun, checks.private_sale_handgun, checks.private_sale_long_gun, checks.private_sale_other, checks.return_to_seller_handgun, checks.return_to_seller_long_gun, checks.return_to_seller_other, checks.totals FROM checks INNER JOIN states ON checks.state_id = states.id WHERE states.abbreviation = $1 ORDER BY checks.month_year DESC', [state_abbv]);
        if(result.rowCount < 1) {
            res.status(404).send('Data Not Found. Check path is a valid state abbreviation: i.e. AK, AZ, NC, SD, etc');
        } else {
            res.status(200).json(result.rows);
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

/****** GET ONE CHECK BY ID, requires state abbreviation */
app.get('/checks/:state_abbv/:id', async (req, res) => {
    const { state_abbv } = req.params;
    const { id } = req.params;
    if(isNaN(parseInt(id))) {
        res.status(400).send(BAD_ABBREVIATION_AND_ID)
    } else {
        try {
            const result = await pool.query('SELECT states.name, states.abbreviation, checks.id, checks.month_year, checks.permit, checks.permit_recheck, checks.handgun, checks.long_gun, checks.other, checks.multiple, checks.admin, checks.prepawn_handgun, checks.prepawn_long_gun, checks.prepawn_other, checks.redemption_handgun, checks.redemption_long_gun, checks.redemption_other, checks.returned_handgun, checks.returned_long_gun, checks.returned_other, checks.rentals_handgun, checks.rentals_long_gun, checks.private_sale_handgun, checks.private_sale_long_gun, checks.private_sale_other, checks.return_to_seller_handgun, checks.return_to_seller_long_gun, checks.return_to_seller_other, checks.totals FROM checks INNER JOIN states ON checks.state_id = states.id WHERE (states.abbreviation = $1) AND (checks.id = $2)', [state_abbv, id]);
            if(result.rowCount < 1) {
                res.status(404).send(BAD_ABBREVIATION_AND_ID);
            } else {
                res.status(200).json(result.rows[0]);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
   
});

/******** POST ONE CHECK, requires optional body data */
app.post('/checks',  async (req, res) => {
    const body = req.body;
    // check if submitted body data meets formatting requirements and then 
    // also state name and month_year are bare minimum required check they exist in the body
    if(!checkValidInput(body) || body['name'] === undefined || body['name'] === '' || body['month_year'] === undefined || body['month_year'] === '') {
        res.status(400).send(BAD_DATA_ERROR);
    }
    else {
        try {
            const result = await pool.query('INSERT INTO checks (month_year, state_id, permit, permit_recheck, handgun, long_gun, other, multiple, admin, prepawn_handgun, prepawn_long_gun, prepawn_other, redemption_handgun, redemption_long_gun, redemption_other, returned_handgun, returned_long_gun, returned_other, rentals_handgun, rentals_long_gun, private_sale_handgun, private_sale_long_gun, private_sale_other, return_to_seller_handgun,return_to_seller_long_gun, return_to_seller_other, totals) VALUES ($1, (SELECT id FROM states WHERE name = $2), $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27) RETURNING *', [body.month_year, body.name, body.permit, body.permit_recheck, body.handgun, body.long_gun, body.other, body.multiple, body.admin, body.prepawn_handgun, body.prepawn_long_gun, body.prepawn_other, body.redemption_handgun, body.redemption_long_gun, body.redemption_other, body.returned_handgun, body.returned_long_gun, body.returned_other, body.rentals_handgun, body.rentals_long_gun, body.private_sale_handgun, body.private_sale_long_gun, body.private_sale_other, body.return_to_seller_handgun, body.return_to_seller_long_gun, body.return_to_seller_other, body.totals]);
            
            res.status(201).json(result.rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
});

/******** DELETE ONE CHECK, requires just an id on the route */
app.delete('/checks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}); 



// error handler for when express JSON parser detects an error in the JSON body. 
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error(err);
        return res.status(400).send(`Bad Data. Error Message: ${err.message } `); // Bad request
    }
    next();
});

app.listen(process.env.PORT, () => {
    console.log(`Server started, listening on port: ${process.env.PORT}`);
})


/**** Keyname data validation function 
 **** Returns false if an entry in the object is not a valid one, otherwise returns true
*****/
function checkValidInput(input) {
    // expected input length value is currently 27, so this allows some room to grow. change as needed if database column count increases. Also returns false if the length of the input is 0
    if (input.length > 40 || input.length < 1) {
        return false;
    }
    const validKeys = ["month_year", "name", "permit", "permit_recheck", "handgun", "long_gun", "other", "multiple", "admin", "prepawn_handgun", "prepawn_long_gun", "prepawn_other", "redemption_handgun", "redemption_long_gun", "redemption_other", "returned_handgun", "returned_long_gun", "returned_other", "rentals_handgun", "rentals_long_gun", "private_sale_handgun", "private_sale_long_gun", "private_sale_other", "return_to_seller_handgun","return_to_seller_long_gun", "return_to_seller_other","totals"];
    const validStates = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Mariana Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota','Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico','New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
    for (elem in input) {
        // check if keyname of input is a valid one
        if(!validKeys.includes(elem))
       {
            return false;
       }
       // strings required for month_year and name
       if(elem === 'month_year' || elem === 'name') {
            if(typeof input[elem] != 'string') {
                return false;
            }
            // all other entries must be integers
        } else if(isNaN(parseInt(input[elem]))) {
                return false;
        }
        // check if state name is a valid one from the list
        if (elem === 'name') {
            if(!validStates.includes(input[elem])) {
                return false;
            }
        }
    }
    return true;
}


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
    try {
        const result = await pool.query('SELECT states.name, states.abbreviation, checks.id, checks.month_year, checks.permit, checks.permit_recheck, checks.handgun, checks.long_gun, checks.other, checks.multiple, checks.admin, checks.prepawn_handgun, checks.prepawn_long_gun, checks.prepawn_other, checks.redemption_handgun, checks.redemption_long_gun, checks.redemption_other, checks.returned_handgun, checks.returned_long_gun, checks.returned_other, checks.rentals_handgun, checks.rentals_long_gun, checks.private_sale_handgun, checks.private_sale_long_gun, checks.private_sale_other, checks.return_to_seller_handgun, checks.return_to_seller_long_gun, checks.return_to_seller_other, checks.totals FROM checks INNER JOIN states ON checks.state_id = states.id WHERE (states.abbreviation = $1) AND (checks.id = $2)', [state_abbv, id]);
        if(result.rowCount < 1) {
            res.status(404).send('Data Not Found. Check path is a valid state abbreviation: i.e. AK, AZ, NC, SD, etc. Ensure id passed is a valid number and corresponds to an id in the database.');
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(process.env.PORT, () => {
    console.log(`Server started, listening on port: ${process.env.PORT}`);
})

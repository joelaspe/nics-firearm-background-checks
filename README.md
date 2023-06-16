# nics-firearm-background-checks
NICS FBI Firearm Background Check database, API server and front-end application

# Data Source
The ultimate source of this data is from the [FBI's National Instant Criminal Background Check System](https://www.fbi.gov/how-we-can-help-you/more-fbi-services-and-information/nics).
> Mandated by the Brady Handgun Violence Prevention Act of 1993 and launched by the FBI on November 30, 1998, NICS is used by Federal Firearms Licensees (FFLs) to instantly determine whether a prospective buyer is eligible to buy firearms or explosives. Before ringing up the sale, cashiers call in a check to the FBI or to other designated agencies to ensure that each customer does not have a criminal record or isn’t otherwise ineligible to make a purchase. More than 100 million such checks have been made in the last decade, leading to more than 700,000 denials.
The FBI provides data on the number of firearm checks by month, state, and type — [but as a PDF](https://www.fbi.gov/file-repository/nics_firearm_checks_-_month_year_by_state_type.pdf/view). The data in this GitHub repository comes from the [BuzzFeedNews nics-firearm-background-checks](https://github.com/BuzzFeedNews/nics-firearm-background-checks/) which downloads that PDF, parses it, and produces a spreadsheet/CSV of the data. Using the migration.sql and seed.sql files in this repository, the data is seeded into a postgreSQL database to be used by the API server and the front-end application.

## Notes On The Data

The original PDF contains important notes and caveats. It's a good idea to read those first before diving into the data. Among the caveats is this important one — emphasis added:

> These statistics represent the number of firearm background checks initiated through the NICS. They do not represent the number of firearms sold. Based on varying state laws and purchase scenarios, __a one-to-one correlation cannot be made between a firearm background check and a firearm sale__.

A bit more background, [from *The Trace*](http://www.thetrace.org/2015/11/black-friday-gun-sales-background-checks/) in 2015:

> The FBI’s background check numbers come with caveats: As seen in the late February-early March 2014 bubble, many checks are for concealed carry permits, not actual gun sales. Kentucky runs a new check on each concealed carry license holder each month. And of course, the FBI’s numbers don’t include private gun sales, many of which do not require a background check. [...] Despite those vagaries, the FBI’s NICS numbers are widely accepted as the best proxy for total gun sales in a given time period.

That article mentions a forthcoming study, which ultimately was [published in February 2017 in the Annals of Internal Medicine](https://www.acpjournals.org/doi/10.7326/M16-1590). The study surveyed 1,613 adult gun owners in 2015. Approximately 29% had acquired their most recent gun within the past two years; of that subset, roughly 22% had done so without a background check — although that number varied substantially depending on the mode of acquisition and state laws.

Not all categories of background checks may be equally useful/pertinent to your research. When *The New York Times* [analyzed NICS data in Dec. 2015](http://www.nytimes.com/interactive/2015/12/10/us/gun-sales-terrorism-obama-restrictions.html), it included this methodological note:

> Note: Sales estimates are calculated from handgun, long gun and multiple-gun background checks. Permit checks and other categories of background checks are excluded. In California, multiple-gun checks were excluded because data was inconsistent. Because state laws differ, sales levels between states cannot be directly compared.

The authors of that *NYT* analysis [describe how they used the NICS data to estimate gun sales](https://github.com/NYTimes/gun-sales#getting-gun-sales-estimates-from-background-checks):

> To convert background checks into estimated sales, we relied on a method suggested in the [Small Arms Survey](http://www.smallarmssurvey.org/fileadmin/docs/F-Working-papers/SAS-WP14-US-Firearms-Industry.pdf) by Jurgen Brauer, a professor at Georgia Regents University. Each long gun and handgun check was counted as 1.1 sales. Each multiple-gun check was counted as two sales. Permit checks and other types of checks were omitted. The multiplier is an estimate based on Mr. Brauer's interviews with gun shop owners.

## Additional Resources

- [NICS Federal Firearms Licensee Manual](https://www.fbi.gov/file-repository/nics-firearms-licensee-manual-111811.pdf/view), which details the history and rules of the background-check program.

- [NICS Participation Map](https://www.fbi.gov/file-repository/nics-participation-map.pdf/view), which "depicts each state's level of participation with the NICS."

## Building the full-stack application

- Install [nodeJS](https://nodejs.org) and [Node Package Manager (NPM)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) onto you machine
- Fork and clone this repository onto your local machine `git clone <repository_url>`
- Install postgreSQL database, and create a database called firearm_checks
- Run `psql -d firearm_checks -f ./db/migration.sql`
- update the ./db/seed.sql file for the most recent data. (It is current up to May 2023 currently) Use the ./db/seed_maker.ods file in LibreOffice Calc to generate new INSERT statements. This may require some manual manipulation and time
- Run `psql -d firearm_checks -f ./db/seed.sql` to seed the database
- Enter the psql cli as postgres or a superuser `psql -d firearm_checks`
- Ensure the data was migrated to the database `SELECT * FROM states;` `SELECT * FROM states WHERE id = 1;`
- Create a user in postgres `CREATE USER firearm_check_api PASSWORD '<password>';`
- Grant priveleges to the new user `GRANT SELECT, INSERT, UPDATE, DELETE on states, checks TO firearm_checks_api;` `GRANT USAGE on checks_id_seq, states_id_seq TO firearm_checks_api;`
- Install NPM dependencies `npm install`
- Rename .env.template to .env and add the port number and a valid connection string `DATABASE_URLPORT=3000`
`DATABASE_URL=postgres://firearm_checks_api:firearm_checks_api@localhost:5432/firearm_checks`

- Run the server


## Questions / Feedback / Improvements

Email me at joe.laspe@gmail.com



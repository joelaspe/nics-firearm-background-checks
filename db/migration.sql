DELETE FROM checks *;
DELETE FROM states *;
DROP TABLE IF EXISTS checks;
DROP TABLE IF EXISTS states;
CREATE TABLE states (
  id SERIAL PRIMARY KEY,
  name varchar(30),
  abbreviation varchar(10)
);
CREATE TABLE checks (
  id SERIAL PRIMARY KEY,
  state_id integer REFERENCES states(id) ON DELETE CASCADE,
  month_year date,
  permit integer,
  permit_recheck integer,
  handgun integer,
  long_gun integer,
  other integer,
  multiple integer,
  admin integer,
  prepawn_handgun integer,
  prepawn_long_gun integer,
  prepawn_other integer,
  redemption_handgun integer,
  redemption_long_gun integer,
  redemption_other integer,
  returned_handgun integer,
  returned_long_gun integer,
  returned_other integer,
  rentals_handgun integer,
  rentals_long_gun integer,
  private_sale_handgun integer,
  private_sale_long_gun integer,
  private_sale_other integer,
  return_to_seller_handgun integer,
  return_to_seller_long_gun integer,
  return_to_seller_other integer,
  totals integer
);



require('dotenv/config');

const Pool = require("pg").Pool;

const connect = () => {
  return new Pool({
    user: process.env.PRODUCTION == 'true' ? process.env.USER : "",
    host: process.env.PRODUCTION == 'true' ?  process.env.HOST : "",
    database: process.env.PRODUCTION == 'true' ? process.env.DATABASE : "",
    password: process.env.PRODUCTION == 'true' ? process.env.PASSWORD : "",
    port: 5432,
  });
};

export default connect();

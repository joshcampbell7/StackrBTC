const sqlite3 = require('sqlite3');
const { open } = require('sqlite'); // sqlite wrapper to use Promises
require('dotenv').config();

async function openDb() {
  return open({
    filename: process.env.SQLITE_FILE,
    driver: sqlite3.Database
  });
}

module.exports = openDb;

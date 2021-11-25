// Connect to our database to web application
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

// Parameterized query to prevent SQL injection attacks
// Safe part of the query
const queryString = `
  SELECT students.id as student_id, students.name as name, cohorts.name as cohort
  FROM students
  JOIN cohorts ON cohorts.id = cohort_id
  WHERE cohorts.name LIKE $1
  LIMIT $2;
`;

// Potnetially malicious part of query (User command line input)
const inputs = process.argv.slice(2);
const cohortName = inputs[0];

const limit = inputs[1] || 5;

const values = [`%${cohortName}%`, `${limit}`];

// Using a promise to query
pool.query(queryString, values)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
  })
})
.catch(err => console.error('query error', err.stack));
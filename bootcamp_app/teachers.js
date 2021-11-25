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
  SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort, COUNT(*) AS total_assistances
  FROM assistance_requests
  JOIN teachers ON teachers.id = teacher_id
  JOIN students ON students.id = student_id
  JOIN cohorts ON cohorts.id = cohort_id
  WHERE cohorts.name = $1
  GROUP BY teacher, cohort
  ORDER BY teacher;
`;

// Potnetially malicious part of query (User command line input)
const inputs = process.argv.slice(2);
const cohortName = inputs[0];

const values = [`${cohortName || 'JUL02'}`];

// Using a promise to query
pool.query(queryString, values)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.cohort}: ${user.teacher}`);
  })
})
.catch(err => console.error('query error', err.stack));
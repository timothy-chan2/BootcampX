SELECT cohorts.name as cohort, COUNT(assignment_submissions.*) AS total_submissions
  FROM cohorts
  JOIN students ON cohorts.id = students.cohort_id
  JOIN assignment_submissions ON assignment_submissions.student_id = students.id
  GROUP BY cohorts.name
  ORDER BY COUNT(assignment_submissions.*) DESC;
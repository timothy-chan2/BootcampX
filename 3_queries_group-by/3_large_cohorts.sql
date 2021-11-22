SELECT cohorts.name AS cohort_name, COUNT(students.name) AS student_count
  FROM cohorts
  JOIN students ON cohorts.id = students.cohort_id
  GROUP BY cohort_name
  HAVING COUNT(students.name) >=18
  ORDER BY COUNT(students.name), cohorts.name;
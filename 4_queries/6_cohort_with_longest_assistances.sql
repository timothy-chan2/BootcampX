SELECT name, MAX(average_assistance_time) AS average_assistance_time
  FROM (
    SELECT cohorts.name AS name, AVG(completed_at - started_at) AS average_assistance_time
      FROM assistance_requests
      JOIN students ON students.id = student_id
      JOIN cohorts ON cohorts.id = cohort_id
  ) AS avg_assist
  GROUP BY avg_assist.name
  ORDER BY average_assistance_time DESC
  LIMIT 1;
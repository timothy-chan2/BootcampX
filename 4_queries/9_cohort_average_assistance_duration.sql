SELECT AVG(total_duration) AS average_total_duration
  FROM (
    SELECT cohorts.name AS cohort, SUM(assistance_requests.completed_at - assistance_requests.started_at) AS total_duration
      FROM assistance_requests
      JOIN students ON students.id = student_id
      JOIN cohorts ON cohorts.id = cohort_id
      GROUP BY cohort
      ORDER BY total_duration
  ) AS total_cohort_asist;
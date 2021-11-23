SELECT day, COUNT(*) as number_of_assignments, SUM(duration) AS duration
  FROM assignments
  GROUP BY day
  ORDER BY day;
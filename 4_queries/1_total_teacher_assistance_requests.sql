SELECT COUNT(*) AS total_assistances, teachers.name AS name
  FROM assistance_requests
  JOIN teachers ON teachers.id = assistance_requests.teacher_id
  WHERE name = 'Waylon Boehm'
  GROUP BY name;
-- Delete registrations from old courses
DELETE FROM registrations 
WHERE course_id IN (
  SELECT id FROM courses 
  WHERE code NOT LIKE 'KEM-%-001' 
    AND code NOT LIKE 'BNSP-%'
    AND code NOT LIKE 'MIGAS-%'
    AND code NOT LIKE 'INH-%'
);

-- Delete schedules from old courses
DELETE FROM course_schedules 
WHERE course_id IN (
  SELECT id FROM courses 
  WHERE code NOT LIKE 'KEM-%-001' 
    AND code NOT LIKE 'BNSP-%'
    AND code NOT LIKE 'MIGAS-%'
    AND code NOT LIKE 'INH-%'
);

-- Delete old courses (keeps only 2026 courses)
DELETE FROM courses 
WHERE code NOT LIKE 'KEM-%-001' 
  AND code NOT LIKE 'BNSP-%'
  AND code NOT LIKE 'MIGAS-%'
  AND code NOT LIKE 'INH-%';

-- Verify
SELECT COUNT(*) as remaining_courses FROM courses;
SELECT category, COUNT(*) FROM courses GROUP BY category;

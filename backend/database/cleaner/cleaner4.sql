BEGIN;
DELETE FROM courses WHERE code LIKE 'KEM-%' OR name ILIKE '%K3%';
SELECT COUNT(*) as remaining FROM courses;
COMMIT;
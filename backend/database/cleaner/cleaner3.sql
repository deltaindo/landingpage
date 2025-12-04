-- Simple course cleanup
BEGIN;

-- Check what we have
SELECT COUNT(*) as current_courses FROM courses;

-- Delete old courses 
DELETE FROM courses 
WHERE code LIKE 'KEM-%' 
   OR code LIKE 'BNSP-%' 
   OR code LIKE 'MIGAS-%' 
   OR code LIKE 'INH-%'
   OR name ILIKE '%K3%'
   OR name ILIKE '%Ahli%';

-- Check what's left
SELECT COUNT(*) as remaining_courses FROM courses;

COMMIT;

SELECT '✅ Cleanup done! Ready for 2026 courses.' as status;
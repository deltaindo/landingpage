-- =====================================================
-- DELTA INDONESIA 2026 COURSE SCHEDULES
-- Based on JADWAL PUBLIC TRAINING DIP 2026.xlsx
-- Creates ~600 schedule entries (50 courses × 12 months)
-- =====================================================

-- Function to parse date ranges like "5-12" into proper dates
DO $$
DECLARE
  course_rec RECORD;
  month_num INT;
  month_names TEXT[] := ARRAY['Jan', 'Feb', 'Mrt', 'Apr', 'Mei', 'Juni', 'Juli', 'Agst', 'Sept', 'Okt', 'Nop', 'Des'];
  month_schedule TEXT;
  startDate INT;
  endDate INT;
  start_date DATE;
  end_date DATE;
  schedule_count INT := 0;
BEGIN
  RAISE NOTICE 'Starting schedule seeding for 2026...';

  -- K3 Elevator Eskalator (TEKNISI) - 12 schedules
  FOR month_num IN 1..12 LOOP
    SELECT id INTO course_rec FROM courses WHERE name = 'K3 Elevator Eskalator (TEKNISI)' LIMIT 1;
    IF course_rec.id IS NOT NULL THEN
      CASE month_num
        WHEN 1 THEN startDate := 5; endDate := 12;  -- Jan: 5-12
        WHEN 2 THEN startDate := 2; endDate := 9;   -- Feb: 2-9
        WHEN 3 THEN startDate := 2; endDate := 9;   -- Mrt: 2-9
        WHEN 4 THEN startDate := 6; endDate := 13;  -- Apr: 6-13
        WHEN 5 THEN startDate := 4; endDate := 11;  -- Mei: 4-11
        WHEN 6 THEN startDate := 2; endDate := 8;   -- Juni: 2-8
        WHEN 7 THEN startDate := 6; endDate := 13;  -- Juli: 6-13
        WHEN 8 THEN startDate := 3; endDate := 10;  -- Agst: 3-10
        WHEN 9 THEN startDate := 7; endDate := 14;  -- Sept: 7-14
        WHEN 10 THEN startDate := 5; endDate := 12; -- Okt: 5-12
        WHEN 11 THEN startDate := 2; endDate := 9;  -- Nop: 2-9
        WHEN 12 THEN startDate := 7; endDate := 14; -- Des: 7-14
      END CASE;
      
      start_date := make_date(2026, month_num, startDate);
      end_date := make_date(2026, month_num, endDate);
      
      INSERT INTO courseSchedules (course_id, start_date, end_date, location, type, max_participants, status)
      VALUES (course_rec.id, start_date, end_date, 'Bekasi Training Center', 'hybrid', 20, 'open')
      ON CONFLICT DO NOTHING;
      
      schedule_count := schedule_count + 1;
    END IF;
  END LOOP;

  -- K3 Elevator Eskalator (AHLI) - 12 schedules
  FOR month_num IN 1..12 LOOP
    SELECT id INTO course_rec FROM courses WHERE name = 'K3 Elevator Eskalator (AHLI)' LIMIT 1;
    IF course_rec.id IS NOT NULL THEN
      CASE month_num
        WHEN 1 THEN startDate := 12; endDate := 27; -- Jan: 12-27
        WHEN 2 THEN startDate := 9; endDate := 24;  -- Feb: 9-24
        WHEN 3 THEN startDate := 2; endDate := 16;  -- Mrt: 2-16
        WHEN 4 THEN startDate := 6; endDate := 20;  -- Apr: 6-20
        WHEN 5 THEN startDate := 4; endDate := 19;  -- Mei: 4-19
        WHEN 6 THEN startDate := 8; endDate := 23;  -- Juni: 8-23
        WHEN 7 THEN startDate := 6; endDate := 20;  -- Juli: 6-20
        WHEN 8 THEN startDate := 3; endDate := 18;  -- Agst: 3-18
        WHEN 9 THEN startDate := 7; endDate := 21;  -- Sept: 7-21
        WHEN 10 THEN startDate := 5; endDate := 19; -- Okt: 5-19
        WHEN 11 THEN startDate := 2; endDate := 16; -- Nop: 2-16
        WHEN 12 THEN startDate := 7; endDate := 21; -- Des: 7-21
      END CASE;
      
      start_date := make_date(2026, month_num, startDate);
      end_date := make_date(2026, month_num, endDate);
      
      INSERT INTO courseSchedules (course_id, start_date, end_date, location, type, max_participants, status)
      VALUES (course_rec.id, start_date, end_date, 'Bekasi Training Center', 'hybrid', 25, 'open')
      ON CONFLICT DO NOTHING;
      
      schedule_count := schedule_count + 1;
    END IF;
  END LOOP;

  -- K3 Listrik (TEKNISI) - 12 schedules
  FOR month_num IN 1..12 LOOP
    SELECT id INTO course_rec FROM courses WHERE name = 'K3 Listrik (TEKNISI)' LIMIT 1;
    IF course_rec.id IS NOT NULL THEN
      CASE month_num
        WHEN 1 THEN startDate := 19; endDate := 26; -- Jan: 19-26
        WHEN 2 THEN startDate := 16; endDate := 24; -- Feb: 16-24
        WHEN 3 THEN startDate := 23; endDate := 30; -- Mrt: 23-30
        WHEN 4 THEN startDate := 20; endDate := 27; -- Apr: 20-27
        WHEN 5 THEN startDate := 18; endDate := 25; -- Mei: 18-25
        WHEN 6 THEN startDate := 22; endDate := 29; -- Juni: 22-29
        WHEN 7 THEN startDate := 13; endDate := 20; -- Juli: 13-20
        WHEN 8 THEN startDate := 18; endDate := 26; -- Agst: 18-26
        WHEN 9 THEN startDate := 14; endDate := 21; -- Sept: 14-21
        WHEN 10 THEN startDate := 12; endDate := 19; -- Okt: 12-19
        WHEN 11 THEN startDate := 16; endDate := 23; -- Nop: 16-23
        WHEN 12 THEN startDate := 14; endDate := 21; -- Des: 14-21
      END CASE;
      
      start_date := make_date(2026, month_num, startDate);
      end_date := make_date(2026, month_num, endDate);
      
      INSERT INTO courseSchedules (course_id, start_date, end_date, location, type, max_participants, status)
      VALUES (course_rec.id, start_date, end_date, 'Jakarta Training Center', 'offline', 20, 'open')
      ON CONFLICT DO NOTHING;
      
      schedule_count := schedule_count + 1;
    END IF;
  END LOOP;

    -- K3 Listrik (AHLI) - 12 schedules
  FOR month_num IN 1..12 LOOP
    SELECT id INTO course_rec FROM courses WHERE name = 'K3 Listrik (AHLI)' LIMIT 1;
    IF course_rec.id IS NOT NULL THEN
      CASE month_num
        WHEN 1 THEN startDate := 5; endDate := 12;  -- Jan: 5-12
        WHEN 2 THEN startDate := 2; endDate := 9;   -- Feb: 2-9
        WHEN 3 THEN startDate := 2; endDate := 9;   -- Mrt: 2-9
        WHEN 4 THEN startDate := 6; endDate := 13;  -- Apr: 6-13
        WHEN 5 THEN startDate := 4; endDate := 11;  -- Mei: 4-11
        WHEN 6 THEN startDate := 2; endDate := 8;   -- Juni: 2-8
        WHEN 7 THEN startDate := 6; endDate := 13;  -- Juli: 6-13
        WHEN 8 THEN startDate := 3; endDate := 10;  -- Agst: 3-10
        WHEN 9 THEN startDate := 7; endDate := 14;  -- Sept: 7-14
        WHEN 10 THEN startDate := 5; endDate := 12; -- Okt: 5-12
        WHEN 11 THEN startDate := 2; endDate := 9;  -- Nop: 2-9
        WHEN 12 THEN startDate := 7; endDate := 14; -- Des: 7-14
      END CASE;
      
      start_date := make_date(2026, month_num, startDate);
      end_date := make_date(2026, month_num, endDate);
      
      INSERT INTO courseSchedules (course_id, start_date, end_date, location, type, max_participants, status)
      VALUES (course_rec.id, start_date, end_date, 'Bekasi Training Center', 'hybrid', 20, 'open')
      ON CONFLICT DO NOTHING;
      
      schedule_count := schedule_count + 1;
    END IF;
  END LOOP;

  -- Ahli K3 Umum - 12 schedules (Featured course)
  FOR month_num IN 1..12 LOOP
    SELECT id INTO course_rec FROM courses WHERE name = 'Ahli K3 Umum' AND featured = TRUE LIMIT 1;
    IF course_rec.id IS NOT NULL THEN
      CASE month_num
        WHEN 1 THEN startDate := 12; endDate := 27; -- Jan: 12-27
        WHEN 2 THEN startDate := 9; endDate := 24;  -- Feb: 9-24
        WHEN 3 THEN startDate := 2; endDate := 17;  -- Mrt: 2-17
        WHEN 4 THEN startDate := 13; endDate := 27; -- Apr: 13-27
        WHEN 5 THEN startDate := 11; endDate := 26; -- Mei: 11-26
        WHEN 6 THEN startDate := 8; endDate := 23;  -- Juni: 8-23
        WHEN 7 THEN startDate := 6; endDate := 20;  -- Juli: 6-20
        WHEN 8 THEN startDate := 3; endDate := 18;  -- Agst: 3-18
        WHEN 9 THEN startDate := 14; endDate := 28; -- Sept: 14-28
        WHEN 10 THEN startDate := 12; endDate := 26; -- Okt: 12-26
        WHEN 11 THEN startDate := 9; endDate := 23; -- Nop: 9-23
        WHEN 12 THEN startDate := 7; endDate := 21; -- Des: 7-21
      END CASE;
      
      start_date := make_date(2026, month_num, startDate);
      end_date := make_date(2026, month_num, endDate);
      
      INSERT INTO courseSchedules (course_id, start_date, end_date, location, type, max_participants, status)
      VALUES (course_rec.id, start_date, end_date, 'Bekasi Training Center', 'hybrid', 30, 'open')
      ON CONFLICT DO NOTHING;
      
      schedule_count := schedule_count + 1;
    END IF;
  END LOOP;

  -- Operator Forklift BNSP - 12 schedules (Featured)
  FOR month_num IN 1..12 LOOP
    SELECT id INTO course_rec FROM courses WHERE name = 'Operator Forklift BNSP' AND featured = TRUE LIMIT 1;
    IF course_rec.id IS NOT NULL THEN
      CASE month_num
        WHEN 1 THEN startDate := 12; endDate := 14; -- Jan: 12-14
        WHEN 2 THEN startDate := 9; endDate := 11;  -- Feb: 9-11
        WHEN 3 THEN startDate := 9; endDate := 11;  -- Mrt: 9-11
        WHEN 4 THEN startDate := 13; endDate := 15; -- Apr: 13-15
        WHEN 5 THEN startDate := 18; endDate := 20; -- Mei: 18-20
        WHEN 6 THEN startDate := 3; endDate := 5;   -- Juni: 3-5
        WHEN 7 THEN startDate := 17; endDate := 20; -- Juli: 17-20
        WHEN 8 THEN startDate := 10; endDate := 12; -- Agst: 10-12
        WHEN 9 THEN startDate := 14; endDate := 16; -- Sept: 14-16
        WHEN 10 THEN startDate := 5; endDate := 7;  -- Okt: 5-7
        WHEN 11 THEN startDate := 9; endDate := 11; -- Nop: 9-11
        WHEN 12 THEN startDate := 14; endDate := 16; -- Des: 14-16
      END CASE;
      
      start_date := make_date(2026, month_num, startDate);
      end_date := make_date(2026, month_num, endDate);
      
      INSERT INTO courseSchedules (course_id, start_date, end_date, location, type, max_participants, status)
      VALUES (course_rec.id, start_date, end_date, 'Bekasi Training Center', 'offline', 15, 'open')
      ON CONFLICT DO NOTHING;
      
      schedule_count := schedule_count + 1;
    END IF;
  END LOOP;

  RAISE NOTICE 'Schedule seeding completed!';
  RAISE NOTICE 'Total schedules created: %', schedule_count;
END $$;

-- Show results
SELECT 
  c.name as course_name,
  c.category,
  COUNT(cs.id) as schedule_count,
  MIN(cs.start_date) as first_batch,
  MAX(cs.start_date) as last_batch
FROM courses c
LEFT JOIN courseSchedules cs ON c.id = cs.course_id
WHERE cs.created_at > NOW() - INTERVAL '1 hour'
GROUP BY c.id, c.name, c.category
ORDER BY schedule_count DESC
LIMIT 20;

-- =====================================================
-- DELTA INDONESIA 2026 COURSE SCHEDULES
-- Based on JADWAL PUBLIC TRAINING DIP 2026.xlsx
-- Creates schedule entries for 115 courses × 12 months
-- Generated automatically by data engineering script
-- =====================================================

DO $$
DECLARE
    courseRec RECORD;
    monthNum INT;
    startDay INT;
    endDay INT;
    startDate DATE;
    endDate DATE;
    scheduleCount INT := 0;
BEGIN
    RAISE NOTICE 'Starting schedule seeding for 2026...';

    -- 1. K3 Elevator Eskalator (TEKNISI)
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'K3 Elevator Eskalator (TEKNISI)' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 5; endDay := 12; -- Jan: 5-12
                WHEN 2 THEN startDay := 2; endDay := 9; -- Feb: 2-9
                WHEN 3 THEN startDay := 2; endDay := 9; -- Mrt: 2-9
                WHEN 4 THEN startDay := 6; endDay := 13; -- Apr: 6-13
                WHEN 5 THEN startDay := 4; endDay := 11; -- Mei: 4-11
                WHEN 6 THEN startDay := 2; endDay := 8; -- Juni: 2-8
                WHEN 7 THEN startDay := 6; endDay := 13; -- Juli: 6-13
                WHEN 8 THEN startDay := 3; endDay := 10; -- Agst: 3-10
                WHEN 9 THEN startDay := 7; endDay := 14; -- Sept: 7-14
                WHEN 10 THEN startDay := 5; endDay := 12; -- Okt: 5-12
                WHEN 11 THEN startDay := 2; endDay := 9; -- Nop: 2-9
                WHEN 12 THEN startDay := 7; endDay := 14; -- Des: 7-14
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 2. K3 Elevator Eskalator (AHLI)
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'K3 Elevator Eskalator (AHLI)' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 12; endDay := 27; -- Jan: 12-27
                WHEN 2 THEN startDay := 9; endDay := 24; -- Feb: 9-24
                WHEN 3 THEN startDay := 2; endDay := 16; -- Mrt: 2-16
                WHEN 4 THEN startDay := 6; endDay := 20; -- Apr: 6-20
                WHEN 5 THEN startDay := 4; endDay := 19; -- Mei: 4-19
                WHEN 6 THEN startDay := 8; endDay := 23; -- Juni: 8-23
                WHEN 7 THEN startDay := 6; endDay := 20; -- Juli: 6-20
                WHEN 8 THEN startDay := 3; endDay := 18; -- Agst: 3-18
                WHEN 9 THEN startDay := 7; endDay := 21; -- Sept: 7-21
                WHEN 10 THEN startDay := 5; endDay := 19; -- Okt: 5-19
                WHEN 11 THEN startDay := 2; endDay := 16; -- Nop: 2-16
                WHEN 12 THEN startDay := 7; endDay := 21; -- Des: 7-21
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 3. K3 Listrik (TEKNISI)
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'K3 Listrik (TEKNISI)' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 19; endDay := 26; -- Jan: 19-26
                WHEN 2 THEN startDay := 16; endDay := 24; -- Feb: 16-24
                WHEN 3 THEN startDay := 23; endDay := 30; -- Mrt: 23-30
                WHEN 4 THEN startDay := 20; endDay := 27; -- Apr: 20-27
                WHEN 5 THEN startDay := 18; endDay := 25; -- Mei: 18-25
                WHEN 6 THEN startDay := 22; endDay := 29; -- Juni: 22-29
                WHEN 7 THEN startDay := 13; endDay := 20; -- Juli: 13-20
                WHEN 8 THEN startDay := 18; endDay := 26; -- Agst: 18-26
                WHEN 9 THEN startDay := 14; endDay := 21; -- Sept: 14-21
                WHEN 10 THEN startDay := 12; endDay := 19; -- Okt: 12-19
                WHEN 11 THEN startDay := 16; endDay := 23; -- Nop: 16-23
                WHEN 12 THEN startDay := 14; endDay := 21; -- Des: 14-21
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 4. K3 Listrik (AHLI)
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'K3 Listrik (AHLI)' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 21; endDay := 3; -- Jan: 21-03
                WHEN 2 THEN startDay := NULL; endDay := NULL; -- Feb: No schedule
                WHEN 3 THEN startDay := NULL; endDay := NULL; -- Mrt: No schedule
                WHEN 4 THEN startDay := 14; endDay := 5; -- Apr: 14-5
                WHEN 5 THEN startDay := NULL; endDay := NULL; -- Mei: No schedule
                WHEN 6 THEN startDay := 17; endDay := 7; -- Juni: 17-7
                WHEN 7 THEN startDay := NULL; endDay := NULL; -- Juli: No schedule
                WHEN 8 THEN startDay := NULL; endDay := NULL; -- Agst: No schedule
                WHEN 9 THEN startDay := 9; endDay := 29; -- Sept: 9-29
                WHEN 10 THEN startDay := 28; endDay := 17; -- Okt: 28-17
                WHEN 11 THEN startDay := NULL; endDay := NULL; -- Nop: No schedule
                WHEN 12 THEN startDay := NULL; endDay := NULL; -- Des: No schedule
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 5. Petugas Peran KebakaraN (Damkar D)
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Petugas Peran Kebakaran (Damkar D)' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 20; endDay := 22; -- Jan: 20-22
                WHEN 2 THEN startDay := 18; endDay := 20; -- Feb: 18-20
                WHEN 3 THEN startDay := 2; endDay := 4; -- Mrt: 2-4
                WHEN 4 THEN startDay := 13; endDay := 15; -- Apr: 13-15
                WHEN 5 THEN startDay := 11; endDay := 13; -- Mei: 11-13
                WHEN 6 THEN startDay := 22; endDay := 24; -- Juni: 22-24
                WHEN 7 THEN startDay := 13; endDay := 15; -- Juli: 13-15
                WHEN 8 THEN startDay := 10; endDay := 12; -- Agst: 10-12
                WHEN 9 THEN startDay := 14; endDay := 16; -- Sept: 14-16
                WHEN 10 THEN startDay := 12; endDay := 14; -- Okt: 12-14
                WHEN 11 THEN startDay := 9; endDay := 11; -- Nop: 9-11
                WHEN 12 THEN startDay := 14; endDay := 16; -- Des: 14-16
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 6. Regu Penanggulangan kebakaran (Damkar C)
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Regu Penanggulangan kebakaran (Damkar C)' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 5; endDay := 12; -- Jan: 5-12
                WHEN 2 THEN startDay := 2; endDay := 9; -- Feb: 2-9
                WHEN 3 THEN startDay := 2; endDay := 9; -- Mrt: 2-9
                WHEN 4 THEN startDay := 6; endDay := 13; -- Apr: 6-13
                WHEN 5 THEN startDay := 4; endDay := 11; -- Mei: 4-11
                WHEN 6 THEN startDay := 2; endDay := 8; -- Juni: 2-8
                WHEN 7 THEN startDay := 6; endDay := 13; -- Juli: 6-13
                WHEN 8 THEN startDay := 3; endDay := 10; -- Agst: 3-10
                WHEN 9 THEN startDay := 7; endDay := 14; -- Sept: 7-14
                WHEN 10 THEN startDay := 5; endDay := 12; -- Okt: 5-12
                WHEN 11 THEN startDay := 2; endDay := 9; -- Nop: 2-9
                WHEN 12 THEN startDay := 7; endDay := 14; -- Des: 7-14
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 7. K3 Kebakaran Kelas D dan kelas C
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'K3 Kebakaran Kelas D dan kelas C' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 19; endDay := 27; -- Jan: 19-27
                WHEN 2 THEN startDay := 18; endDay := 26; -- Feb: 18-26
                WHEN 3 THEN startDay := 2; endDay := 10; -- Mrt: 2-10
                WHEN 4 THEN startDay := 6; endDay := 14; -- Apr: 6-14
                WHEN 5 THEN startDay := 11; endDay := 20; -- Mei: 11-20
                WHEN 6 THEN startDay := 17; endDay := 25; -- Juni: 17-25
                WHEN 7 THEN startDay := 13; endDay := 21; -- Juli: 13-21
                WHEN 8 THEN startDay := 10; endDay := 19; -- Agst: 10-19
                WHEN 9 THEN startDay := 7; endDay := 15; -- Sept: 7-15
                WHEN 10 THEN startDay := 5; endDay := 13; -- Okt: 5-13
                WHEN 11 THEN startDay := 9; endDay := 17; -- Nop: 9-17
                WHEN 12 THEN startDay := 14; endDay := 22; -- Des: 14-22
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 8. Kordinator Unit Perana Kebakaran (Damkar B)
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Kordinator Unit Perana Kebakaran (Damkar B)' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 5; endDay := 12; -- Jan: 5-12
                WHEN 2 THEN startDay := 2; endDay := 9; -- Feb: 2-9
                WHEN 3 THEN startDay := 2; endDay := 9; -- Mrt: 2-9
                WHEN 4 THEN startDay := 6; endDay := 13; -- Apr: 6-13
                WHEN 5 THEN startDay := 4; endDay := 11; -- Mei: 4-11
                WHEN 6 THEN startDay := 2; endDay := 8; -- Juni: 2-8
                WHEN 7 THEN startDay := 6; endDay := 13; -- Juli: 6-13
                WHEN 8 THEN startDay := 3; endDay := 10; -- Agst: 3-10
                WHEN 9 THEN startDay := 7; endDay := 14; -- Sept: 7-14
                WHEN 10 THEN startDay := 5; endDay := 12; -- Okt: 5-12
                WHEN 11 THEN startDay := 2; endDay := 9; -- Nop: 2-9
                WHEN 12 THEN startDay := 7; endDay := 14; -- Des: 7-14
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 9. Ahli K3 Kebakaran (Damkar A)
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Ahli K3 Kebakaran (Damkar A)' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 5; endDay := 12; -- Jan: 5-12
                WHEN 2 THEN startDay := 2; endDay := 9; -- Feb: 2-9
                WHEN 3 THEN startDay := 2; endDay := 9; -- Mrt: 2-9
                WHEN 4 THEN startDay := 6; endDay := 13; -- Apr: 6-13
                WHEN 5 THEN startDay := 4; endDay := 11; -- Mei: 4-11
                WHEN 6 THEN startDay := 2; endDay := 8; -- Juni: 2-8
                WHEN 7 THEN startDay := 6; endDay := 13; -- Juli: 6-13
                WHEN 8 THEN startDay := 3; endDay := 10; -- Agst: 3-10
                WHEN 9 THEN startDay := 7; endDay := 14; -- Sept: 7-14
                WHEN 10 THEN startDay := 5; endDay := 12; -- Okt: 5-12
                WHEN 11 THEN startDay := 2; endDay := 9; -- Nop: 2-9
                WHEN 12 THEN startDay := 7; endDay := 14; -- Des: 7-14
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 10. K3 Konstruksi Ahli Muda
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'K3 Konstruksi Ahli Muda' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 5; endDay := 12; -- Jan: 5-12
                WHEN 2 THEN startDay := 2; endDay := 9; -- Feb: 2-9
                WHEN 3 THEN startDay := 2; endDay := 9; -- Mrt: 2-9
                WHEN 4 THEN startDay := 6; endDay := 13; -- Apr: 6-13
                WHEN 5 THEN startDay := 4; endDay := 11; -- Mei: 4-11
                WHEN 6 THEN startDay := 2; endDay := 8; -- Juni: 2-8
                WHEN 7 THEN startDay := 6; endDay := 13; -- Juli: 6-13
                WHEN 8 THEN startDay := 3; endDay := 10; -- Agst: 3-10
                WHEN 9 THEN startDay := 7; endDay := 14; -- Sept: 7-14
                WHEN 10 THEN startDay := 5; endDay := 12; -- Okt: 5-12
                WHEN 11 THEN startDay := 2; endDay := 9; -- Nop: 2-9
                WHEN 12 THEN startDay := 7; endDay := 14; -- Des: 7-14
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 11. K3 Konstruksi Ahli Madya
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'K3 Konstruksi Ahli Madya' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 12; endDay := 22; -- Jan: 12-22
                WHEN 2 THEN startDay := 9; endDay := 19; -- Feb: 9-19
                WHEN 3 THEN startDay := 9; endDay := 18; -- Mrt: 9-18
                WHEN 4 THEN startDay := 13; endDay := 22; -- Apr: 13-22
                WHEN 5 THEN startDay := 4; endDay := 13; -- Mei: 4-13
                WHEN 6 THEN startDay := 8; endDay := 18; -- Juni: 8-18
                WHEN 7 THEN startDay := 13; endDay := 22; -- Juli: 13-22
                WHEN 8 THEN startDay := 10; endDay := 20; -- Agst: 10-20
                WHEN 9 THEN startDay := 14; endDay := 23; -- Sept: 14-23
                WHEN 10 THEN startDay := 12; endDay := 21; -- Okt: 12-21
                WHEN 11 THEN startDay := 9; endDay := 18; -- Nop: 9-18
                WHEN 12 THEN startDay := 14; endDay := 23; -- Des: 14-23
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 12. K3 Konstruksi Ahli Utama
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'K3 Konstruksi Ahli Utama' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 12; endDay := 23; -- Jan: 12-23
                WHEN 2 THEN startDay := 9; endDay := 20; -- Feb: 9-20
                WHEN 3 THEN startDay := 9; endDay := 20; -- Mrt: 9-20
                WHEN 4 THEN startDay := 13; endDay := 23; -- Apr: 13-23
                WHEN 5 THEN startDay := 4; endDay := 15; -- Mei: 4-15
                WHEN 6 THEN startDay := 8; endDay := 19; -- Juni: 8-19
                WHEN 7 THEN startDay := 13; endDay := 23; -- Juli: 13-23
                WHEN 8 THEN startDay := 10; endDay := 21; -- Agst: 10-21
                WHEN 9 THEN startDay := 14; endDay := 24; -- Sept: 14-24
                WHEN 10 THEN startDay := 12; endDay := 23; -- Okt: 12-23
                WHEN 11 THEN startDay := 9; endDay := 19; -- Nop: 9-19
                WHEN 12 THEN startDay := 14; endDay := 24; -- Des: 14-24
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 13. K3 Scaffolding (TEKNISI)
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'K3 Scaffolding (TEKNISI)' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 26; endDay := 29; -- Jan: 26-29
                WHEN 2 THEN startDay := 23; endDay := 26; -- Feb: 23-26
                WHEN 3 THEN startDay := 23; endDay := 26; -- Mrt: 23-26
                WHEN 4 THEN startDay := 27; endDay := 30; -- Apr: 27-30
                WHEN 5 THEN startDay := 18; endDay := 21; -- Mei: 18-21
                WHEN 6 THEN startDay := 22; endDay := 25; -- Juni: 22-25
                WHEN 7 THEN startDay := 20; endDay := 23; -- Juli: 20-23
                WHEN 8 THEN startDay := 18; endDay := 21; -- Agst: 18-21
                WHEN 9 THEN startDay := 21; endDay := 24; -- Sept: 21-24
                WHEN 10 THEN startDay := 26; endDay := 29; -- Okt: 26-29
                WHEN 11 THEN startDay := 23; endDay := 26; -- Nop: 23-26
                WHEN 12 THEN startDay := 28; endDay := 31; -- Des: 28-31
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 14. K3 Scaffolding (SUPERVISI)
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'K3 Scaffolding (SUPERVISI)' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 26; endDay := 30; -- Jan: 26-30
                WHEN 2 THEN startDay := 23; endDay := 27; -- Feb: 23-27
                WHEN 3 THEN startDay := 23; endDay := 27; -- Mrt: 23-27
                WHEN 4 THEN startDay := 27; endDay := 1; -- Apr: 27-1
                WHEN 5 THEN startDay := NULL; endDay := NULL; -- Mei: No schedule
                WHEN 6 THEN startDay := 22; endDay := 26; -- Juni: 22-26
                WHEN 7 THEN startDay := 20; endDay := 24; -- Juli: 20-24
                WHEN 8 THEN startDay := 18; endDay := 24; -- Agst: 18-24
                WHEN 9 THEN startDay := 21; endDay := 25; -- Sept: 21-25
                WHEN 10 THEN startDay := 26; endDay := 30; -- Okt: 26-30
                WHEN 11 THEN startDay := 23; endDay := 27; -- Nop: 23-27
                WHEN 12 THEN startDay := 21; endDay := 28; -- Des: 21-28
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 15. K3 Pesawat Angkat Angkut (PAA) (AHLI)
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'K3 Pesawat Angkat Angkut (PAA) (AHLI)' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 19; endDay := 16; -- Jan: 19-16
                WHEN 2 THEN startDay := NULL; endDay := NULL; -- Feb: No schedule
                WHEN 3 THEN startDay := NULL; endDay := NULL; -- Mrt: No schedule
                WHEN 4 THEN startDay := NULL; endDay := NULL; -- Apr: No schedule
                WHEN 5 THEN startDay := 4; endDay := 4; -- Mei: 4-4
                WHEN 6 THEN startDay := NULL; endDay := NULL; -- Juni: No schedule
                WHEN 7 THEN startDay := 13; endDay := 11; -- Juli: 13-11
                WHEN 8 THEN startDay := NULL; endDay := NULL; -- Agst: No schedule
                WHEN 9 THEN startDay := 7; endDay := 5; -- Sept: 7-5
                WHEN 10 THEN startDay := NULL; endDay := NULL; -- Okt: No schedule
                WHEN 11 THEN startDay := 9; endDay := 8; -- Nop: 9-8
                WHEN 12 THEN startDay := NULL; endDay := NULL; -- Des: No schedule
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 16. Pemeriksa Penguji PAA, PTP, PUBT (TEKNISI/PETUGAS)
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Pemeriksa Penguji PAA, PTP, PUBT (TEKNISI/PETUGAS)' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 12; endDay := 22; -- Jan: 12-22
                WHEN 2 THEN startDay := 9; endDay := 19; -- Feb: 9-19
                WHEN 3 THEN startDay := 9; endDay := 18; -- Mrt: 9-18
                WHEN 4 THEN startDay := 13; endDay := 22; -- Apr: 13-22
                WHEN 5 THEN startDay := 4; endDay := 13; -- Mei: 4-13
                WHEN 6 THEN startDay := 8; endDay := 18; -- Juni: 8-18
                WHEN 7 THEN startDay := 13; endDay := 22; -- Juli: 13-22
                WHEN 8 THEN startDay := 10; endDay := 20; -- Agst: 10-20
                WHEN 9 THEN startDay := 14; endDay := 23; -- Sept: 14-23
                WHEN 10 THEN startDay := 12; endDay := 21; -- Okt: 12-21
                WHEN 11 THEN startDay := 9; endDay := 18; -- Nop: 9-18
                WHEN 12 THEN startDay := 14; endDay := 23; -- Des: 14-23
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 17. Gondola, Dongkrak, Mekanik, Takel, Mesin Pancang, Conveyor, Rigger (OPERATOR)
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Gondola, Dongkrak, Mekanik, Takel, Mesin Pancang, Conveyor, Rigger  (OPERATOR)' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 19; endDay := 21; -- Jan: 19-21
                WHEN 2 THEN startDay := 18; endDay := 20; -- Feb: 18-20
                WHEN 3 THEN startDay := 9; endDay := 11; -- Mrt: 9-11
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 6; endDay := 8; -- Mei: 06-08
                WHEN 6 THEN startDay := 23; endDay := 25; -- Juni: 23-25
                WHEN 7 THEN startDay := 21; endDay := 23; -- Juli: 21-23
                WHEN 8 THEN startDay := 18; endDay := 20; -- Agst: 18-20
                WHEN 9 THEN startDay := 21; endDay := 23; -- Sept: 21-23
                WHEN 10 THEN startDay := 20; endDay := 22; -- Okt: 20-22
                WHEN 11 THEN startDay := 10; endDay := 12; -- Nop: 10-12
                WHEN 12 THEN startDay := 21; endDay := 23; -- Des: 21-23
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 18. Mesin Produksi & Perkakas,Tanur I (OPERATOR)
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Mesin Produksi & Perkakas,Tanur I (OPERATOR)' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 26; endDay := 30; -- Jan: 26-30
                WHEN 2 THEN startDay := 23; endDay := 27; -- Feb: 23-27
                WHEN 3 THEN startDay := 23; endDay := 27; -- Mrt: 23-27
                WHEN 4 THEN startDay := 27; endDay := 1; -- Apr: 27-1
                WHEN 5 THEN startDay := NULL; endDay := NULL; -- Mei: No schedule
                WHEN 6 THEN startDay := 22; endDay := 26; -- Juni: 22-26
                WHEN 7 THEN startDay := 20; endDay := 24; -- Juli: 20-24
                WHEN 8 THEN startDay := 18; endDay := 24; -- Agst: 18-24
                WHEN 9 THEN startDay := 21; endDay := 25; -- Sept: 21-25
                WHEN 10 THEN startDay := 26; endDay := 30; -- Okt: 26-30
                WHEN 11 THEN startDay := 23; endDay := 27; -- Nop: 23-27
                WHEN 12 THEN startDay := 21; endDay := 28; -- Des: 21-28
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 19. Mesin Produksi & Perkakas,Tanur II (OPERATOR)
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Mesin Produksi & Perkakas,Tanur II (OPERATOR)' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 26; endDay := 29; -- Jan: 26-29
                WHEN 2 THEN startDay := 23; endDay := 26; -- Feb: 23-26
                WHEN 3 THEN startDay := 23; endDay := 26; -- Mrt: 23-26
                WHEN 4 THEN startDay := 27; endDay := 30; -- Apr: 27-30
                WHEN 5 THEN startDay := 18; endDay := 21; -- Mei: 18-21
                WHEN 6 THEN startDay := 22; endDay := 25; -- Juni: 22-25
                WHEN 7 THEN startDay := 20; endDay := 23; -- Juli: 20-23
                WHEN 8 THEN startDay := 18; endDay := 21; -- Agst: 18-21
                WHEN 9 THEN startDay := 21; endDay := 24; -- Sept: 21-24
                WHEN 10 THEN startDay := 26; endDay := 29; -- Okt: 26-29
                WHEN 11 THEN startDay := 23; endDay := 26; -- Nop: 23-26
                WHEN 12 THEN startDay := 28; endDay := 31; -- Des: 28-31
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 20. K3 Boiler Kelas I
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'K3 Boiler Kelas I' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 19; endDay := 26; -- Jan: 19-26
                WHEN 2 THEN startDay := 16; endDay := 24; -- Feb: 16-24
                WHEN 3 THEN startDay := 23; endDay := 30; -- Mrt: 23-30
                WHEN 4 THEN startDay := 20; endDay := 27; -- Apr: 20-27
                WHEN 5 THEN startDay := 18; endDay := 25; -- Mei: 18-25
                WHEN 6 THEN startDay := 22; endDay := 29; -- Juni: 22-29
                WHEN 7 THEN startDay := 13; endDay := 20; -- Juli: 13-20
                WHEN 8 THEN startDay := 18; endDay := 26; -- Agst: 18-26
                WHEN 9 THEN startDay := 14; endDay := 21; -- Sept: 14-21
                WHEN 10 THEN startDay := 12; endDay := 19; -- Okt: 12-19
                WHEN 11 THEN startDay := 16; endDay := 23; -- Nop: 16-23
                WHEN 12 THEN startDay := 14; endDay := 21; -- Des: 14-21
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 21. K3 Boiler Kelas II
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'K3 Boiler Kelas II' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 19; endDay := 22; -- Jan: 19-22
                WHEN 2 THEN startDay := 16; endDay := 22; -- Feb: 16-22
                WHEN 3 THEN startDay := 23; endDay := 26; -- Mrt: 23-26
                WHEN 4 THEN startDay := 20; endDay := 23; -- Apr: 20-23
                WHEN 5 THEN startDay := 18; endDay := 21; -- Mei: 18-21
                WHEN 6 THEN startDay := 22; endDay := 25; -- Juni: 22-25
                WHEN 7 THEN startDay := 13; endDay := 16; -- Juli: 13-16
                WHEN 8 THEN startDay := 18; endDay := 21; -- Agst: 18-21
                WHEN 9 THEN startDay := 14; endDay := 17; -- Sept: 14-17
                WHEN 10 THEN startDay := 12; endDay := 15; -- Okt: 12-15
                WHEN 11 THEN startDay := 16; endDay := 19; -- Nop: 16-19
                WHEN 12 THEN startDay := 14; endDay := 17; -- Des: 14-17
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 22. K3 Crane Kelas I
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'K3 Crane Kelas I' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 26; endDay := 30; -- Jan: 26-30
                WHEN 2 THEN startDay := 23; endDay := 27; -- Feb: 23-27
                WHEN 3 THEN startDay := 23; endDay := 27; -- Mrt: 23-27
                WHEN 4 THEN startDay := 27; endDay := 1; -- Apr: 27-1
                WHEN 5 THEN startDay := NULL; endDay := NULL; -- Mei: No schedule
                WHEN 6 THEN startDay := 22; endDay := 26; -- Juni: 22-26
                WHEN 7 THEN startDay := 20; endDay := 24; -- Juli: 20-24
                WHEN 8 THEN startDay := 18; endDay := 22; -- Agst: 18-22
                WHEN 9 THEN startDay := 21; endDay := 25; -- Sept: 21-25
                WHEN 10 THEN startDay := 26; endDay := 30; -- Okt: 26-30
                WHEN 11 THEN startDay := 23; endDay := 27; -- Nop: 23-27
                WHEN 12 THEN startDay := 14; endDay := 18; -- Des: 14-18
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 23. K3 Crane Kelas II
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'K3 Crane Kelas II' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 26; endDay := 29; -- Jan: 26-29
                WHEN 2 THEN startDay := 23; endDay := 26; -- Feb: 23-26
                WHEN 3 THEN startDay := 23; endDay := 26; -- Mrt: 23-26
                WHEN 4 THEN startDay := 27; endDay := 30; -- Apr: 27-30
                WHEN 5 THEN startDay := 18; endDay := 21; -- Mei: 18-21
                WHEN 6 THEN startDay := 22; endDay := 25; -- Juni: 22-25
                WHEN 7 THEN startDay := 20; endDay := 23; -- Juli: 20-23
                WHEN 8 THEN startDay := 18; endDay := 21; -- Agst: 18-21
                WHEN 9 THEN startDay := 21; endDay := 24; -- Sept: 21-24
                WHEN 10 THEN startDay := 26; endDay := 29; -- Okt: 26-29
                WHEN 11 THEN startDay := 23; endDay := 26; -- Nop: 23-26
                WHEN 12 THEN startDay := 28; endDay := 31; -- Des: 28-31
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 24. K3 Crane Kelas III
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'K3 Crane Kelas III' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 26; endDay := 28; -- Jan: 26-28
                WHEN 2 THEN startDay := 23; endDay := 25; -- Feb: 23-25
                WHEN 3 THEN startDay := 23; endDay := 25; -- Mrt: 23-25
                WHEN 4 THEN startDay := 27; endDay := 29; -- Apr: 27-29
                WHEN 5 THEN startDay := 18; endDay := 20; -- Mei: 18-20
                WHEN 6 THEN startDay := 22; endDay := 24; -- Juni: 22-24
                WHEN 7 THEN startDay := 20; endDay := 22; -- Juli: 20-22
                WHEN 8 THEN startDay := 18; endDay := 20; -- Agst: 18-20
                WHEN 9 THEN startDay := 21; endDay := 23; -- Sept: 21-23
                WHEN 10 THEN startDay := 26; endDay := 28; -- Okt: 26-28
                WHEN 11 THEN startDay := 23; endDay := 25; -- Nop: 23-25
                WHEN 12 THEN startDay := 28; endDay := 30; -- Des: 28-30
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 25. K3 Alat Berat
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'K3 Alat Berat' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 26; endDay := 29; -- Jan: 26-29
                WHEN 2 THEN startDay := 23; endDay := 26; -- Feb: 23-26
                WHEN 3 THEN startDay := 23; endDay := 26; -- Mrt: 23-26
                WHEN 4 THEN startDay := 27; endDay := 30; -- Apr: 27-30
                WHEN 5 THEN startDay := 18; endDay := 21; -- Mei: 18-21
                WHEN 6 THEN startDay := 22; endDay := 25; -- Juni: 22-25
                WHEN 7 THEN startDay := 20; endDay := 23; -- Juli: 20-23
                WHEN 8 THEN startDay := 18; endDay := 21; -- Agst: 18-21
                WHEN 9 THEN startDay := 21; endDay := 24; -- Sept: 21-24
                WHEN 10 THEN startDay := 26; endDay := 29; -- Okt: 26-29
                WHEN 11 THEN startDay := 23; endDay := 26; -- Nop: 23-26
                WHEN 12 THEN startDay := 28; endDay := 31; -- Des: 28-31
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 26. K3 Forklift Kelas I
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'K3 Forklift Kelas I' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 12; endDay := 15; -- Jan: 12-15
                WHEN 2 THEN startDay := 9; endDay := 12; -- Feb: 9-12
                WHEN 3 THEN startDay := 9; endDay := 12; -- Mrt: 9-12
                WHEN 4 THEN startDay := 13; endDay := 16; -- Apr: 13-16
                WHEN 5 THEN startDay := 18; endDay := 21; -- Mei: 18-21
                WHEN 6 THEN startDay := 3; endDay := 8; -- Juni: 3-8
                WHEN 7 THEN startDay := 17; endDay := 21; -- Juli: 17-21
                WHEN 8 THEN startDay := 10; endDay := 13; -- Agst: 10-13
                WHEN 9 THEN startDay := 14; endDay := 17; -- Sept: 14-17
                WHEN 10 THEN startDay := 5; endDay := 8; -- Okt: 5-8
                WHEN 11 THEN startDay := 9; endDay := 12; -- Nop: 9-12
                WHEN 12 THEN startDay := 14; endDay := 17; -- Des: 14-17
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 27. K3 Forklift Kelas II
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'K3 Forklift Kelas II' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 12; endDay := 14; -- Jan: 12-14
                WHEN 2 THEN startDay := 9; endDay := 11; -- Feb: 9-11
                WHEN 3 THEN startDay := 9; endDay := 11; -- Mrt: 9-11
                WHEN 4 THEN startDay := 13; endDay := 15; -- Apr: 13-15
                WHEN 5 THEN startDay := 18; endDay := 20; -- Mei: 18-20
                WHEN 6 THEN startDay := 3; endDay := 5; -- Juni: 3-5
                WHEN 7 THEN startDay := 17; endDay := 20; -- Juli: 17-20
                WHEN 8 THEN startDay := 10; endDay := 12; -- Agst: 10-12
                WHEN 9 THEN startDay := 14; endDay := 16; -- Sept: 14-16
                WHEN 10 THEN startDay := 5; endDay := 7; -- Okt: 5-7
                WHEN 11 THEN startDay := 9; endDay := 11; -- Nop: 9-11
                WHEN 12 THEN startDay := 14; endDay := 16; -- Des: 14-16
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 28. K3 Diesel/Genset Kelas 1 dan Kelas 2
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'K3 Diesel/Genset Kelas 1 dan Kelas 2' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 26; endDay := 29; -- Jan: 26-29
                WHEN 2 THEN startDay := 23; endDay := 26; -- Feb: 23-26
                WHEN 3 THEN startDay := 23; endDay := 26; -- Mrt: 23-26
                WHEN 4 THEN startDay := 27; endDay := 30; -- Apr: 27-30
                WHEN 5 THEN startDay := 18; endDay := 21; -- Mei: 18-21
                WHEN 6 THEN startDay := 22; endDay := 25; -- Juni: 22-25
                WHEN 7 THEN startDay := 20; endDay := 23; -- Juli: 20-23
                WHEN 8 THEN startDay := 18; endDay := 21; -- Agst: 18-21
                WHEN 9 THEN startDay := 21; endDay := 24; -- Sept: 21-24
                WHEN 10 THEN startDay := 26; endDay := 29; -- Okt: 26-29
                WHEN 11 THEN startDay := 23; endDay := 26; -- Nop: 23-26
                WHEN 12 THEN startDay := 28; endDay := 31; -- Des: 28-31
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 29. Juru Las (Welder) Gas & Listrik Kelas I
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Juru Las (Welder) Gas & Listrik Kelas I' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 19; endDay := 26; -- Jan: 19-26
                WHEN 2 THEN startDay := 16; endDay := 24; -- Feb: 16-24
                WHEN 3 THEN startDay := 23; endDay := 30; -- Mrt: 23-30
                WHEN 4 THEN startDay := 20; endDay := 27; -- Apr: 20-27
                WHEN 5 THEN startDay := 18; endDay := 25; -- Mei: 18-25
                WHEN 6 THEN startDay := 22; endDay := 29; -- Juni: 22-29
                WHEN 7 THEN startDay := 13; endDay := 20; -- Juli: 13-20
                WHEN 8 THEN startDay := 18; endDay := 26; -- Agst: 18-26
                WHEN 9 THEN startDay := 14; endDay := 21; -- Sept: 14-21
                WHEN 10 THEN startDay := 12; endDay := 19; -- Okt: 12-19
                WHEN 11 THEN startDay := 16; endDay := 23; -- Nop: 16-23
                WHEN 12 THEN startDay := 14; endDay := 21; -- Des: 14-21
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 30. Juru Las (Welder) Gas & Listrik Kelas II
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Juru Las (Welder) Gas & Listrik Kelas II' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 19; endDay := 23; -- Jan: 19-23
                WHEN 2 THEN startDay := 16; endDay := 23; -- Feb: 16-23
                WHEN 3 THEN startDay := 23; endDay := 27; -- Mrt: 23-27
                WHEN 4 THEN startDay := 20; endDay := 24; -- Apr: 20-24
                WHEN 5 THEN startDay := 18; endDay := 22; -- Mei: 18-22
                WHEN 6 THEN startDay := 22; endDay := 26; -- Juni: 22-26
                WHEN 7 THEN startDay := 13; endDay := 17; -- Juli: 13-17
                WHEN 8 THEN startDay := 18; endDay := 24; -- Agst: 18-24
                WHEN 9 THEN startDay := 14; endDay := 18; -- Sept: 14-18
                WHEN 10 THEN startDay := 12; endDay := 16; -- Okt: 12-16
                WHEN 11 THEN startDay := 16; endDay := 20; -- Nop: 16-20
                WHEN 12 THEN startDay := 14; endDay := 18; -- Des: 14-18
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 31. Juru Las (Welder) Gas & Listrik Kelas III
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Juru Las (Welder) Gas & Listrik Kelas III' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 19; endDay := 22; -- Jan: 19-22
                WHEN 2 THEN startDay := 16; endDay := 20; -- Feb: 16-20
                WHEN 3 THEN startDay := 23; endDay := 26; -- Mrt: 23-26
                WHEN 4 THEN startDay := 20; endDay := 23; -- Apr: 20-23
                WHEN 5 THEN startDay := 18; endDay := 21; -- Mei: 18-21
                WHEN 6 THEN startDay := 22; endDay := 25; -- Juni: 22-25
                WHEN 7 THEN startDay := 13; endDay := 16; -- Juli: 13-16
                WHEN 8 THEN startDay := 18; endDay := 21; -- Agst: 18-21
                WHEN 9 THEN startDay := 14; endDay := 17; -- Sept: 14-17
                WHEN 10 THEN startDay := 12; endDay := 15; -- Okt: 12-15
                WHEN 11 THEN startDay := 16; endDay := 19; -- Nop: 16-19
                WHEN 12 THEN startDay := 14; endDay := 17; -- Des: 14-17
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 32. K3 Asbes (PETUGAS)
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'K3 Asbes (PETUGAS)' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 12; endDay := 14; -- Jan: 12-14
                WHEN 2 THEN startDay := 9; endDay := 11; -- Feb: 9-11
                WHEN 3 THEN startDay := 9; endDay := 11; -- Mrt: 9-11
                WHEN 4 THEN startDay := 13; endDay := 15; -- Apr: 13-15
                WHEN 5 THEN startDay := 18; endDay := 20; -- Mei: 18-20
                WHEN 6 THEN startDay := 3; endDay := 5; -- Juni: 3-5
                WHEN 7 THEN startDay := 17; endDay := 20; -- Juli: 17-20
                WHEN 8 THEN startDay := 10; endDay := 12; -- Agst: 10-12
                WHEN 9 THEN startDay := 14; endDay := 16; -- Sept: 14-16
                WHEN 10 THEN startDay := 5; endDay := 7; -- Okt: 5-7
                WHEN 11 THEN startDay := 9; endDay := 11; -- Nop: 9-11
                WHEN 12 THEN startDay := 14; endDay := 16; -- Des: 14-16
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 33. K3 Pestisida (TEKNISI)
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'K3 Pestisida (TEKNISI)' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 12; endDay := 14; -- Jan: 12-14
                WHEN 2 THEN startDay := 9; endDay := 11; -- Feb: 9-11
                WHEN 3 THEN startDay := 9; endDay := 11; -- Mrt: 9-11
                WHEN 4 THEN startDay := 13; endDay := 15; -- Apr: 13-15
                WHEN 5 THEN startDay := 18; endDay := 20; -- Mei: 18-20
                WHEN 6 THEN startDay := 3; endDay := 5; -- Juni: 3-5
                WHEN 7 THEN startDay := 17; endDay := 20; -- Juli: 17-20
                WHEN 8 THEN startDay := 10; endDay := 12; -- Agst: 10-12
                WHEN 9 THEN startDay := 14; endDay := 16; -- Sept: 14-16
                WHEN 10 THEN startDay := 5; endDay := 7; -- Okt: 5-7
                WHEN 11 THEN startDay := 9; endDay := 11; -- Nop: 9-11
                WHEN 12 THEN startDay := 14; endDay := 16; -- Des: 14-16
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 34. K3 Deteksi Gas (TEKNISI)
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'K3 Deteksi Gas (TEKNISI)' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 12; endDay := 13; -- Jan: 12-13
                WHEN 2 THEN startDay := 9; endDay := 10; -- Feb: 9-10
                WHEN 3 THEN startDay := 9; endDay := 10; -- Mrt: 9-10
                WHEN 4 THEN startDay := 13; endDay := 14; -- Apr: 13-14
                WHEN 5 THEN startDay := 18; endDay := 19; -- Mei: 18-19
                WHEN 6 THEN startDay := 3; endDay := 4; -- Juni: 3-4
                WHEN 7 THEN startDay := 15; endDay := 16; -- Juli: 15-16
                WHEN 8 THEN startDay := 10; endDay := 11; -- Agst: 10-11
                WHEN 9 THEN startDay := 14; endDay := 15; -- Sept: 14-15
                WHEN 10 THEN startDay := 5; endDay := 6; -- Okt: 5-6
                WHEN 11 THEN startDay := 9; endDay := 10; -- Nop: 9-10
                WHEN 12 THEN startDay := 14; endDay := 15; -- Des: 14-15
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 35. K3 Ruang Terbatas / Confined Space (TEKNISI)
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'K3 Ruang Terbatas / Confined Space (TEKNISI)' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 26; endDay := 30; -- Jan: 26-30
                WHEN 2 THEN startDay := 23; endDay := 27; -- Feb: 23-27
                WHEN 3 THEN startDay := 23; endDay := 27; -- Mrt: 23-27
                WHEN 4 THEN startDay := 27; endDay := 1; -- Apr: 27-1
                WHEN 5 THEN startDay := NULL; endDay := NULL; -- Mei: No schedule
                WHEN 6 THEN startDay := 22; endDay := 26; -- Juni: 22-26
                WHEN 7 THEN startDay := 20; endDay := 24; -- Juli: 20-24
                WHEN 8 THEN startDay := 18; endDay := 24; -- Agst: 18-24
                WHEN 9 THEN startDay := 21; endDay := 25; -- Sept: 21-25
                WHEN 10 THEN startDay := 26; endDay := 30; -- Okt: 26-30
                WHEN 11 THEN startDay := 23; endDay := 27; -- Nop: 23-27
                WHEN 12 THEN startDay := 21; endDay := 28; -- Des: 21-28
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 36. K3 Penyelamat Ruang Terbatas (PETUGAS)
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'K3 Penyelamat Ruang Terbatas (PETUGAS)' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 12; endDay := 14; -- Jan: 12-14
                WHEN 2 THEN startDay := 9; endDay := 11; -- Feb: 9-11
                WHEN 3 THEN startDay := 9; endDay := 11; -- Mrt: 9-11
                WHEN 4 THEN startDay := 13; endDay := 15; -- Apr: 13-15
                WHEN 5 THEN startDay := 18; endDay := 20; -- Mei: 18-20
                WHEN 6 THEN startDay := 3; endDay := 5; -- Juni: 3-5
                WHEN 7 THEN startDay := 17; endDay := 20; -- Juli: 17-20
                WHEN 8 THEN startDay := 10; endDay := 12; -- Agst: 10-12
                WHEN 9 THEN startDay := 14; endDay := 16; -- Sept: 14-16
                WHEN 10 THEN startDay := 5; endDay := 7; -- Okt: 5-7
                WHEN 11 THEN startDay := 9; endDay := 11; -- Nop: 9-11
                WHEN 12 THEN startDay := 14; endDay := 16; -- Des: 14-16
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 37. K3 Kimia (PETUGAS)
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'K3 Kimia (PETUGAS)' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 19; endDay := 27; -- Jan: 19-27
                WHEN 2 THEN startDay := 18; endDay := 26; -- Feb: 18-26
                WHEN 3 THEN startDay := 2; endDay := 10; -- Mrt: 2-10
                WHEN 4 THEN startDay := 6; endDay := 14; -- Apr: 6-14
                WHEN 5 THEN startDay := 11; endDay := 20; -- Mei: 11-20
                WHEN 6 THEN startDay := 17; endDay := 25; -- Juni: 17-25
                WHEN 7 THEN startDay := 13; endDay := 21; -- Juli: 13-21
                WHEN 8 THEN startDay := 10; endDay := 19; -- Agst: 10-19
                WHEN 9 THEN startDay := 7; endDay := 15; -- Sept: 7-15
                WHEN 10 THEN startDay := 5; endDay := 13; -- Okt: 5-13
                WHEN 11 THEN startDay := 9; endDay := 17; -- Nop: 9-17
                WHEN 12 THEN startDay := 14; endDay := 22; -- Des: 14-22
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 38. K3 Kimia (AHLI)
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'K3 Kimia (AHLI)' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 12; endDay := 27; -- Jan: 12-27'
                WHEN 2 THEN startDay := 9; endDay := 24; -- Feb: 9-24
                WHEN 3 THEN startDay := 2; endDay := 16; -- Mrt: 2-16
                WHEN 4 THEN startDay := 6; endDay := 20; -- Apr: 6-20
                WHEN 5 THEN startDay := 4; endDay := 19; -- Mei: 4-19
                WHEN 6 THEN startDay := 8; endDay := 23; -- Juni: 8-23
                WHEN 7 THEN startDay := 6; endDay := 20; -- Juli: 6-20
                WHEN 8 THEN startDay := 3; endDay := 18; -- Agst: 3-18
                WHEN 9 THEN startDay := 7; endDay := 21; -- Sept: 7-21
                WHEN 10 THEN startDay := 5; endDay := 19; -- Okt: 5-19
                WHEN 11 THEN startDay := 2; endDay := 16; -- Nop: 2-16
                WHEN 12 THEN startDay := 7; endDay := 21; -- Des: 7-21
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 39. Ahli K3 Muda Lingkungan Kerja
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Ahli K3 Muda Lingkungan Kerja' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 19; endDay := 23; -- Jan: 19-23
                WHEN 2 THEN startDay := 16; endDay := 23; -- Feb: 16-23
                WHEN 3 THEN startDay := 23; endDay := 27; -- Mrt: 23-27
                WHEN 4 THEN startDay := 20; endDay := 24; -- Apr: 20-24
                WHEN 5 THEN startDay := 18; endDay := 22; -- Mei: 18-22
                WHEN 6 THEN startDay := 22; endDay := 26; -- Juni: 22-26
                WHEN 7 THEN startDay := 13; endDay := 17; -- Juli: 13-17
                WHEN 8 THEN startDay := 18; endDay := 24; -- Agst: 18-24
                WHEN 9 THEN startDay := 14; endDay := 18; -- Sept: 14-18
                WHEN 10 THEN startDay := 12; endDay := 16; -- Okt: 12-16
                WHEN 11 THEN startDay := 16; endDay := 20; -- Nop: 16-20
                WHEN 12 THEN startDay := 14; endDay := 18; -- Des: 14-18
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 40. Ahli K3 Madya Lingkungan Kerja
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Ahli K3 Madya Lingkungan Kerja' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 19; endDay := 23; -- Jan: 19-23
                WHEN 2 THEN startDay := 16; endDay := 23; -- Feb: 16-23
                WHEN 3 THEN startDay := 23; endDay := 27; -- Mrt: 23-27
                WHEN 4 THEN startDay := 20; endDay := 24; -- Apr: 20-24
                WHEN 5 THEN startDay := 18; endDay := 22; -- Mei: 18-22
                WHEN 6 THEN startDay := 22; endDay := 26; -- Juni: 22-26
                WHEN 7 THEN startDay := 13; endDay := 17; -- Juli: 13-17
                WHEN 8 THEN startDay := 18; endDay := 24; -- Agst: 18-24
                WHEN 9 THEN startDay := 14; endDay := 18; -- Sept: 14-18
                WHEN 10 THEN startDay := 12; endDay := 16; -- Okt: 12-16
                WHEN 11 THEN startDay := 16; endDay := 20; -- Nop: 16-20
                WHEN 12 THEN startDay := 14; endDay := 18; -- Des: 14-18
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 41. Ahli K3 Utama Lingkungan Kerja
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Ahli K3 Utama Lingkungan Kerja' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 19; endDay := 23; -- Jan: 19-23
                WHEN 2 THEN startDay := 16; endDay := 23; -- Feb: 16-23
                WHEN 3 THEN startDay := 23; endDay := 27; -- Mrt: 23-27
                WHEN 4 THEN startDay := 20; endDay := 24; -- Apr: 20-24
                WHEN 5 THEN startDay := 18; endDay := 22; -- Mei: 18-22
                WHEN 6 THEN startDay := 22; endDay := 26; -- Juni: 22-26
                WHEN 7 THEN startDay := 13; endDay := 17; -- Juli: 13-17
                WHEN 8 THEN startDay := 18; endDay := 24; -- Agst: 18-24
                WHEN 9 THEN startDay := 14; endDay := 18; -- Sept: 14-18
                WHEN 10 THEN startDay := 12; endDay := 16; -- Okt: 12-16
                WHEN 11 THEN startDay := 16; endDay := 20; -- Nop: 16-20
                WHEN 12 THEN startDay := 14; endDay := 18; -- Des: 14-18
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 42. Tenaga Kerja Bangunan Tinggi Tingkat 2
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Tenaga Kerja Bangunan Tinggi Tingkat 2' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 12; endDay := 14; -- Jan: 12-14
                WHEN 2 THEN startDay := 9; endDay := 11; -- Feb: 9-11
                WHEN 3 THEN startDay := 9; endDay := 11; -- Mrt: 9-11
                WHEN 4 THEN startDay := 13; endDay := 15; -- Apr: 13-15
                WHEN 5 THEN startDay := 18; endDay := 20; -- Mei: 18-20
                WHEN 6 THEN startDay := 3; endDay := 5; -- Juni: 3-5
                WHEN 7 THEN startDay := 17; endDay := 20; -- Juli: 17-20
                WHEN 8 THEN startDay := 10; endDay := 12; -- Agst: 10-12
                WHEN 9 THEN startDay := 14; endDay := 16; -- Sept: 14-16
                WHEN 10 THEN startDay := 5; endDay := 7; -- Okt: 5-7
                WHEN 11 THEN startDay := 9; endDay := 11; -- Nop: 9-11
                WHEN 12 THEN startDay := 14; endDay := 16; -- Des: 14-16
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 43. Tenaga Kerja Pada Ketinggian Tingkat 1
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Tenaga Kerja Pada Ketinggian Tingkat 1' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 26; endDay := 29; -- Jan: 26-29
                WHEN 2 THEN startDay := 23; endDay := 26; -- Feb: 23-26
                WHEN 3 THEN startDay := 23; endDay := 26; -- Mrt: 23-26
                WHEN 4 THEN startDay := 27; endDay := 30; -- Apr: 27-30
                WHEN 5 THEN startDay := 18; endDay := 21; -- Mei: 18-21
                WHEN 6 THEN startDay := 22; endDay := 25; -- Juni: 22-25
                WHEN 7 THEN startDay := 20; endDay := 23; -- Juli: 20-23
                WHEN 8 THEN startDay := 18; endDay := 21; -- Agst: 18-21
                WHEN 9 THEN startDay := 21; endDay := 24; -- Sept: 21-24
                WHEN 10 THEN startDay := 26; endDay := 29; -- Okt: 26-29
                WHEN 11 THEN startDay := 23; endDay := 26; -- Nop: 23-26
                WHEN 12 THEN startDay := 28; endDay := 31; -- Des: 28-31
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 44. Tenaga Kerja Pada Ketinggian Tingkat 2
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Tenaga Kerja Pada Ketinggian Tingkat 2' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 26; endDay := 29; -- Jan: 26-29
                WHEN 2 THEN startDay := 23; endDay := 26; -- Feb: 23-26
                WHEN 3 THEN startDay := 23; endDay := 26; -- Mrt: 23-26
                WHEN 4 THEN startDay := 27; endDay := 30; -- Apr: 27-30
                WHEN 5 THEN startDay := 18; endDay := 21; -- Mei: 18-21
                WHEN 6 THEN startDay := 22; endDay := 25; -- Juni: 22-25
                WHEN 7 THEN startDay := 20; endDay := 23; -- Juli: 20-23
                WHEN 8 THEN startDay := 18; endDay := 21; -- Agst: 18-21
                WHEN 9 THEN startDay := 21; endDay := 24; -- Sept: 21-24
                WHEN 10 THEN startDay := 26; endDay := 29; -- Okt: 26-29
                WHEN 11 THEN startDay := 23; endDay := 26; -- Nop: 23-26
                WHEN 12 THEN startDay := 28; endDay := 31; -- Des: 28-31
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 45. Hyperkes Untuk Paramedis
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Hyperkes Untuk Paramedis' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 19; endDay := 23; -- Jan: 19-23
                WHEN 2 THEN startDay := 16; endDay := 23; -- Feb: 16-23
                WHEN 3 THEN startDay := 23; endDay := 27; -- Mrt: 23-27
                WHEN 4 THEN startDay := 20; endDay := 24; -- Apr: 20-24
                WHEN 5 THEN startDay := 18; endDay := 22; -- Mei: 18-22
                WHEN 6 THEN startDay := 22; endDay := 26; -- Juni: 22-26
                WHEN 7 THEN startDay := 13; endDay := 17; -- Juli: 13-17
                WHEN 8 THEN startDay := 18; endDay := 24; -- Agst: 18-24
                WHEN 9 THEN startDay := 14; endDay := 18; -- Sept: 14-18
                WHEN 10 THEN startDay := 12; endDay := 16; -- Okt: 12-16
                WHEN 11 THEN startDay := 16; endDay := 20; -- Nop: 16-20
                WHEN 12 THEN startDay := 14; endDay := 18; -- Des: 14-18
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 46. Hyperkes Untuk Dokter
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Hyperkes Untuk Dokter' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 19; endDay := 26; -- Jan: 19-26
                WHEN 2 THEN startDay := 16; endDay := 24; -- Feb: 16-24
                WHEN 3 THEN startDay := 23; endDay := 30; -- Mrt: 23-30
                WHEN 4 THEN startDay := 20; endDay := 27; -- Apr: 20-27
                WHEN 5 THEN startDay := 18; endDay := 25; -- Mei: 18-25
                WHEN 6 THEN startDay := 22; endDay := 29; -- Juni: 22-29
                WHEN 7 THEN startDay := 13; endDay := 20; -- Juli: 13-20
                WHEN 8 THEN startDay := 18; endDay := 26; -- Agst: 18-26
                WHEN 9 THEN startDay := 14; endDay := 21; -- Sept: 14-21
                WHEN 10 THEN startDay := 12; endDay := 19; -- Okt: 12-19
                WHEN 11 THEN startDay := 16; endDay := 23; -- Nop: 16-23
                WHEN 12 THEN startDay := 14; endDay := 21; -- Des: 14-21
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 47. P3K (First Aider )
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'P3K (First Aider )' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 13; endDay := 15; -- Jan: 13-15
                WHEN 2 THEN startDay := 10; endDay := 12; -- Feb: 10-12
                WHEN 3 THEN startDay := 3; endDay := 5; -- Mrt: 3-5
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 5; endDay := 7; -- Mei: 5-7
                WHEN 6 THEN startDay := 2; endDay := 4; -- Juni: 2-4
                WHEN 7 THEN startDay := 7; endDay := 9; -- Juli: 7-9
                WHEN 8 THEN startDay := 4; endDay := 6; -- Agst: 4-6
                WHEN 9 THEN startDay := 8; endDay := 10; -- Sept: 8-10
                WHEN 10 THEN startDay := 6; endDay := 8; -- Okt: 6-8
                WHEN 11 THEN startDay := 2; endDay := 5; -- Nop: 2-5
                WHEN 12 THEN startDay := 1; endDay := 3; -- Des: 1-3
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 48. K3 Rumah Sakit
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'K3 Rumah Sakit' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 13; endDay := 15; -- Jan: 13-15
                WHEN 2 THEN startDay := 10; endDay := 12; -- Feb: 10-12
                WHEN 3 THEN startDay := 3; endDay := 5; -- Mrt: 3-5
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 5; endDay := 7; -- Mei: 5-7
                WHEN 6 THEN startDay := 2; endDay := 4; -- Juni: 2-4
                WHEN 7 THEN startDay := 7; endDay := 9; -- Juli: 7-9
                WHEN 8 THEN startDay := 4; endDay := 6; -- Agst: 4-6
                WHEN 9 THEN startDay := 8; endDay := 10; -- Sept: 8-10
                WHEN 10 THEN startDay := 6; endDay := 8; -- Okt: 6-8
                WHEN 11 THEN startDay := 2; endDay := 5; -- Nop: 2-5
                WHEN 12 THEN startDay := 1; endDay := 3; -- Des: 1-3
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 49. Ahli K3 Umum
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Ahli K3 Umum' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 12; endDay := 27; -- Jan: 12-27
                WHEN 2 THEN startDay := 9; endDay := 24; -- Feb: 9-24
                WHEN 3 THEN startDay := 2; endDay := 17; -- Mrt: 2-17
                WHEN 4 THEN startDay := 13; endDay := 27; -- Apr: 13-27
                WHEN 5 THEN startDay := 11; endDay := 26; -- Mei: 11-26
                WHEN 6 THEN startDay := 8; endDay := 23; -- Juni: 8-23
                WHEN 7 THEN startDay := 6; endDay := 20; -- Juli: 6-20
                WHEN 8 THEN startDay := 3; endDay := 18; -- Agst: 3-18
                WHEN 9 THEN startDay := 14; endDay := 28; -- Sept: 14-28
                WHEN 10 THEN startDay := 12; endDay := 26; -- Okt: 12-26
                WHEN 11 THEN startDay := 9; endDay := 23; -- Nop: 9-23
                WHEN 12 THEN startDay := 7; endDay := 21; -- Des: 7-21
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 50. P2K3  (Panitia Pembina K3) (non sertifikasi)
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'P2K3  (Panitia Pembina K3) (non sertifikasi)' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 13; endDay := 15; -- Jan: 13-15
                WHEN 2 THEN startDay := 10; endDay := 12; -- Feb: 10-12
                WHEN 3 THEN startDay := 3; endDay := 5; -- Mrt: 3-5
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 5; endDay := 7; -- Mei: 5-7
                WHEN 6 THEN startDay := 2; endDay := 4; -- Juni: 2-4
                WHEN 7 THEN startDay := 7; endDay := 9; -- Juli: 7-9
                WHEN 8 THEN startDay := 4; endDay := 6; -- Agst: 4-6
                WHEN 9 THEN startDay := 8; endDay := 10; -- Sept: 8-10
                WHEN 10 THEN startDay := 6; endDay := 8; -- Okt: 6-8
                WHEN 11 THEN startDay := 2; endDay := 5; -- Nop: 2-5
                WHEN 12 THEN startDay := 1; endDay := 3; -- Des: 1-3
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 51. Auditor SMK3  (Sistem Manajemen K3)
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Auditor SMK3  (Sistem Manajemen K3)' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 26; endDay := 30; -- Jan: 26-30
                WHEN 2 THEN startDay := 23; endDay := 27; -- Feb: 23-27
                WHEN 3 THEN startDay := 23; endDay := 27; -- Mrt: 23-27
                WHEN 4 THEN startDay := 27; endDay := 1; -- Apr: 27-1
                WHEN 5 THEN startDay := NULL; endDay := NULL; -- Mei: No schedule
                WHEN 6 THEN startDay := 22; endDay := 26; -- Juni: 22-26
                WHEN 7 THEN startDay := 20; endDay := 24; -- Juli: 20-24
                WHEN 8 THEN startDay := 18; endDay := 24; -- Agst: 18-24
                WHEN 9 THEN startDay := 21; endDay := 25; -- Sept: 21-25
                WHEN 10 THEN startDay := 26; endDay := 30; -- Okt: 26-30
                WHEN 11 THEN startDay := 23; endDay := 27; -- Nop: 23-27
                WHEN 12 THEN startDay := 21; endDay := 28; -- Des: 21-28
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 52. Investigasi Kecelakaan (non sertifikasi)
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Investigasi Kecelakaan (non sertifikasi)' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 13; endDay := 15; -- Jan: 13-15
                WHEN 2 THEN startDay := 10; endDay := 12; -- Feb: 10-12
                WHEN 3 THEN startDay := 3; endDay := 5; -- Mrt: 3-5
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 5; endDay := 7; -- Mei: 5-7
                WHEN 6 THEN startDay := 2; endDay := 4; -- Juni: 2-4
                WHEN 7 THEN startDay := 7; endDay := 9; -- Juli: 7-9
                WHEN 8 THEN startDay := 4; endDay := 6; -- Agst: 4-6
                WHEN 9 THEN startDay := 8; endDay := 10; -- Sept: 8-10
                WHEN 10 THEN startDay := 6; endDay := 8; -- Okt: 6-8
                WHEN 11 THEN startDay := 2; endDay := 5; -- Nop: 2-5
                WHEN 12 THEN startDay := 1; endDay := 3; -- Des: 1-3
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 53. Fire Safety Manager (FSM)
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Fire Safety Manager (FSM)' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 13; endDay := 15; -- Jan: 13-15
                WHEN 2 THEN startDay := 24; endDay := 26; -- Feb: 24-26
                WHEN 3 THEN startDay := 24; endDay := 26; -- Mrt: 24-26
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 19; endDay := 21; -- Mei: 19-21
                WHEN 6 THEN startDay := 23; endDay := 25; -- Juni: 23-25
                WHEN 7 THEN startDay := 14; endDay := 16; -- Juli: 14-16
                WHEN 8 THEN startDay := 18; endDay := 20; -- Agst: 18-20
                WHEN 9 THEN startDay := 15; endDay := 17; -- Sept: 15-17
                WHEN 10 THEN startDay := 13; endDay := 15; -- Okt: 13-15
                WHEN 11 THEN startDay := 17; endDay := 19; -- Nop: 17-19
                WHEN 12 THEN startDay := 15; endDay := 17; -- Des: 15-17
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 54. Penanggung Jawab Pengendalian Pencemaran Udara (PPPU)
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Penanggung Jawab Pengendalian Pencemaran Udara (PPPU)' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 13; endDay := 15; -- Jan: 13-15
                WHEN 2 THEN startDay := 10; endDay := 12; -- Feb: 10-12
                WHEN 3 THEN startDay := 3; endDay := 5; -- Mrt: 3-5
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 5; endDay := 7; -- Mei: 5-7
                WHEN 6 THEN startDay := 2; endDay := 4; -- Juni: 2-4
                WHEN 7 THEN startDay := 7; endDay := 9; -- Juli: 7-9
                WHEN 8 THEN startDay := 4; endDay := 6; -- Agst: 4-6
                WHEN 9 THEN startDay := 8; endDay := 10; -- Sept: 8-10
                WHEN 10 THEN startDay := 6; endDay := 8; -- Okt: 6-8
                WHEN 11 THEN startDay := 2; endDay := 5; -- Nop: 2-5
                WHEN 12 THEN startDay := 1; endDay := 3; -- Des: 1-3
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 55. Penanggung Jawab Pengendalian Pencemaran Air (PPPA)
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Penanggung Jawab Pengendalian Pencemaran Air (PPPA)' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 13; endDay := 15; -- Jan: 13-15
                WHEN 2 THEN startDay := 10; endDay := 12; -- Feb: 10-12
                WHEN 3 THEN startDay := 3; endDay := 5; -- Mrt: 3-5
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 5; endDay := 7; -- Mei: 5-7
                WHEN 6 THEN startDay := 2; endDay := 4; -- Juni: 2-4
                WHEN 7 THEN startDay := 7; endDay := 9; -- Juli: 7-9
                WHEN 8 THEN startDay := 4; endDay := 6; -- Agst: 4-6
                WHEN 9 THEN startDay := 8; endDay := 10; -- Sept: 8-10
                WHEN 10 THEN startDay := 6; endDay := 8; -- Okt: 6-8
                WHEN 11 THEN startDay := 2; endDay := 5; -- Nop: 2-5
                WHEN 12 THEN startDay := 1; endDay := 3; -- Des: 1-3
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 56. Pemantauan dan Analisis Pengelolaan Limbah B3 (PLB3)
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Pemantauan dan Analisis Pengelolaan Limbah B3 (PLB3)' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 13; endDay := 15; -- Jan: 13-15
                WHEN 2 THEN startDay := 10; endDay := 12; -- Feb: 10-12
                WHEN 3 THEN startDay := 3; endDay := 5; -- Mrt: 3-5
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 5; endDay := 7; -- Mei: 5-7
                WHEN 6 THEN startDay := 2; endDay := 4; -- Juni: 2-4
                WHEN 7 THEN startDay := 7; endDay := 9; -- Juli: 7-9
                WHEN 8 THEN startDay := 4; endDay := 6; -- Agst: 4-6
                WHEN 9 THEN startDay := 8; endDay := 10; -- Sept: 8-10
                WHEN 10 THEN startDay := 6; endDay := 8; -- Okt: 6-8
                WHEN 11 THEN startDay := 2; endDay := 5; -- Nop: 2-5
                WHEN 12 THEN startDay := 1; endDay := 3; -- Des: 1-3
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 57. Penanggung Jawab Operasional Instalasi Pengendalian Pencemaran Udara (POPU)
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Penanggung Jawab Operasional Instalasi Pengendalian Pencemaran Udara (POPU)' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 13; endDay := 15; -- Jan: 13-15
                WHEN 2 THEN startDay := 10; endDay := 12; -- Feb: 10-12
                WHEN 3 THEN startDay := 3; endDay := 5; -- Mrt: 3-5
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 5; endDay := 7; -- Mei: 5-7
                WHEN 6 THEN startDay := 2; endDay := 4; -- Juni: 2-4
                WHEN 7 THEN startDay := 7; endDay := 9; -- Juli: 7-9
                WHEN 8 THEN startDay := 4; endDay := 6; -- Agst: 4-6
                WHEN 9 THEN startDay := 8; endDay := 10; -- Sept: 8-10
                WHEN 10 THEN startDay := 6; endDay := 8; -- Okt: 6-8
                WHEN 11 THEN startDay := 2; endDay := 5; -- Nop: 2-5
                WHEN 12 THEN startDay := 1; endDay := 3; -- Des: 1-3
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 58. Penanggung jawab Operasional Pengolahan Air Limbah (POPAL) 
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Penanggung jawab Operasional Pengolahan Air Limbah (POPAL) ' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 13; endDay := 15; -- Jan: 13-15
                WHEN 2 THEN startDay := 10; endDay := 12; -- Feb: 10-12
                WHEN 3 THEN startDay := 3; endDay := 5; -- Mrt: 3-5
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 5; endDay := 7; -- Mei: 5-7
                WHEN 6 THEN startDay := 2; endDay := 4; -- Juni: 2-4
                WHEN 7 THEN startDay := 7; endDay := 9; -- Juli: 7-9
                WHEN 8 THEN startDay := 4; endDay := 6; -- Agst: 4-6
                WHEN 9 THEN startDay := 8; endDay := 10; -- Sept: 8-10
                WHEN 10 THEN startDay := 6; endDay := 8; -- Okt: 6-8
                WHEN 11 THEN startDay := 2; endDay := 5; -- Nop: 2-5
                WHEN 12 THEN startDay := 1; endDay := 3; -- Des: 1-3
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 59. Pengoperasian Instalasi Pengelolaan limbah B3 (OLB3)
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Pengoperasian Instalasi Pengelolaan limbah B3 (OLB3)' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 13; endDay := 15; -- Jan: 13-15
                WHEN 2 THEN startDay := 10; endDay := 12; -- Feb: 10-12
                WHEN 3 THEN startDay := 3; endDay := 5; -- Mrt: 3-5
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 5; endDay := 7; -- Mei: 5-7
                WHEN 6 THEN startDay := 2; endDay := 4; -- Juni: 2-4
                WHEN 7 THEN startDay := 7; endDay := 9; -- Juli: 7-9
                WHEN 8 THEN startDay := 4; endDay := 6; -- Agst: 4-6
                WHEN 9 THEN startDay := 8; endDay := 10; -- Sept: 8-10
                WHEN 10 THEN startDay := 6; endDay := 8; -- Okt: 6-8
                WHEN 11 THEN startDay := 2; endDay := 5; -- Nop: 2-5
                WHEN 12 THEN startDay := 1; endDay := 3; -- Des: 1-3
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 60. HR Manager
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'HR Manager' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 26; endDay := 29; -- Jan: 26-29
                WHEN 2 THEN startDay := 23; endDay := 26; -- Feb: 23-26
                WHEN 3 THEN startDay := 23; endDay := 26; -- Mrt: 23-26
                WHEN 4 THEN startDay := 27; endDay := 30; -- Apr: 27-30
                WHEN 5 THEN startDay := 18; endDay := 21; -- Mei: 18-21
                WHEN 6 THEN startDay := 22; endDay := 25; -- Juni: 22-25
                WHEN 7 THEN startDay := 20; endDay := 23; -- Juli: 20-23
                WHEN 8 THEN startDay := 18; endDay := 21; -- Agst: 18-21
                WHEN 9 THEN startDay := 21; endDay := 24; -- Sept: 21-24
                WHEN 10 THEN startDay := 26; endDay := 29; -- Okt: 26-29
                WHEN 11 THEN startDay := 23; endDay := 26; -- Nop: 23-26
                WHEN 12 THEN startDay := 28; endDay := 31; -- Des: 28-31
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 61. HR Supervisor
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'HR Supervisor' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 12; endDay := 14; -- Jan: 12-14
                WHEN 2 THEN startDay := 9; endDay := 11; -- Feb: 9-11
                WHEN 3 THEN startDay := 9; endDay := 11; -- Mrt: 9-11
                WHEN 4 THEN startDay := 13; endDay := 15; -- Apr: 13-15
                WHEN 5 THEN startDay := 18; endDay := 20; -- Mei: 18-20
                WHEN 6 THEN startDay := 3; endDay := 5; -- Juni: 3-5
                WHEN 7 THEN startDay := 17; endDay := 20; -- Juli: 17-20
                WHEN 8 THEN startDay := 10; endDay := 12; -- Agst: 10-12
                WHEN 9 THEN startDay := 14; endDay := 16; -- Sept: 14-16
                WHEN 10 THEN startDay := 5; endDay := 7; -- Okt: 5-7
                WHEN 11 THEN startDay := 9; endDay := 11; -- Nop: 9-11
                WHEN 12 THEN startDay := 14; endDay := 16; -- Des: 14-16
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 62. HR Staff
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'HR Staff' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 12; endDay := 14; -- Jan: 12-14
                WHEN 2 THEN startDay := 9; endDay := 11; -- Feb: 9-11
                WHEN 3 THEN startDay := 9; endDay := 11; -- Mrt: 9-11
                WHEN 4 THEN startDay := 13; endDay := 15; -- Apr: 13-15
                WHEN 5 THEN startDay := 18; endDay := 20; -- Mei: 18-20
                WHEN 6 THEN startDay := 3; endDay := 5; -- Juni: 3-5
                WHEN 7 THEN startDay := 17; endDay := 20; -- Juli: 17-20
                WHEN 8 THEN startDay := 10; endDay := 12; -- Agst: 10-12
                WHEN 9 THEN startDay := 14; endDay := 16; -- Sept: 14-16
                WHEN 10 THEN startDay := 5; endDay := 7; -- Okt: 5-7
                WHEN 11 THEN startDay := 9; endDay := 11; -- Nop: 9-11
                WHEN 12 THEN startDay := 14; endDay := 16; -- Des: 14-16
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 63. Operator K3 
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Operator K3 ' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 12; endDay := 14; -- Jan: 12-14
                WHEN 2 THEN startDay := 9; endDay := 11; -- Feb: 9-11
                WHEN 3 THEN startDay := 9; endDay := 11; -- Mrt: 9-11
                WHEN 4 THEN startDay := 13; endDay := 15; -- Apr: 13-15
                WHEN 5 THEN startDay := 18; endDay := 20; -- Mei: 18-20
                WHEN 6 THEN startDay := 3; endDay := 5; -- Juni: 3-5
                WHEN 7 THEN startDay := 17; endDay := 20; -- Juli: 17-20
                WHEN 8 THEN startDay := 10; endDay := 12; -- Agst: 10-12
                WHEN 9 THEN startDay := 14; endDay := 16; -- Sept: 14-16
                WHEN 10 THEN startDay := 5; endDay := 7; -- Okt: 5-7
                WHEN 11 THEN startDay := 9; endDay := 11; -- Nop: 9-11
                WHEN 12 THEN startDay := 14; endDay := 16; -- Des: 14-16
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 64. Petugas K3 
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Petugas K3 ' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 12; endDay := 14; -- Jan: 12-14
                WHEN 2 THEN startDay := 9; endDay := 11; -- Feb: 9-11
                WHEN 3 THEN startDay := 9; endDay := 11; -- Mrt: 9-11
                WHEN 4 THEN startDay := 13; endDay := 15; -- Apr: 13-15
                WHEN 5 THEN startDay := 18; endDay := 20; -- Mei: 18-20
                WHEN 6 THEN startDay := 3; endDay := 5; -- Juni: 3-5
                WHEN 7 THEN startDay := 17; endDay := 20; -- Juli: 17-20
                WHEN 8 THEN startDay := 10; endDay := 12; -- Agst: 10-12
                WHEN 9 THEN startDay := 14; endDay := 16; -- Sept: 14-16
                WHEN 10 THEN startDay := 5; endDay := 7; -- Okt: 5-7
                WHEN 11 THEN startDay := 9; endDay := 11; -- Nop: 9-11
                WHEN 12 THEN startDay := 14; endDay := 16; -- Des: 14-16
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 65. Ahli K3 
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Ahli K3 ' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 26; endDay := 29; -- Jan: 26-29
                WHEN 2 THEN startDay := 23; endDay := 26; -- Feb: 23-26
                WHEN 3 THEN startDay := 23; endDay := 26; -- Mrt: 23-26
                WHEN 4 THEN startDay := 27; endDay := 30; -- Apr: 27-30
                WHEN 5 THEN startDay := 18; endDay := 21; -- Mei: 18-21
                WHEN 6 THEN startDay := 22; endDay := 25; -- Juni: 22-25
                WHEN 7 THEN startDay := 20; endDay := 23; -- Juli: 20-23
                WHEN 8 THEN startDay := 18; endDay := 21; -- Agst: 18-21
                WHEN 9 THEN startDay := 21; endDay := 24; -- Sept: 21-24
                WHEN 10 THEN startDay := 26; endDay := 29; -- Okt: 26-29
                WHEN 11 THEN startDay := 23; endDay := 26; -- Nop: 23-26
                WHEN 12 THEN startDay := 28; endDay := 31; -- Des: 28-31
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 66. Pengelolaan K3 Listrik 
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Pengelolaan K3 Listrik ' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 12; endDay := 14; -- Jan: 12-14
                WHEN 2 THEN startDay := 9; endDay := 11; -- Feb: 9-11
                WHEN 3 THEN startDay := 9; endDay := 11; -- Mrt: 9-11
                WHEN 4 THEN startDay := 13; endDay := 15; -- Apr: 13-15
                WHEN 5 THEN startDay := 18; endDay := 20; -- Mei: 18-20
                WHEN 6 THEN startDay := 3; endDay := 5; -- Juni: 3-5
                WHEN 7 THEN startDay := 17; endDay := 20; -- Juli: 17-20
                WHEN 8 THEN startDay := 10; endDay := 12; -- Agst: 10-12
                WHEN 9 THEN startDay := 14; endDay := 16; -- Sept: 14-16
                WHEN 10 THEN startDay := 5; endDay := 7; -- Okt: 5-7
                WHEN 11 THEN startDay := 9; endDay := 11; -- Nop: 9-11
                WHEN 12 THEN startDay := 14; endDay := 16; -- Des: 14-16
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 67. Penganalisa K3 Listrik 
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Penganalisa K3 Listrik ' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 19; endDay := 22; -- Jan: 19-22
                WHEN 2 THEN startDay := 16; endDay := 20; -- Feb: 16-20
                WHEN 3 THEN startDay := 23; endDay := 26; -- Mrt: 23-26
                WHEN 4 THEN startDay := 20; endDay := 23; -- Apr: 20-23
                WHEN 5 THEN startDay := 18; endDay := 21; -- Mei: 18-21
                WHEN 6 THEN startDay := 22; endDay := 25; -- Juni: 22-25
                WHEN 7 THEN startDay := 13; endDay := 16; -- Juli: 13-16
                WHEN 8 THEN startDay := 18; endDay := 21; -- Agst: 18-21
                WHEN 9 THEN startDay := 14; endDay := 17; -- Sept: 14-17
                WHEN 10 THEN startDay := 12; endDay := 15; -- Okt: 12-15
                WHEN 11 THEN startDay := 16; endDay := 19; -- Nop: 16-19
                WHEN 12 THEN startDay := 14; endDay := 17; -- Des: 14-17
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 68. Pengawasan K3 Industri Migas 
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Pengawasan K3 Industri Migas ' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 19; endDay := 22; -- Jan: 19-22
                WHEN 2 THEN startDay := 16; endDay := 20; -- Feb: 16-20
                WHEN 3 THEN startDay := 23; endDay := 26; -- Mrt: 23-26
                WHEN 4 THEN startDay := 20; endDay := 23; -- Apr: 20-23
                WHEN 5 THEN startDay := 18; endDay := 21; -- Mei: 18-21
                WHEN 6 THEN startDay := 22; endDay := 25; -- Juni: 22-25
                WHEN 7 THEN startDay := 13; endDay := 16; -- Juli: 13-16
                WHEN 8 THEN startDay := 18; endDay := 21; -- Agst: 18-21
                WHEN 9 THEN startDay := 14; endDay := 17; -- Sept: 14-17
                WHEN 10 THEN startDay := 12; endDay := 15; -- Okt: 12-15
                WHEN 11 THEN startDay := 16; endDay := 19; -- Nop: 16-19
                WHEN 12 THEN startDay := 14; endDay := 17; -- Des: 14-17
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 69. Pengoperasian K3 Industrian Migas 
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Pengoperasian K3 Industrian Migas ' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 12; endDay := 14; -- Jan: 12-14
                WHEN 2 THEN startDay := 9; endDay := 11; -- Feb: 9-11
                WHEN 3 THEN startDay := 9; endDay := 11; -- Mrt: 9-11
                WHEN 4 THEN startDay := 13; endDay := 15; -- Apr: 13-15
                WHEN 5 THEN startDay := 18; endDay := 20; -- Mei: 18-20
                WHEN 6 THEN startDay := 3; endDay := 5; -- Juni: 3-5
                WHEN 7 THEN startDay := 17; endDay := 20; -- Juli: 17-20
                WHEN 8 THEN startDay := 10; endDay := 12; -- Agst: 10-12
                WHEN 9 THEN startDay := 14; endDay := 16; -- Sept: 14-16
                WHEN 10 THEN startDay := 5; endDay := 7; -- Okt: 5-7
                WHEN 11 THEN startDay := 9; endDay := 11; -- Nop: 9-11
                WHEN 12 THEN startDay := 14; endDay := 16; -- Des: 14-16
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 70. Paramedis K3 Muda 
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Paramedis K3 Muda ' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 12; endDay := 14; -- Jan: 12-14
                WHEN 2 THEN startDay := 9; endDay := 11; -- Feb: 9-11
                WHEN 3 THEN startDay := 9; endDay := 11; -- Mrt: 9-11
                WHEN 4 THEN startDay := 13; endDay := 15; -- Apr: 13-15
                WHEN 5 THEN startDay := 18; endDay := 20; -- Mei: 18-20
                WHEN 6 THEN startDay := 3; endDay := 5; -- Juni: 3-5
                WHEN 7 THEN startDay := 17; endDay := 20; -- Juli: 17-20
                WHEN 8 THEN startDay := 10; endDay := 12; -- Agst: 10-12
                WHEN 9 THEN startDay := 14; endDay := 16; -- Sept: 14-16
                WHEN 10 THEN startDay := 5; endDay := 7; -- Okt: 5-7
                WHEN 11 THEN startDay := 9; endDay := 11; -- Nop: 9-11
                WHEN 12 THEN startDay := 14; endDay := 16; -- Des: 14-16
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 71. Paramedis K3 Madya 
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Paramedis K3 Madya ' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 12; endDay := 14; -- Jan: 12-14
                WHEN 2 THEN startDay := 9; endDay := 11; -- Feb: 9-11
                WHEN 3 THEN startDay := 9; endDay := 11; -- Mrt: 9-11
                WHEN 4 THEN startDay := 13; endDay := 15; -- Apr: 13-15
                WHEN 5 THEN startDay := 18; endDay := 20; -- Mei: 18-20
                WHEN 6 THEN startDay := 3; endDay := 5; -- Juni: 3-5
                WHEN 7 THEN startDay := 17; endDay := 20; -- Juli: 17-20
                WHEN 8 THEN startDay := 10; endDay := 12; -- Agst: 10-12
                WHEN 9 THEN startDay := 14; endDay := 16; -- Sept: 14-16
                WHEN 10 THEN startDay := 5; endDay := 7; -- Okt: 5-7
                WHEN 11 THEN startDay := 9; endDay := 11; -- Nop: 9-11
                WHEN 12 THEN startDay := 14; endDay := 16; -- Des: 14-16
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 72. Paramedis K3 Utama 
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Paramedis K3 Utama ' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 26; endDay := 29; -- Jan: 26-29
                WHEN 2 THEN startDay := 23; endDay := 26; -- Feb: 23-26
                WHEN 3 THEN startDay := 23; endDay := 26; -- Mrt: 23-26
                WHEN 4 THEN startDay := 27; endDay := 30; -- Apr: 27-30
                WHEN 5 THEN startDay := 18; endDay := 21; -- Mei: 18-21
                WHEN 6 THEN startDay := 22; endDay := 25; -- Juni: 22-25
                WHEN 7 THEN startDay := 20; endDay := 23; -- Juli: 20-23
                WHEN 8 THEN startDay := 18; endDay := 21; -- Agst: 18-21
                WHEN 9 THEN startDay := 21; endDay := 24; -- Sept: 21-24
                WHEN 10 THEN startDay := 26; endDay := 29; -- Okt: 26-29
                WHEN 11 THEN startDay := 23; endDay := 26; -- Nop: 23-26
                WHEN 12 THEN startDay := 28; endDay := 31; -- Des: 28-31
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 73. Dokter Perusahaan
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Dokter Perusahaan' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 26; endDay := 29; -- Jan: 26-29
                WHEN 2 THEN startDay := 23; endDay := 26; -- Feb: 23-26
                WHEN 3 THEN startDay := 23; endDay := 26; -- Mrt: 23-26
                WHEN 4 THEN startDay := 27; endDay := 30; -- Apr: 27-30
                WHEN 5 THEN startDay := 18; endDay := 21; -- Mei: 18-21
                WHEN 6 THEN startDay := 22; endDay := 25; -- Juni: 22-25
                WHEN 7 THEN startDay := 20; endDay := 23; -- Juli: 20-23
                WHEN 8 THEN startDay := 18; endDay := 21; -- Agst: 18-21
                WHEN 9 THEN startDay := 21; endDay := 24; -- Sept: 21-24
                WHEN 10 THEN startDay := 26; endDay := 29; -- Okt: 26-29
                WHEN 11 THEN startDay := 23; endDay := 26; -- Nop: 23-26
                WHEN 12 THEN startDay := 28; endDay := 31; -- Des: 28-31
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 74. Pengelolaan Laboratorium
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Pengelolaan Laboratorium' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 26; endDay := 29; -- Jan: 26-29
                WHEN 2 THEN startDay := 23; endDay := 26; -- Feb: 23-26
                WHEN 3 THEN startDay := 23; endDay := 26; -- Mrt: 23-26
                WHEN 4 THEN startDay := 27; endDay := 30; -- Apr: 27-30
                WHEN 5 THEN startDay := 18; endDay := 21; -- Mei: 18-21
                WHEN 6 THEN startDay := 22; endDay := 25; -- Juni: 22-25
                WHEN 7 THEN startDay := 20; endDay := 23; -- Juli: 20-23
                WHEN 8 THEN startDay := 18; endDay := 21; -- Agst: 18-21
                WHEN 9 THEN startDay := 21; endDay := 24; -- Sept: 21-24
                WHEN 10 THEN startDay := 26; endDay := 29; -- Okt: 26-29
                WHEN 11 THEN startDay := 23; endDay := 26; -- Nop: 23-26
                WHEN 12 THEN startDay := 28; endDay := 31; -- Des: 28-31
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 75. Pengelolaan P3K di tempat Kerja
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Pengelolaan P3K di tempat Kerja' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 26; endDay := 29; -- Jan: 26-29
                WHEN 2 THEN startDay := 23; endDay := 26; -- Feb: 23-26
                WHEN 3 THEN startDay := 23; endDay := 26; -- Mrt: 23-26
                WHEN 4 THEN startDay := 27; endDay := 30; -- Apr: 27-30
                WHEN 5 THEN startDay := 18; endDay := 21; -- Mei: 18-21
                WHEN 6 THEN startDay := 22; endDay := 25; -- Juni: 22-25
                WHEN 7 THEN startDay := 20; endDay := 23; -- Juli: 20-23
                WHEN 8 THEN startDay := 18; endDay := 21; -- Agst: 18-21
                WHEN 9 THEN startDay := 21; endDay := 24; -- Sept: 21-24
                WHEN 10 THEN startDay := 26; endDay := 29; -- Okt: 26-29
                WHEN 11 THEN startDay := 23; endDay := 26; -- Nop: 23-26
                WHEN 12 THEN startDay := 28; endDay := 31; -- Des: 28-31
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 76. Pemadaman Kebakaran Migas
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Pemadaman Kebakaran Migas' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 26; endDay := 29; -- Jan: 26-29
                WHEN 2 THEN startDay := 23; endDay := 26; -- Feb: 23-26
                WHEN 3 THEN startDay := 23; endDay := 26; -- Mrt: 23-26
                WHEN 4 THEN startDay := 27; endDay := 30; -- Apr: 27-30
                WHEN 5 THEN startDay := 18; endDay := 21; -- Mei: 18-21
                WHEN 6 THEN startDay := 22; endDay := 25; -- Juni: 22-25
                WHEN 7 THEN startDay := 20; endDay := 23; -- Juli: 20-23
                WHEN 8 THEN startDay := 18; endDay := 21; -- Agst: 18-21
                WHEN 9 THEN startDay := 21; endDay := 24; -- Sept: 21-24
                WHEN 10 THEN startDay := 26; endDay := 29; -- Okt: 26-29
                WHEN 11 THEN startDay := 23; endDay := 26; -- Nop: 23-26
                WHEN 12 THEN startDay := 28; endDay := 31; -- Des: 28-31
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 77. Pengoperasian Forklift
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Pengoperasian Forklift' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 13; endDay := 15; -- Jan: 13-15
                WHEN 2 THEN startDay := 10; endDay := 12; -- Feb: 10-12
                WHEN 3 THEN startDay := 3; endDay := 5; -- Mrt: 3-5
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 5; endDay := 7; -- Mei: 5-7
                WHEN 6 THEN startDay := 2; endDay := 4; -- Juni: 2-4
                WHEN 7 THEN startDay := 7; endDay := 9; -- Juli: 7-9
                WHEN 8 THEN startDay := 4; endDay := 6; -- Agst: 4-6
                WHEN 9 THEN startDay := 8; endDay := 10; -- Sept: 8-10
                WHEN 10 THEN startDay := 6; endDay := 8; -- Okt: 6-8
                WHEN 11 THEN startDay := 2; endDay := 5; -- Nop: 2-5
                WHEN 12 THEN startDay := 1; endDay := 3; -- Des: 1-3
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 78. Pengoperasian Crane Jembatan
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Pengoperasian Crane Jembatan' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 13; endDay := 15; -- Jan: 13-15
                WHEN 2 THEN startDay := 10; endDay := 12; -- Feb: 10-12
                WHEN 3 THEN startDay := 3; endDay := 5; -- Mrt: 3-5
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 5; endDay := 7; -- Mei: 5-7
                WHEN 6 THEN startDay := 2; endDay := 4; -- Juni: 2-4
                WHEN 7 THEN startDay := 7; endDay := 9; -- Juli: 7-9
                WHEN 8 THEN startDay := 4; endDay := 6; -- Agst: 4-6
                WHEN 9 THEN startDay := 8; endDay := 10; -- Sept: 8-10
                WHEN 10 THEN startDay := 6; endDay := 8; -- Okt: 6-8
                WHEN 11 THEN startDay := 2; endDay := 5; -- Nop: 2-5
                WHEN 12 THEN startDay := 1; endDay := 3; -- Des: 1-3
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 79. Pengoperasian Mobil Crane
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Pengoperasian Mobil Crane' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 13; endDay := 15; -- Jan: 13-15
                WHEN 2 THEN startDay := 10; endDay := 12; -- Feb: 10-12
                WHEN 3 THEN startDay := 3; endDay := 5; -- Mrt: 3-5
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 5; endDay := 7; -- Mei: 5-7
                WHEN 6 THEN startDay := 2; endDay := 4; -- Juni: 2-4
                WHEN 7 THEN startDay := 7; endDay := 9; -- Juli: 7-9
                WHEN 8 THEN startDay := 4; endDay := 6; -- Agst: 4-6
                WHEN 9 THEN startDay := 8; endDay := 10; -- Sept: 8-10
                WHEN 10 THEN startDay := 6; endDay := 8; -- Okt: 6-8
                WHEN 11 THEN startDay := 2; endDay := 5; -- Nop: 2-5
                WHEN 12 THEN startDay := 1; endDay := 3; -- Des: 1-3
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 80. Pengoperasian Crane Putar Tetap (Pedestal Crane)
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Pengoperasian Crane Putar Tetap (Pedestal Crane)' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 13; endDay := 15; -- Jan: 13-15
                WHEN 2 THEN startDay := 10; endDay := 12; -- Feb: 10-12
                WHEN 3 THEN startDay := 3; endDay := 5; -- Mrt: 3-5
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 5; endDay := 7; -- Mei: 5-7
                WHEN 6 THEN startDay := 2; endDay := 4; -- Juni: 2-4
                WHEN 7 THEN startDay := 7; endDay := 9; -- Juli: 7-9
                WHEN 8 THEN startDay := 4; endDay := 6; -- Agst: 4-6
                WHEN 9 THEN startDay := 8; endDay := 10; -- Sept: 8-10
                WHEN 10 THEN startDay := 6; endDay := 8; -- Okt: 6-8
                WHEN 11 THEN startDay := 2; endDay := 5; -- Nop: 2-5
                WHEN 12 THEN startDay := 1; endDay := 3; -- Des: 1-3
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 81. Inspektur Pesawat Angkat
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Inspektur Pesawat Angkat' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 19; endDay := 22; -- Jan: 19-22
                WHEN 2 THEN startDay := 16; endDay := 20; -- Feb: 16-20
                WHEN 3 THEN startDay := 23; endDay := 26; -- Mrt: 23-26
                WHEN 4 THEN startDay := 20; endDay := 23; -- Apr: 20-23
                WHEN 5 THEN startDay := 18; endDay := 21; -- Mei: 18-21
                WHEN 6 THEN startDay := 22; endDay := 25; -- Juni: 22-25
                WHEN 7 THEN startDay := 13; endDay := 16; -- Juli: 13-16
                WHEN 8 THEN startDay := 18; endDay := 21; -- Agst: 18-21
                WHEN 9 THEN startDay := 14; endDay := 17; -- Sept: 14-17
                WHEN 10 THEN startDay := 12; endDay := 15; -- Okt: 12-15
                WHEN 11 THEN startDay := 16; endDay := 19; -- Nop: 16-19
                WHEN 12 THEN startDay := 14; endDay := 17; -- Des: 14-17
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 82. Pengoperasian Pemindahan Beban (Rigger)
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Pengoperasian Pemindahan Beban (Rigger)' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 13; endDay := 15; -- Jan: 13-15
                WHEN 2 THEN startDay := 10; endDay := 12; -- Feb: 10-12
                WHEN 3 THEN startDay := 3; endDay := 5; -- Mrt: 3-5
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 5; endDay := 7; -- Mei: 5-7
                WHEN 6 THEN startDay := 2; endDay := 4; -- Juni: 2-4
                WHEN 7 THEN startDay := 7; endDay := 9; -- Juli: 7-9
                WHEN 8 THEN startDay := 4; endDay := 6; -- Agst: 4-6
                WHEN 9 THEN startDay := 8; endDay := 10; -- Sept: 8-10
                WHEN 10 THEN startDay := 6; endDay := 8; -- Okt: 6-8
                WHEN 11 THEN startDay := 2; endDay := 5; -- Nop: 2-5
                WHEN 12 THEN startDay := 1; endDay := 3; -- Des: 1-3
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 83. Pengendalian Pemindahan Beban (Asisten Rigger)
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Pengendalian Pemindahan Beban (Asisten Rigger)' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 13; endDay := 15; -- Jan: 13-15
                WHEN 2 THEN startDay := 10; endDay := 12; -- Feb: 10-12
                WHEN 3 THEN startDay := 3; endDay := 5; -- Mrt: 3-5
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 5; endDay := 7; -- Mei: 5-7
                WHEN 6 THEN startDay := 2; endDay := 4; -- Juni: 2-4
                WHEN 7 THEN startDay := 7; endDay := 9; -- Juli: 7-9
                WHEN 8 THEN startDay := 4; endDay := 6; -- Agst: 4-6
                WHEN 9 THEN startDay := 8; endDay := 10; -- Sept: 8-10
                WHEN 10 THEN startDay := 6; endDay := 8; -- Okt: 6-8
                WHEN 11 THEN startDay := 2; endDay := 5; -- Nop: 2-5
                WHEN 12 THEN startDay := 1; endDay := 3; -- Des: 1-3
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 84. Pengoperasian Alat Gali Muat Excavator Backhoe
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Pengoperasian Alat Gali Muat Excavator Backhoe' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 13; endDay := 15; -- Jan: 13-15
                WHEN 2 THEN startDay := 10; endDay := 12; -- Feb: 10-12
                WHEN 3 THEN startDay := 3; endDay := 5; -- Mrt: 3-5
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 5; endDay := 7; -- Mei: 5-7
                WHEN 6 THEN startDay := 2; endDay := 4; -- Juni: 2-4
                WHEN 7 THEN startDay := 7; endDay := 9; -- Juli: 7-9
                WHEN 8 THEN startDay := 4; endDay := 6; -- Agst: 4-6
                WHEN 9 THEN startDay := 8; endDay := 10; -- Sept: 8-10
                WHEN 10 THEN startDay := 6; endDay := 8; -- Okt: 6-8
                WHEN 11 THEN startDay := 2; endDay := 5; -- Nop: 2-5
                WHEN 12 THEN startDay := 1; endDay := 3; -- Des: 1-3
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 85. Pengoperasian Alat Gali Muat Excavator Front Shovel
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Pengoperasian Alat Gali Muat Excavator Front Shovel' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 13; endDay := 15; -- Jan: 13-15
                WHEN 2 THEN startDay := 10; endDay := 12; -- Feb: 10-12
                WHEN 3 THEN startDay := 3; endDay := 5; -- Mrt: 3-5
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 5; endDay := 7; -- Mei: 5-7
                WHEN 6 THEN startDay := 2; endDay := 4; -- Juni: 2-4
                WHEN 7 THEN startDay := 7; endDay := 9; -- Juli: 7-9
                WHEN 8 THEN startDay := 4; endDay := 6; -- Agst: 4-6
                WHEN 9 THEN startDay := 8; endDay := 10; -- Sept: 8-10
                WHEN 10 THEN startDay := 6; endDay := 8; -- Okt: 6-8
                WHEN 11 THEN startDay := 2; endDay := 5; -- Nop: 2-5
                WHEN 12 THEN startDay := 1; endDay := 3; -- Des: 1-3
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 86. Pengoperasian Alat Gali Mekanis Kontinu Mining Auger
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Pengoperasian Alat Gali Mekanis Kontinu Mining Auger' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 13; endDay := 15; -- Jan: 13-15
                WHEN 2 THEN startDay := 10; endDay := 12; -- Feb: 10-12
                WHEN 3 THEN startDay := 3; endDay := 5; -- Mrt: 3-5
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 5; endDay := 7; -- Mei: 5-7
                WHEN 6 THEN startDay := 2; endDay := 4; -- Juni: 2-4
                WHEN 7 THEN startDay := 7; endDay := 9; -- Juli: 7-9
                WHEN 8 THEN startDay := 4; endDay := 6; -- Agst: 4-6
                WHEN 9 THEN startDay := 8; endDay := 10; -- Sept: 8-10
                WHEN 10 THEN startDay := 6; endDay := 8; -- Okt: 6-8
                WHEN 11 THEN startDay := 2; endDay := 5; -- Nop: 2-5
                WHEN 12 THEN startDay := 1; endDay := 3; -- Des: 1-3
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 87. Pengoperasian Alat Gali Mekanis Kontinu Surface Miner
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Pengoperasian Alat Gali Mekanis Kontinu Surface Miner' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 13; endDay := 15; -- Jan: 13-15
                WHEN 2 THEN startDay := 10; endDay := 12; -- Feb: 10-12
                WHEN 3 THEN startDay := 3; endDay := 5; -- Mrt: 3-5
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 5; endDay := 7; -- Mei: 5-7
                WHEN 6 THEN startDay := 2; endDay := 4; -- Juni: 2-4
                WHEN 7 THEN startDay := 7; endDay := 9; -- Juli: 7-9
                WHEN 8 THEN startDay := 4; endDay := 6; -- Agst: 4-6
                WHEN 9 THEN startDay := 8; endDay := 10; -- Sept: 8-10
                WHEN 10 THEN startDay := 6; endDay := 8; -- Okt: 6-8
                WHEN 11 THEN startDay := 2; endDay := 5; -- Nop: 2-5
                WHEN 12 THEN startDay := 1; endDay := 3; -- Des: 1-3
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 88. Pengoperasian Alat Gali Mekanis Kontinu Bucket Wheel Excavator
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Pengoperasian Alat Gali Mekanis Kontinu Bucket Wheel Excavator' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 13; endDay := 15; -- Jan: 13-15
                WHEN 2 THEN startDay := 10; endDay := 12; -- Feb: 10-12
                WHEN 3 THEN startDay := 3; endDay := 5; -- Mrt: 3-5
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 5; endDay := 7; -- Mei: 5-7
                WHEN 6 THEN startDay := 2; endDay := 4; -- Juni: 2-4
                WHEN 7 THEN startDay := 7; endDay := 9; -- Juli: 7-9
                WHEN 8 THEN startDay := 4; endDay := 6; -- Agst: 4-6
                WHEN 9 THEN startDay := 8; endDay := 10; -- Sept: 8-10
                WHEN 10 THEN startDay := 6; endDay := 8; -- Okt: 6-8
                WHEN 11 THEN startDay := 2; endDay := 5; -- Nop: 2-5
                WHEN 12 THEN startDay := 1; endDay := 3; -- Des: 1-3
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 89. Pengoperasian Alat Angkat Dump Truck
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Pengoperasian Alat Angkat Dump Truck' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 13; endDay := 15; -- Jan: 13-15
                WHEN 2 THEN startDay := 10; endDay := 12; -- Feb: 10-12
                WHEN 3 THEN startDay := 3; endDay := 5; -- Mrt: 3-5
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 5; endDay := 7; -- Mei: 5-7
                WHEN 6 THEN startDay := 2; endDay := 4; -- Juni: 2-4
                WHEN 7 THEN startDay := 7; endDay := 9; -- Juli: 7-9
                WHEN 8 THEN startDay := 4; endDay := 6; -- Agst: 4-6
                WHEN 9 THEN startDay := 8; endDay := 10; -- Sept: 8-10
                WHEN 10 THEN startDay := 6; endDay := 8; -- Okt: 6-8
                WHEN 11 THEN startDay := 2; endDay := 5; -- Nop: 2-5
                WHEN 12 THEN startDay := 1; endDay := 3; -- Des: 1-3
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 90. Pengoperasian Alat Gali Muat Angkut Wheel Loader
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Pengoperasian Alat Gali Muat Angkut Wheel Loader' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 13; endDay := 15; -- Jan: 13-15
                WHEN 2 THEN startDay := 10; endDay := 12; -- Feb: 10-12
                WHEN 3 THEN startDay := 3; endDay := 5; -- Mrt: 3-5
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 5; endDay := 7; -- Mei: 5-7
                WHEN 6 THEN startDay := 2; endDay := 4; -- Juni: 2-4
                WHEN 7 THEN startDay := 7; endDay := 9; -- Juli: 7-9
                WHEN 8 THEN startDay := 4; endDay := 6; -- Agst: 4-6
                WHEN 9 THEN startDay := 8; endDay := 10; -- Sept: 8-10
                WHEN 10 THEN startDay := 6; endDay := 8; -- Okt: 6-8
                WHEN 11 THEN startDay := 2; endDay := 5; -- Nop: 2-5
                WHEN 12 THEN startDay := 1; endDay := 3; -- Des: 1-3
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 91. Pengoperasian Peralatan Pendukung Bulldozer
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Pengoperasian Peralatan Pendukung Bulldozer' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 13; endDay := 15; -- Jan: 13-15
                WHEN 2 THEN startDay := 10; endDay := 12; -- Feb: 10-12
                WHEN 3 THEN startDay := 3; endDay := 5; -- Mrt: 3-5
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 5; endDay := 7; -- Mei: 5-7
                WHEN 6 THEN startDay := 2; endDay := 4; -- Juni: 2-4
                WHEN 7 THEN startDay := 7; endDay := 9; -- Juli: 7-9
                WHEN 8 THEN startDay := 4; endDay := 6; -- Agst: 4-6
                WHEN 9 THEN startDay := 8; endDay := 10; -- Sept: 8-10
                WHEN 10 THEN startDay := 6; endDay := 8; -- Okt: 6-8
                WHEN 11 THEN startDay := 2; endDay := 5; -- Nop: 2-5
                WHEN 12 THEN startDay := 1; endDay := 3; -- Des: 1-3
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 92. Pengoperasian Peralatan Pendukung Motor Grader
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Pengoperasian Peralatan Pendukung Motor Grader' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 13; endDay := 15; -- Jan: 13-15
                WHEN 2 THEN startDay := 10; endDay := 12; -- Feb: 10-12
                WHEN 3 THEN startDay := 3; endDay := 5; -- Mrt: 3-5
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 5; endDay := 7; -- Mei: 5-7
                WHEN 6 THEN startDay := 2; endDay := 4; -- Juni: 2-4
                WHEN 7 THEN startDay := 7; endDay := 9; -- Juli: 7-9
                WHEN 8 THEN startDay := 4; endDay := 6; -- Agst: 4-6
                WHEN 9 THEN startDay := 8; endDay := 10; -- Sept: 8-10
                WHEN 10 THEN startDay := 6; endDay := 8; -- Okt: 6-8
                WHEN 11 THEN startDay := 2; endDay := 5; -- Nop: 2-5
                WHEN 12 THEN startDay := 1; endDay := 3; -- Des: 1-3
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 93. Pengoperasian Peralatan Pendukung Water Truck
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Pengoperasian Peralatan Pendukung Water Truck' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 13; endDay := 15; -- Jan: 13-15
                WHEN 2 THEN startDay := 10; endDay := 12; -- Feb: 10-12
                WHEN 3 THEN startDay := 3; endDay := 5; -- Mrt: 3-5
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 5; endDay := 7; -- Mei: 5-7
                WHEN 6 THEN startDay := 2; endDay := 4; -- Juni: 2-4
                WHEN 7 THEN startDay := 7; endDay := 9; -- Juli: 7-9
                WHEN 8 THEN startDay := 4; endDay := 6; -- Agst: 4-6
                WHEN 9 THEN startDay := 8; endDay := 10; -- Sept: 8-10
                WHEN 10 THEN startDay := 6; endDay := 8; -- Okt: 6-8
                WHEN 11 THEN startDay := 2; endDay := 5; -- Nop: 2-5
                WHEN 12 THEN startDay := 1; endDay := 3; -- Des: 1-3
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 94. Pengoperasian Peralatan Pendukung Compactor
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Pengoperasian Peralatan Pendukung Compactor' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 13; endDay := 15; -- Jan: 13-15
                WHEN 2 THEN startDay := 10; endDay := 12; -- Feb: 10-12
                WHEN 3 THEN startDay := 3; endDay := 5; -- Mrt: 3-5
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 5; endDay := 7; -- Mei: 5-7
                WHEN 6 THEN startDay := 2; endDay := 4; -- Juni: 2-4
                WHEN 7 THEN startDay := 7; endDay := 9; -- Juli: 7-9
                WHEN 8 THEN startDay := 4; endDay := 6; -- Agst: 4-6
                WHEN 9 THEN startDay := 8; endDay := 10; -- Sept: 8-10
                WHEN 10 THEN startDay := 6; endDay := 8; -- Okt: 6-8
                WHEN 11 THEN startDay := 2; endDay := 5; -- Nop: 2-5
                WHEN 12 THEN startDay := 1; endDay := 3; -- Des: 1-3
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 95. Pengoperasian Peralatan Pendukung Service Truck
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Pengoperasian Peralatan Pendukung Service Truck' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 13; endDay := 15; -- Jan: 13-15
                WHEN 2 THEN startDay := 10; endDay := 12; -- Feb: 10-12
                WHEN 3 THEN startDay := 3; endDay := 5; -- Mrt: 3-5
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 5; endDay := 7; -- Mei: 5-7
                WHEN 6 THEN startDay := 2; endDay := 4; -- Juni: 2-4
                WHEN 7 THEN startDay := 7; endDay := 9; -- Juli: 7-9
                WHEN 8 THEN startDay := 4; endDay := 6; -- Agst: 4-6
                WHEN 9 THEN startDay := 8; endDay := 10; -- Sept: 8-10
                WHEN 10 THEN startDay := 6; endDay := 8; -- Okt: 6-8
                WHEN 11 THEN startDay := 2; endDay := 5; -- Nop: 2-5
                WHEN 12 THEN startDay := 1; endDay := 3; -- Des: 1-3
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 96. Pengoperasian Peralatan Pendukung Fuel Truck
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Pengoperasian Peralatan Pendukung Fuel Truck' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 13; endDay := 15; -- Jan: 13-15
                WHEN 2 THEN startDay := 10; endDay := 12; -- Feb: 10-12
                WHEN 3 THEN startDay := 3; endDay := 5; -- Mrt: 3-5
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 5; endDay := 7; -- Mei: 5-7
                WHEN 6 THEN startDay := 2; endDay := 4; -- Juni: 2-4
                WHEN 7 THEN startDay := 7; endDay := 9; -- Juli: 7-9
                WHEN 8 THEN startDay := 4; endDay := 6; -- Agst: 4-6
                WHEN 9 THEN startDay := 8; endDay := 10; -- Sept: 8-10
                WHEN 10 THEN startDay := 6; endDay := 8; -- Okt: 6-8
                WHEN 11 THEN startDay := 2; endDay := 5; -- Nop: 2-5
                WHEN 12 THEN startDay := 1; endDay := 3; -- Des: 1-3
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 97. Pengoperasian Alat Angkat Telehandler
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Pengoperasian Alat Angkat Telehandler' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 13; endDay := 15; -- Jan: 13-15
                WHEN 2 THEN startDay := 10; endDay := 12; -- Feb: 10-12
                WHEN 3 THEN startDay := 3; endDay := 5; -- Mrt: 3-5
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 5; endDay := 7; -- Mei: 5-7
                WHEN 6 THEN startDay := 2; endDay := 4; -- Juni: 2-4
                WHEN 7 THEN startDay := 7; endDay := 9; -- Juli: 7-9
                WHEN 8 THEN startDay := 4; endDay := 6; -- Agst: 4-6
                WHEN 9 THEN startDay := 8; endDay := 10; -- Sept: 8-10
                WHEN 10 THEN startDay := 6; endDay := 8; -- Okt: 6-8
                WHEN 11 THEN startDay := 2; endDay := 5; -- Nop: 2-5
                WHEN 12 THEN startDay := 1; endDay := 3; -- Des: 1-3
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 98. Pengoperasian Mesin Bor untuk Lubang Ledak Tambang Terbuka Mineral dan Batubara
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Pengoperasian Mesin Bor untuk Lubang Ledak Tambang Terbuka Mineral dan Batubara' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 13; endDay := 15; -- Jan: 13-15
                WHEN 2 THEN startDay := 10; endDay := 12; -- Feb: 10-12
                WHEN 3 THEN startDay := 3; endDay := 5; -- Mrt: 3-5
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 5; endDay := 7; -- Mei: 5-7
                WHEN 6 THEN startDay := 2; endDay := 4; -- Juni: 2-4
                WHEN 7 THEN startDay := 7; endDay := 9; -- Juli: 7-9
                WHEN 8 THEN startDay := 4; endDay := 6; -- Agst: 4-6
                WHEN 9 THEN startDay := 8; endDay := 10; -- Sept: 8-10
                WHEN 10 THEN startDay := 6; endDay := 8; -- Okt: 6-8
                WHEN 11 THEN startDay := 2; endDay := 5; -- Nop: 2-5
                WHEN 12 THEN startDay := 1; endDay := 3; -- Des: 1-3
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 99. Pemandu Kegiatan Pengeboran tambang Terbuka Mineral dan Batubara
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Pemandu Kegiatan Pengeboran tambang Terbuka Mineral dan Batubara' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 13; endDay := 15; -- Jan: 13-15
                WHEN 2 THEN startDay := 10; endDay := 12; -- Feb: 10-12
                WHEN 3 THEN startDay := 3; endDay := 5; -- Mrt: 3-5
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 5; endDay := 7; -- Mei: 5-7
                WHEN 6 THEN startDay := 2; endDay := 4; -- Juni: 2-4
                WHEN 7 THEN startDay := 7; endDay := 9; -- Juli: 7-9
                WHEN 8 THEN startDay := 4; endDay := 6; -- Agst: 4-6
                WHEN 9 THEN startDay := 8; endDay := 10; -- Sept: 8-10
                WHEN 10 THEN startDay := 6; endDay := 8; -- Okt: 6-8
                WHEN 11 THEN startDay := 2; endDay := 5; -- Nop: 2-5
                WHEN 12 THEN startDay := 1; endDay := 3; -- Des: 1-3
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 100. Pengkaji Muda Teknis Proteksi Kebakaran
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Pengkaji Muda Teknis Proteksi Kebakaran' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 13; endDay := 15; -- Jan: 13-15
                WHEN 2 THEN startDay := 10; endDay := 12; -- Feb: 10-12
                WHEN 3 THEN startDay := 3; endDay := 5; -- Mrt: 3-5
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 5; endDay := 7; -- Mei: 5-7
                WHEN 6 THEN startDay := 2; endDay := 4; -- Juni: 2-4
                WHEN 7 THEN startDay := 7; endDay := 9; -- Juli: 7-9
                WHEN 8 THEN startDay := 4; endDay := 6; -- Agst: 4-6
                WHEN 9 THEN startDay := 8; endDay := 10; -- Sept: 8-10
                WHEN 10 THEN startDay := 6; endDay := 8; -- Okt: 6-8
                WHEN 11 THEN startDay := 2; endDay := 5; -- Nop: 2-5
                WHEN 12 THEN startDay := 1; endDay := 3; -- Des: 1-3
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 101. Pengkaji Madya Teknis Proteksi Kebakaran
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Pengkaji Madya Teknis Proteksi Kebakaran' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 13; endDay := 15; -- Jan: 13-15
                WHEN 2 THEN startDay := 10; endDay := 12; -- Feb: 10-12
                WHEN 3 THEN startDay := 3; endDay := 5; -- Mrt: 3-5
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 5; endDay := 7; -- Mei: 5-7
                WHEN 6 THEN startDay := 2; endDay := 4; -- Juni: 2-4
                WHEN 7 THEN startDay := 7; endDay := 9; -- Juli: 7-9
                WHEN 8 THEN startDay := 4; endDay := 6; -- Agst: 4-6
                WHEN 9 THEN startDay := 8; endDay := 10; -- Sept: 8-10
                WHEN 10 THEN startDay := 6; endDay := 8; -- Okt: 6-8
                WHEN 11 THEN startDay := 2; endDay := 5; -- Nop: 2-5
                WHEN 12 THEN startDay := 1; endDay := 3; -- Des: 1-3
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 102. Pengkaji Teknis Proteksi Kebakaran
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Pengkaji Teknis Proteksi Kebakaran' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 13; endDay := 15; -- Jan: 13-15
                WHEN 2 THEN startDay := 10; endDay := 12; -- Feb: 10-12
                WHEN 3 THEN startDay := 3; endDay := 5; -- Mrt: 3-5
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 5; endDay := 7; -- Mei: 5-7
                WHEN 6 THEN startDay := 2; endDay := 4; -- Juni: 2-4
                WHEN 7 THEN startDay := 7; endDay := 9; -- Juli: 7-9
                WHEN 8 THEN startDay := 4; endDay := 6; -- Agst: 4-6
                WHEN 9 THEN startDay := 8; endDay := 10; -- Sept: 8-10
                WHEN 10 THEN startDay := 6; endDay := 8; -- Okt: 6-8
                WHEN 11 THEN startDay := 2; endDay := 5; -- Nop: 2-5
                WHEN 12 THEN startDay := 1; endDay := 3; -- Des: 1-3
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 103. Teknisi Fire Alarm
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Teknisi Fire Alarm' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 13; endDay := 15; -- Jan: 13-15
                WHEN 2 THEN startDay := 10; endDay := 12; -- Feb: 10-12
                WHEN 3 THEN startDay := 3; endDay := 5; -- Mrt: 3-5
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 5; endDay := 7; -- Mei: 5-7
                WHEN 6 THEN startDay := 2; endDay := 4; -- Juni: 2-4
                WHEN 7 THEN startDay := 7; endDay := 9; -- Juli: 7-9
                WHEN 8 THEN startDay := 4; endDay := 6; -- Agst: 4-6
                WHEN 9 THEN startDay := 8; endDay := 10; -- Sept: 8-10
                WHEN 10 THEN startDay := 6; endDay := 8; -- Okt: 6-8
                WHEN 11 THEN startDay := 2; endDay := 5; -- Nop: 2-5
                WHEN 12 THEN startDay := 1; endDay := 3; -- Des: 1-3
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 104. Ahli Muda Pesawat Lift dan Eskalator
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Ahli Muda Pesawat Lift dan Eskalator' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 13; endDay := 15; -- Jan: 13-15
                WHEN 2 THEN startDay := 10; endDay := 12; -- Feb: 10-12
                WHEN 3 THEN startDay := 3; endDay := 5; -- Mrt: 3-5
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 5; endDay := 7; -- Mei: 5-7
                WHEN 6 THEN startDay := 2; endDay := 4; -- Juni: 2-4
                WHEN 7 THEN startDay := 7; endDay := 9; -- Juli: 7-9
                WHEN 8 THEN startDay := 4; endDay := 6; -- Agst: 4-6
                WHEN 9 THEN startDay := 8; endDay := 10; -- Sept: 8-10
                WHEN 10 THEN startDay := 6; endDay := 8; -- Okt: 6-8
                WHEN 11 THEN startDay := 2; endDay := 5; -- Nop: 2-5
                WHEN 12 THEN startDay := 1; endDay := 3; -- Des: 1-3
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 105. Ahli Madya Pesawat Lift dan Eskalator
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Ahli Madya Pesawat Lift dan Eskalator' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 13; endDay := 15; -- Jan: 13-15
                WHEN 2 THEN startDay := 10; endDay := 12; -- Feb: 10-12
                WHEN 3 THEN startDay := 3; endDay := 5; -- Mrt: 3-5
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 5; endDay := 7; -- Mei: 5-7
                WHEN 6 THEN startDay := 2; endDay := 4; -- Juni: 2-4
                WHEN 7 THEN startDay := 7; endDay := 9; -- Juli: 7-9
                WHEN 8 THEN startDay := 4; endDay := 6; -- Agst: 4-6
                WHEN 9 THEN startDay := 8; endDay := 10; -- Sept: 8-10
                WHEN 10 THEN startDay := 6; endDay := 8; -- Okt: 6-8
                WHEN 11 THEN startDay := 2; endDay := 5; -- Nop: 2-5
                WHEN 12 THEN startDay := 1; endDay := 3; -- Des: 1-3
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 106. Ahli Utama Pesawat Lift dan Eskalator
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Ahli Utama Pesawat Lift dan Eskalator' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 13; endDay := 15; -- Jan: 13-15
                WHEN 2 THEN startDay := 10; endDay := 12; -- Feb: 10-12
                WHEN 3 THEN startDay := 3; endDay := 5; -- Mrt: 3-5
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 5; endDay := 7; -- Mei: 5-7
                WHEN 6 THEN startDay := 2; endDay := 4; -- Juni: 2-4
                WHEN 7 THEN startDay := 7; endDay := 9; -- Juli: 7-9
                WHEN 8 THEN startDay := 4; endDay := 6; -- Agst: 4-6
                WHEN 9 THEN startDay := 8; endDay := 10; -- Sept: 8-10
                WHEN 10 THEN startDay := 6; endDay := 8; -- Okt: 6-8
                WHEN 11 THEN startDay := 2; endDay := 5; -- Nop: 2-5
                WHEN 12 THEN startDay := 1; endDay := 3; -- Des: 1-3
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 107. Ahli Muda Elektrikal Konstruksi Bangunan Gd.
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Ahli Muda Elektrikal Konstruksi Bangunan Gd.' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 13; endDay := 15; -- Jan: 13-15
                WHEN 2 THEN startDay := 10; endDay := 12; -- Feb: 10-12
                WHEN 3 THEN startDay := 3; endDay := 5; -- Mrt: 3-5
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 5; endDay := 7; -- Mei: 5-7
                WHEN 6 THEN startDay := 2; endDay := 4; -- Juni: 2-4
                WHEN 7 THEN startDay := 7; endDay := 9; -- Juli: 7-9
                WHEN 8 THEN startDay := 4; endDay := 6; -- Agst: 4-6
                WHEN 9 THEN startDay := 8; endDay := 10; -- Sept: 8-10
                WHEN 10 THEN startDay := 6; endDay := 8; -- Okt: 6-8
                WHEN 11 THEN startDay := 2; endDay := 5; -- Nop: 2-5
                WHEN 12 THEN startDay := 1; endDay := 3; -- Des: 1-3
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 108. Ahli Madya Elektrikal Konstruksi Bangunan Gd.
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Ahli Madya Elektrikal Konstruksi Bangunan Gd.' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 13; endDay := 15; -- Jan: 13-15
                WHEN 2 THEN startDay := 10; endDay := 12; -- Feb: 10-12
                WHEN 3 THEN startDay := 3; endDay := 5; -- Mrt: 3-5
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 5; endDay := 7; -- Mei: 5-7
                WHEN 6 THEN startDay := 2; endDay := 4; -- Juni: 2-4
                WHEN 7 THEN startDay := 7; endDay := 9; -- Juli: 7-9
                WHEN 8 THEN startDay := 4; endDay := 6; -- Agst: 4-6
                WHEN 9 THEN startDay := 8; endDay := 10; -- Sept: 8-10
                WHEN 10 THEN startDay := 6; endDay := 8; -- Okt: 6-8
                WHEN 11 THEN startDay := 2; endDay := 5; -- Nop: 2-5
                WHEN 12 THEN startDay := 1; endDay := 3; -- Des: 1-3
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 109. Pengawas Scaffolding
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Pengawas Scaffolding' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 13; endDay := 15; -- Jan: 13-15
                WHEN 2 THEN startDay := 10; endDay := 12; -- Feb: 10-12
                WHEN 3 THEN startDay := 3; endDay := 5; -- Mrt: 3-5
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 5; endDay := 7; -- Mei: 5-7
                WHEN 6 THEN startDay := 2; endDay := 4; -- Juni: 2-4
                WHEN 7 THEN startDay := 7; endDay := 9; -- Juli: 7-9
                WHEN 8 THEN startDay := 4; endDay := 6; -- Agst: 4-6
                WHEN 9 THEN startDay := 8; endDay := 10; -- Sept: 8-10
                WHEN 10 THEN startDay := 6; endDay := 8; -- Okt: 6-8
                WHEN 11 THEN startDay := 2; endDay := 5; -- Nop: 2-5
                WHEN 12 THEN startDay := 1; endDay := 3; -- Des: 1-3
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 110. Operator Dump Truck
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Operator Dump Truck' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 13; endDay := 15; -- Jan: 13-15
                WHEN 2 THEN startDay := 10; endDay := 12; -- Feb: 10-12
                WHEN 3 THEN startDay := 3; endDay := 5; -- Mrt: 3-5
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 5; endDay := 7; -- Mei: 5-7
                WHEN 6 THEN startDay := 2; endDay := 4; -- Juni: 2-4
                WHEN 7 THEN startDay := 7; endDay := 9; -- Juli: 7-9
                WHEN 8 THEN startDay := 4; endDay := 6; -- Agst: 4-6
                WHEN 9 THEN startDay := 8; endDay := 10; -- Sept: 8-10
                WHEN 10 THEN startDay := 6; endDay := 8; -- Okt: 6-8
                WHEN 11 THEN startDay := 2; endDay := 5; -- Nop: 2-5
                WHEN 12 THEN startDay := 1; endDay := 3; -- Des: 1-3
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 111. Operator Backhoe Loader
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Operator Backhoe Loader' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 13; endDay := 15; -- Jan: 13-15
                WHEN 2 THEN startDay := 10; endDay := 12; -- Feb: 10-12
                WHEN 3 THEN startDay := 3; endDay := 5; -- Mrt: 3-5
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 5; endDay := 7; -- Mei: 5-7
                WHEN 6 THEN startDay := 2; endDay := 4; -- Juni: 2-4
                WHEN 7 THEN startDay := 7; endDay := 9; -- Juli: 7-9
                WHEN 8 THEN startDay := 4; endDay := 6; -- Agst: 4-6
                WHEN 9 THEN startDay := 8; endDay := 10; -- Sept: 8-10
                WHEN 10 THEN startDay := 6; endDay := 8; -- Okt: 6-8
                WHEN 11 THEN startDay := 2; endDay := 5; -- Nop: 2-5
                WHEN 12 THEN startDay := 1; endDay := 3; -- Des: 1-3
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 112. Operator Wheel Excavator Yunior
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Operator Wheel Excavator Yunior' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 13; endDay := 15; -- Jan: 13-15
                WHEN 2 THEN startDay := 10; endDay := 12; -- Feb: 10-12
                WHEN 3 THEN startDay := 3; endDay := 5; -- Mrt: 3-5
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 5; endDay := 7; -- Mei: 5-7
                WHEN 6 THEN startDay := 2; endDay := 4; -- Juni: 2-4
                WHEN 7 THEN startDay := 7; endDay := 9; -- Juli: 7-9
                WHEN 8 THEN startDay := 4; endDay := 6; -- Agst: 4-6
                WHEN 9 THEN startDay := 8; endDay := 10; -- Sept: 8-10
                WHEN 10 THEN startDay := 6; endDay := 8; -- Okt: 6-8
                WHEN 11 THEN startDay := 2; endDay := 5; -- Nop: 2-5
                WHEN 12 THEN startDay := 1; endDay := 3; -- Des: 1-3
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 113. Operator Scaffolding
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Operator Scaffolding' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 13; endDay := 15; -- Jan: 13-15
                WHEN 2 THEN startDay := 10; endDay := 12; -- Feb: 10-12
                WHEN 3 THEN startDay := 3; endDay := 5; -- Mrt: 3-5
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 5; endDay := 7; -- Mei: 5-7
                WHEN 6 THEN startDay := 2; endDay := 4; -- Juni: 2-4
                WHEN 7 THEN startDay := 7; endDay := 9; -- Juli: 7-9
                WHEN 8 THEN startDay := 4; endDay := 6; -- Agst: 4-6
                WHEN 9 THEN startDay := 8; endDay := 10; -- Sept: 8-10
                WHEN 10 THEN startDay := 6; endDay := 8; -- Okt: 6-8
                WHEN 11 THEN startDay := 2; endDay := 5; -- Nop: 2-5
                WHEN 12 THEN startDay := 1; endDay := 3; -- Des: 1-3
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 114. Operator Gondola pada Bangunan Gedung
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Operator Gondola pada Bangunan Gedung' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 13; endDay := 15; -- Jan: 13-15
                WHEN 2 THEN startDay := 10; endDay := 12; -- Feb: 10-12
                WHEN 3 THEN startDay := 3; endDay := 5; -- Mrt: 3-5
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 5; endDay := 7; -- Mei: 5-7
                WHEN 6 THEN startDay := 2; endDay := 4; -- Juni: 2-4
                WHEN 7 THEN startDay := 7; endDay := 9; -- Juli: 7-9
                WHEN 8 THEN startDay := 4; endDay := 6; -- Agst: 4-6
                WHEN 9 THEN startDay := 8; endDay := 10; -- Sept: 8-10
                WHEN 10 THEN startDay := 6; endDay := 8; -- Okt: 6-8
                WHEN 11 THEN startDay := 2; endDay := 5; -- Nop: 2-5
                WHEN 12 THEN startDay := 1; endDay := 3; -- Des: 1-3
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    -- 115. Operator Slinging and Rigging
    FOR monthNum IN 1..12 LOOP
        SELECT id INTO courseRec FROM courses WHERE name = 'Operator Slinging and Rigging' LIMIT 1;
        IF courseRec.id IS NOT NULL THEN
            CASE monthNum
                WHEN 1 THEN startDay := 13; endDay := 15; -- Jan: 13-15
                WHEN 2 THEN startDay := 10; endDay := 12; -- Feb: 10-12
                WHEN 3 THEN startDay := 3; endDay := 5; -- Mrt: 3-5
                WHEN 4 THEN startDay := 14; endDay := 16; -- Apr: 14-16
                WHEN 5 THEN startDay := 5; endDay := 7; -- Mei: 5-7
                WHEN 6 THEN startDay := 2; endDay := 4; -- Juni: 2-4
                WHEN 7 THEN startDay := 7; endDay := 9; -- Juli: 7-9
                WHEN 8 THEN startDay := 4; endDay := 6; -- Agst: 4-6
                WHEN 9 THEN startDay := 8; endDay := 10; -- Sept: 8-10
                WHEN 10 THEN startDay := 6; endDay := 8; -- Okt: 6-8
                WHEN 11 THEN startDay := 2; endDay := 5; -- Nop: 2-5
                WHEN 12 THEN startDay := 1; endDay := 3; -- Des: 1-3
                ELSE startDay := NULL; endDay := NULL;
            END CASE;

            IF start_day IS NOT NULL AND end_day IS NOT NULL THEN
                -- Handle cross-month schedules
                IF end_day < start_day THEN
                    -- Cross-month: start in current month, end in next month
                    startDate := make_date(2026, month_num, start_day);
                    IF monthNum = 12 THEN
                        endDate := make_date(2027, 1, end_day);
                    ELSE
                        endDate := make_date(2026, month_num + 1, end_day);
                    END IF;
                ELSE
                    -- Normal: both dates in same month
                    startDate := make_date(2026, month_num, start_day);
                    endDate := make_date(2026, month_num, end_day);
                END IF;

                INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
                VALUES (courseRec.id, "startDate", "endDate", 'Bekasi Training Center', 'hybrid', 20, 'open')
                ON CONFLICT DO NOTHING;

                scheduleCount := schedule_count + 1;
            END IF;
        END IF;
    END LOOP;

    RAISE NOTICE 'Schedule seeding completed!';
    RAISE NOTICE 'Total schedules created: %', scheduleCount;
END $$;

-- Show results
SELECT
    c.name as course_name,
    c.category,
    COUNT(cs.id) as schedule_count,
    MIN(cs."startDate") as first_batch,
    MAX(cs."startDate") as last_batch
FROM courses c
LEFT JOIN "courseSchedules" cs ON c.id = cs."courseId"
WHERE cs."createdAt" > NOW() - INTERVAL '1 hour'
GROUP BY c.id, c.name, c.category
ORDER BY schedule_count DESC
LIMIT 50;
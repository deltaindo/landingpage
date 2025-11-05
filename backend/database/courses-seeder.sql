-- =====================================================
-- DELTA INDONESIA COURSES SEEDER - KEMNAKER & INHOUSE
-- Each course has two versions:
--   1. Kemnaker (Government regulated)
--   2. In-house (Company internal training)
-- =====================================================

DO $$
DECLARE
    v_courseCount INT := 0;
BEGIN
    RAISE NOTICE 'Starting course seeding for 230 courses (115 x 2 versions)...';

    -- 1. K3 Elevator Eskalator (TEKNISI) (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '9c67d3b1-6f0a-4dc4-88cf-140c733a98bf'::uuid,
        'DI-KEM-001',
        'K3 Elevator Eskalator (TEKNISI)',
        'kemnaker',
        'K3 UMUM',
        3,
        'days',
        'Training course: K3 Elevator Eskalator (TEKNISI)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 1. K3 Elevator Eskalator (TEKNISI) (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '6e46967f-b0e3-4644-9bdb-1e95b7cd1f9f'::uuid,
        'DI-IH-001',
        'K3 Elevator Eskalator (TEKNISI)',
        'inhouse',
        'K3 UMUM',
        3,
        'days',
        'Training course: K3 Elevator Eskalator (TEKNISI)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 2. K3 Elevator Eskalator (AHLI) (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'dfa7cd65-502f-472a-b070-264e6bd2dc30'::uuid,
        'DI-KEM-002',
        'K3 Elevator Eskalator (AHLI)',
        'kemnaker',
        'K3 AHLI',
        5,
        'days',
        'Training course: K3 Elevator Eskalator (AHLI)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 2. K3 Elevator Eskalator (AHLI) (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '02131b55-df37-4128-9fac-e8e05444a487'::uuid,
        'DI-IH-002',
        'K3 Elevator Eskalator (AHLI)',
        'inhouse',
        'K3 AHLI',
        5,
        'days',
        'Training course: K3 Elevator Eskalator (AHLI)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 3. K3 Listrik (TEKNISI) (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'b1ed7aae-5eb7-4288-9543-bae5451bc63f'::uuid,
        'DI-KEM-003',
        'K3 Listrik (TEKNISI)',
        'kemnaker',
        'K3 UMUM',
        3,
        'days',
        'Training course: K3 Listrik (TEKNISI)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 3. K3 Listrik (TEKNISI) (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '9be2b6f3-a7a0-4a69-a9f5-579b3b605ed7'::uuid,
        'DI-IH-003',
        'K3 Listrik (TEKNISI)',
        'inhouse',
        'K3 UMUM',
        3,
        'days',
        'Training course: K3 Listrik (TEKNISI)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 4. K3 Listrik (AHLI) (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '1787e908-b734-4a5d-ba95-41051ff200b5'::uuid,
        'DI-KEM-004',
        'K3 Listrik (AHLI)',
        'kemnaker',
        'K3 AHLI',
        5,
        'days',
        'Training course: K3 Listrik (AHLI)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 4. K3 Listrik (AHLI) (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '35857d0d-0a28-40a5-8f06-5b969f46e912'::uuid,
        'DI-IH-004',
        'K3 Listrik (AHLI)',
        'inhouse',
        'K3 AHLI',
        5,
        'days',
        'Training course: K3 Listrik (AHLI)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 5. Petugas Peran Kebakaran (Damkar D) (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'e1b25650-d7c0-42e9-8d8d-c4726e214313'::uuid,
        'DI-KEM-005',
        'Petugas Peran Kebakaran (Damkar D)',
        'kemnaker',
        'DAMKAR',
        3,
        'days',
        'Training course: Petugas Peran Kebakaran (Damkar D)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 5. Petugas Peran Kebakaran (Damkar D) (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '9f6fa107-f177-47bc-8207-848758a80a3e'::uuid,
        'DI-IH-005',
        'Petugas Peran Kebakaran (Damkar D)',
        'inhouse',
        'DAMKAR',
        3,
        'days',
        'Training course: Petugas Peran Kebakaran (Damkar D)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 6. Regu Penanggulangan kebakaran (Damkar C) (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'fe50d889-1cd7-4d5d-8970-7777111797e1'::uuid,
        'DI-KEM-006',
        'Regu Penanggulangan kebakaran (Damkar C)',
        'kemnaker',
        'DAMKAR',
        3,
        'days',
        'Training course: Regu Penanggulangan kebakaran (Damkar C)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 6. Regu Penanggulangan kebakaran (Damkar C) (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'a45d9922-682a-4460-837d-72fc542e0248'::uuid,
        'DI-IH-006',
        'Regu Penanggulangan kebakaran (Damkar C)',
        'inhouse',
        'DAMKAR',
        3,
        'days',
        'Training course: Regu Penanggulangan kebakaran (Damkar C)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 7. K3 Kebakaran Kelas D dan kelas C (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '8f20cdb5-fdd3-4dd7-9243-fa579502f5d1'::uuid,
        'DI-KEM-007',
        'K3 Kebakaran Kelas D dan kelas C',
        'kemnaker',
        'K3 UMUM',
        3,
        'days',
        'Training course: K3 Kebakaran Kelas D dan kelas C',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 7. K3 Kebakaran Kelas D dan kelas C (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '9f075389-f30a-4636-9b5e-bdf792b0e834'::uuid,
        'DI-IH-007',
        'K3 Kebakaran Kelas D dan kelas C',
        'inhouse',
        'K3 UMUM',
        3,
        'days',
        'Training course: K3 Kebakaran Kelas D dan kelas C',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 8. Kordinator Unit Perana Kebakaran (Damkar B) (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '10306d8a-a262-4c86-af01-d8a8a86905f4'::uuid,
        'DI-KEM-008',
        'Kordinator Unit Perana Kebakaran (Damkar B)',
        'kemnaker',
        'DAMKAR',
        3,
        'days',
        'Training course: Kordinator Unit Perana Kebakaran (Damkar B)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 8. Kordinator Unit Perana Kebakaran (Damkar B) (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '6a46b10c-02f6-4f5c-aa38-da4e3e933dc2'::uuid,
        'DI-IH-008',
        'Kordinator Unit Perana Kebakaran (Damkar B)',
        'inhouse',
        'DAMKAR',
        3,
        'days',
        'Training course: Kordinator Unit Perana Kebakaran (Damkar B)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 9. Ahli K3 Kebakaran (Damkar A) (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'a9d1e007-df6f-4594-a6ac-812bd5724593'::uuid,
        'DI-KEM-009',
        'Ahli K3 Kebakaran (Damkar A)',
        'kemnaker',
        'K3 UMUM',
        3,
        'days',
        'Training course: Ahli K3 Kebakaran (Damkar A)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 9. Ahli K3 Kebakaran (Damkar A) (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '96a151da-826f-4f57-9377-8d7ae1a60050'::uuid,
        'DI-IH-009',
        'Ahli K3 Kebakaran (Damkar A)',
        'inhouse',
        'K3 UMUM',
        3,
        'days',
        'Training course: Ahli K3 Kebakaran (Damkar A)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 10. K3 Konstruksi Ahli Muda (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '735a82ba-7723-42ea-b593-b33012efcb8d'::uuid,
        'DI-KEM-010',
        'K3 Konstruksi Ahli Muda',
        'kemnaker',
        'K3 UMUM',
        3,
        'days',
        'Training course: K3 Konstruksi Ahli Muda',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 10. K3 Konstruksi Ahli Muda (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'cb54601b-8fea-4679-b31d-ac3636083d12'::uuid,
        'DI-IH-010',
        'K3 Konstruksi Ahli Muda',
        'inhouse',
        'K3 UMUM',
        3,
        'days',
        'Training course: K3 Konstruksi Ahli Muda',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 11. K3 Konstruksi Ahli Madya (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'cc233fe0-1b59-4cfe-a78c-3372e57e66fa'::uuid,
        'DI-KEM-011',
        'K3 Konstruksi Ahli Madya',
        'kemnaker',
        'K3 UMUM',
        3,
        'days',
        'Training course: K3 Konstruksi Ahli Madya',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 11. K3 Konstruksi Ahli Madya (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '48df70d2-9e9f-4d0e-b3fd-962008591766'::uuid,
        'DI-IH-011',
        'K3 Konstruksi Ahli Madya',
        'inhouse',
        'K3 UMUM',
        3,
        'days',
        'Training course: K3 Konstruksi Ahli Madya',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 12. K3 Konstruksi Ahli Utama (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'defb16cc-7bbe-47ed-9fb5-333f13f1eed0'::uuid,
        'DI-KEM-012',
        'K3 Konstruksi Ahli Utama',
        'kemnaker',
        'K3 UMUM',
        3,
        'days',
        'Training course: K3 Konstruksi Ahli Utama',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 12. K3 Konstruksi Ahli Utama (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '99725aa3-0351-46aa-a326-8f1bba3a9820'::uuid,
        'DI-IH-012',
        'K3 Konstruksi Ahli Utama',
        'inhouse',
        'K3 UMUM',
        3,
        'days',
        'Training course: K3 Konstruksi Ahli Utama',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 13. K3 Scaffolding (TEKNISI) (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'd3ecbab2-b53d-4f54-ba90-9515f89b09b2'::uuid,
        'DI-KEM-013',
        'K3 Scaffolding (TEKNISI)',
        'kemnaker',
        'K3 UMUM',
        3,
        'days',
        'Training course: K3 Scaffolding (TEKNISI)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 13. K3 Scaffolding (TEKNISI) (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '449c6177-46ab-4b27-a1f5-ebd57ae847a4'::uuid,
        'DI-IH-013',
        'K3 Scaffolding (TEKNISI)',
        'inhouse',
        'K3 UMUM',
        3,
        'days',
        'Training course: K3 Scaffolding (TEKNISI)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 14. K3 Scaffolding (SUPERVISI) (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'a74d13a1-902e-44ed-9fa4-2c9723b83b9a'::uuid,
        'DI-KEM-014',
        'K3 Scaffolding (SUPERVISI)',
        'kemnaker',
        'K3 UMUM',
        3,
        'days',
        'Training course: K3 Scaffolding (SUPERVISI)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 14. K3 Scaffolding (SUPERVISI) (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'b99814bf-7c5f-42b6-8e5e-6b2e7323ae9d'::uuid,
        'DI-IH-014',
        'K3 Scaffolding (SUPERVISI)',
        'inhouse',
        'K3 UMUM',
        3,
        'days',
        'Training course: K3 Scaffolding (SUPERVISI)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 15. K3 Pesawat Angkat Angkut (PAA) (AHLI) (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'e8870087-9eae-4c1a-b050-0a9380782b8b'::uuid,
        'DI-KEM-015',
        'K3 Pesawat Angkat Angkut (PAA) (AHLI)',
        'kemnaker',
        'K3 AHLI',
        5,
        'days',
        'Training course: K3 Pesawat Angkat Angkut (PAA) (AHLI)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 15. K3 Pesawat Angkat Angkut (PAA) (AHLI) (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'ba9c641c-1f30-42ac-8e4b-ed9db3d6f1fc'::uuid,
        'DI-IH-015',
        'K3 Pesawat Angkat Angkut (PAA) (AHLI)',
        'inhouse',
        'K3 AHLI',
        5,
        'days',
        'Training course: K3 Pesawat Angkat Angkut (PAA) (AHLI)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 16. Pemeriksa Penguji PAA, PTP, PUBT (TEKNISI/PETUGAS) (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '8a71ab68-c516-4cb9-aa55-6933afbf9da8'::uuid,
        'DI-KEM-016',
        'Pemeriksa Penguji PAA, PTP, PUBT (TEKNISI/PETUGAS)',
        'kemnaker',
        'BOILER',
        3,
        'days',
        'Training course: Pemeriksa Penguji PAA, PTP, PUBT (TEKNISI/PETUGAS)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 16. Pemeriksa Penguji PAA, PTP, PUBT (TEKNISI/PETUGAS) (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '383fa06e-ec3f-408b-9e27-126128f97791'::uuid,
        'DI-IH-016',
        'Pemeriksa Penguji PAA, PTP, PUBT (TEKNISI/PETUGAS)',
        'inhouse',
        'BOILER',
        3,
        'days',
        'Training course: Pemeriksa Penguji PAA, PTP, PUBT (TEKNISI/PETUGAS)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 17. Gondola, Dongkrak, Mekanik, Takel, Mesin Pancang, Conveyor, Rigger  (OPERATOR) (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '74af1411-8b8b-42e6-b0a8-f462f33a069f'::uuid,
        'DI-KEM-017',
        'Gondola, Dongkrak, Mekanik, Takel, Mesin Pancang, Conveyor, Rigger  (OPERATOR)',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Gondola, Dongkrak, Mekanik, Takel, Mesin Pancang, Conveyor, Rigger  (OPERATOR)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 17. Gondola, Dongkrak, Mekanik, Takel, Mesin Pancang, Conveyor, Rigger  (OPERATOR) (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '0767ee76-b731-485a-87a5-15dfc3a9ca25'::uuid,
        'DI-IH-017',
        'Gondola, Dongkrak, Mekanik, Takel, Mesin Pancang, Conveyor, Rigger  (OPERATOR)',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Gondola, Dongkrak, Mekanik, Takel, Mesin Pancang, Conveyor, Rigger  (OPERATOR)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 18. Mesin Produksi & Perkakas,Tanur I (OPERATOR) (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '7744d5e7-2bc8-4ac8-903f-46355ce64860'::uuid,
        'DI-KEM-018',
        'Mesin Produksi & Perkakas,Tanur I (OPERATOR)',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Mesin Produksi & Perkakas,Tanur I (OPERATOR)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 18. Mesin Produksi & Perkakas,Tanur I (OPERATOR) (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '63b6f12a-97aa-489d-859f-e8d42145d923'::uuid,
        'DI-IH-018',
        'Mesin Produksi & Perkakas,Tanur I (OPERATOR)',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Mesin Produksi & Perkakas,Tanur I (OPERATOR)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 19. Mesin Produksi & Perkakas,Tanur II (OPERATOR) (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '18cd7242-f991-4fe2-b235-6f904add2851'::uuid,
        'DI-KEM-019',
        'Mesin Produksi & Perkakas,Tanur II (OPERATOR)',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Mesin Produksi & Perkakas,Tanur II (OPERATOR)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 19. Mesin Produksi & Perkakas,Tanur II (OPERATOR) (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '9dd277ec-e28a-4fd0-89fc-d59f70fec64e'::uuid,
        'DI-IH-019',
        'Mesin Produksi & Perkakas,Tanur II (OPERATOR)',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Mesin Produksi & Perkakas,Tanur II (OPERATOR)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 20. K3 Boiler Kelas I (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'c47cc199-79d4-4020-87b2-1da5d108e01f'::uuid,
        'DI-KEM-020',
        'K3 Boiler Kelas I',
        'kemnaker',
        'K3 UMUM',
        3,
        'days',
        'Training course: K3 Boiler Kelas I',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 20. K3 Boiler Kelas I (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '79ee854e-b85c-472a-ae19-c67f7a8606c0'::uuid,
        'DI-IH-020',
        'K3 Boiler Kelas I',
        'inhouse',
        'K3 UMUM',
        3,
        'days',
        'Training course: K3 Boiler Kelas I',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 21. K3 Boiler Kelas II (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '393f24ca-8471-425c-a46b-11c19e13aa77'::uuid,
        'DI-KEM-021',
        'K3 Boiler Kelas II',
        'kemnaker',
        'K3 UMUM',
        3,
        'days',
        'Training course: K3 Boiler Kelas II',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 21. K3 Boiler Kelas II (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'f5cd43c8-49c5-4d91-a02d-d33499940573'::uuid,
        'DI-IH-021',
        'K3 Boiler Kelas II',
        'inhouse',
        'K3 UMUM',
        3,
        'days',
        'Training course: K3 Boiler Kelas II',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 22. K3 Crane Kelas I (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'ee851900-42c7-4210-aef6-8e9e9314ac3d'::uuid,
        'DI-KEM-022',
        'K3 Crane Kelas I',
        'kemnaker',
        'K3 UMUM',
        3,
        'days',
        'Training course: K3 Crane Kelas I',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 22. K3 Crane Kelas I (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'ff1f1518-2465-42c2-bc03-c0384eff33c4'::uuid,
        'DI-IH-022',
        'K3 Crane Kelas I',
        'inhouse',
        'K3 UMUM',
        3,
        'days',
        'Training course: K3 Crane Kelas I',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 23. K3 Crane Kelas II (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'aa77f22c-96ca-4862-a638-75b8aaeb6190'::uuid,
        'DI-KEM-023',
        'K3 Crane Kelas II',
        'kemnaker',
        'K3 UMUM',
        3,
        'days',
        'Training course: K3 Crane Kelas II',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 23. K3 Crane Kelas II (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '247406e6-3ae8-4206-acba-032b716ecb97'::uuid,
        'DI-IH-023',
        'K3 Crane Kelas II',
        'inhouse',
        'K3 UMUM',
        3,
        'days',
        'Training course: K3 Crane Kelas II',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 24. K3 Crane Kelas III (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '57a21cc0-6338-4675-b738-1b31250e9ba5'::uuid,
        'DI-KEM-024',
        'K3 Crane Kelas III',
        'kemnaker',
        'K3 UMUM',
        3,
        'days',
        'Training course: K3 Crane Kelas III',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 24. K3 Crane Kelas III (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '3c1a1458-ee1a-44d9-9982-7742f1dd3397'::uuid,
        'DI-IH-024',
        'K3 Crane Kelas III',
        'inhouse',
        'K3 UMUM',
        3,
        'days',
        'Training course: K3 Crane Kelas III',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 25. K3 Alat Berat (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'a764bcd7-8c1f-45c4-b705-836921841b4e'::uuid,
        'DI-KEM-025',
        'K3 Alat Berat',
        'kemnaker',
        'K3 UMUM',
        3,
        'days',
        'Training course: K3 Alat Berat',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 25. K3 Alat Berat (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'bf906c4e-719d-46bc-8adc-50e1a3ca2daf'::uuid,
        'DI-IH-025',
        'K3 Alat Berat',
        'inhouse',
        'K3 UMUM',
        3,
        'days',
        'Training course: K3 Alat Berat',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 26. K3 Forklift Kelas I (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '20c37b6c-f2de-44fb-971c-755ca0bb821f'::uuid,
        'DI-KEM-026',
        'K3 Forklift Kelas I',
        'kemnaker',
        'K3 UMUM',
        3,
        'days',
        'Training course: K3 Forklift Kelas I',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 26. K3 Forklift Kelas I (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '9611785b-5b99-4536-a3c8-0b9a0232b963'::uuid,
        'DI-IH-026',
        'K3 Forklift Kelas I',
        'inhouse',
        'K3 UMUM',
        3,
        'days',
        'Training course: K3 Forklift Kelas I',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 27. K3 Forklift Kelas II (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '1339db01-8674-4c04-9683-30d1626abd8c'::uuid,
        'DI-KEM-027',
        'K3 Forklift Kelas II',
        'kemnaker',
        'K3 UMUM',
        3,
        'days',
        'Training course: K3 Forklift Kelas II',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 27. K3 Forklift Kelas II (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'b2f6bf17-fbe0-47cd-b215-f4d838ddf0d5'::uuid,
        'DI-IH-027',
        'K3 Forklift Kelas II',
        'inhouse',
        'K3 UMUM',
        3,
        'days',
        'Training course: K3 Forklift Kelas II',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 28. K3 Diesel/Genset Kelas 1 dan Kelas 2 (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'fd921260-efbb-40df-8eb7-c6d946cc53d4'::uuid,
        'DI-KEM-028',
        'K3 Diesel/Genset Kelas 1 dan Kelas 2',
        'kemnaker',
        'K3 UMUM',
        3,
        'days',
        'Training course: K3 Diesel/Genset Kelas 1 dan Kelas 2',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 28. K3 Diesel/Genset Kelas 1 dan Kelas 2 (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'cf2fe83b-6e8b-4ed5-8101-1c97009ebab2'::uuid,
        'DI-IH-028',
        'K3 Diesel/Genset Kelas 1 dan Kelas 2',
        'inhouse',
        'K3 UMUM',
        3,
        'days',
        'Training course: K3 Diesel/Genset Kelas 1 dan Kelas 2',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 29. Juru Las (Welder) Gas & Listrik Kelas I (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '66c7521f-aa33-4b12-abc0-a23375acac1c'::uuid,
        'DI-KEM-029',
        'Juru Las (Welder) Gas & Listrik Kelas I',
        'kemnaker',
        'ELECTRICAL',
        3,
        'days',
        'Training course: Juru Las (Welder) Gas & Listrik Kelas I',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 29. Juru Las (Welder) Gas & Listrik Kelas I (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'c34b4ecd-0141-4bb6-9984-621c326d23a5'::uuid,
        'DI-IH-029',
        'Juru Las (Welder) Gas & Listrik Kelas I',
        'inhouse',
        'ELECTRICAL',
        3,
        'days',
        'Training course: Juru Las (Welder) Gas & Listrik Kelas I',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 30. Juru Las (Welder) Gas & Listrik Kelas II (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '721c6be5-567d-4db9-ad47-eb7627b34c64'::uuid,
        'DI-KEM-030',
        'Juru Las (Welder) Gas & Listrik Kelas II',
        'kemnaker',
        'ELECTRICAL',
        3,
        'days',
        'Training course: Juru Las (Welder) Gas & Listrik Kelas II',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 30. Juru Las (Welder) Gas & Listrik Kelas II (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '714e368e-d7e2-43b0-8ccc-dd8a60d60cb0'::uuid,
        'DI-IH-030',
        'Juru Las (Welder) Gas & Listrik Kelas II',
        'inhouse',
        'ELECTRICAL',
        3,
        'days',
        'Training course: Juru Las (Welder) Gas & Listrik Kelas II',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 31. Juru Las (Welder) Gas & Listrik Kelas III (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '8be6a7a6-e52f-4c4b-8358-33c0d9ae04a3'::uuid,
        'DI-KEM-031',
        'Juru Las (Welder) Gas & Listrik Kelas III',
        'kemnaker',
        'ELECTRICAL',
        3,
        'days',
        'Training course: Juru Las (Welder) Gas & Listrik Kelas III',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 31. Juru Las (Welder) Gas & Listrik Kelas III (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'ee4a7cf8-2471-4f95-ae05-2c870226792b'::uuid,
        'DI-IH-031',
        'Juru Las (Welder) Gas & Listrik Kelas III',
        'inhouse',
        'ELECTRICAL',
        3,
        'days',
        'Training course: Juru Las (Welder) Gas & Listrik Kelas III',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 32. K3 Asbes (PETUGAS) (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '2f7aa4b2-db46-43da-a7c7-c1623d80803b'::uuid,
        'DI-KEM-032',
        'K3 Asbes (PETUGAS)',
        'kemnaker',
        'K3 UMUM',
        3,
        'days',
        'Training course: K3 Asbes (PETUGAS)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 32. K3 Asbes (PETUGAS) (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'a5cc9964-0741-41d7-9c41-cca942fb618a'::uuid,
        'DI-IH-032',
        'K3 Asbes (PETUGAS)',
        'inhouse',
        'K3 UMUM',
        3,
        'days',
        'Training course: K3 Asbes (PETUGAS)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 33. K3 Pestisida (TEKNISI) (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'eb0126ec-18de-47d0-9ebd-ebfb0967cbd3'::uuid,
        'DI-KEM-033',
        'K3 Pestisida (TEKNISI)',
        'kemnaker',
        'K3 UMUM',
        3,
        'days',
        'Training course: K3 Pestisida (TEKNISI)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 33. K3 Pestisida (TEKNISI) (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'bf4eee60-ecf7-4e86-914e-eeb656cfcc15'::uuid,
        'DI-IH-033',
        'K3 Pestisida (TEKNISI)',
        'inhouse',
        'K3 UMUM',
        3,
        'days',
        'Training course: K3 Pestisida (TEKNISI)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 34. K3 Deteksi Gas (TEKNISI) (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '8c2c2970-baa6-4290-8960-f56177f0429d'::uuid,
        'DI-KEM-034',
        'K3 Deteksi Gas (TEKNISI)',
        'kemnaker',
        'K3 UMUM',
        3,
        'days',
        'Training course: K3 Deteksi Gas (TEKNISI)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 34. K3 Deteksi Gas (TEKNISI) (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '6e921e4a-63e9-4f69-bfa5-e37aaabe459e'::uuid,
        'DI-IH-034',
        'K3 Deteksi Gas (TEKNISI)',
        'inhouse',
        'K3 UMUM',
        3,
        'days',
        'Training course: K3 Deteksi Gas (TEKNISI)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 35. K3 Ruang Terbatas / Confined Space (TEKNISI) (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'd1dffa01-b3b4-4436-a6ec-fb763cfaf503'::uuid,
        'DI-KEM-035',
        'K3 Ruang Terbatas / Confined Space (TEKNISI)',
        'kemnaker',
        'K3 UMUM',
        3,
        'days',
        'Training course: K3 Ruang Terbatas / Confined Space (TEKNISI)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 35. K3 Ruang Terbatas / Confined Space (TEKNISI) (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '7909decd-da6d-41f5-bf7f-5da75cc41b7a'::uuid,
        'DI-IH-035',
        'K3 Ruang Terbatas / Confined Space (TEKNISI)',
        'inhouse',
        'K3 UMUM',
        3,
        'days',
        'Training course: K3 Ruang Terbatas / Confined Space (TEKNISI)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 36. K3 Penyelamat Ruang Terbatas (PETUGAS) (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'd0972a44-9db3-459f-a5bb-e622c64fa5f7'::uuid,
        'DI-KEM-036',
        'K3 Penyelamat Ruang Terbatas (PETUGAS)',
        'kemnaker',
        'K3 UMUM',
        3,
        'days',
        'Training course: K3 Penyelamat Ruang Terbatas (PETUGAS)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 36. K3 Penyelamat Ruang Terbatas (PETUGAS) (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '310e1fa8-fdc5-4e33-81a1-8de7e4c16e89'::uuid,
        'DI-IH-036',
        'K3 Penyelamat Ruang Terbatas (PETUGAS)',
        'inhouse',
        'K3 UMUM',
        3,
        'days',
        'Training course: K3 Penyelamat Ruang Terbatas (PETUGAS)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 37. K3 Kimia (PETUGAS) (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'f72c8e51-3c42-40be-b45e-9d618d0d59f3'::uuid,
        'DI-KEM-037',
        'K3 Kimia (PETUGAS)',
        'kemnaker',
        'K3 UMUM',
        3,
        'days',
        'Training course: K3 Kimia (PETUGAS)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 37. K3 Kimia (PETUGAS) (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '9c5710d2-a68b-4576-b5e7-0ffaa2a1a7a8'::uuid,
        'DI-IH-037',
        'K3 Kimia (PETUGAS)',
        'inhouse',
        'K3 UMUM',
        3,
        'days',
        'Training course: K3 Kimia (PETUGAS)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 38. K3 Kimia (AHLI) (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'f565db65-c112-452e-b628-d14c0b4ba4ef'::uuid,
        'DI-KEM-038',
        'K3 Kimia (AHLI)',
        'kemnaker',
        'K3 AHLI',
        5,
        'days',
        'Training course: K3 Kimia (AHLI)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 38. K3 Kimia (AHLI) (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'd4c8e083-94ff-4e84-b1d6-305b65ff24dd'::uuid,
        'DI-IH-038',
        'K3 Kimia (AHLI)',
        'inhouse',
        'K3 AHLI',
        5,
        'days',
        'Training course: K3 Kimia (AHLI)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 39. Ahli K3 Muda Lingkungan Kerja (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'dfa327ad-8253-400d-ac29-62af78f83787'::uuid,
        'DI-KEM-039',
        'Ahli K3 Muda Lingkungan Kerja',
        'kemnaker',
        'K3 UMUM',
        3,
        'days',
        'Training course: Ahli K3 Muda Lingkungan Kerja',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 39. Ahli K3 Muda Lingkungan Kerja (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '1180189b-c683-47e8-9b63-b28ff582ddda'::uuid,
        'DI-IH-039',
        'Ahli K3 Muda Lingkungan Kerja',
        'inhouse',
        'K3 UMUM',
        3,
        'days',
        'Training course: Ahli K3 Muda Lingkungan Kerja',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 40. Ahli K3 Madya Lingkungan Kerja (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'c35efb16-55ed-41bf-91fe-d16a9c30a746'::uuid,
        'DI-KEM-040',
        'Ahli K3 Madya Lingkungan Kerja',
        'kemnaker',
        'K3 UMUM',
        3,
        'days',
        'Training course: Ahli K3 Madya Lingkungan Kerja',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 40. Ahli K3 Madya Lingkungan Kerja (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '06888458-2dea-4ab7-97f2-3fdf4719ecbe'::uuid,
        'DI-IH-040',
        'Ahli K3 Madya Lingkungan Kerja',
        'inhouse',
        'K3 UMUM',
        3,
        'days',
        'Training course: Ahli K3 Madya Lingkungan Kerja',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 41. Ahli K3 Utama Lingkungan Kerja (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '154cff75-22b5-4fc4-8899-3db1b3d429bc'::uuid,
        'DI-KEM-041',
        'Ahli K3 Utama Lingkungan Kerja',
        'kemnaker',
        'K3 UMUM',
        3,
        'days',
        'Training course: Ahli K3 Utama Lingkungan Kerja',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 41. Ahli K3 Utama Lingkungan Kerja (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'c4de19e2-b64a-4cec-a2c6-558a6f3618aa'::uuid,
        'DI-IH-041',
        'Ahli K3 Utama Lingkungan Kerja',
        'inhouse',
        'K3 UMUM',
        3,
        'days',
        'Training course: Ahli K3 Utama Lingkungan Kerja',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 42. Tenaga Kerja Bangunan Tinggi Tingkat 2 (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'a1ae65d5-04f1-4a8e-97ac-a8eb48afbafb'::uuid,
        'DI-KEM-042',
        'Tenaga Kerja Bangunan Tinggi Tingkat 2',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Tenaga Kerja Bangunan Tinggi Tingkat 2',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 42. Tenaga Kerja Bangunan Tinggi Tingkat 2 (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'ae481879-1686-4ced-8a57-990dba89407e'::uuid,
        'DI-IH-042',
        'Tenaga Kerja Bangunan Tinggi Tingkat 2',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Tenaga Kerja Bangunan Tinggi Tingkat 2',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 43. Tenaga Kerja Pada Ketinggian Tingkat 1 (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '6ee12c17-3f24-4c0f-aac1-83cbbfeed8d7'::uuid,
        'DI-KEM-043',
        'Tenaga Kerja Pada Ketinggian Tingkat 1',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Tenaga Kerja Pada Ketinggian Tingkat 1',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 43. Tenaga Kerja Pada Ketinggian Tingkat 1 (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '772de08f-dd87-4a63-99cc-ae1370ca6340'::uuid,
        'DI-IH-043',
        'Tenaga Kerja Pada Ketinggian Tingkat 1',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Tenaga Kerja Pada Ketinggian Tingkat 1',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 44. Tenaga Kerja Pada Ketinggian Tingkat 2 (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '546b44c4-b66e-4786-8d8a-127773c2aa02'::uuid,
        'DI-KEM-044',
        'Tenaga Kerja Pada Ketinggian Tingkat 2',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Tenaga Kerja Pada Ketinggian Tingkat 2',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 44. Tenaga Kerja Pada Ketinggian Tingkat 2 (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'f8e2295a-72c6-4563-a124-4a1b4dedcb47'::uuid,
        'DI-IH-044',
        'Tenaga Kerja Pada Ketinggian Tingkat 2',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Tenaga Kerja Pada Ketinggian Tingkat 2',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 45. Hyperkes Untuk Paramedis (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '1674641c-bfc7-489f-a540-211bd0128537'::uuid,
        'DI-KEM-045',
        'Hyperkes Untuk Paramedis',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Hyperkes Untuk Paramedis',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 45. Hyperkes Untuk Paramedis (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '537eb9b0-7d42-428f-a9d4-deabf559ce3d'::uuid,
        'DI-IH-045',
        'Hyperkes Untuk Paramedis',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Hyperkes Untuk Paramedis',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 46. Hyperkes Untuk Dokter (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '4fcce95a-cfb1-4a3d-9d9c-5400f08dea02'::uuid,
        'DI-KEM-046',
        'Hyperkes Untuk Dokter',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Hyperkes Untuk Dokter',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 46. Hyperkes Untuk Dokter (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '379e1c9f-4e9b-4612-96a7-443e964d1730'::uuid,
        'DI-IH-046',
        'Hyperkes Untuk Dokter',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Hyperkes Untuk Dokter',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 47. P3K (First Aider ) (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '3fb5527a-5f99-4fe6-ade1-6f424f5e5c18'::uuid,
        'DI-KEM-047',
        'P3K (First Aider )',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: P3K (First Aider )',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 47. P3K (First Aider ) (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'a291b14d-0b01-4890-8163-9bce77b95d27'::uuid,
        'DI-IH-047',
        'P3K (First Aider )',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: P3K (First Aider )',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 48. K3 Rumah Sakit (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '20fc0f6b-f4ac-4e99-aaec-9dc2006e9755'::uuid,
        'DI-KEM-048',
        'K3 Rumah Sakit',
        'kemnaker',
        'K3 UMUM',
        3,
        'days',
        'Training course: K3 Rumah Sakit',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 48. K3 Rumah Sakit (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '1eb5fc1b-5dce-47d2-bcd4-ddc776e2fdb2'::uuid,
        'DI-IH-048',
        'K3 Rumah Sakit',
        'inhouse',
        'K3 UMUM',
        3,
        'days',
        'Training course: K3 Rumah Sakit',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 49. Ahli K3 Umum (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'd8f84aac-1aba-4f5a-85d5-6d02406308f8'::uuid,
        'DI-KEM-049',
        'Ahli K3 Umum',
        'kemnaker',
        'K3 UMUM',
        3,
        'days',
        'Training course: Ahli K3 Umum',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 49. Ahli K3 Umum (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '9ba04964-5e24-4525-a9d6-aa2c221435a2'::uuid,
        'DI-IH-049',
        'Ahli K3 Umum',
        'inhouse',
        'K3 UMUM',
        3,
        'days',
        'Training course: Ahli K3 Umum',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 50. P2K3  (Panitia Pembina K3) (non sertifikasi) (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'e5fbb511-95fd-4cba-8075-e7e7fd35698f'::uuid,
        'DI-KEM-050',
        'P2K3  (Panitia Pembina K3) (non sertifikasi)',
        'kemnaker',
        'K3 UMUM',
        3,
        'days',
        'Training course: P2K3  (Panitia Pembina K3) (non sertifikasi)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 50. P2K3  (Panitia Pembina K3) (non sertifikasi) (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '8013d9ee-ef96-4443-b054-b7269d483acc'::uuid,
        'DI-IH-050',
        'P2K3  (Panitia Pembina K3) (non sertifikasi)',
        'inhouse',
        'K3 UMUM',
        3,
        'days',
        'Training course: P2K3  (Panitia Pembina K3) (non sertifikasi)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 51. Auditor SMK3  (Sistem Manajemen K3) (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '156292c7-1223-461b-ad94-f6890464f668'::uuid,
        'DI-KEM-051',
        'Auditor SMK3  (Sistem Manajemen K3)',
        'kemnaker',
        'K3 UMUM',
        3,
        'days',
        'Training course: Auditor SMK3  (Sistem Manajemen K3)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 51. Auditor SMK3  (Sistem Manajemen K3) (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '7c5e7fc4-d199-4b0e-ac0b-eebd8b82eea2'::uuid,
        'DI-IH-051',
        'Auditor SMK3  (Sistem Manajemen K3)',
        'inhouse',
        'K3 UMUM',
        3,
        'days',
        'Training course: Auditor SMK3  (Sistem Manajemen K3)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 52. Investigasi Kecelakaan (non sertifikasi) (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'ad16cd6c-66f0-4592-8a13-ab20e4049ee6'::uuid,
        'DI-KEM-052',
        'Investigasi Kecelakaan (non sertifikasi)',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Investigasi Kecelakaan (non sertifikasi)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 52. Investigasi Kecelakaan (non sertifikasi) (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'b2288d8a-f7bc-4648-a033-ab20991eff60'::uuid,
        'DI-IH-052',
        'Investigasi Kecelakaan (non sertifikasi)',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Investigasi Kecelakaan (non sertifikasi)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 53. Fire Safety Manager (FSM) (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'a4fe689c-cdf1-46eb-8762-3811ccffc275'::uuid,
        'DI-KEM-053',
        'Fire Safety Manager (FSM)',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Fire Safety Manager (FSM)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 53. Fire Safety Manager (FSM) (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '93cbc223-6df0-4a70-886b-9e9cfcd4ed53'::uuid,
        'DI-IH-053',
        'Fire Safety Manager (FSM)',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Fire Safety Manager (FSM)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 54. Penanggung Jawab Pengendalian Pencemaran Udara (PPPU) (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'fe1bcd03-c108-46b2-97d7-85e5f8fdeb89'::uuid,
        'DI-KEM-054',
        'Penanggung Jawab Pengendalian Pencemaran Udara (PPPU)',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Penanggung Jawab Pengendalian Pencemaran Udara (PPPU)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 54. Penanggung Jawab Pengendalian Pencemaran Udara (PPPU) (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '0f7f2875-a213-41ed-a8f2-05ffa3fd484c'::uuid,
        'DI-IH-054',
        'Penanggung Jawab Pengendalian Pencemaran Udara (PPPU)',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Penanggung Jawab Pengendalian Pencemaran Udara (PPPU)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 55. Penanggung Jawab Pengendalian Pencemaran Air (PPPA) (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '56639175-e430-483c-b965-b0e3f5a98495'::uuid,
        'DI-KEM-055',
        'Penanggung Jawab Pengendalian Pencemaran Air (PPPA)',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Penanggung Jawab Pengendalian Pencemaran Air (PPPA)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 55. Penanggung Jawab Pengendalian Pencemaran Air (PPPA) (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '060ab27d-1417-49d3-88ad-bcee0b7b8dc5'::uuid,
        'DI-IH-055',
        'Penanggung Jawab Pengendalian Pencemaran Air (PPPA)',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Penanggung Jawab Pengendalian Pencemaran Air (PPPA)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 56. Pemantauan dan Analisis Pengelolaan Limbah B3 (PLB3) (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '1c840954-6355-4e59-bd71-64ead83f7451'::uuid,
        'DI-KEM-056',
        'Pemantauan dan Analisis Pengelolaan Limbah B3 (PLB3)',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Pemantauan dan Analisis Pengelolaan Limbah B3 (PLB3)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 56. Pemantauan dan Analisis Pengelolaan Limbah B3 (PLB3) (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '03b34242-ee65-401a-9593-e54fdbe3802f'::uuid,
        'DI-IH-056',
        'Pemantauan dan Analisis Pengelolaan Limbah B3 (PLB3)',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Pemantauan dan Analisis Pengelolaan Limbah B3 (PLB3)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 57. Penanggung Jawab Operasional Instalasi Pengendalian Pencemaran Udara (POPU) (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '6e184d84-2803-492f-a6d7-1a52f69f0a2e'::uuid,
        'DI-KEM-057',
        'Penanggung Jawab Operasional Instalasi Pengendalian Pencemaran Udara (POPU)',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Penanggung Jawab Operasional Instalasi Pengendalian Pencemaran Udara (POPU)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 57. Penanggung Jawab Operasional Instalasi Pengendalian Pencemaran Udara (POPU) (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'be6e7927-c27b-4bf2-9491-25ac5f49d14c'::uuid,
        'DI-IH-057',
        'Penanggung Jawab Operasional Instalasi Pengendalian Pencemaran Udara (POPU)',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Penanggung Jawab Operasional Instalasi Pengendalian Pencemaran Udara (POPU)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 58. Penanggung jawab Operasional Pengolahan Air Limbah (POPAL)  (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '457b37c1-caa9-410a-99fc-30f4bd08b976'::uuid,
        'DI-KEM-058',
        'Penanggung jawab Operasional Pengolahan Air Limbah (POPAL) ',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Penanggung jawab Operasional Pengolahan Air Limbah (POPAL) ',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 58. Penanggung jawab Operasional Pengolahan Air Limbah (POPAL)  (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '7eb12322-a7a3-4da5-a7b5-80e3e56f72eb'::uuid,
        'DI-IH-058',
        'Penanggung jawab Operasional Pengolahan Air Limbah (POPAL) ',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Penanggung jawab Operasional Pengolahan Air Limbah (POPAL) ',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 59. Pengoperasian Instalasi Pengelolaan limbah B3 (OLB3) (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '27e1fcaa-0532-4f41-8bfa-2b6f61feb376'::uuid,
        'DI-KEM-059',
        'Pengoperasian Instalasi Pengelolaan limbah B3 (OLB3)',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Pengoperasian Instalasi Pengelolaan limbah B3 (OLB3)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 59. Pengoperasian Instalasi Pengelolaan limbah B3 (OLB3) (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '65218304-31ac-436d-8bc8-68a6ac0d1c53'::uuid,
        'DI-IH-059',
        'Pengoperasian Instalasi Pengelolaan limbah B3 (OLB3)',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Pengoperasian Instalasi Pengelolaan limbah B3 (OLB3)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 60. HR Manager (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '9a6ca931-455c-4202-9e55-f8b6ff6c0254'::uuid,
        'DI-KEM-060',
        'HR Manager',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: HR Manager',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 60. HR Manager (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '8f237a83-5a32-4bfc-bd5b-70462abcfecc'::uuid,
        'DI-IH-060',
        'HR Manager',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: HR Manager',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 61. HR Supervisor (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '2772824a-76ae-4c02-bd6c-4f86ac2886c1'::uuid,
        'DI-KEM-061',
        'HR Supervisor',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: HR Supervisor',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 61. HR Supervisor (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '7bba112c-25cf-4809-bcd0-4779b16182ce'::uuid,
        'DI-IH-061',
        'HR Supervisor',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: HR Supervisor',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 62. HR Staff (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'fa780255-6229-4371-a9cd-f1dd253ce98e'::uuid,
        'DI-KEM-062',
        'HR Staff',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: HR Staff',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 62. HR Staff (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '6deb26ee-6b4e-4fb3-bd03-48c79bcb3bf9'::uuid,
        'DI-IH-062',
        'HR Staff',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: HR Staff',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 63. Operator K3  (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'ed36d25a-1154-44e5-b103-8fbe84d550f7'::uuid,
        'DI-KEM-063',
        'Operator K3 ',
        'kemnaker',
        'K3 UMUM',
        3,
        'days',
        'Training course: Operator K3 ',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 63. Operator K3  (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '5d051f9e-0d5d-4162-b413-d09ad637463f'::uuid,
        'DI-IH-063',
        'Operator K3 ',
        'inhouse',
        'K3 UMUM',
        3,
        'days',
        'Training course: Operator K3 ',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 64. Petugas K3  (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '5b8b9ae4-3f7d-4a7f-aeda-bb9d75805021'::uuid,
        'DI-KEM-064',
        'Petugas K3 ',
        'kemnaker',
        'K3 UMUM',
        3,
        'days',
        'Training course: Petugas K3 ',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 64. Petugas K3  (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '02f49eed-0ae3-4d64-b14c-21f5ba87bef2'::uuid,
        'DI-IH-064',
        'Petugas K3 ',
        'inhouse',
        'K3 UMUM',
        3,
        'days',
        'Training course: Petugas K3 ',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 65. Ahli K3  (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '67f81941-4c9f-4a7e-a6bf-4fa99f08b025'::uuid,
        'DI-KEM-065',
        'Ahli K3 ',
        'kemnaker',
        'K3 UMUM',
        3,
        'days',
        'Training course: Ahli K3 ',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 65. Ahli K3  (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '7d6bf0ea-bc3f-4691-81ae-848a3d27c592'::uuid,
        'DI-IH-065',
        'Ahli K3 ',
        'inhouse',
        'K3 UMUM',
        3,
        'days',
        'Training course: Ahli K3 ',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 66. Pengelolaan K3 Listrik  (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '4572c13b-0528-4460-9ce1-28d35f0d0463'::uuid,
        'DI-KEM-066',
        'Pengelolaan K3 Listrik ',
        'kemnaker',
        'K3 UMUM',
        3,
        'days',
        'Training course: Pengelolaan K3 Listrik ',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 66. Pengelolaan K3 Listrik  (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'e310e204-84c9-4225-a966-f6c7a34efbbd'::uuid,
        'DI-IH-066',
        'Pengelolaan K3 Listrik ',
        'inhouse',
        'K3 UMUM',
        3,
        'days',
        'Training course: Pengelolaan K3 Listrik ',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 67. Penganalisa K3 Listrik  (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '01935cfe-ca6a-47ec-81cb-e636de18f117'::uuid,
        'DI-KEM-067',
        'Penganalisa K3 Listrik ',
        'kemnaker',
        'K3 UMUM',
        3,
        'days',
        'Training course: Penganalisa K3 Listrik ',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 67. Penganalisa K3 Listrik  (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '9b6d03ae-45a9-4f2c-adfa-c81aa7809f54'::uuid,
        'DI-IH-067',
        'Penganalisa K3 Listrik ',
        'inhouse',
        'K3 UMUM',
        3,
        'days',
        'Training course: Penganalisa K3 Listrik ',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 68. Pengawasan K3 Industri Migas  (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '63ddd6d5-d395-454a-a1b1-3d34c69b8282'::uuid,
        'DI-KEM-068',
        'Pengawasan K3 Industri Migas ',
        'kemnaker',
        'K3 UMUM',
        3,
        'days',
        'Training course: Pengawasan K3 Industri Migas ',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 68. Pengawasan K3 Industri Migas  (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '1e77a444-6aa3-46da-ae92-6a7db6a939ff'::uuid,
        'DI-IH-068',
        'Pengawasan K3 Industri Migas ',
        'inhouse',
        'K3 UMUM',
        3,
        'days',
        'Training course: Pengawasan K3 Industri Migas ',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 69. Pengoperasian K3 Industrian Migas  (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'd5999922-7803-4296-b2d5-3d61231d58ce'::uuid,
        'DI-KEM-069',
        'Pengoperasian K3 Industrian Migas ',
        'kemnaker',
        'K3 UMUM',
        3,
        'days',
        'Training course: Pengoperasian K3 Industrian Migas ',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 69. Pengoperasian K3 Industrian Migas  (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '429191bb-c14d-4a8d-95a6-aea2fef7a469'::uuid,
        'DI-IH-069',
        'Pengoperasian K3 Industrian Migas ',
        'inhouse',
        'K3 UMUM',
        3,
        'days',
        'Training course: Pengoperasian K3 Industrian Migas ',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 70. Paramedis K3 Muda  (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '5304b634-df20-4ef0-a20b-085645f8a3dc'::uuid,
        'DI-KEM-070',
        'Paramedis K3 Muda ',
        'kemnaker',
        'K3 UMUM',
        3,
        'days',
        'Training course: Paramedis K3 Muda ',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 70. Paramedis K3 Muda  (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'cfbb56ce-ead1-4317-a890-4ed6c886574f'::uuid,
        'DI-IH-070',
        'Paramedis K3 Muda ',
        'inhouse',
        'K3 UMUM',
        3,
        'days',
        'Training course: Paramedis K3 Muda ',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 71. Paramedis K3 Madya  (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '70f7f106-bfdd-48c5-9313-748c720991da'::uuid,
        'DI-KEM-071',
        'Paramedis K3 Madya ',
        'kemnaker',
        'K3 UMUM',
        3,
        'days',
        'Training course: Paramedis K3 Madya ',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 71. Paramedis K3 Madya  (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '755de328-353e-47ee-b151-64f464940da9'::uuid,
        'DI-IH-071',
        'Paramedis K3 Madya ',
        'inhouse',
        'K3 UMUM',
        3,
        'days',
        'Training course: Paramedis K3 Madya ',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 72. Paramedis K3 Utama  (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '18145451-77d6-4ece-8687-a11a3fe1bbd0'::uuid,
        'DI-KEM-072',
        'Paramedis K3 Utama ',
        'kemnaker',
        'K3 UMUM',
        3,
        'days',
        'Training course: Paramedis K3 Utama ',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 72. Paramedis K3 Utama  (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'bb69615f-053e-4b5f-b6d2-3d635a88ab3f'::uuid,
        'DI-IH-072',
        'Paramedis K3 Utama ',
        'inhouse',
        'K3 UMUM',
        3,
        'days',
        'Training course: Paramedis K3 Utama ',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 73. Dokter Perusahaan (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'd7ce6f6f-7b0c-4a2b-ad58-e65fe952eeff'::uuid,
        'DI-KEM-073',
        'Dokter Perusahaan',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Dokter Perusahaan',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 73. Dokter Perusahaan (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '44cedc6e-f5ec-4dab-87a9-5c76bc145fb2'::uuid,
        'DI-IH-073',
        'Dokter Perusahaan',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Dokter Perusahaan',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 74. Pengelolaan Laboratorium (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '11b2f8d6-1699-4f20-aeb5-59dafab1ea3b'::uuid,
        'DI-KEM-074',
        'Pengelolaan Laboratorium',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Pengelolaan Laboratorium',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 74. Pengelolaan Laboratorium (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'b199f51b-e682-4948-913e-78337e920534'::uuid,
        'DI-IH-074',
        'Pengelolaan Laboratorium',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Pengelolaan Laboratorium',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 75. Pengelolaan P3K di tempat Kerja (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'f3aed587-ac4b-4cd5-82b7-8e87b4ccf6e4'::uuid,
        'DI-KEM-075',
        'Pengelolaan P3K di tempat Kerja',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Pengelolaan P3K di tempat Kerja',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 75. Pengelolaan P3K di tempat Kerja (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '5700122c-353a-4c60-9a7a-08eead832000'::uuid,
        'DI-IH-075',
        'Pengelolaan P3K di tempat Kerja',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Pengelolaan P3K di tempat Kerja',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 76. Pemadaman Kebakaran Migas (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '8e1b7ea1-bdee-4779-9a3a-b5054e63add9'::uuid,
        'DI-KEM-076',
        'Pemadaman Kebakaran Migas',
        'kemnaker',
        'DAMKAR',
        3,
        'days',
        'Training course: Pemadaman Kebakaran Migas',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 76. Pemadaman Kebakaran Migas (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '327c3c72-0eff-4b04-af42-624ff0a83918'::uuid,
        'DI-IH-076',
        'Pemadaman Kebakaran Migas',
        'inhouse',
        'DAMKAR',
        3,
        'days',
        'Training course: Pemadaman Kebakaran Migas',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 77. Pengoperasian Forklift (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'cf004288-491e-4d23-9034-b156c1c2ffd8'::uuid,
        'DI-KEM-077',
        'Pengoperasian Forklift',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Pengoperasian Forklift',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 77. Pengoperasian Forklift (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '32656419-3d32-4d3f-af27-a9e18f886ccc'::uuid,
        'DI-IH-077',
        'Pengoperasian Forklift',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Pengoperasian Forklift',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 78. Pengoperasian Crane Jembatan (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'a91cdefd-745e-4a34-8b68-fcd0a5971ca8'::uuid,
        'DI-KEM-078',
        'Pengoperasian Crane Jembatan',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Pengoperasian Crane Jembatan',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 78. Pengoperasian Crane Jembatan (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '94b32dae-29e2-44ab-b118-530796253f67'::uuid,
        'DI-IH-078',
        'Pengoperasian Crane Jembatan',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Pengoperasian Crane Jembatan',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 79. Pengoperasian Mobil Crane (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'ebc91c90-11fb-4bb0-a6f6-52e1ecae6d2d'::uuid,
        'DI-KEM-079',
        'Pengoperasian Mobil Crane',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Pengoperasian Mobil Crane',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 79. Pengoperasian Mobil Crane (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'c70d0bd0-886f-4151-8229-27846127d50e'::uuid,
        'DI-IH-079',
        'Pengoperasian Mobil Crane',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Pengoperasian Mobil Crane',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 80. Pengoperasian Crane Putar Tetap (Pedestal Crane) (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '2ce75ada-b0e8-443d-8553-20abca0558c2'::uuid,
        'DI-KEM-080',
        'Pengoperasian Crane Putar Tetap (Pedestal Crane)',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Pengoperasian Crane Putar Tetap (Pedestal Crane)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 80. Pengoperasian Crane Putar Tetap (Pedestal Crane) (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'fa6316d9-7ff6-4783-aefd-2118a3e74bf1'::uuid,
        'DI-IH-080',
        'Pengoperasian Crane Putar Tetap (Pedestal Crane)',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Pengoperasian Crane Putar Tetap (Pedestal Crane)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 81. Inspektur Pesawat Angkat (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'f7bc68fa-5462-45c7-bb22-8ff347d1ab3e'::uuid,
        'DI-KEM-081',
        'Inspektur Pesawat Angkat',
        'kemnaker',
        'EQUIPMENT OPERATOR',
        3,
        'days',
        'Training course: Inspektur Pesawat Angkat',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 81. Inspektur Pesawat Angkat (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '7f2c0c48-791f-4d38-8718-4ae07ea67f97'::uuid,
        'DI-IH-081',
        'Inspektur Pesawat Angkat',
        'inhouse',
        'EQUIPMENT OPERATOR',
        3,
        'days',
        'Training course: Inspektur Pesawat Angkat',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 82. Pengoperasian Pemindahan Beban (Rigger) (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '73934093-bded-4973-8de5-edad3f419973'::uuid,
        'DI-KEM-082',
        'Pengoperasian Pemindahan Beban (Rigger)',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Pengoperasian Pemindahan Beban (Rigger)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 82. Pengoperasian Pemindahan Beban (Rigger) (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'fd915682-1a75-40cd-8d9f-a4387c552997'::uuid,
        'DI-IH-082',
        'Pengoperasian Pemindahan Beban (Rigger)',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Pengoperasian Pemindahan Beban (Rigger)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 83. Pengendalian Pemindahan Beban (Asisten Rigger) (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'b9b05b3f-361e-4ba4-844b-372476a808a5'::uuid,
        'DI-KEM-083',
        'Pengendalian Pemindahan Beban (Asisten Rigger)',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Pengendalian Pemindahan Beban (Asisten Rigger)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 83. Pengendalian Pemindahan Beban (Asisten Rigger) (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '8adc75d6-e894-4aee-9b56-0c917d218ba0'::uuid,
        'DI-IH-083',
        'Pengendalian Pemindahan Beban (Asisten Rigger)',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Pengendalian Pemindahan Beban (Asisten Rigger)',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 84. Pengoperasian Alat Gali Muat Excavator Backhoe (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'bb8ce752-e36f-42f5-9f6a-ee040229b2b5'::uuid,
        'DI-KEM-084',
        'Pengoperasian Alat Gali Muat Excavator Backhoe',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Pengoperasian Alat Gali Muat Excavator Backhoe',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 84. Pengoperasian Alat Gali Muat Excavator Backhoe (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '182a1847-382c-4436-85c9-a98505b55358'::uuid,
        'DI-IH-084',
        'Pengoperasian Alat Gali Muat Excavator Backhoe',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Pengoperasian Alat Gali Muat Excavator Backhoe',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 85. Pengoperasian Alat Gali Muat Excavator Front Shovel (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '9c2a210e-3146-41f2-8f67-7fa230bcebcc'::uuid,
        'DI-KEM-085',
        'Pengoperasian Alat Gali Muat Excavator Front Shovel',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Pengoperasian Alat Gali Muat Excavator Front Shovel',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 85. Pengoperasian Alat Gali Muat Excavator Front Shovel (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '3d14ee83-7a2e-4b85-864e-bd4e2ebc7a24'::uuid,
        'DI-IH-085',
        'Pengoperasian Alat Gali Muat Excavator Front Shovel',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Pengoperasian Alat Gali Muat Excavator Front Shovel',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 86. Pengoperasian Alat Gali Mekanis Kontinu Mining Auger (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'b26ca4ff-afbd-45d2-886b-81cd1757a697'::uuid,
        'DI-KEM-086',
        'Pengoperasian Alat Gali Mekanis Kontinu Mining Auger',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Pengoperasian Alat Gali Mekanis Kontinu Mining Auger',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 86. Pengoperasian Alat Gali Mekanis Kontinu Mining Auger (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'ec21e301-5cc2-4d8d-ab29-26fa5a44f2e5'::uuid,
        'DI-IH-086',
        'Pengoperasian Alat Gali Mekanis Kontinu Mining Auger',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Pengoperasian Alat Gali Mekanis Kontinu Mining Auger',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 87. Pengoperasian Alat Gali Mekanis Kontinu Surface Miner (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'f109ffa9-1b9b-4f97-9c36-37b190846211'::uuid,
        'DI-KEM-087',
        'Pengoperasian Alat Gali Mekanis Kontinu Surface Miner',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Pengoperasian Alat Gali Mekanis Kontinu Surface Miner',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 87. Pengoperasian Alat Gali Mekanis Kontinu Surface Miner (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '557d843a-b92b-48e9-9bc5-11e69b9e9c97'::uuid,
        'DI-IH-087',
        'Pengoperasian Alat Gali Mekanis Kontinu Surface Miner',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Pengoperasian Alat Gali Mekanis Kontinu Surface Miner',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 88. Pengoperasian Alat Gali Mekanis Kontinu Bucket Wheel Excavator (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'd3d7f2fe-ec50-40d5-ba39-49466be11740'::uuid,
        'DI-KEM-088',
        'Pengoperasian Alat Gali Mekanis Kontinu Bucket Wheel Excavator',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Pengoperasian Alat Gali Mekanis Kontinu Bucket Wheel Excavator',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 88. Pengoperasian Alat Gali Mekanis Kontinu Bucket Wheel Excavator (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '43dfae2c-2140-4b48-ad1c-6b8043a4c7c2'::uuid,
        'DI-IH-088',
        'Pengoperasian Alat Gali Mekanis Kontinu Bucket Wheel Excavator',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Pengoperasian Alat Gali Mekanis Kontinu Bucket Wheel Excavator',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 89. Pengoperasian Alat Angkat Dump Truck (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '2b0aeae1-a1af-4762-93a6-ccaf69b027db'::uuid,
        'DI-KEM-089',
        'Pengoperasian Alat Angkat Dump Truck',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Pengoperasian Alat Angkat Dump Truck',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 89. Pengoperasian Alat Angkat Dump Truck (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '2c49912a-addd-44ae-a479-386ace382ad7'::uuid,
        'DI-IH-089',
        'Pengoperasian Alat Angkat Dump Truck',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Pengoperasian Alat Angkat Dump Truck',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 90. Pengoperasian Alat Gali Muat Angkut Wheel Loader (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'a01d2561-841e-44ec-bd64-1f91251bb209'::uuid,
        'DI-KEM-090',
        'Pengoperasian Alat Gali Muat Angkut Wheel Loader',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Pengoperasian Alat Gali Muat Angkut Wheel Loader',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 90. Pengoperasian Alat Gali Muat Angkut Wheel Loader (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'd58d19cd-6546-46fe-b494-d2965ee362a9'::uuid,
        'DI-IH-090',
        'Pengoperasian Alat Gali Muat Angkut Wheel Loader',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Pengoperasian Alat Gali Muat Angkut Wheel Loader',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 91. Pengoperasian Peralatan Pendukung Bulldozer (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '7c1adb09-02e1-4d3e-9c30-5fe810028cb3'::uuid,
        'DI-KEM-091',
        'Pengoperasian Peralatan Pendukung Bulldozer',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Pengoperasian Peralatan Pendukung Bulldozer',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 91. Pengoperasian Peralatan Pendukung Bulldozer (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '21f5730e-8c0c-4563-981a-601a4e6e841f'::uuid,
        'DI-IH-091',
        'Pengoperasian Peralatan Pendukung Bulldozer',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Pengoperasian Peralatan Pendukung Bulldozer',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 92. Pengoperasian Peralatan Pendukung Motor Grader (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'a7e575a7-972c-4c1c-8b03-b21559ff3dd4'::uuid,
        'DI-KEM-092',
        'Pengoperasian Peralatan Pendukung Motor Grader',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Pengoperasian Peralatan Pendukung Motor Grader',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 92. Pengoperasian Peralatan Pendukung Motor Grader (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '2bcf4fe1-a14a-449a-afe3-3707a523b125'::uuid,
        'DI-IH-092',
        'Pengoperasian Peralatan Pendukung Motor Grader',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Pengoperasian Peralatan Pendukung Motor Grader',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 93. Pengoperasian Peralatan Pendukung Water Truck (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '7dab1106-e97a-4f04-8876-7364aa7abfa3'::uuid,
        'DI-KEM-093',
        'Pengoperasian Peralatan Pendukung Water Truck',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Pengoperasian Peralatan Pendukung Water Truck',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 93. Pengoperasian Peralatan Pendukung Water Truck (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'dfb0a394-b705-45e5-9938-d866d58dcc92'::uuid,
        'DI-IH-093',
        'Pengoperasian Peralatan Pendukung Water Truck',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Pengoperasian Peralatan Pendukung Water Truck',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 94. Pengoperasian Peralatan Pendukung Compactor (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '31dad6aa-74fa-4ac8-b823-fed649f00861'::uuid,
        'DI-KEM-094',
        'Pengoperasian Peralatan Pendukung Compactor',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Pengoperasian Peralatan Pendukung Compactor',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 94. Pengoperasian Peralatan Pendukung Compactor (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '0d010583-014f-495c-b293-69ba3ca65202'::uuid,
        'DI-IH-094',
        'Pengoperasian Peralatan Pendukung Compactor',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Pengoperasian Peralatan Pendukung Compactor',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 95. Pengoperasian Peralatan Pendukung Service Truck (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'c30b2b7d-ca40-4b5c-adfd-f1cca8824b02'::uuid,
        'DI-KEM-095',
        'Pengoperasian Peralatan Pendukung Service Truck',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Pengoperasian Peralatan Pendukung Service Truck',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 95. Pengoperasian Peralatan Pendukung Service Truck (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'dcf54118-c177-4ae8-ba96-276e1a5036a9'::uuid,
        'DI-IH-095',
        'Pengoperasian Peralatan Pendukung Service Truck',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Pengoperasian Peralatan Pendukung Service Truck',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 96. Pengoperasian Peralatan Pendukung Fuel Truck (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '84f75740-262b-416b-9809-85327b76590d'::uuid,
        'DI-KEM-096',
        'Pengoperasian Peralatan Pendukung Fuel Truck',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Pengoperasian Peralatan Pendukung Fuel Truck',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 96. Pengoperasian Peralatan Pendukung Fuel Truck (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'cd0b6881-d587-4017-8fb8-0639f389925b'::uuid,
        'DI-IH-096',
        'Pengoperasian Peralatan Pendukung Fuel Truck',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Pengoperasian Peralatan Pendukung Fuel Truck',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 97. Pengoperasian Alat Angkat Telehandler (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '0fda4eab-abd1-4f4e-bb7f-e2b058ccb84b'::uuid,
        'DI-KEM-097',
        'Pengoperasian Alat Angkat Telehandler',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Pengoperasian Alat Angkat Telehandler',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 97. Pengoperasian Alat Angkat Telehandler (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '08ca4fe6-81d4-4702-bf20-49a797d745fd'::uuid,
        'DI-IH-097',
        'Pengoperasian Alat Angkat Telehandler',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Pengoperasian Alat Angkat Telehandler',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 98. Pengoperasian Mesin Bor untuk Lubang Ledak Tambang Terbuka Mineral dan Batubara (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '9dcae8e7-5846-440c-9023-b03d6d02039a'::uuid,
        'DI-KEM-098',
        'Pengoperasian Mesin Bor untuk Lubang Ledak Tambang Terbuka Mineral dan Batubara',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Pengoperasian Mesin Bor untuk Lubang Ledak Tambang Terbuka Mineral dan Batubara',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 98. Pengoperasian Mesin Bor untuk Lubang Ledak Tambang Terbuka Mineral dan Batubara (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'c368c658-86ce-4a2f-9380-516fa08269e4'::uuid,
        'DI-IH-098',
        'Pengoperasian Mesin Bor untuk Lubang Ledak Tambang Terbuka Mineral dan Batubara',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Pengoperasian Mesin Bor untuk Lubang Ledak Tambang Terbuka Mineral dan Batubara',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 99. Pemandu Kegiatan Pengeboran tambang Terbuka Mineral dan Batubara (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '0f3624cb-a628-4d17-8989-021ae8175f53'::uuid,
        'DI-KEM-099',
        'Pemandu Kegiatan Pengeboran tambang Terbuka Mineral dan Batubara',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Pemandu Kegiatan Pengeboran tambang Terbuka Mineral dan Batubara',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 99. Pemandu Kegiatan Pengeboran tambang Terbuka Mineral dan Batubara (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '3dafa97e-502f-42c4-88b7-84463f7e68bc'::uuid,
        'DI-IH-099',
        'Pemandu Kegiatan Pengeboran tambang Terbuka Mineral dan Batubara',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Pemandu Kegiatan Pengeboran tambang Terbuka Mineral dan Batubara',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 100. Pengkaji Muda Teknis Proteksi Kebakaran (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '769b50f7-d799-40ca-bcbd-6266f2c8ec6e'::uuid,
        'DI-KEM-100',
        'Pengkaji Muda Teknis Proteksi Kebakaran',
        'kemnaker',
        'DAMKAR',
        3,
        'days',
        'Training course: Pengkaji Muda Teknis Proteksi Kebakaran',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 100. Pengkaji Muda Teknis Proteksi Kebakaran (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '23a67a56-1334-4317-b1fc-d4f1810a6380'::uuid,
        'DI-IH-100',
        'Pengkaji Muda Teknis Proteksi Kebakaran',
        'inhouse',
        'DAMKAR',
        3,
        'days',
        'Training course: Pengkaji Muda Teknis Proteksi Kebakaran',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 101. Pengkaji Madya Teknis Proteksi Kebakaran (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'f6cfee40-6dab-4f09-a4a0-5962eedc0ee9'::uuid,
        'DI-KEM-101',
        'Pengkaji Madya Teknis Proteksi Kebakaran',
        'kemnaker',
        'DAMKAR',
        3,
        'days',
        'Training course: Pengkaji Madya Teknis Proteksi Kebakaran',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 101. Pengkaji Madya Teknis Proteksi Kebakaran (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '790ef2d8-6a71-4be0-b839-ebe45092718a'::uuid,
        'DI-IH-101',
        'Pengkaji Madya Teknis Proteksi Kebakaran',
        'inhouse',
        'DAMKAR',
        3,
        'days',
        'Training course: Pengkaji Madya Teknis Proteksi Kebakaran',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 102. Pengkaji Teknis Proteksi Kebakaran (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'a689323e-ee5a-4855-8a74-69456289640e'::uuid,
        'DI-KEM-102',
        'Pengkaji Teknis Proteksi Kebakaran',
        'kemnaker',
        'DAMKAR',
        3,
        'days',
        'Training course: Pengkaji Teknis Proteksi Kebakaran',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 102. Pengkaji Teknis Proteksi Kebakaran (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '60685b44-0559-4dc6-bea0-94238dc7dea1'::uuid,
        'DI-IH-102',
        'Pengkaji Teknis Proteksi Kebakaran',
        'inhouse',
        'DAMKAR',
        3,
        'days',
        'Training course: Pengkaji Teknis Proteksi Kebakaran',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 103. Teknisi Fire Alarm (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'c16a5564-ba41-4f80-b720-0314bf4adc17'::uuid,
        'DI-KEM-103',
        'Teknisi Fire Alarm',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Teknisi Fire Alarm',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 103. Teknisi Fire Alarm (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '2d814076-aea5-4d7f-8b2c-dc3672b14feb'::uuid,
        'DI-IH-103',
        'Teknisi Fire Alarm',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Teknisi Fire Alarm',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 104. Ahli Muda Pesawat Lift dan Eskalator (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '9650c62d-5a35-49fd-95be-bc09f36531bc'::uuid,
        'DI-KEM-104',
        'Ahli Muda Pesawat Lift dan Eskalator',
        'kemnaker',
        'EQUIPMENT OPERATOR',
        3,
        'days',
        'Training course: Ahli Muda Pesawat Lift dan Eskalator',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 104. Ahli Muda Pesawat Lift dan Eskalator (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '79d593f3-70c2-42b0-bdc5-daa1035773b4'::uuid,
        'DI-IH-104',
        'Ahli Muda Pesawat Lift dan Eskalator',
        'inhouse',
        'EQUIPMENT OPERATOR',
        3,
        'days',
        'Training course: Ahli Muda Pesawat Lift dan Eskalator',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 105. Ahli Madya Pesawat Lift dan Eskalator (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'e3dd8277-3117-4daf-8eef-d1cbd2167393'::uuid,
        'DI-KEM-105',
        'Ahli Madya Pesawat Lift dan Eskalator',
        'kemnaker',
        'EQUIPMENT OPERATOR',
        3,
        'days',
        'Training course: Ahli Madya Pesawat Lift dan Eskalator',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 105. Ahli Madya Pesawat Lift dan Eskalator (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '23cb02ed-dc64-4139-9cad-f6c2f6262335'::uuid,
        'DI-IH-105',
        'Ahli Madya Pesawat Lift dan Eskalator',
        'inhouse',
        'EQUIPMENT OPERATOR',
        3,
        'days',
        'Training course: Ahli Madya Pesawat Lift dan Eskalator',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 106. Ahli Utama Pesawat Lift dan Eskalator (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '812b93d0-62b5-4959-a211-fd66c1c54f50'::uuid,
        'DI-KEM-106',
        'Ahli Utama Pesawat Lift dan Eskalator',
        'kemnaker',
        'EQUIPMENT OPERATOR',
        3,
        'days',
        'Training course: Ahli Utama Pesawat Lift dan Eskalator',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 106. Ahli Utama Pesawat Lift dan Eskalator (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '871d13ae-4fcb-49a8-b050-32aa295af5dc'::uuid,
        'DI-IH-106',
        'Ahli Utama Pesawat Lift dan Eskalator',
        'inhouse',
        'EQUIPMENT OPERATOR',
        3,
        'days',
        'Training course: Ahli Utama Pesawat Lift dan Eskalator',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 107. Ahli Muda Elektrikal Konstruksi Bangunan Gd. (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '2bee0c19-8db3-449e-bc14-045d7f343269'::uuid,
        'DI-KEM-107',
        'Ahli Muda Elektrikal Konstruksi Bangunan Gd.',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Ahli Muda Elektrikal Konstruksi Bangunan Gd.',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 107. Ahli Muda Elektrikal Konstruksi Bangunan Gd. (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '8b3f9105-6e15-4276-9590-a685b0b4a328'::uuid,
        'DI-IH-107',
        'Ahli Muda Elektrikal Konstruksi Bangunan Gd.',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Ahli Muda Elektrikal Konstruksi Bangunan Gd.',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 108. Ahli Madya Elektrikal Konstruksi Bangunan Gd. (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '97c6c60a-b103-4c79-80b9-b479ee5661e1'::uuid,
        'DI-KEM-108',
        'Ahli Madya Elektrikal Konstruksi Bangunan Gd.',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Ahli Madya Elektrikal Konstruksi Bangunan Gd.',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 108. Ahli Madya Elektrikal Konstruksi Bangunan Gd. (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '368c608d-4aa0-4c89-8359-57557552798f'::uuid,
        'DI-IH-108',
        'Ahli Madya Elektrikal Konstruksi Bangunan Gd.',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Ahli Madya Elektrikal Konstruksi Bangunan Gd.',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 109. Pengawas Scaffolding (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'c572ccb4-6ad3-49d8-add5-7e551319edb6'::uuid,
        'DI-KEM-109',
        'Pengawas Scaffolding',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Pengawas Scaffolding',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 109. Pengawas Scaffolding (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'c04285e5-6dc4-40a9-aa47-3f868a5c9522'::uuid,
        'DI-IH-109',
        'Pengawas Scaffolding',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Pengawas Scaffolding',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 110. Operator Dump Truck (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'bff41efd-91ba-4c3a-8a63-14a5dc567263'::uuid,
        'DI-KEM-110',
        'Operator Dump Truck',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Operator Dump Truck',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 110. Operator Dump Truck (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'a81eb334-72e5-4082-987a-32340038fcee'::uuid,
        'DI-IH-110',
        'Operator Dump Truck',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Operator Dump Truck',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 111. Operator Backhoe Loader (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '6e01ab0c-8517-430f-9a92-b16388d64c8a'::uuid,
        'DI-KEM-111',
        'Operator Backhoe Loader',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Operator Backhoe Loader',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 111. Operator Backhoe Loader (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'c2374973-7965-4bcb-af59-7095bfd1a744'::uuid,
        'DI-IH-111',
        'Operator Backhoe Loader',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Operator Backhoe Loader',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 112. Operator Wheel Excavator Yunior (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'c59efc1e-23b0-426b-a4ff-d1c4e1a0afd7'::uuid,
        'DI-KEM-112',
        'Operator Wheel Excavator Yunior',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Operator Wheel Excavator Yunior',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 112. Operator Wheel Excavator Yunior (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '480707b9-d73b-44de-acc2-544712a9c5e1'::uuid,
        'DI-IH-112',
        'Operator Wheel Excavator Yunior',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Operator Wheel Excavator Yunior',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 113. Operator Scaffolding (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '0150c25c-087f-4a95-97d3-1efd9bea5bfe'::uuid,
        'DI-KEM-113',
        'Operator Scaffolding',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Operator Scaffolding',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 113. Operator Scaffolding (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '970d1204-0026-49d9-8d98-d00f24738e01'::uuid,
        'DI-IH-113',
        'Operator Scaffolding',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Operator Scaffolding',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 114. Operator Gondola pada Bangunan Gedung (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'a9cec87a-cfdc-4307-ac75-0eb5aa4afa4d'::uuid,
        'DI-KEM-114',
        'Operator Gondola pada Bangunan Gedung',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Operator Gondola pada Bangunan Gedung',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 114. Operator Gondola pada Bangunan Gedung (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '18894241-a798-46a3-b929-e168efd758b2'::uuid,
        'DI-IH-114',
        'Operator Gondola pada Bangunan Gedung',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Operator Gondola pada Bangunan Gedung',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 115. Operator Slinging and Rigging (KEMNAKER)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        'de131ba8-3524-4cf3-8179-7f24fcafb871'::uuid,
        'DI-KEM-115',
        'Operator Slinging and Rigging',
        'kemnaker',
        'GENERAL',
        3,
        'days',
        'Training course: Operator Slinging and Rigging',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;

    -- 115. Operator Slinging and Rigging (INHOUSE)
    INSERT INTO "courses" (
        "id", "code", "name", "category", "certification", "durationValue", "durationUnit",
        "description", "priceRegular", "priceEarlyBird", "priceGroup", "currency",
        "featured", "status", "totalEnrollments", "ratingAverage", "ratingCount",
        "createdAt", "updatedAt"
    ) VALUES (
        '91ad6c7c-ca85-40f3-ad02-af9f7829db62'::uuid,
        'DI-IH-115',
        'Operator Slinging and Rigging',
        'inhouse',
        'GENERAL',
        3,
        'days',
        'Training course: Operator Slinging and Rigging',
        1000000,
        800000,
        700000,
        'IDR',
        false,
        'active',
        0,
        0.00,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT ("code") DO NOTHING;

    v_courseCount := v_courseCount + 1;


    RAISE NOTICE 'Course seeding completed!';
    RAISE NOTICE 'Total courses inserted: %', v_courseCount;
END $$;

-- Verify results
SELECT 'Total Courses' as info, COUNT(*) as count FROM "courses";
SELECT category, COUNT(*) as count FROM "courses" GROUP BY category;
SELECT "code", "name", "category" FROM "courses" ORDER BY "code" LIMIT 30;

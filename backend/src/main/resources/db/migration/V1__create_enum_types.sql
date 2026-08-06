CREATE TYPE relationship_type  AS ENUM
(
    'PREREQUISITE',
    'PROGRESSION',
    'ALTERNATIVE'
);

CREATE TYPE user_workspace_role AS ENUM
(
    'ADMIN',
    'COACH',
    'CLIENT'
);

CREATE TYPE user_workspace_status AS ENUM
(
  'PENDING',
  'ACTIVE',
  'SUSPENDED',
  'REMOVED'
);

CREATE TYPE phase_status AS ENUM
(
  'PLANNED',
  'ACTIVE',
  'COMPLETED',
  'ARCHIVED'
);

CREATE TYPE weekday AS ENUM
(
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY'
);

CREATE TYPE session_status AS ENUM
(
  'PLANNED',
  'COMPLETED',
  'SKIPPED'
);

CREATE TYPE media_type AS ENUM
(
  'VIDEO',
  'IMAGE',
  'PDF'
);

CREATE TYPE media_purpose AS ENUM
(
  'DEMONSTRATION',
  'SIDE_VIEW',
  'FRONT_VIEW',
  'BACK_VIEW',
  'REFERENCE',
  'COMMON_MISTAKE'
);

CREATE TYPE user_status AS ENUM (
    'ACTIVE',
    'INACTIVE',
    'DELETED'
)
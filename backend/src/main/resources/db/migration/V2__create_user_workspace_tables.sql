CREATE TABLE "users" (
  "user_id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  "first_name" varchar (255) NOT NULL,
  "last_name" varchar (255) NOT NULL,

  "email" varchar (255) NOT NULL UNIQUE,
  "password" varchar (255) NOT NULL,

  "status" user_status NOT NULL DEFAULT 'ACTIVE',

  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "workspace" (
  "workspace_id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "workspace_name" varchar (255) NOT NULL
);

CREATE TABLE "user_workspace" (
  "user_workspace_id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" uuid NOT NULL,
  "workspace_id" uuid NOT NULL,
  "role" user_workspace_role NOT NULL,
  "status" user_workspace_status NOT NULL,
  "joined_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    FOREIGN KEY ("user_id")
      REFERENCES "users"("user_id"),
    FOREIGN KEY ("workspace_id")
      REFERENCES "workspace"("workspace_id"),
  UNIQUE("user_id", "workspace_id", "role")
);
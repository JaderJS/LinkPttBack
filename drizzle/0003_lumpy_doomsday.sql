CREATE TABLE IF NOT EXISTS "storages" (
	"id" serial PRIMARY KEY NOT NULL,
	"file_path" text NOT NULL,
	"blob" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"created_by" text NOT NULL
);

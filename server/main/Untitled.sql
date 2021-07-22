CREATE TABLE "users" (
  "user_id" SERIAL PRIMARY KEY,
  "name" varchar UNIQUE,
  "phone" varchar,
  "email" varchar
);

CREATE TABLE "addr" (
  "addr_id" SERIAL PRIMARY KEY,
  "user_id" int REFERENCES users(user_id),
  "street" varchar,
  "city" varchar,
  "state" varchar,
  "zipcode" varchar
);

CREATE TABLE "invoice" (
	"invoice_id" SERIAL PRIMARY KEY,
	"user_id" int REFERENCES users(user_id),
	"created_date" date,
	"due_date" date,
	"labor_cost" float,
	"total_due" float
);

CREATE TABLE "details" (
	"detail_id" SERIAL PRIMARY KEY,
	"invoice_id" int REFERENCES invoice(invoice_id),
	"descr" varchar,
	"rate" float,
	"qty" int
);

CREATE TABLE "materials" (
  "material_id" SERIAL PRIMARY KEY,
  "invoice_id" int REFERENCES invoice(invoice_id),
  "item" varchar,
  "count" int,
  "cost" float
);

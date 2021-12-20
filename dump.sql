CREATE TYPE type_test AS ENUM ('P1', 'P2', 'P3', '2ch', 'PF', 'Outra');

CREATE TABLE "tests" (
	"id" serial NOT NULL,
	"year" integer NOT NULL CHECK ("year" BETWEEN 2015 AND date_part('year', now())),
	"semester" integer NOT NULL CHECK ("semester" = 1 OR "semester" = 2),
	"type" type_test NOT NULL,
	"link" varchar(510) NOT NULL,
	"teacher_id" integer NOT NULL,
	"class_id" integer NOT NULL,
	CONSTRAINT "tests_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "teachers" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "teachers_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "courses" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "courses_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "classes" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"period" integer NOT NULL CHECK ("period" BETWEEN 1 AND 10),
	CONSTRAINT "classes_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "teachers_courses" (
	"id" serial NOT NULL,
	"teacher_id" integer NOT NULL,
	"course_id" integer NOT NULL,
	CONSTRAINT "teachers_courses_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "classes_courses" (
	"id" serial NOT NULL,
	"class_id" integer NOT NULL,
	"course_id" integer NOT NULL,
	CONSTRAINT "classes_courses_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "tests" ADD CONSTRAINT "tests_fk0" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id");
ALTER TABLE "tests" ADD CONSTRAINT "tests_fk1" FOREIGN KEY ("class_id") REFERENCES "classes"("id");

ALTER TABLE "teachers_courses" ADD CONSTRAINT "teachers_courses_fk0" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id");
ALTER TABLE "teachers_courses" ADD CONSTRAINT "teachers_courses_fk1" FOREIGN KEY ("course_id") REFERENCES "courses"("id");

ALTER TABLE "classes_courses" ADD CONSTRAINT "classes_courses_fk0" FOREIGN KEY ("class_id") REFERENCES "classes"("id");
ALTER TABLE "classes_courses" ADD CONSTRAINT "classes_courses_fk1" FOREIGN KEY ("course_id") REFERENCES "courses"("id");

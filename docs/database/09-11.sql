-- Adminer 4.7.7 PostgreSQL dump

DROP TABLE IF EXISTS "tb_filial";
CREATE TABLE "public"."tb_filial" (
    "id_filial" integer NOT NULL,
    "nome" character varying(255) NOT NULL,
    CONSTRAINT "tb_filial_pkey" PRIMARY KEY ("id_filial")
) WITH (oids = false);

INSERT INTO "tb_filial" ("id_filial", "nome") VALUES
(1,	'Santos'),
(2,	'São Paulo');

DROP TABLE IF EXISTS "tb_users";
DROP SEQUENCE IF EXISTS tb_users_id_user_seq;
CREATE SEQUENCE tb_users_id_user_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

CREATE TABLE "public"."tb_users" (
    "id_user" integer DEFAULT nextval('tb_users_id_user_seq') NOT NULL,
    "nome" character varying(255) NOT NULL,
    "email" character varying(255) NOT NULL,
    "senha" character varying(255) NOT NULL,
    "id_filial" integer NOT NULL,
    CONSTRAINT "tb_users_id_filial_fkey1" FOREIGN KEY (id_filial) REFERENCES tb_filial(id_filial) NOT DEFERRABLE
) WITH (oids = false);

INSERT INTO "tb_users" ("id_user", "nome", "email", "senha", "id_filial") VALUES
(8,	'Kaique', 'souzaifoas@fasofkasw',	'joaozin',	1);

-- 2020-11-08 23:50:22.072491+00
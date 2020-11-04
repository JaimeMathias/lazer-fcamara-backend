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
CREATE TABLE "public"."tb_users" (
    "id_user" integer NOT NULL,
    "nome" character varying(255) NOT NULL,
    "email" character varying(255) NOT NULL,
    "senha" character varying(255) NOT NULL,
    "id_filial" integer NOT NULL,
    CONSTRAINT "tb_users_pkey" PRIMARY KEY ("id_user"),
    CONSTRAINT "tb_users_id_filial_fkey" FOREIGN KEY (id_filial) REFERENCES tb_filial(id_filial) NOT DEFERRABLE
) WITH (oids = false);

INSERT INTO "tb_users" ("id_user", "nome", "email", "senha", "id_filial") VALUES
(1,	'Joao Guilherm',	'jgsouza@fcamara.com.br',	'noenoenoe',	2);

-- 2020-11-04 00:43:17.466775+00


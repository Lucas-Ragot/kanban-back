/* 
  je fais une transaction, soit tout se fera s'il n'y a pas de soucis
  soit rien du tout s'il y a un soucis

  Donc pour utiliser ce fichier j'ai
  - créé un user et une database en tant que postgres
  - executé le fichier de création
*/

BEGIN; -- début de la transaction

DROP TABLE IF EXISTS "list", "card", "label", "card_has_label";

CREATE TABLE "list" (
  "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "name" VARCHAR(255) NOT NULL,
  "position" SMALLINT NOT NULL DEFAULT 0,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "card" (
  "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "title" VARCHAR(255) NOT NULL,
  "description" TEXT,
  "color" VARCHAR(30),
  "position" SMALLINT NOT NULL DEFAULT 0,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ,
  "list_id" INTEGER NOT NULL REFERENCES "list"("id") ON DELETE CASCADE
);

CREATE TABLE "label" (
  "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "title" VARCHAR(255) NOT NULL,
  "color" VARCHAR(30),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "card_has_label" (
  "card_id" INTEGER NOT NULL REFERENCES "card"("id") ON DELETE CASCADE,
  "label_id" INTEGER NOT NULL REFERENCES "label"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("card_id", "label_id") -- on crée une clé composite, une clé composée de plusieurs colonnes, ça garantit l'unicité de la combinaison
);

-- seeding

INSERT INTO "list" ("name", "position") -- on précise les colonnes qu'on va renseigner
  VALUES 
    ('A faire', 10),
    ('Terminé', 32),
    ('Important', 58); -- on insère ici plusieurs lignes d'un coup

INSERT INTO "card" ("title", "color", "description", "position", "list_id")
  VALUES
    ('Faire les courses', '#f90', 'penser à prendre du pain', 0, 2),
    ('Apprendre un nouveau langage', 'green', NULL, 1, 2);

INSERT INTO "label" ("title", "color")
  VALUES 
    ('urgent', 'red'),
    ('idée', 'yellow');

INSERT INTO "card_has_label" ("card_id", "label_id")
  VALUES
    (1, 1),
    (2, 1),
    (2, 2);

COMMIT; -- fin de la transaction
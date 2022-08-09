# MLD

- On part du MCD puisque le MLD en découle
- On ajoute les clés primaires et étrangères
- On traduit les associations :
  - oneToMany : une clé étrangère côté 1
  - manyToMany : une table d'association avec 2 clés étrangères
- On ajoute tant qu'à faire les colonnes created_at et updated_at

Ce qui donne :

- list (<span style="text-decoration: underline">id</span>, name, position, created_at, updated_at)
- card (<span style="text-decoration: underline">id</span>, title, description, color, position, created_at, updated_at, #list_id)
- label (<span style="text-decoration: underline">id</span>, title, color, created_at, updated_at)
- card_has_label (#card_id, #label_id, created_at)

## MPD

Le MPD c'est ce qui va nous servir pour le script de création de la BDD car c'est en fait le Modèle Physique de Données. On reprend toutes les infos du MLD en ajoutant les types et les contraintes

```txt
list
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  position SMALLINT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ
card
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  description TEXT,
  color TEXT,
  position SMALLINT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ,
  list_id INTEGER NOT NULL REFERENCES list(id) ON DELETE CASCADE
label
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  color TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ
card_has_label
  card_id INTEGER NOT NULL REFERENCES card(id) ON DELETE CASCADE,
  label_id INTEGER NOT NULL REFERENCES label(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
```

On peut noter le `ON DELETE CASCADE` qui a pour effet de supprimer une ligne faisant référence à une autre quand l'autre est supprimée. Par exemple ici nos cartes sont associées à une liste, si la liste est supprimée, les cartes associées le sont aussi automatiquement.

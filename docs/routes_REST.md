# Routes REST

Quand on parle d'api REST on parle d'api web qui exploitent le protocole HTTP pour mettre à disposition des choses.

On va associer chaque opération de base du CRUD (create read update delete) à une method http: GET (read), POST (create), PATCH (update), DELETE (delete)

| URL | GET | POST | PATCH | DELETE |
|---|---|---|---|---|
| /lists | récupérer toutes les listes | créer une liste | mettre à jour toutes les listes(ne pas faire !) | supprimer toutes les listes(ne pas faire!) |
| /lists/:id | récupérer UNE liste via son ID | créer une listes en fixant son id d'avance (NE PAS FAIRE!) | mettre à jour une liste via son ID | supprimer une liste via son ID |
| /cards | récupérer toutes les cates | créer une carte | mettre à jour toutes les cartes(ne pas faire !) | supprimer toutes les cartes(ne pas faire!) |
| /cards/:id | récupérer UNE carte via son ID | créer une carte en fixant son id d'avance (NE PAS FAIRE!) | mettre à jour une carte via son ID | supprimer une carte via son ID |
| /tags| récupérer tous les labels | créer un label | mettre à jour tous les labels(ne pas faire !) | supprimer tous les labels(ne pas faire!) |
| /tags/:id | récupérer UN label via son ID | créer un label en fixant son id d'avance (NE PAS FAIRE!) | mettre à jour un label via son ID | supprimer un label via son ID |

Avec express on sait gérer des routes en get et en post, bah en fait pour patch et delete c'est pareil

```js
router.get('/chemin', methodeDeController);
router.post('/chemin', methodeDeController);
router.patch('/chemin', methodeDeController);
router.delete('/chemin', methodeDeController);

// mais du coup on fait quoi dans les méthodes controller ?

// pour chaque on traduit la demande
router.delete('/users', methodeController);

// ici methodeController ressemblerait à ça
function methodeController(req, res) {
    // elle traduit la demande
    // on va faire appel au model user pour aller supprimer les users par exemple
    // on envoit une réponse pour dire ce qu'on a fait
    // res.json(....) // https://expressjs.com/en/4x/api.html#res.json
}
```

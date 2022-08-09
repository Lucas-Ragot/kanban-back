const express = require('express');
const listController = require('./controllers/listController');
const cardController = require('./controllers/cardController');
const labelController = require('./controllers/labelController');
const mainController = require('./controllers/mainController');

const router = express.Router();

router.get('/lists', listController.readAll);
router.post('/lists', listController.create);
router.get('/lists/:id', listController.readOne);
router.patch('/lists/:id', listController.update);
router.delete('/lists/:id', listController.delete);
// on peut aussi faire une route pour chaque entité en PUT
// on rend l'id optionnel, avec PUT on dit
// si on a un id : on met à jour l'instance possédant cet id
// si on n'a pas d'id on crée une nouvelle instance, ça revient au meme que PATCH et POST
// pour un paramètre optionnel on met ?
router.put('/lists/:id?', listController.createOrUpdate);


// Card
router.get('/cards', cardController.list);
router.post('/cards', cardController.create);
router.get('/cards/:id', cardController.read);
router.patch('/cards/:id', cardController.update);
router.delete('/cards/:id', cardController.delete);
router.put('/cards/:id?', cardController.createOrUpdate);

// Label
router.get('/labels', labelController.list);
router.post('/labels', labelController.create);
router.get('/labels/:id', labelController.read);
router.patch('/labels/:id', labelController.update);
router.delete('/labels/:id', labelController.delete);
router.put('/labels/:id?', labelController.createOrUpdate);

// Routes complémentaires
router.post('/cards/:card_id/label/:label_id', cardController.addLabelToCard);
router.delete('/cards/:card_id/label/:label_id', cardController.removeLabelFromCard);
router.get('/lists/:id/cards', listController.readCards);

// Et la 404 tant qu'à faire
router.use(mainController.notFound);

module.exports = router;

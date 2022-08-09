const {
  Card,
  Label
} = require('../models');

const cardController = {
  // lire toutes les cartes
  list: async (req, res) => {
    try {
      // récupèrer les cartes
      const cards = await Card.findAll({
        include: 'labels',
        order: [
          ['position', 'ASC'],
        ],
      });
      // envoyer une réponse
      res.json(cards);
    } catch (error) {
      console.trace(error);
      res.status(500).json({
        message: 'Erreur'
      });
    }
  },
  // créer une carte
  create: async (req, res) => {
    try {
      // gérer les champs obligatoire
      if (!req.body.title) {
        // pour tomber dans le catch, on peut jeter une erreur
        throw new Error('title obligatoire');
      }
      if (!req.body.list_id) {
        throw new Error('list_id obligatoire');
      }
      // créer la carte
      const newCard = await Card.create({
        title: req.body.title,
        color: req.body.color,
        description: req.body.description,
        position: req.body.position,
        list_id: req.body.list_id,
      });
      // envoyer une réponse
      res.json(newCard);
    } catch (error) {
      console.trace(error);
      res.status(500).json({
        message: 'Erreur'
      });
    }
  },
  // lire une carte
  read: async (req, res) => {
    try {
      // récupérer l'id demandé
      const id = req.params.id;
      // trouver la carte
      const card = await Card.findByPk(id, {
        include: 'labels',
        order: [
          ['position', 'ASC']
        ],
      });
      // si tout va bien on donne la carte
      if (card) {
        res.json(card);
      }
      // sinon on donne une erreur
      else {
        res.status(404).json(`Aucune carte à l'id ${id}`);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json({
        message: 'Erreur'
      });
    }
  },
  // mettre à jour une carte
  update: async (req, res) => {
    try {
      // récupérer l'id demandé
      const id = req.params.id;
      // trouver la carte
      const card = await Card.findByPk(id);
      // si tout va bien on modifie
      if (card) {
        // mettre à jour la carte avec les infos passées
        // si on nous a renseigné un champ, on le modifie
        if (req.body.title) {
          card.title = req.body.title;
        }
        if (req.body.color) {
          card.color = req.body.color;
        }
        if (req.body.description) {
          card.description = req.body.description;
        }
        if (req.body.position) {
          card.position = req.body.position;
        }
        if (req.body.list_id) {
          card.list_id = req.body.list_id;
        }
        // sauvegarder en bdd
        const cardSaved = await card.save();
        // envoyer une réponse
        res.json(cardSaved);
      }
      // sinon on donne une erreur
      else {
        res.status(404).json(`Aucune carte à l'id ${id}`);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json({
        message: 'Erreur'
      });
    }
  },
  // supprimer une carte
  delete: async (req, res) => {
    try {
      // récupérer l'id demandé
      const id = req.params.id;
      // trouver la carte
      const card = await Card.findByPk(id);
      // si on trouve
      if (card) {
        // on supprime
        await card.destroy();
        res.json('Carte supprimée');
      }
      // sinon on donne une erreur
      else {
        res.status(404).json(`Aucune carte à l'id ${id}`);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json({
        message: 'Erreur'
      });
    }
  },
  // association de label
  addLabelToCard: async (req, res) => {
    try {
      // récupération des id
      const cardId = req.params.card_id;
      const labelId = req.params.label_id;
      // on récupère la carte
      const card = await Card.findByPk(cardId, {
        include: 'labels'
      });
      if (!card) {
        return res.status(404).json('Carte non trouvée');
      }
      // on récupère le label
      const label = await Label.findByPk(labelId);
      if (!label) {
        return res.status(404).json('Label non trouvé');
      }
      // on ajoute le label à la carte grâce à sequelize, voir
      // https://sequelize.org/master/manual/assocs.html#-code-foo-belongstomany-bar----through--baz-----code-
      await card.addLabel(label);
      // on doit recharger le carte si on veut voir la modification dans notre réponse
      await card.reload();
      // on envoit la réponse
      res.json(card);
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },
  // dissociation de label
  removeLabelFromCard: async (req, res) => {
    try {
      // récupération des id
      const cardId = req.params.card_id;
      const labelId = req.params.label_id;
      // on récupère la carte
      const card = await Card.findByPk(cardId, {
        include: 'labels'
      });
      if (!card) {
        return res.status(404).json('Carte non trouvée');
      }
      // on récupère le label
      const label = await Label.findByPk(labelId);
      if (!label) {
        return res.status(404).json('Label non trouvé');
      }
      // on retire le label à la carte grâce à sequelize
      await card.removeLabel(label);
      // on doit recharger le carte si on veut voir la modification dans notre réponse
      await card.reload();
      // on envoit la réponse
      res.json(card);
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },
  createOrUpdate: async (req, res) => {
    try {
      // on essaye de récupérer la carte en fonction de l'id éventuel
      let card;
      if (req.params.id) {
        card = await Card.findByPk(req.params.id);
      }
      // si on connait cette carte
      if (card) {
        // on met à jour
        await cardController.update(req, res);
      } else {
        // sinon on crée
        await cardController.create(req, res);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },
};

module.exports = cardController;
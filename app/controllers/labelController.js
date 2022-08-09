const {
  Label
} = require('../models');

const labelController = {
  // lire toutes les labels
  list: async (req, res) => {
    try {
      // récupèrer les labels
      const labels = await Label.findAll();
      // envoyer une réponse
      res.json(labels);
    } catch (error) {
      console.trace(error);
      res.status(500).json({
        message: 'Erreur'
      });
    }
  },
  // créer un label
  create: async (req, res) => {
    try {
      // gérer les champs obligatoire
      if (!req.body.title) {
        throw new Error('title obligatoire');
      }
      // créer le label
      const newLabel = await Label.create({
        title: req.body.title,
        color: req.body.color,
      });
      // envoyer une réponse
      res.json(newLabel);
    } catch (error) {
      console.trace(error);
      res.status(500).json({
        message: 'Erreur'
      });
    }
  },
  // lire un label
  read: async (req, res) => {
    try {
      // récupérer l'id demandé
      const id = req.params.id;
      // trouver le label
      const label = await Label.findByPk(id);
      // si tout va bien on donne le label
      if (label) {
        res.json(label);
      }
      // sinon on donne une erreur
      else {
        res.status(404).json(`Aucun label à l'id ${id}`);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json({
        message: 'Erreur'
      });
    }
  },
  // mettre à jour un label
  update: async (req, res) => {
    try {
      // récupérer l'id demandé
      const id = req.params.id;
      // trouver le label
      const label = await Label.findByPk(id);
      // si tout va bien on modifie
      if (label) {
        // mettre à jour le label avec les infos passées
        // si on nous a renseigné un champ, on le modifie
        if (req.body.title) {
          label.title = req.body.title;
        }
        if (req.body.color) {
          label.color = req.body.color;
        }
        // sauvegarder en bdd
        const labelSaved = await label.save();
        // envoyer une réponse
        res.json(labelSaved);
      }
      // sinon on donne une erreur
      else {
        res.status(404).json(`Aucun label à l'id ${id}`);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json({
        message: 'Erreur'
      });
    }
  },
  // supprimer un label
  delete: async (req, res) => {
    try {
      // récupérer l'id demandé
      const id = req.params.id;
      // trouver le label
      const label = await Label.findByPk(id);
      // si on trouve
      if (label) {
        // on supprime
        await label.destroy();
        res.json('Label supprimé');
      }
      // sinon on donne une erreur
      else {
        res.status(404).json(`Aucun label à l'id ${id}`);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json({
        message: 'Erreur'
      });
    }
  },
  createOrUpdate: async (req, res) => {
    try {
      // on essaye de récupérer le label en fonction de l'id éventuel
      let label;
      if (req.params.id) {
        label = await Label.findByPk(req.params.id);
      }
      // si on connait ce label
      if (label) {
        // on met à jour
        await labelController.update(req, res);
      } else {
        // sinon on crée
        await labelController.create(req, res);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },
};

module.exports = labelController;
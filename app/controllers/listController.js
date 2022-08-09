// // je récupère un objet contenant chaque modele en propriété
// const models = require('../models');
// // je mémorise le modèle qui m'intéresse dans une constant
// const List = models.List;
// // ou en 1 fois avec du destructuring
// // on recupère une propriété de l'objet directement dans une constante
const {
  List
} = require('../models');

const listController = {
  readAll: async function (req, res) {
    try {
      const results = await List.findAll({
        include: {
          association: 'cards',
          include: 'labels',
        },
        order: [
          ['position', 'ASC'],
          ['name', 'ASC'],
        ],
      });
      res.json(results);
    } catch (error) {
      // log pour moi développeur : un max de détail
      console.log(error);
      // reponse sans détail structuel pour le consommateur de ma bdd
      res.status(500).json({
        message: 'Erreur lors de la récupération des listes',
      });
    }
  },
  create: async function (req, res) {
    // on gère toujours le scénario d'erreur avec nos promesses
    try {
      // const name = req.body.name;
      // const position = req.body.position;
      const {
        name,
        position
      } = req.body;

      // on peut valider les données qu'on reçoit et prévoir une réponse custom
      if (!name) {
        res.status(400).json({
          message: 'Le champ name est obligatoire',
        });
      } else {
        // create revient au même que build + save
        const newList = await List.create({
          name: name,
          position: position,
        });
        res.json(newList);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Erreur lors de la création de la liste',
      });
    }
  },
  readOne: async function (req, res) {
    try {
      // je vais récupérer les infos d'une liste en fonction de son id
      // je pars de l'id demandé
      const id = req.params.id;
      // je trouve la liste en fonction de l'id
      const askedList = await List.findByPk(id);
      // si on a une liste on l'envoie, si on a rien on met l'erreur non trouvée
      if (askedList) {
        // console.log(askedList);
        // je vais envoyer une réponse HTTP contenant du json
        res.json(askedList);
      } else {
        res.status(404).json({
          message: 'Liste non trouvée',
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Erreur lors de la récupération de la liste',
      });
    }
  },
  update: async function (req, res) {
    try {
      // on pourrait utiliser update mais c'est plutôt pour prévu pour mettre à jour DES lignes
      // je pars de la demande
      const {
        id
      } = req.params;
      const {
        name,
        position
      } = req.body;
      if (!id) {
        res.status(400).json({
          message: 'Le champ id est obligatoire',
        });
      } else {
        // je vais trouver la ligne demandée
        const list = await List.findByPk(id);
        if (list) {
          // et la modifier
          if (name) {
            list.name = name;
          }
          if (position) {
            list.position = Number(position);
          }
          // et persister
          const listSaved = await list.save();
          res.json(listSaved);
        } else {
          res.status(404).json({
            message: 'La liste demandée n\'existe pas',
          });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Erreur lors de la mise à jour de la liste',
      });
    }
  },
  delete: async function (req, res) {
    try {
      const id = req.params.id;
      const list = await List.findByPk(id);
      // si on trouve la liste on la supprime
      if (list) {
        await list.destroy();
        res.json('Liste supprimée');
      }
      // sinon on envoie une réponse explicite pour dire qu'on a rien trouvé
      else {
        res.status(404).json(`Aucune liste à l'id ${id}`);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json({
        message: 'Erreur'
      });
    }
  }, // les cards d'une liste
  readCards: async (req, res) => {
    try {
      // on récupère l'id de la liste
      const id = req.params.id;
      // on récupère les cartes remplissant une condition
      const cards = await Card.findAll({
        where: {
          list_id: id,
        },
        include: 'labels'
      });
      // on renvoie les cartes
      res.json(cards);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },
  createOrUpdate: async (req, res) => {
    try {
      // on essaye de récupérer la liste en fonction de l'id éventuel
      let list;
      if (req.params.id) {
        list = await List.findByPk(req.params.id);
      }
      // si on connait cette liste
      if (list) {
        // on met à jour
        await listController.update(req, res);
      } else {
        // sinon on crée
        await listController.create(req, res);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },
};

module.exports = listController;
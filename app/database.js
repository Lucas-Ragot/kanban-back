// On importe la class Sequelize du module sequelize
const { Sequelize } = require('sequelize');

// je créé mon instance de sequelize pour me connecter à la bdd postgresql
const sequelize = new Sequelize(process.env.PG_URL, {
  define: {
    underscored: true, // ainsi sequelize utilisera le snake_case par défaut
  }
});

// puis je l'exporte
module.exports = sequelize;
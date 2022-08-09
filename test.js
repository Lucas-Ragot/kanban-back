require('dotenv').config();

const models = require('./app/models');

const doSomeTests = async () => {
  try {
    const results = await models.List.findAll({
      include: 'cards',
    });
    console.log(results);
    const test = await models.Card.findByPk(1, {
      include: ['list', 'labels'],
    });
    console.log(test);
  }
  catch (error) {
    console.trace(error);
  }
};

doSomeTests();

const Sequelize = require('sequelize');

var dbM2square = {};

const sequelize = new Sequelize('db391120_7', 'db391120_7', 'dq6)qbmKfPsr', {
  host: 'mysql5.m2square.eu',
  // port: '8889',
  dialect: 'mysql',
  define: {
    freezeTableName: true,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  // <http://docs.sequelizejs.com/manual/tutorial/querying.html#operators>
  operatorsAliases: false,
});

let models = [require('./models/wp_posts')];

// Initialize models
models.forEach((model) => {
  const seqModel = model(sequelize, Sequelize);
  dbM2square[seqModel.name] = seqModel;
});

// Apply associations
Object.keys(dbM2square).forEach((key) => {
  if ('associate' in dbM2square[key]) {
    dbM2square[key].associate(dbM2square);
  }
});

dbM2square.sequelize = sequelize;
dbM2square.Sequelize = Sequelize;

module.exports = dbM2square;

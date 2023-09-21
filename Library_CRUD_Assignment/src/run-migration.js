const { Umzug, SequelizeStorage } = require('umzug');
const Sequelize = require('sequelize');



const sequelize = new Sequelize('library_db', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  port:3306,
  dialectOptions: {
    SSL:{
      rejectUnauthorized:false
    }
  }
});


const umzug = new Umzug({
  migrations: { glob: './migrations/*.js' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

async function migrate() {
  try {
    await umzug.up();
  } 
  catch (error) {
  }
}

migrate();
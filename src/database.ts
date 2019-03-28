import * as Sequelize from 'sequelize'

const sequelize = new Sequelize('dbname', 'dbuser', 'dbpassword', {
  host: 'localhost',
  dialect: 'mysql',
  // dialect: 'mysql'|'sqlite'|'postgres'|'mssql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
})

export default sequelize

import { Sequelize } from 'sequelize';

// Connection for loginDB
export const loginDB = new Sequelize('loginDB', 'root', 'jb0606jbmysql', {
    host: 'localhost',
    dialect: 'mysql',
});



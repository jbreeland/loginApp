import { Sequelize } from 'sequelize';

// Connection for loginDB
export const loginDB = new Sequelize('loginDB', 'root', 'jb0606jbmysql', {
    host: 'localhost',
    dialect: 'mysql',
});

// Connection for Putts
export const puttsDB = new Sequelize('Putts', 'root', 'jb0606jbmysql', {
    host: 'localhost',
    dialect: 'mysql',
});

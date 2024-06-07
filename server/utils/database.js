import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('loginDB', 'root', 'jb0606jbmysql', {
    dialect: 'mysql',
    host: 'localhost', 
});

export default sequelize;
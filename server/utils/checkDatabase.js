import { loginDB, puttsDB } from './database.js';

const checkDatabase = async () => {
    try {
        // Check loginDB connection
        await loginDB.authenticate();
        console.log('Connection to loginDB has been established successfully.');

        const [loginResults] = await loginDB.query('SHOW TABLES');
        console.log('Tables in loginDB:', loginResults);

        for (const table of loginResults) {
            console.log('Table object keys:', Object.keys(table));
            const tableNameKey = Object.keys(table)[0];
            const tableName = table[tableNameKey];
            console.log(`Table name: ${tableName}`);
            const [columns] = await loginDB.query(`SHOW COLUMNS FROM ${tableName}`);
            console.log(`Columns in ${tableName}:`, columns);
        }

        // Check puttsDB connection
        await puttsDB.authenticate();
        console.log('Connection to puttsDB has been established successfully.');

        const [puttsResults] = await puttsDB.query('SHOW TABLES');
        console.log('Tables in puttsDB:', puttsResults);

        for (const table of puttsResults) {
            console.log('Table object keys:', Object.keys(table));
            const tableNameKey = Object.keys(table)[0];
            const tableName = table[tableNameKey];
            console.log(`Table name: ${tableName}`);
            const [columns] = await puttsDB.query(`SHOW COLUMNS FROM ${tableName}`);
            console.log(`Columns in ${tableName}:`, columns);
        }

        // Close the connections
        await loginDB.close();
        await puttsDB.close();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

checkDatabase();

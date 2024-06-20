import express from 'express';
import { loginDB, puttsDB } from './utils/database.js';
import router from './routes/routes.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(router);

const initializeDatabases = async () => {
    try {
        await loginDB.sync();
        await puttsDB.sync();
        console.log('Both databases have been synchronized successfully.');
    } catch (error) {
        console.error('Unable to synchronize the databases:', error);
    }
};

initializeDatabases();

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

const { CosmosClient } = require ("@azure/cosmos")
require('dotenv').config

const endpoint = process.env.COSMOS_DB_URI;
const key = process.env.COSMOS_DB_KEY;
const databaseId = process.env.COSMOS_DB_DATABASE;
const containerId = process.env.COSMOS_DB_CONTAINER;

const cosmosClient = new CosmosClient({ endpoint, key });

module.exports = async function (context, req) {
    context.log('Processing GetTransactions request...');

    // CORS headers 
    context.res = { 
        headers: { 
            'Access-Control-Allow-Origin': '*', 
            'Access-Control-Allow-Methods': 'GET, POST, DELETE', 
            'Access-Control-Allow-Headers': 'Content-Type' 
        } 
    };

    try {
        const { resources: transactions } = await cosmosClient
            .database(databaseId)
            .container(containerId)
            .items.query('SELECT * from c')
            .fetchAll();

        context.res = { 
            ...context.res, 
            status: 200, 
            body: transactions 
        };
    } catch (error) {
        context.log.error("Error while fetching the transactions: ", error);
        context.res = {
            ...context.res,
            status: 500,
            body: "Error fetching transactions: " + error.message
        };
    }
};
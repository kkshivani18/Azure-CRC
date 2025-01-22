const { CosmosClient } = require("@azure/cosmos");
require('dotenv').config();

const endpoint = process.env.COSMOS_DB_URI;
const key = process.env.COSMOS_DB_KEY;
const databaseId = process.env.COSMOS_DB_DATABASE;
const containerId = process.env.COSMOS_DB_CONTAINER;

const cosmosClient = new CosmosClient({ endpoint, key });

module.exports = async function (context, req) {
    context.log('Processing DeleteExpense request...');

    // CORS headers
    context.res = {
        headers: {
            'Access-Control-Allow-Origin': '*', 
            'Access-Control-Allow-Methods': 'GET, POST, DELETE', 
            'Access-Control-Allow-Headers': 'Content-Type' 
        }
    };

    const { id } = req.body;
    if (!id) {
        context.res = {
            ...context.res,
            status: 400,
            body: "Transaction ID is required."
        };
        return;
    }

    try {
        const { resource: deletedTransaction } = await cosmosClient
            .database(databaseId)
            .container(containerId)
            .item(id, id) 
            .delete();

        context.res = {
            ...context.res,
            status: 200,
            body: deletedTransaction
        };

    } catch (error) {
        context.log.error("Error while deleting the transaction: ", error);
        context.res = {
            ...context.res,
            status: 500,
            body: "Error deleting transaction: " + error.message
        };
    }
};

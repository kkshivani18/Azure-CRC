const { CosmosClient } = require("@azure/cosmos");
require('dotenv').config();

const endpoint = process.env.COSMOS_DB_URI;
const key = process.env.COSMOS_DB_KEY;
const databaseId = process.env.COSMOS_DB_DATABASE;
const containerId = process.env.COSMOS_DB_CONTAINER;

const cosmosClient = new CosmosClient({ endpoint, key });

module.exports = async function (context, req) {
    context.log('Processing AddExpense request...');

    // Set CORS headers
    context.res = {
        headers: {
            'Access-Control-Allow-Origin': '*', 
            'Access-Control-Allow-Methods': 'GET, POST, DELETE', 
            'Access-Control-Allow-Headers': 'Content-Type' 
        }
    };

    if (!req.body) {
        context.res = {
            ...context.res,
            status: 400,
            body: "No request body found."
        };
        return;
    }

    const { text, amount } = req.body;
    context.log("Request Body:", req.body); 

    if (!text || !amount) {
        context.res = {
            ...context.res,
            status: 400,
            body: "Description and amount are required fields."
        };
        return;
    }

    try {
        const newTransaction = {
            id: Math.floor(Math.random() * 1000000).toString(),
            text,
            amount: parseFloat(amount)
        };

        const { resource: createdTransaction } = await cosmosClient
            .database(databaseId)
            .container(containerId)
            .items.create(newTransaction);

        context.log("Created Transaction:", createdTransaction); 

        context.res = {
            ...context.res,
            status: 200,
            body: createdTransaction
        };

    } catch (error) {
        context.log.error("Error while adding the transaction: ", error);
        context.res = {
            ...context.res,
            status: 500,
            body: "Error adding transaction: " + error.message
        };
    }
};

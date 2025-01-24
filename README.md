# Azure-Expense-Tracker

## Overview
- The Azure Expense Tracker is a cloud-based web application designed to help users track their expenses. 
- The project replicates the concepts and learning goals of a cloud-centric challenge by integrating a scalable frontend, serverless backend and a cloud database.

## Project Structure
- Frontend:
    - Built with React for creating a responsive user interface.
    - Handles user input for logging and visualizing expenses.
    - Deployed using Azure Static Web Apps.

- Backend:
    - Serverless architecture powered by Azure Functions.
    - Provides REST APIs for:
        - Getting expenses.
        - Adding expense data.
        - Deleting expense data. 
        - Generating graph for visualization.

- Database:
    - Azure Cosmos DB for scalable and flexible storage.
    - Stores expense records with fields such as description and amount.

- IaC:
    - Using Terraform, I was able to automate the provisioning of Azure resources like Azure Functions, Cosmos DB, Service Plan, Storage Account and Static Web App. 
    - It is particularly useful for structuring the configurations for Azure resources and other cloud providers with Terraform. 

- Deployment:
    - CI/CD pipeline set up using GitHub Actions.
    - Automates building, testing and deploying the frontend and backend.


- Technologies Used:
    - Frontend: React, tailwind CSS, Chart.js
    - Backend: Azure Functions (Node.js)
    - Database: Azure Cosmos DB
    - IaC: Terraform 
    - CI/CD: GitHub Actions

## Steps  

### Step 1 - **Frontend Development**
- Developed a static website with React and Chart.js (for Doughnut Chart). 
- Features include:
    - Displays Balance amount, Income and Expenses.
    - Visualizes the income and expenses in the form of Doughnut Chart. 
    - Displays the Previous Transactions. 
    - Adds a new Transaction. 
    - Deletion of a Transaction. 
    
    ![expense tracker](<./images/website.png>)  

### Step 2 - **Creating Azure CosmosDB with Terraform**
- Automated the creation of an Azure CosmosDB instance using Infrastructure as Code (IaC) with Terraform. 
- Install Terraform.
- Authenticate Terraform with Azure using az login or a Service Principal.
- Create a working directory for Terraform files.
- Define Terraform variables: Define variables in a variables.tf file for reusability and flexibility. 
- Create CosmosDB Account: Configure CosmosDB with the NoSQL API.
- Deploying the CosmosDB Resource
    - Initialize Terraform: Run `terraform init` to download the necessary provider plugins.
    - Plan the Deployment: Execute `terraform plan` to preview the changes Terraform will apply to your Azure subscription.        
    - Apply the Configuration: Use `terraform apply` to create the CosmosDB instance. Confirm the action when prompted.

        ![Deployment of Azure CosmosDB with Terraform](<./images/terraform apply.png>)

- Verify Deployment:
    - Go to the Azure portal.
    - Navigate to the expense-tracker resource group.
    - Check for the CosmosDB account (expense-tracker-db).

        ![After Deployment of CosmosDB on Azure](<./images/cosmosdb creation.png>)

    *Note*
    - Troubleshooting - For cosmosdb creation. Tried to do with terraform. The issue appears to be regional issue. 
        ![Deployment issue with cosmosdb with terraform](<./images/cosmosdb_deployment_error.png>)
    - Solution: Tried it again and again and it worked.  


### Step 3 - **Integrating Backend APIs via Azure Functions for Transaction Management in CosmosDB**   
- Set Up Azure Functions Project
    - Install Azure Functions Tools
        ```bash
        npm install -g azure-functions-core-tools@4 --unsafe-perm true
        ```
    - Create a new Azure Functions Project and initialise it
        ```bash
        func init --worker-runtime node
        ```    
    - Add HTTP Trigger Functions
        ```bash
        func new
        ```
        ![func new](<./images/func new.png>)  

        ![HTTP Trigger](<./images/http trigger.png>)

    **AddExpense API**
    ![Add Expense](<./images/AddTransaction.png>)  

    ![AddTransaction localhost API](<./images/AddTransaction localhost API.png>)

    **GetExpenses**  
    ![GetExpense](<./images/GetExpense.png>)  
    ![GetExpense website API use](<./images/GetExpense site.png>)

    **DeleteExpense**  
    ![DeleteExpense Icon](<./images/DeleteExpense Icon.png>)  

    ![DeleteExpense CosmosDB](<./images/DeleteExpense CosmosDB.png>)

    **Deleting the particular transaction**
    ![DeleteExpense](<./images/DeleteExpense.png>)  

    ![After using DeleteExpense](<./images/after using DeleteExpense.png>)  

- Use the already created CosmosDB in Azure, add environment variables like COSMOS_DB_CONNECTION_STRING to `local.settings.json`. 
- Code the backend APIs with Azure functions and deploy it logging in to Azure CLI. 
    ```bash
    az login
    ```
    - For deploying Azure functions from local to Azure
    ```bash
    func azure functionapp publish <FunctionAppName>
    ```
    - To test the functions locally, use the below command. Else you can use Postman for testing the APIs. 
    ```bash
    func start 
    ```
    ![Backend API integration with CosmosDB](<./images/backend int with cosmosdb.png>)  

    *Note*
    - Troubleshooting - While coding and integrating frontend and backend with CosmosDB, I faced certain issue. 
    - CORS error solved by including the react application localhost in local.settings.json file.
        - Used with the help of - [How to configure CORS in Azure function app? - Stack Overflow](https://stackoverflow.com/questions/70265255/how-to-configure-cors-in-azure-function-app).  
        - Some unauthorized key issue - [troubleshoot-unauthorized](https://learn.microsoft.com/en-us/azure/cosmos-db/nosql/troubleshoot-unauthorized). I just added the primary key instead of the primary connection string.   
        - [node.js - Decoding the response body from azure functions - Stack Overflow](https://stackoverflow.com/questions/39842944/decoding-the-response-body-from-azure-functions).  

- Integrate, frontend and backend APIs using axios in react for fetching transactions. Also code and deploy Azure Functions, Azure Storage account, Azure Service plan using Terraform.  

    *Note*
    - Troubleshooting - While deploying Azure functions on Azure, I faced certain issues.     
    ![func worker runtime error](<./images/funcs error runtime.png>)  
    ![func runtime not updated](<./images/func runtime not updated.png>)  
    ```bash
	az functionapp config appsettings set --resource-group expense-tracker --name expense-tracker-functions --settings FUNCTIONS_WORKER_RUNTIME=node
    ```  
    - To verify the WORKER_RUNTIME is updated, restart it
    ```bash
	az functionapp restart --resource-group expense-tracker --name expense-tracker-functions
    ```  
    ```bash
    az functionapp config appsettings list --resource-group expense-tracker --name expense-tracker-functions
    ```
    ![func runtime updated](<./images/func runtime updated.png>)  

    - Deploying Azure Functions via Azure CLI  
    ![deploying Azure Functions via Azure CLI ](<./images/deploying the azure funcs with Azure CLI.png>)  

    - FUNCTIONS_WORKER_RUNTIME succesfully updated. 
    ![FUNCTIONS_WORKER_RUNTIME succesfully updated](<./images/az funcs runtime updated.png>)  

    ![FUNCTIONS_WORKER_RUNTIME succesfully updated http trigger](<./images/az funcs runtime updated 2.png>)

- Implement Azure Functions to enable transactions to add, delete and get transactions from CosmosDB. The functions will act as the bridge between the React frontend and the database.

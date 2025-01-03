# Azure-Expense-Tracker

## Overview
- The Azure Expense Tracker is a cloud-based web application designed to help users track their expenses. 
- The project replicates the concepts and learning goals of a cloud-centric challenge by integrating a scalable frontend, serverless backend, and a cloud database.

## Project Structure
- Frontend:
    - Built with React for creating a responsive user interface.
    - Handles user input for logging and visualizing expenses.
    - Deployed using Azure Static Web Apps.

- Backend:
    - Serverless architecture powered by Azure Functions.
    - Provides REST APIs for:
        - Logging expenses.
        - Retrieving categorized expense data.
        - Generating insights for visualization.

- Database:
    - Azure Cosmos DB for scalable and flexible storage.
    - Stores expense records with fields such as description and amount.

- Deployment:
    - CI/CD pipeline set up using GitHub Actions.
    - Automates building, testing, and deploying the frontend and backend.


- Technologies Used:
    - Frontend: React, CSS, Chart.js
    - Backend: Azure Functions (Node.js)
    - Database: Azure Cosmos DB
    - CI/CD: GitHub Actions

## Steps

- Step 1 - **Frontend Development**
    - Developed a static website with React and Chart.js (for Doughnut Chart). 
    - Features include:
        - Displays Balance amount, Income and Expenses.
        - Visualizes the income and expenses in the form of Doughnut Chart. 
        - Displays the Previous Transactions. 
        - Adds a new Transaction. 
    
    ![expense tracker](<./images/website.png>)

- Step 2 - **Creating Azure CosmosDB with Terraform**
    - Automate the creation of an Azure CosmosDB instance using Infrastructure as Code (IaC) with Terraform. 
    - Install Terraform.
    - Authenticate Terraform with Azure using az login or a Service Principal.
    - Create a working directory for Terraform files.
    - Define Terraform Variables: Define variables in a variables.tf file for reusability and flexibility. 
    - Create CosmosDB Account: Configure CosmosDB with the NoSQL API and include the following.
    - Deploying the CosmosDB Resource
        - Initialize Terraform: Run `terraform init` to download the necessary provider plugins.
        - Plan the Deployment: Execute `terraform plan` to preview the changes Terraform will apply to your Azure subscription.        
        - Apply the Configuration: Use *terraform apply* to create the CosmosDB instance. Confirm the action when prompted.

        ![Deployment of Azure CosmosDB with Terraform](<./images/terraform apply.png>)

    - Verify Deployment:
        - Go to the Azure portal.
        - Navigate to the expense-tracker resource group.
        - Check for the CosmosDB account (expense-tracker-db).

        ![After Deployment of CosmosDB on Azure](<./images/cosmosdb creation.png>)

- Step 3 - **Integrating Backend APIs via Azure Functions for Transaction Management in CosmosDB**
    - Implement Azure Functions to enable transactions to be added and deleted from CosmosDB. The functions will act as the bridge between the React frontend and the database.


    


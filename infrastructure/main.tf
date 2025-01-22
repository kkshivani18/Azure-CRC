terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.74.0"
    }
  }
}

provider "azurerm" {
  features {}
  skip_provider_registration = true
}

resource "azurerm_resource_group" "expense_tracker_rg" {
  name     = var.resource_group_name
  location = var.location
}

resource "azurerm_cosmosdb_account" "expense_tracker_db" {
  name                = var.cosmos_account_name
  location            = azurerm_resource_group.expense_tracker_rg.location
  resource_group_name = azurerm_resource_group.expense_tracker_rg.name

  offer_type          = "Standard" 
  kind                = "GlobalDocumentDB"

  consistency_policy {
    consistency_level = "Session"
  }

  geo_location {
    location          = azurerm_resource_group.expense_tracker_rg.location
    failover_priority = 0
  }
}

# Service Plan for Azure Functions
resource "azurerm_service_plan" "expense_tracker_plan" {
  name                = var.azure_service_plan_name
  resource_group_name = azurerm_resource_group.expense_tracker_rg.name
  location            = azurerm_resource_group.expense_tracker_rg.location
  os_type             = "Windows"
  sku_name            = "Y1"  
}

# Azure Function App
resource "azurerm_windows_function_app" "expense_tracker_functions" {
  name                       = var.azure_functions_name
  resource_group_name        = azurerm_resource_group.expense_tracker_rg.name
  location                   = azurerm_resource_group.expense_tracker_rg.location
  storage_account_name       = azurerm_storage_account.expense_tracker_storage.name
  storage_account_access_key = azurerm_storage_account.expense_tracker_storage.primary_access_key
  service_plan_id            = azurerm_service_plan.expense_tracker_plan.id
  
  site_config {}
}

# Storage Account for Azure Functions
resource "azurerm_storage_account" "expense_tracker_storage" {
  name                     = var.expense_tracker_storage_name
  resource_group_name      = azurerm_resource_group.expense_tracker_rg.name
  location                 = azurerm_resource_group.expense_tracker_rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

# Azure Static Web App
resource "azurerm_static_site" "expense_tracker_static_web_app" {
  name                = var.expense_tracker_static_name
  resource_group_name = azurerm_resource_group.expense_tracker_rg.name
  location            = azurerm_resource_group.expense_tracker_rg.location
  sku_tier            = "Standard"
  sku_size            = "Standard"

  identity {
    type = "SystemAssigned"
  }
}

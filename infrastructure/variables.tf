variable "resource_group_name" {
  default = "expense-tracker"
}

variable "location" {
  default = "centralus"
}

variable "cosmos_account_name" {
  default = "expense-tracker-db"
}

variable "azure_service_plan_name" {
  default = "expense-tracker-plan"
}

variable "azure_functions_name" {
  default = "expense-tracker-functions"
}

variable "cosmos_db_connection_string" {
  description = "Connection string for Cosmos DB"
  type        = string
  sensitive   = true
}

variable "expense_tracker_storage_name" {
  default = "exptrackerstr"
}

variable "expense_tracker_static_name" {
  default = "expense-tracker-static-web-app"
}

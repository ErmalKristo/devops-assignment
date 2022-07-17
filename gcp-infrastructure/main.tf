provider "google" {
   credentials = "./creds/serviceaccount.json"
   project     = var.GCP_PROJECT_ID
   region      = var.GCP_REGION
 }
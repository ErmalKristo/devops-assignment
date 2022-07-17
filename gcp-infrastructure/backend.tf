terraform {
  backend "gcs" {
    bucket = "${var.GCP_BUCKET}"
    prefix = "terraform/tfstate"
  }
}
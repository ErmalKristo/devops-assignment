resource "google_container_registry" "registry" {
  project  = var.GCP_PROJECT_ID
  location = "EU"
}
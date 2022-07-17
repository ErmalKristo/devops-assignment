resource "google_service_account" "default" {
  account_id   = "gke-sa"
  display_name = "GKE Service Account"
}

resource "google_container_cluster" "test-cluster" {
  name                      = "gke-cluster-${var.GCP_PROJECT_ID}"
  location                  = var.GCP_REGION
  networking_mode           = "VPC_NATIVE"
  ip_allocation_policy {
      cluster_ipv4_cidr_block   = "10.0.0.0/16"
      services_ipv4_cidr_block  = "172.16.0.0/16"
  }
  default_max_pods_per_node = 10
  remove_default_node_pool  = true
  initial_node_count        = 1
}

resource "google_container_node_pool" "primary_preemptible_nodes" {
  name       = "pool-${var.GCP_PROJECT_ID}"
  location   = var.GCP_REGION
  cluster    = google_container_cluster.test-cluster.name
  # Since this is a simple App we are fine with just one node
  node_count = 1

  node_config {
    preemptible  = false
    machine_type = "e2-medium"
    labels = {
      project = "${var.GCP_PROJECT_ID}"
    }
    tags         = ["gke-node"]
    service_account = google_service_account.default.email
    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform"
    ]
  }

  timeouts {
    create = "30m"
    update = "40m"
  }
}
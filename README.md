# Solution for the DevOps assignment

In this solution we deploy on GKE a simple Nodejs application that proxies and validates requests toward the **dummy-pdf-or-png** service. The infracstructure for deploying the application is provisioned using Terraform executed from Gitlab CI pipeline.

## The Challenge

Develop a microservice that:

**( [x] ) Takes HTTP GET requests with a random ID (/1, /529852, etc.), requests a 
  document from the microservice we have provided in the `dummy-pdf-or-png` 
  subdirectory of this repository, and then returns the document with correct 
  mime-type.**
  
**( [x] ) Provides an endpoint for health monitoring.**  
 Health checks endpoint: /health 		
 
**( [x] ) Has a Kubernetes Manifest or Helm Charts**    
Both applications have their own deployment manifests. The manifests are managed through `kustomize` in order to be used on different environments (production, development, stage etc).

**( [x] ) Has Readiness and LivenessChecks.**  
	 - [x ] livenessProbe /live  
	 - [x ] readinessProbe /ready  
  
**( [x] ) Has a Dockerfile.**  
The application is containerized using `node:18.6.0-alpine3.16` as base image. The container images are stored on Google Container Registry.

**( [x] ) Has tests, so regressions can be identified.**  
Tests are implemented using the [Jest](https://jestjs.io/)  framework. They are run on the CI/CD pipeline on each commit.

**( [x] ) Failing Safe is a priority.**  
 In case of failures the application replies with an HTTP error code and error message.

**( [x] ) The service should log relevant information**  
The application logs information in Apache combined log format.

Overall the service must be considered production-ready.

Bonus points if  

**( [x] ) Prometheus metrics are provided from the service.**  
The application exports Prometheus metrics under `/metrics` endpoint. It utilizes [Prometheus API Monitoring](https://github.com/PayU/prometheus-api-metrics) for collecting and exporting the metrics. 

**( [x] ) Resources are provisioned via IaC**  
Terraform is used for provisioning the infrastructure. Terraform stores the state of the infrastructure in a Google Cloud storage bucket. For performing the needed actions Terraform utilizes a service account with the required roles attached.

**( [x] ) There is CI/CD (GitLab, GitHub Actions or similar) to build, test and deploy**  
Gitlab CI is used for CI/CD 

**( [] ) There is a good developer experience**  
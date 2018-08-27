GIT_REF := $(shell git describe --always --tag)
VERSION ?= commit-$(GIT_REF)

PROJECT  ?=
REGISTRY ?=
WEB_SERVICE_NAME := "mtc2018-web"
API_SERVICE_NAME := "mtc2018-api"
WEB_IMAGE := $(REGISTRY)/$(WEB_SERVICE_NAME):$(VERSION)
API_IMAGE := $(REGISTRY)/$(API_SERVICE_NAME):$(VERSION)

cloudbuild:
	@gcloud builds submit ./ \
		--project=$(PROJECT) \
		--config=.cloudbuild.yaml \
		--gcs-log-dir="$(GCS_LOG_DIR)" \
		--substitutions="_API_IMAGE=$(API_IMAGE),_WEB_IMAGE=$(WEB_IMAGE),_VERSION=$(VERSION)"


# generated-from:50f341b3b2f18234092dbf12abfd21cdcb8779239c088480e8bbbe9340055c03 DO NOT REMOVE, DO UPDATE

PLATFORM=$(shell uname -s | tr '[:upper:]' '[:lower:]')
PWD := $(shell pwd)

ifndef VERSION
	VERSION := $(shell git describe --tags --abbrev=0)
endif

COMMIT_HASH :=$(shell git rev-parse --short HEAD)
DEV_VERSION := dev-${COMMIT_HASH}

USERID := $(shell id -u $$USER)
GROUPID:= $(shell id -g $$USER)

export GOPRIVATE=github.com/moovfinancial

all: install update build

.PHONY: install
install:
	go mod tidy
	go install github.com/markbates/pkger/cmd/pkger@latest
	go mod vendor

update:
	pkger -include /migrations -include /configs/config.default.yml
	go mod vendor

build:
	go build -mod=vendor -ldflags "-X github.com/moovfinancial/slack-integration.Version=${VERSION}" -o bin/slack-integration github.com/moovfinancial/slack-integration/cmd/slack-integration

.PHONY: setup
setup:
	docker-compose up -d --force-recreate --remove-orphans
	

.PHONY: check
check:
ifeq ($(OS),Windows_NT)
	@echo "Skipping checks on Windows, currently unsupported."
else
	@wget -O lint-project.sh https://raw.githubusercontent.com/moov-io/infra/master/go/lint-project.sh
	@chmod +x ./lint-project.sh
	./lint-project.sh
endif

.PHONY: teardown
teardown:
	-docker-compose down --remove-orphans

docker: update
	docker build --pull --build-arg VERSION=${VERSION} -t moovfinancial/slack-integration:${VERSION} -f Dockerfile .
	docker tag moovfinancial/slack-integration:${VERSION} moovfinancial/slack-integration:latest
	
	docker tag moovfinancial/slack-integration:${VERSION} moovfinancial/slack-integration:${VERSION}
	docker tag moovfinancial/slack-integration:${VERSION} moovfinancial/slack-integration:latest
	

docker-push:
	
	docker push moovfinancial/slack-integration:${VERSION}
	docker push moovfinancial/slack-integration:latest
	
.PHONY: dev-docker
dev-docker: update
	docker build --pull --build-arg VERSION=${DEV_VERSION} -t moovfinancial/slack-integration:${DEV_VERSION} -f Dockerfile .
	
	docker tag moovfinancial/slack-integration:${DEV_VERSION} moovfinancial/slack-integration:${DEV_VERSION}
	

.PHONY: dev-push
dev-push:
	
	docker push moovfinancial/slack-integration:${DEV_VERSION}
	

# Extra utilities not needed for building

run: update build
	./bin/slack-integration

docker-run:
	docker run -v ${PWD}/data:/data -v ${PWD}/configs:/configs --env APP_CONFIG="/configs/config.yml" -it --rm moovfinancial/slack-integration:${VERSION}

test: update
	go test -cover github.com/moovfinancial/slack-integration/...

.PHONY: clean
clean:
ifeq ($(OS),Windows_NT)
	@echo "Skipping cleanup on Windows, currently unsupported."
else
	@rm -rf cover.out coverage.txt misspell* staticcheck*
	@rm -rf ./bin/
endif

# For open source projects

# From https://github.com/genuinetools/img
.PHONY: AUTHORS
AUTHORS:
	@$(file >$@,# This file lists all individuals having contributed content to the repository.)
	@$(file >>$@,# For how it is generated, see `make AUTHORS`.)
	@echo "$(shell git log --format='\n%aN <%aE>' | LC_ALL=C.UTF-8 sort -uf)" >> $@

dist: clean build
ifeq ($(OS),Windows_NT)
	CGO_ENABLED=1 GOOS=windows go build -o bin/slack-integration.exe cmd/slack-integration/*
else
	CGO_ENABLED=1 GOOS=$(PLATFORM) go build -o bin/slack-integration-$(PLATFORM)-amd64 cmd/slack-integration/*
endif


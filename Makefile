VERSION := $(shell jq -r ".version" package.json)
COMMIT_HASH :=$(shell git rev-parse --short HEAD)
TAG_VERSION := $(shell git describe --tags --abbrev=0)

.PHONY: build test docker clean
build:
	yarn run build

run:
	docker run --read-only \
		-p 8080:8080 moov/slack-integration:$(VERSION)

install:
	yarn ci

test:
	yarn run test

clean:
	rm -rf node_modules

release: clean install build
ifeq ($(VERSION),$(TAG_VERSION))
	docker build --pull -t moov/slack-integration:$(VERSION) -f Dockerfile .
	docker push moov/slack-integration:$(VERSION)
else
	@echo "package.json version doesn't match Git tag"
endif

dev-image:
	docker build --pull -t moov/slack-integration:dev-$(COMMIT_HASH) -f Dockerfile .
	docker push moov/slack-integration:dev-$(COMMIT_HASH)

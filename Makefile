VERSION := $(shell jq -r ".version" package.json)
COMMIT_HASH :=$(shell git rev-parse --short HEAD)
TAG_VERSION := $(shell git describe --tags --abbrev=0)

.PHONY: build test docker clean
clean:
	rm -rf node_modules

install:
	yarn install --frozen-lockfile

build:
	yarn run build

test:
	yarn run test

run:
	docker run --read-only \
		-p 8080:8080 moovfinancial/slack-integration:$(VERSION)

release: clean install build test
ifeq ($(VERSION),$(TAG_VERSION))
	docker build --pull -t moovfinancial/slack-integration:$(VERSION) -f Dockerfile .
	docker push moovfinancial/slack-integration:$(VERSION)
else
	@echo "package.json version doesn't match Git tag"
endif

dev-build:
	docker build --pull -t moovfinancial/slack-integration:dev-$(COMMIT_HASH) -f Dockerfile .
	docker push moovfinancial/slack-integration:dev-$(COMMIT_HASH)

dev-run:
	docker run --read-only \
		-p 8080:8080 moovfinancial/slack-integration:dev-$(COMMIT_HASH)

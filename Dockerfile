# generated-from:dc2016453db19e80acea7cb7220ab3cd6878982aaa45bd8bc3d03d83eb56b594 DO NOT REMOVE, DO UPDATE

FROM golang:1.16-buster as builder
WORKDIR /src
ARG VERSION

RUN apt-get update && apt-get install -y make gcc g++ ca-certificates

COPY . .

RUN VERSION=${VERSION} make build

FROM debian:buster AS runtime
LABEL maintainer="Moov <support@moov.io>"

WORKDIR /

RUN apt-get update && apt-get install -y ca-certificates curl \
	&& rm -rf /var/lib/apt/lists/*

COPY --from=builder /src/bin/slack-integration /app/

ENV HTTP_PORT=8232
ENV HEALTH_PORT=8233

EXPOSE ${HTTP_PORT}/tcp
EXPOSE ${HEALTH_PORT}/tcp

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
	CMD curl -f http://localhost:${HEALTH_PORT}/live || exit 1

VOLUME [ "/data", "/configs" ]

ENTRYPOINT ["/app/slack-integration"]

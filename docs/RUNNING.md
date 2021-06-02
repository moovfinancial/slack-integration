<!-- generated-from:19db8951ce6878c602c103cb34902852d2af88b974b70fa7adc4612691fe2fd6 DO NOT REMOVE, DO UPDATE -->
# Slack
**[Purpose](README.md)** | **[Configuration](CONFIGURATION.md)** | **Running** | **[Client](../pkg/client/README.md)**

--- 

## Running

### Getting Started

More tutorials to come on how to use this as other pieces required to handle authorization are in place!

- [Using docker-compose](#local-development)
- [Using our Docker image](#docker-image)

No configuration is required to serve on `:8200` and metrics at `:8201/metrics` in Prometheus format.

### Docker image

You can download [our docker image `moov/slack-integration`](https://hub.docker.com/r/moov/slack-integration/) from Docker Hub or use this repository. 

### Local Development

```
make run
```

---
**[Next - Client](../pkg/client/README.md)**
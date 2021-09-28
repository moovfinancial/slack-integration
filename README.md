# Moov for Slack

A sample application that routes Moov transfer events to a Slack channel. You can configure and deploy Moov for Slack to see it in action, and then fork the repository to customize it for your organization's needs.

![Moov for Slack notifications](https://user-images.githubusercontent.com/574793/135163070-fdd5ad49-7a85-4a7e-8f9d-8dc8ee263702.png)

## How it works

![Slack integration_- How it works](https://user-images.githubusercontent.com/574793/135172753-5221b83f-b3ff-466c-b334-3f6fe1c70e68.png)

* [TypeScript](https://www.typescriptlang.org/)
* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [Moov](https://docs.moov.io/)
* [Slack Bolt](https://api.slack.com/tools/bolt)


## Building and running the app

```shell
yarn install
yarn run build
yarn run start
```

Before you can run the app, you'll need to configure it as described below.

## Configuring the app

The app loads secrets, including Slack credentials and Moov credentials, from `./config/config.yml`. Use a secrets management solution and the template at `./config.sample.yml` to create the file and inject it into your production environment. Here at Moov we use HashiCorp's Vault to inject configuration files into Kubernetes pods. Your solution might look a little different.

If the app can't find the configuration file, or the file is missing configuration values, then it will fall back to using environment variables. Environment variables are not a secure way to store secrets, but they're supported here to help you get up and running quickly if you don't yet use a more robust secrets management solution.

## Running with Docker

Use `./Dockerfile` to build, publish, and run Docker in your container environment.

## Running locally

To run the app locally, copy `./config.sample.yml` to `./config/config.yml` and fill in the credentials. Git will ignore local configuration files. The app must have an exposed IP address and port to receive Moov webhook notifications.

The build and start commands both have watch versions for local development:

```shell
yarn run build:watch
yarn run start:watch
```





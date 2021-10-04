<div>
  <a href="https://github.com/moovfinancial/slack-integration/blob/main/CHANGELOG.md">
    <img alt="Version" src="https://img.shields.io/github/package-json/v/moovfinancial/slack-integration?style=flat"></a>
  <a href="https://github.com/moovfinancial/slack-integration/blob/main/LICENSE">
    <img alt="License" src="https://img.shields.io/github/license/moovfinancial/slack-integration?style=flat"></a>
  <a href="https://docs.moov.io">
    <img alt="Learn more" src="https://img.shields.io/badge/learn-docs.moov.io-success?style=flat"></a>
  <a href="https://twitter.com/moov">
    <img alt="Moov on Twitter" src="https://img.shields.io/badge/follow-twitter/moov-1da1f2?style=flat"></a>
</div>

# Moov for Slack

A sample application that routes Moov transfer events to a Slack channel. You can configure and deploy Moov for Slack to see it in action, and then fork the repository to customize it for your organization's needs.

![Moov for Slack notifications](https://user-images.githubusercontent.com/574793/135163070-fdd5ad49-7a85-4a7e-8f9d-8dc8ee263702.png)

## How it works

**Moov for Slack** is a [Node/Express](https://expressjs.com/) application that uses the [Moov API](https://docs.moov.io) and the [Slack Bolt SDK](https://api.slack.com/tools/bolt).

![Slack integration_ How it works](https://user-images.githubusercontent.com/574793/135174864-8f28e8ef-e2a2-41dc-a4ce-8b08314ce98a.png)

## Prerequisites

These prerequisites have to be in place before you can configure and launch **Moov for Slack**

**:ballot_box_with_check:  A configuration file**

1. Clone this repository to your local device.
2. Create a folder at the root named `./config`.
3. Copy `./config.example.yml` to the new folder and rename it to `./config/config.yml`.

**:ballot_box_with_check:  A publicly addressable host or IP address**

You'll need to host **Moov for Slack** at a publicly addressable host so both Moov and Slack can reach it. If you're developing locally, you can use a service like [ngrok](https://ngrok.com/) to tunnel messages from a publicly addressable host to your local device.

**:ballot_box_with_check:  Slack app**

You'll need a Slack app to run inside your workspace and listen for notifications from **Moov for Slack**.

1. Navigate to https://api.slack.com/apps.
2. If you don't already have one, create and configure a new Slack app.
3. Copy these configuration values to the `slack` section in  `./config/config.yml`:
   * The app's **bot token**
   * The app's **signing secret**
   * The name of the Slack **channel** where messages should appear, e.g., `#moov-notifications` or `@Amanda`
4. Turn on interactivity for the Slack app and set the **request URL** to:  
   `https://<your publicly addressable host>/slack/events`

**:ballot_box_with_check: Moov Account ID**

1. Navigate to https://dashboard.moov.io > Settings > Business details.
2. Copy **account ID** to the `moov` section in `./config/config.yml`:

**:ballot_box_with_check: Moov API key**

1. Navigate to https://dashboard.moov.io > Developers > API Keys.
2. Create an API key for **Moov for Slack**.
3. Copy these configuration values to the `moov` section in `./config/config.yml`:
   * The key's **domain**, which you can set to `https://moovforslack.<yourcompany>.com`
   * The key's **public key**
   * The key's **secret key**

**:ballot_box_with_check: Moov Webhook**

1. Navigate to https://dashboard.moov.io > Developers > Webhooks.
2. Create a new webhook.
3. Set the URL to `https://<your publicaly addressable host>/webhook/transfer`.
4. Select the `transfer.created` and `transfer.updated` events. If you fork and customize this app, be sure to subscribe to any additional events you'd like to receive.
5. Copy the **webhook signing secret** to the `moov` section in `./config/config.yml`.

## Building and running

Use the scripts in `package.json` to build and run:

```shell
yarn install
yarn build
yarn start
```

These commands are also available when needed:

```shell
yarn clean
yarn build:watch
yarn start:watch
```

## Deployment

By default the application will load and parse a configuration file from the filesystem at `/config/config.yml`. This location can be overriden by setting the `CONFIG_FILE_PATH` environment variable. Since this file contains configuration secrets we recommend using a secrets management facility such as [Docker Secrets](https://docs.docker.com/engine/swarm/secrets/), [Kubernetes Secrets](https://kubernetes.io/docs/concepts/configuration/secret/), or [Vault](https://www.vaultproject.io/docs/platform/k8s/injector) to mount and/or render this file.

An example configuration is available in the root of this repository at `config.example.yml` along with the associated environment variable for each option.

## Running with Docker

Use `./Dockerfile` as a starting point to run **Moov for Slack** in a container environment.

## Contributing

Yes please! Be sure to submit an issue before submitting a pull request.

Moov would like to thank [Arsenio Aguirre](https://github.com/aaaguirrep) for getting this project off to a great start.


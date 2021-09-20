import { App, ExpressReceiver } from "@slack/bolt";
import { config as dotenvConfig } from "dotenv";
import express from "express";

import { requireEnvVar } from "./helpers/envVars";

// Load secrets from environment variables
dotenvConfig();
const SLACK_TOKEN = requireEnvVar("SLACK_TOKEN");
const SLACK_SIGNING_SECRET = requireEnvVar("SLACK_SIGNING_SECRET");

// Configure the Slack app
const receiver = new ExpressReceiver({ signingSecret: SLACK_SIGNING_SECRET });
const app = new App({
  token: SLACK_TOKEN,
  receiver,
});

app.action("inspectTransfer", () => Promise.resolve());

receiver.router.use(express.json());
receiver.router.use(
  express.urlencoded({
    extended: true,
  })
);
receiver.router.post("/webhook/slack", () => Promise.resolve());

// Start listening for webhook events
(async () => {
  const port = +(process.env.PORT || 8080);
  await app.start(port);
  console.log(`listening on port ${port}`);
})();

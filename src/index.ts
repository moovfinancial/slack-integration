import { App, ExpressReceiver } from "@slack/bolt";
import express, { Router } from "express";

import config, { Config } from "./config";

(async () => {
  await config.loadFromEnv();
  const missingValues = config.missingValues();

  if (missingValues.length) {
    await startEmptyApp(config, missingValues);
  } else {
    await startSlackApp(config);
  }

  console.log(`listening on port ${config.port}`);
})();

/**
 * Start a server that simply reports which configuration values are missing.
 */
async function startEmptyApp(config: Config, missingValues: Array<string>): Promise<void> {
  console.error(`missing configuration values: ${missingValues.join(", ")}`);

  const app = express();
  app.get("/ping", async (_, res) => res.sendStatus(200));
  await app.listen(config.port);
}

/**
 * Start the Moov Slack server.
 */
async function startSlackApp(config: Config): Promise<void> {
  console.log("configuration values loaded");

  const receiver = new ExpressReceiver({ signingSecret: config.slackSigningSecret as string });
  const app = new App({
    token: config.slackToken,
    receiver,
  });

  app.action("inspectTransfer", () => Promise.resolve());

  receiver.router.use(express.json());
  receiver.router.use(express.urlencoded({ extended: true }));
  receiver.router.post("/webhook/slack", () => Promise.resolve());
  receiver.router.get("/ping", async (_, res) => res.sendStatus(200));

  await app.start(config.port);
}

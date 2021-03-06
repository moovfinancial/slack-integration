import { App, ExpressReceiver } from "@slack/bolt";
import express from "express";

import { Configuration } from "./configuration";
import { handleWebhookEvent } from "./controllers/moov";
import { Env } from "./services/env";

let application: App | null = null;

export async function start(config: Configuration) {
  const receiver = new ExpressReceiver({ signingSecret: config.slack.signingSecret });
  application = new App({ token: config.slack.token, receiver });

  application.action("inspectTransfer", Env.SlackService.showTransferDetails);

  receiver.router.use(express.json());
  receiver.router.use(express.urlencoded({ extended: true }));

  receiver.router.post("/webhooks", handleWebhookEvent);
  receiver.router.get("/ping", async (_, res) => res.sendStatus(200));
  receiver.router.use((req, res, next) => {
    res.status(404).send("Not found");
  });

  await application.start(config.port);
  console.log(`listening on port ${config.port}`);
}

export function active(): App {
  return application as App;
}

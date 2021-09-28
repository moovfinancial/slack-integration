import { App, ExpressReceiver } from "@slack/bolt";
import express from "express";

import { Configuration } from "./configuration";
import { receiveWebhookEvent } from "./controllers/slack";

let application: App | null = null;

export async function start(config: Configuration) {
  const receiver = new ExpressReceiver({ signingSecret: config.slack.signingSecret });
  application = new App({ token: config.slack.token, receiver });

  application.action("inspectTransfer", () => Promise.resolve());

  receiver.router.use(express.json());
  receiver.router.use(express.urlencoded({ extended: true }));

  receiver.router.post("/webhook/transfer", receiveWebhookEvent);
  receiver.router.get("/ping", async (_, res) => res.sendStatus(200));

  await application.start(config.port);
  console.log(`listening on port ${config.port}`);
}

export function active(): App {
  return application as App;
}

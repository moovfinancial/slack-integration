import { randomUUID, sign } from "crypto";
import got, { Response } from "got";

import * as application from "../application";
import * as configuration from "../configuration";
import buildGotErrorMessage from "../helpers/buildGotErrorMessage";
import { generateSignature } from "../services/authentication";

(async () => {
  await configuration.load();
  const config = configuration.active();
  const url = `http://localhost:${config.port}/webhooks`;

  const timestamp = new Date().toISOString();
  const nonce = randomUUID();
  const webhookID = randomUUID();
  const signature = generateSignature(timestamp, nonce, webhookID);

  try {
    const res: Response = await got({
      url,
      method: "POST",
      headers: {
        "x-timestamp": timestamp,
        "x-nonce": nonce,
        "x-webhook-id": webhookID,
        "x-signature": signature,
      },
      json: {
        eventID: randomUUID(),
        type: "transfer.updated",
        data: {
          transferID: process.argv[2],
          status: "completed",
        },
        createdOn: new Date().toISOString(),
      },
    });
    console.log(`Response: ${res.statusCode}`);
  } catch (err) {
    console.error(`sendTransferEvent failed: ${buildGotErrorMessage(err)}`);
    process.exit(1);
  }
})();

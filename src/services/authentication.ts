import * as crypto from "crypto";
import { IncomingHttpHeaders } from "http";

import { active as getConfig } from "../configuration";

export function signatureIsValid(headers: IncomingHttpHeaders): boolean {
  const config = getConfig();
  const timeStamp = headers["x-timestamp"];
  const nonce = headers["x-nonce"];
  const webhookID = headers["x-webhook-id"];
  const signature = headers["x-signature"];
  const payload = `${timeStamp}|${nonce}|${webhookID}`;

  const checkHash = crypto
    .createHmac("sha512", config.moov.webhookSecret)
    .update(payload)
    .digest("hex");

  return signature === checkHash;
}

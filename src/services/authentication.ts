import * as crypto from "crypto";

import { active as getConfig } from "../configuration";

export function signatureIsValid(headers: Headers): boolean {
  const config = getConfig();
  const timeStamp = headers.get("x-timestamp");
  const nonce = headers.get("x-nonce");
  const webhookID = headers.get("x-webhook-id");
  const signature = headers.get("x-signature");
  const payload = `${timeStamp}|${nonce}|${webhookID}`;

  const checkHash = crypto
    .createHmac("sha512", config.moov.webhookSecret)
    .update(payload)
    .digest("hex");

  return signature === checkHash;
}

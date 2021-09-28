import * as crypto from "crypto";
import { IncomingHttpHeaders } from "http";

import { active as getConfig } from "../configuration";

export function signatureIsValid(headers: IncomingHttpHeaders): boolean {
  const config = getConfig();
  const timestamp = headers["x-timestamp"];
  const nonce = headers["x-nonce"];
  const webhookID = headers["x-webhook-id"];
  const signature = headers["x-signature"];
  const payload = `${timestamp}|${nonce}|${webhookID}`;

  const checkHash = crypto
    .createHmac("sha512", config.moov.webhookSecret)
    .update(payload)
    .digest("hex");

  return signature === checkHash;
}

export function generateSignature(timestamp: string, nonce: string, webhookID: string): string {
  const config = getConfig();
  const payload = `${timestamp}|${nonce}|${webhookID}`;

  const signature = crypto
    .createHmac("sha512", config.moov.webhookSecret)
    .update(payload)
    .digest("hex");

  return signature;
}

import { Request, Response } from "express";
import { signatureIsValid } from "../services/authentication";

export async function receiveWebhookEvent(req: Request, res: Response): Promise<void> {
  console.log(`receiveWebhookEvent: `, req.body);
  if (signatureIsValid(req.headers)) {
    // TODO: parse event
  } else {
    console.warn(`receiveWebhookEvent: invalid signature`);
  }

  res.sendStatus(200);
}

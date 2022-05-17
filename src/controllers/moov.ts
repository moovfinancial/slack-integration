import { Request, Response } from "express";
import { signatureIsValid } from "../services/authentication";
import { Env } from "../services/env";
import * as CNT from "../constants";

type EventHandler = (event: string, body: any) => Promise<void>;

const eventMap: Record<string, EventHandler> = {};

eventMap[CNT.TRANSFER_CREATED] = handleTransfer;
eventMap[CNT.TRANSFER_UPDATED] = handleTransfer;

export async function handleWebhookEvent(req: Request, res: Response): Promise<void> {
  if (!signatureIsValid(req.headers)) {
    const headers: Record<string, string> = {};
    ["x-timestamp", "x-nonce", "x-webhook-id", "x-signature"].forEach((key) => {
      headers[key] = (req.headers[key] as string) || "";
    });
    console.warn(`handleWebhookEvent: invalid signature: headers:`, headers);
    res.sendStatus(403);
    return;
  }

  console.log(`handleWebhookEvent: `, req.body);

  const event: string = req.body.type;
  const handler = eventMap[event];

  if (handler) {
    try {
      await handler(event, req.body);
    } catch (err: any) {
      console.error("handleWebhookEvent: handler failed: ", err?.message || err);
    }
  }

  res.sendStatus(200);
}

async function handleTransfer(type: string, body: any) {
  if (
    type === CNT.TRANSFER_UPDATED &&
    body.data?.status !== CNT.TRANSFER_STATUS_COMPLETED &&
    body.data?.status !== CNT.TRANSFER_STATUS_REVERSED 
  )
    return;

  const transferID: string = body.data?.transferID || body.data?.TransferID;
  await Env.SlackService.sendTransferMessage(type, transferID);
}

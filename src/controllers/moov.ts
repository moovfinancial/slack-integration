import { Request, Response } from "express";
import { signatureIsValid } from "../services/authentication";
import { sendTransferMessage } from "../services/slack";

type EventHandler = (event: string, body: any) => Promise<void>;

const eventMap: Record<string, EventHandler> = {
  "transfer.created": handleTransferEvent,
  "transfer.updated": handleTransferEvent
  // --> Add additional event handlers here
};

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

async function handleTransferEvent(type: string, body: any) {
  if (type === "transfer.updated" && body.data?.status !== "completed") return;

  const transferID: string = body.data?.transferID || body.data?.TransferID;
  await sendTransferMessage(type, transferID);
}

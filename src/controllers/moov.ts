import { Request, Response } from "express";
import { signatureIsValid } from "../services/authentication";
import { sendTransferMessage } from "../services/slack";

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

  const type: string = req.body?.type;
  if (type.startsWith("transfer")) {
    handleTransferEvent(type, req.body);
  }
  // TODO: Add additional event handlers here

  res.sendStatus(200);
}

async function handleTransferEvent(type: string, body: any) {
  // Ensure it's a recognized event
  let recognized = false;
  if (type === "transfer.created") {
    recognized = true;
  } else if (type === "transfer.updated") {
    if (body.status === "failed" || body.status === "reversed" || body.status === "completed") {
      recognized = true;
    }
  }

  if (recognized) {
    // Send the message
    const transferID: string = body.data?.transferID || body.data?.TransferID;
    await sendTransferMessage(type, transferID);
  }
}

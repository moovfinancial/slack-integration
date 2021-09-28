import { Request, Response } from "express";
import { signatureIsValid } from "../services/authentication";
import { sendTransferMessage } from "../services/slack";

export async function handleWebhookEvent(req: Request, res: Response): Promise<void> {
  if (!signatureIsValid(req.headers)) {
    console.warn(`receiveWebhookEvent: invalid signature`);
    return;
  }

  console.log(`handleWebhookEvent: `, req.body);

  const type: string = req.body.type;
  if (type === "transfer.created" || type === "transfer.updated") {
    await handleTransferEvent(type, req.body);
  }

  res.sendStatus(200);
}

async function handleTransferEvent(type: "transfer.created" | "transfer.updated", body: any) {
  if (type === "transfer.updated" && body.data?.status !== "completed") return;

  const transferID: string = body.data?.transferID || body.data?.TransferID;
  await sendTransferMessage(type, transferID);
}

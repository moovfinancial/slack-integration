import { Request, Response } from "express";
import { signatureIsValid } from "../services/authentication";
import { sendTransferMessage } from "../services/slack";

export async function handleWebhookEvent(req: Request, res: Response): Promise<void> {
  if (!signatureIsValid(req.headers)) {
    console.warn(`receiveWebhookEvent: invalid signature`);
    return;
  }

  console.log(`handleWebhookEvent: `, req.body);

  switch (req.body?.type) {
    case "transfer.updated":
      await handleTransferEvent(req.body);
      break;
  }

  res.sendStatus(200);
}

async function handleTransferEvent(body: any) {
  const transferID: string = body.data?.transferID;
  const status: string = body.data?.status;

  if (status === "completed") {
    await sendTransferMessage(transferID);
  }
}

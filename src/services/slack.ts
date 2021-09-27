import * as application from "../application";
import * as configuration from "../configuration";
import { transferDetails, transferMessage } from "./message";
import { getTransferData } from "./moov";

export async function sendTransferMessage(transferID: string) {
  try {
    const config = configuration.active();
    const transferData = await getTransferData(transferID);
    const blocks = transferMessage(transferData);
    const app = application.active();

    await app.client.chat.postMessage({
      channel: config.slack.channel,
      blocks,
    });
  } catch (err: any) {
    console.error(`slack.sendTransferMessage failed: `, err?.message || err);
  }
}

export async function showTransferDetails({ body, client, ack }: any) {
  try {
    await ack();

    const config = configuration.active();
    const transferData = await getTransferData(body.actions[0].value);
    const view = transferDetails(transferData);

    await client.views.open({
      trigger_id: body.trigger_id,
      view,
    });
  } catch (err: any) {
    console.error(`slack.showTransferDetails failed: `, err?.message || err);
  }
}

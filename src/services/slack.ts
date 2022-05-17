import * as application from "../application";
import * as configuration from "../configuration";
import { transferDetails, transferMessage } from "./message";
import { Env } from "./env";

export interface ISlackService {
  sendTransferMessage(type: string, transferID: string): Promise<any>;
  showTransferDetails({ body, client, ack }: any): Promise<any>;
}

export class SlackService {
  async sendTransferMessage(type: string, transferID: string) {
    try {
      const config = configuration.active();
      const transferData = await Env.MoovService.getTransferData(transferID);
      const blocks = transferMessage(type, transferData);
      const app = application.active();

      await app.client.chat.postMessage({
        channel: config.slack.channel,
        blocks,
      });
    } catch (err: any) {
      console.error(`slack.sendTransferMessage failed: `, err?.message || err);
    }
  }



  async showTransferDetails({ body, client, ack }: any) {
    try {
      await ack();

      const config = configuration.active();
      const transferData = await Env.MoovService.getTransferData(body.actions[0].value);
      const view = transferDetails(transferData);

      await client.views.open({
        trigger_id: body.trigger_id,
        view,
      });
    } catch (err: any) {
      console.error(`slack.showTransferDetails failed: `, err?.message || err);
    }
  }
}

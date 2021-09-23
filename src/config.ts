import { config as loadDotEnv } from "dotenv";

export class Config {
  slackToken?: string;
  slackSigningSecret?: string;
  slackChannel?: string;
  moovApiUrl: string = "https://api.moov.io";
  moovPublicKey?: string;
  moovSecretKey?: string;
  moovWebhookSecret?: string;
  port: number = 8080;

  constructor() {}

  async loadFromEnv(): Promise<void> {
    loadDotEnv();
    this.slackToken = process.env.SLACK_TOKEN;
    this.slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
    this.slackChannel = process.env.SLACK_CHANNEL;
    this.moovApiUrl = process.env.MOOV_API_URL || "https://api.moov.io";
    this.moovPublicKey = process.env.MOOV_PUBLIC_KEY;
    this.moovSecretKey = process.env.MOOV_SECRET_KEY;
    this.moovWebhookSecret = process.env.MOOV_WEBHOOK_SECRET;
    this.port = +(process.env.PORT || this.port);
  }

  missingValues(): string[] {
    let missing: string[] = [];

    if (!this.slackToken) missing.push("SLACK_TOKEN");
    if (!this.slackSigningSecret) missing.push("SLACK_SIGNING_SECRET");
    if (!this.slackChannel) missing.push("SLACK_CHANNEL");
    if (!this.moovPublicKey) missing.push("MOOV_PUBLIC_KEY");
    if (!this.moovSecretKey) missing.push("MOOV_SECRET_KEY");
    if (!this.moovWebhookSecret) missing.push("MOOV_WEBHOOK_SECRET");

    return missing;
  }
}

const config = new Config();
export default config;

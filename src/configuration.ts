import * as fs from "fs/promises";
import * as path from "path";
import * as yaml from "yaml";

import deepMerge from "./helpers/deepMerge";

export interface Configuration {
  slack: {
    token: string;
    signingSecret: string;
    channel: string;
  };
  moov: {
    accountID: string;
    domain: string;
    publicKey: string;
    secretKey: string;
    webhookSecret: string;
    apiUrl: string;
  };
  port: number;
}

let config: Configuration;

export async function load(): Promise<Configuration> {
  const fileConfig = await loadFromFile();
  const envConfig = loadFromEnv();
  config = mergeAndValidate(envConfig, fileConfig);

  return config;
}

export function active(): Configuration {
  return config;
}

async function loadFromFile(): Promise<Partial<Configuration>> {
  let config = {};

  try {
    const configPath =
      process.env.CONFIG_FILE_PATH || path.join(process.cwd(), "/config/config.yml");
    const contents = await fs.readFile(configPath, "utf8");
    config = yaml.parse(contents);
  } catch (err: any) {
    console.warn("unable to load configuration file:", err?.message);
  }

  return config;
}

function loadFromEnv(): Configuration {
  return {
    slack: {
      token: process.env.SLACK_TOKEN || "",
      signingSecret: process.env.SLACK_SIGNING_SECRET || "",
      channel: process.env.SLACK_CHANNEL || "",
    },
    moov: {
      accountID: process.env.MOOV_ACCOUNT_ID || "",
      domain: process.env.MOOV_DOMAIN || "",
      publicKey: process.env.MOOV_PUBLIC_KEY || "",
      secretKey: process.env.MOOV_SECRET_KEY || "",
      webhookSecret: process.env.MOOV_WEBHOOK_SECRET || "",
      apiUrl: process.env.MOOV_API_URL || "https://api.moov.io",
    },
    port: +(process.env.PORT || 8080),
  };
}

function mergeAndValidate(
  envConfig: Configuration,
  fileConfig: Partial<Configuration>
): Configuration {
  const config = deepMerge(envConfig, fileConfig);
  const report = (name: string) => console.error(`error: configuration: missing ${name}`);

  if (!config.slack?.token) report("slack.token");
  if (!config.slack?.signingSecret) report("slack.signingSecret");
  if (!config.slack?.channel) report("slack.channel");
  if (!config.moov?.accountID) report("moov.accountID");
  if (!config.moov?.domain) report("moov.domain");
  if (!config.moov?.publicKey) report("moov.publicKey");
  if (!config.moov?.secretKey) report("moov.secretKey");
  if (!config.moov?.webhookSecret) report("moov.webhookSecret");

  return config;
}

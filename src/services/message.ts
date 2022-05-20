import { View } from "@slack/bolt";
import { createNode } from "yaml";
import * as cnt from "../constants";

export function transferMessage(type: string, transfer: any) {
  const amount = +transfer.amount.value / 100;
  const source = transfer.source.account.displayName;
  const destination = transfer.destination.account.displayName;
  let header = "";
  let description = "";

  switch (type) {
    case cnt.TRANSFER_CREATED:
      header = "Transfer created";
      description =
        "A transfer of *$" +
        amount.toFixed(2) +
        "* from *" +
        source +
        "* to *" +
        destination +
        "* is pending.";
      break;
    default:
      switch (transfer.status) {
        case cnt.TRANSFER_STATUS_REVERSED:
          header = "Transfer reversed";
          description =
            "A transfer of *$" +
            amount.toFixed(2) +
            "* from *" +
            source +
            "* to *" +
            destination +
            "* has been reversed.";
          break;
        default:
          header = "Transfer completed :tada:";
          description =
            "*" + source + "* sent *$" + amount.toFixed(2) + "* to *" + destination + "*.";
      }
  }

  return [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: header,
        emoji: true,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: description,
      },
      accessory: {
        type: "button",
        text: {
          type: "plain_text",
          text: "Details",
          emoji: true,
        },
        value: `${transfer.transferID}`,
        action_id: "inspectTransfer",
      },
    },
  ];
}

function resolveHeader(transfer: any): string {
  let src = "";
  let dst = "";


  let status = transfer.status;

  if (transfer.source.bankAccount) {
    src = "Bank"
  } else if (transfer.source.wallet) {
    src = "Wallet"
  } else {
    src = "Card"
  }

  if (transfer.destination.bankAccount) {
    dst = "Bank"
  } else if (transfer.destination.wallet) {
    dst = "Wallet"
  } else {
    dst = "Card"
  }

  switch (status) {
    case cnt.TRANSFER_STATUS_PENDING:
      status = "Transfer created";
      break;
    case cnt.TRANSFER_STATUS_FAILED:
      status = ":exclamation: Transfer failed";
      break;
    case cnt.TRANSFER_STATUS_REVERSED:
      status = "Transfer reversed";
      break;
    case cnt.TRANSFER_STATUS_COMPLETED:
    default:
      status = ":tada:  Transfer complete";
      break;
  }

  return `${src} to ${dst}: ${status}`
}

export interface TransferDetails {
  Src: string
  Dst: string
}

function resolveDetails(transfer: any): TransferDetails {
  let ret: TransferDetails = { Dst: "", Src: "" }

  if (transfer.source.bankAccount) {
    ret.Src = transfer.source.bankAccount.bankName + "\n" +
      transfer.source.bankAccount.bankAccountType +
      " • " +
      transfer.source.bankAccount.lastFourAccountNumber;
  } else if (transfer.source.wallet) {
    ret.Src = "Moov Wallet"
  } else {
    ret.Src = "Card"
  }

  if (transfer.destination.bankAccount) {
    ret.Dst = transfer.destination.bankAccount.bankName + "\n" +
      transfer.destination.bankAccount.bankAccountType +
      " • " +
      transfer.destination.bankAccount.lastFourAccountNumber;
  } else if (transfer.destination.wallet) {
    ret.Dst = "Moov Wallet"
  } else {
    ret.Dst = "Card"
  }

  return ret
}

export function transferDetails(transfer: any): View {
  const amount = +transfer.amount.value / 100;
  const status = transfer.status;
  const source = transfer.source.account.displayName;
  const sourceEmail = transfer.source.account.email;
  const destination = transfer.destination.account.displayName;
  const destinationEmail = transfer.destination.account.email;

  let header: string = resolveHeader(transfer)
  let details: TransferDetails = resolveDetails(transfer)
  //let sourceDetails: string = "Moov wallet";

  // if (transfer.source.bankAccount) {
  //   sourceDetails = transfer.source.bankAccount.bankName + "\n" +
  //     transfer.source.bankAccount.bankAccountType +
  //     " • " +
  //     transfer.source.bankAccount.lastFourAccountNumber;
  // }

  // let destinationDetails: string = "Moov wallet";

  // if (transfer.destination.bankAccount) {
  //   destinationDetails = transfer.destination.bankAccount.bankName + "\n" +
  //     transfer.destination.bankAccount.bankAccountType +
  //     " • " +
  //     transfer.destination.bankAccount.lastFourAccountNumber;
  // }

  return {
    type: "modal",
    title: {
      type: "plain_text",
      text: "Moov",
      emoji: true,
    },
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: header,
        },
      },
      {
        type: "divider",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*Source*",
        },
        fields: [
          {
            type: "mrkdwn",
            text: source + "\n" + sourceEmail,
          },
          {
            type: "mrkdwn",
            text: details.Src,
          },
        ],
      },
      {
        type: "divider",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*Destination*",
        },
        fields: [
          {
            type: "mrkdwn",
            text: destination + "\n" + destinationEmail,
          },
          {
            type: "mrkdwn",
            text: details.Dst,
          },
        ],
      },
      {
        type: "divider",
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: "*Amount*",
          },
          {
            type: "mrkdwn",
            text: " ",
          },
          {
            type: "mrkdwn",
            text: "*$" + amount.toFixed(2) + "*",
          },
        ],
      },
    ],
  };
}

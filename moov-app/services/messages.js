module.exports.message = async (transfer_data) => {

    const amount = transfer_data.data.transfer.amount.value
    const type = transfer_data.type
    const source = transfer_data.data.transfer.source.account.displayName
    const destination = transfer_data.data.transfer.destination.account.displayName
    const header = type === 'transfer.created' ? 'ACH transfer created' : 'ACH transfer completed :tada:'
    const description = type === 'transfer.created' ? "A transfer of *$" + amount + "* from *" + source + "s* to *" + destination + "* is pending." : "*" + source + "* sent *$" + amount + "* to *" + destination + "*."

    return  [
        {
            "type": "header",
            "text": {
                "type": "plain_text",
                "text": header,
                "emoji": true
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": description
            },
            "accessory": {
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "text": "Details",
                    "emoji": true
                },
                "value": "click_me_123",
                "action_id": "button-action"
            }
        }
    ]
}

module.exports.message_modal = async (transfer_data) => {
    
    const amount = transfer_data.data.transfer.amount.value
    const type = transfer_data.type
    const source = transfer_data.data.transfer.source.account.displayName
    const source_email = transfer_data.data.transfer.source.account.email
    const source_bank_account_name = transfer_data.data.transfer.source.bankAccount.bankName
    const source_bank_account_type = transfer_data.data.transfer.source.bankAccount.bankAccountType
    const source_bank_account_last_number = transfer_data.data.transfer.source.bankAccount.lastFourAccountNumber
    const destination = transfer_data.data.transfer.destination.account.displayName
    const destination_email = transfer_data.data.transfer.destination.account.email
    const destination_bank_account_name = transfer_data.data.transfer.destination.bankAccount.bankName
    const destination_bank_account_type = transfer_data.data.transfer.destination.bankAccount.bankAccountType
    const destination_bank_account_last_number = transfer_data.data.transfer.destination.bankAccount.lastFourAccountNumber    
    const header = type === 'transfer.created' ? 'ACH transfer created' : ':tada:  ACH transfer complete'


    return {
        "type": "modal",
        "title": {
            "type": "plain_text",
            "text": "My App",
            "emoji": true
        },
        "blocks": [
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": header
                }
            },
            {
                "type": "divider"
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "*Source*"
                },
                "fields": [
                    {
                        "type": "mrkdwn",
                        "text": source + "\n" + source_email
                    },
                    {
                        "type": "mrkdwn",
                        "text": source_bank_account_name + "\n" + source_bank_account_type + " • " + source_bank_account_last_number
                    }
                ]
            },
            {
                "type": "divider"
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "*Destination*"
                },
                "fields": [
                    {
                        "type": "mrkdwn",
                        "text": destination + "\n" + destination_email
                    },
                    {
                        "type": "mrkdwn",
                        "text": destination_bank_account_name + "\n" + destination_bank_account_type + " • " + destination_bank_account_last_number
                    }
                ]
            },
            {
                "type": "divider"
            },
            {
                "type": "section",
                "fields": [
                    {
                        "type": "mrkdwn",
                        "text": "*Amount*"
                    },
                    {
                        "type": "mrkdwn",
                        "text": " "
                    },
                    {
                        "type": "mrkdwn",
                        "text": "*$" + amount + ".00 USD*"
                    }
                ]
            }
        ]
    }
}
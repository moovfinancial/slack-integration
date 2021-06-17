# Moov local environment

1.- Start database docker compose (port: 3306)

```shell
docker compose up --build -d
```

2.- Start kafka docker compose (port: 9092)

```shell
docker compose up --build -d
```

3.- Start event-producer (port: 4000)

```shell
npm run dev
```

3.1.- Create the topic *transfer-events*

```shell
curl --location --request POST 'http://localhost:4000/admin/create-topic' \
--header 'Content-Type: application/json' \
--data-raw '{
    "topicName": "transfer-events"
}'
```

3.2.- Send a transfer event test

```shell
curl --location --request POST 'http://localhost:4000/producer/events' \
--header 'Content-Type: application/json' \
--data-raw '{
  "transfer_id": "xxxxx",
  "customer_id": 1,
  "amount": 3,
  "destination": 11232,
  "description": 5,
  "status": "success"
}'
```

4.- Start auth-google (port: 3000) **(Pending)**

```shell
npm run dev
```

5.- Start slack-app (port: 8080)

```shell
npm run dev
```

6.- Start ngrok ./ngrok http -region=us -hostname=my.domain.com 3000

7.- Install slack app by http://my.domain.com/slack/install

8.- Bind slack user with application user by /moov auth **(Pending)**

9.- Create a channel and add slack app

10.- Search slack channels

```shell
curl --location --request POST 'http://localhost:3000/list-slack-channels' \
--header 'Content-Type: application/json' \
--data-raw '{
    "customer_id": 1
}'
```

11.- Select the new channel created

```shell
curl --location --request POST 'http://localhost:3000/set-slack-channel' \
--header 'Content-Type: application/json' \
--data-raw '{
    "customer_id": 1,
    "channel_id": "C02567EAV5G"
}'
```

12.- Send a processed transfer event

```shell
curl --location --request POST 'http://localhost:4000/producer/events' \
--header 'Content-Type: application/json' \
--data-raw '{
  "transfer_id": "xxxxx",
  "customer_id": 1,
  "amount": 3,
  "destination": 11232,
  "description": 5,
  "status": "processed"
}'
```

13.- Send a failed transfer event

```shell
curl --location --request POST 'http://localhost:4000/producer/events' \
--header 'Content-Type: application/json' \
--data-raw '{
  "transfer_id": "xxxxx",
  "customer_id": 1,
  "amount": 3,
  "destination": 11232,
  "description": 5,
  "status": "failed"
}'
```

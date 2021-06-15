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

4.- Start slack-consumer

```shell
npm run dev
```

5.- Start auth-google (port: 3000)

```shell
npm run dev
```

6.- Start slack-app (port: 8080)

```shell
npm run dev
```

7.- Start ngrok ./ngrok http -region=us -hostname=my.domain.com 3000

8.- Install slack app by http://my.domain.com/slack/install

9.- Bind slack user with application user by /moov auth

10.- Send a transfer event (channel app)

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

11.- Select a specific slack channel

3.2.- Send a new transfer event test

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

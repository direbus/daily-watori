# daily-watori

Discord bot that helps you manage fresh and relevant tweets from [Twitter](https://twitter.com/home), where you can choose to retweet them or not. Empowers the [Daily World Trigger account](https://twitter.com/daily_watori).

> This bot is still on testing phase, please do not clone it yet.

## Requirements

To get this bot up and running, you'll need:

1. A running discord server.
2. A Discord's developer account. [Get one from here](https://discord.com/developers/)
3. A Twitter developer account. [Get one from here](https://developer.twitter.com/en/apply-for-access)
4. A Twitter account which your retweets will be sent from.
5. A MongoDB server. For development purposes, it'll be handled using a Docker image.

## Development

> Make sure that you have invited your bot!

1. Clone this repository.
2. Create a new `.env` file in the project's root directory, use `.env.example` as a reference.
2. Make sure that you have started your local docker instance.
3. Activate `docker-compose`, which can be done by executing `docker-compose up` from your terminal
4. Do a database migration by executing `npm run migration:up` from your terminal.
5. After the migration is complete, run the bot by executing `npm run dev` from your terminal, the bot should appear to be online on your server.

## Configuration

The bot can be configured from `bot.config.json` on the project's root directory. Below is the list of available options:

> TO BE DOCUMENTED LATER

## Logging

By default, the bot creates a log about all of its important activities on `bot.log` in the project's root directory. The logging is powered by [pino](https://getpino.io/), so performance shouldn't be an issue.

## Authors

1. [chez14](https://github.com/chez14)
2. [Namchee](https://github.com/Namchee)

## License

This project is licensed under the [MIT license](./LICENSE)

import { GrantConfig } from "grant";

export const grantConfig: GrantConfig = {
  defaults: {
    origin: process.env.API_HOSTNAME,
    transport: "state",
    state: true,
    prefix: "/connect/with"
  },
  twitter: {
    key: process.env.API_TWITTER_KEY,
    secret: process.env.API_TWITTER_SECRET,
    scope: "read",
    overrides: {
      publish_account: {
        scope: "write",
      }
    }
  },
  discord: {
    key: process.env.API_DISCORD_CLIENT_ID,
    secret: process.env.API_DISCORD_SECRET,
    scope: ['email', 'identify']
  },
  google: {
    key: process.env.API_GOOGLE_KEY,
    secret: process.env.API_GOOGLE_SECRET,
    scope: ['openid', 'https://www.googleapis.com/auth/userinfo.email']
  }
}

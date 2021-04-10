# v0.3.1 (Sat Apr 10 2021)

#### ⚠️ Pushed to `master`

- fix: migration will starts with migration now ([@chez14](https://github.com/chez14))

#### Authors: 1

- Chris Qiang ([@chez14](https://github.com/chez14))

---

# v0.3.0 (Mon Apr 05 2021)

#### 🚀 Enhancement

- Add exhaustion feature for failed retweet attemps [#32](https://github.com/direbus/daily-watori/pull/32) ([@chez14](https://github.com/chez14))

#### Authors: 1

- Chris Qiang ([@chez14](https://github.com/chez14))

---

# v0.2.2 (Thu Mar 18 2021)

#### ⚠️ Pushed to `master`

- ci(conventional-pr): Update access token to use repo-defined access token. ([@chez14](https://github.com/chez14))

#### Authors: 1

- Chris Qiang ([@chez14](https://github.com/chez14))

---

# v0.2.1 (Sat Mar 13 2021)

#### 🐛 Bug Fix

- refactor: Revert "feat: Add build step on migration files to reduce file size from ts-node" [#29](https://github.com/direbus/daily-watori/pull/29) ([@chez14](https://github.com/chez14))

#### Authors: 1

- Chris Qiang ([@chez14](https://github.com/chez14))

---

# v0.2.0 (Fri Mar 12 2021)

#### 🚀 Enhancement

- feat: Add build step on migration files to reduce file size from ts-node [#20](https://github.com/direbus/daily-watori/pull/20) ([@Namchee](https://github.com/Namchee))

#### 🧪 Tests

- feat: Add workflow to ensure conventional style on pull requests [#21](https://github.com/direbus/daily-watori/pull/21) ([@Namchee](https://github.com/Namchee))

#### Authors: 1

- Cristopher ([@Namchee](https://github.com/Namchee))

---

# v0.1.2 (Sat Feb 06 2021)

#### ⚠️ Pushed to `master`

- Install package dependencies for the migration parts ([@chez14](https://github.com/chez14))

#### Authors: 1

- Chris Qiang ([@chez14](https://github.com/chez14))

---

# v0.1.1 (Sat Feb 06 2021)

#### ⚠️ Pushed to `master`

- fix production build ([@chez14](https://github.com/chez14))

#### Authors: 1

- Chris Qiang ([@chez14](https://github.com/chez14))

---

# v0.1.0 (Sun Jan 31 2021)

:tada: This release contains work from new contributors! :tada:

Thanks for all your work!

:heart: Chris Qiang ([@chez14](https://github.com/chez14))

:heart: Cristopher ([@Namchee](https://github.com/Namchee))

#### 🚀 Enhancement

- Add server quick info to help debug container [#4](https://github.com/Namchee/daily-watori/pull/4) ([@chez14](https://github.com/chez14))

#### 🐛 Bug Fix

- Dependencies update [#13](https://github.com/Namchee/daily-watori/pull/13) ([@chez14](https://github.com/chez14))
- feat: Add linter to adhere coding standards [#15](https://github.com/Namchee/daily-watori/pull/15) ([@Namchee](https://github.com/Namchee))
- Add Docker Build Pipeline [#3](https://github.com/Namchee/daily-watori/pull/3) ([@chez14](https://github.com/chez14))

#### ⚠️ Pushed to `master`

- Readd the linter script ([@chez14](https://github.com/chez14))
- feat: Add clear command ([@Namchee](https://github.com/Namchee))
- chore: Add build scripts ([@Namchee](https://github.com/Namchee))
- docs: Add basic documentation ([@Namchee](https://github.com/Namchee))
- chore: Merge dependency patch ([@Namchee](https://github.com/Namchee))
- fix: Fix tweet rejection status indicator ([@Namchee](https://github.com/Namchee))
- feat: Implement better logging service ([@Namchee](https://github.com/Namchee))
- refactor: Move freshness threshold to config ([@Namchee](https://github.com/Namchee))
- fix: Remove :id params from retweet function ([@Namchee](https://github.com/Namchee))
- refactor: Replace message.reply with channel.send as it's less obstructive ([@Namchee](https://github.com/Namchee))
- feat: Add extended help feature ([@Namchee](https://github.com/Namchee))
- fix: Remove additionalProperties options from schema to avoid auto _id generation error ([@Namchee](https://github.com/Namchee))
- feat: Ignore all messages from irrelevant channels ([@Namchee](https://github.com/Namchee))
- refactor: Remove manual filtering and rely on API to filter tweets ([@Namchee](https://github.com/Namchee))
- fix: Flip boolean operator on 'watch' command ([@Namchee](https://github.com/Namchee))
- chore: Bootstraping bot initialization step ([@Namchee](https://github.com/Namchee))
- feat: Add retweet features ([@Namchee](https://github.com/Namchee))
- fix: Add Tweet URL to fresh tweet notifier ([@Namchee](https://github.com/Namchee))
- feat: Connect scheduled fetch service to event hub ([@Namchee](https://github.com/Namchee))
- refactor: Restructure project files ([@Namchee](https://github.com/Namchee))
- fix: Fix docker configuration ([@Namchee](https://github.com/Namchee))
- refactor: Migrate to Mongo as ACIDity is not a requirement ([@Namchee](https://github.com/Namchee))
- feat: Add list command to show the watchlist ([@Namchee](https://github.com/Namchee))
- feat: Add watch and unwatch command ([@Namchee](https://github.com/Namchee))
- feat: Add help command ([@Namchee](https://github.com/Namchee))
- refactor: Restructure interfaces and import for cleaner file structure ([@Namchee](https://github.com/Namchee))
- chore: Remove unnecessary stuff from docker file ([@Namchee](https://github.com/Namchee))
- chore: Add direct migrations script and fix migrations issues ([@Namchee](https://github.com/Namchee))
- feat: Add migrations ([@Namchee](https://github.com/Namchee))
- refactor: Remove image URLs in favor of direct embed ([@Namchee](https://github.com/Namchee))
- refactor: Remodel database entities ([@Namchee](https://github.com/Namchee))
- feat: Reintroduce repository for all entities ([@Namchee](https://github.com/Namchee))
- feat: Add user entity and revert repository as it's simple enough ([@Namchee](https://github.com/Namchee))
- feat: Add skeleton repository ([@Namchee](https://github.com/Namchee))
- refactor: Remove ormconfig.json as it's unused ([@Namchee](https://github.com/Namchee))
- refactor: Change loose entity to typeorm entities ([@Namchee](https://github.com/Namchee))
- feat: Add docker minimal setup ([@Namchee](https://github.com/Namchee))
- chore(deps): Bump dependencies ([@Namchee](https://github.com/Namchee))
- refactor: Remove discord.ts as it doesn't have custom class parameter capability ([@Namchee](https://github.com/Namchee))
- feat: Construct twitter service class from exported functions ([@Namchee](https://github.com/Namchee))
- feat: Add nodemon for dev purposes ([@Namchee](https://github.com/Namchee))
- refactor: Decouple env requirements from dev env setup ([@Namchee](https://github.com/Namchee))
- First commit :tada: ([@Namchee](https://github.com/Namchee))

#### 🔩 Dependency Updates

- chore(deps): Bump actions/cache from v1 to v2.1.3 [#6](https://github.com/Namchee/daily-watori/pull/6) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- chore(deps): Bump actions/setup-node from v1 to v2.1.4 [#5](https://github.com/Namchee/daily-watori/pull/5) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- chore(deps): Bump ini from 1.3.5 to 1.3.7 [#1](https://github.com/Namchee/daily-watori/pull/1) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 3

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Chris Qiang ([@chez14](https://github.com/chez14))
- Cristopher ([@Namchee](https://github.com/Namchee))

---

# v0.0.2 (Sun Jan 31 2021)

:tada: This release contains work from new contributors! :tada:

Thanks for all your work!

:heart: Cristopher ([@Namchee](https://github.com/Namchee))

:heart: Chris Qiang ([@chez14](https://github.com/chez14))

#### 🐛 Bug Fix

- feat: Add linter to adhere coding standards [#15](https://github.com/Namchee/daily-watori/pull/15) ([@Namchee](https://github.com/Namchee))
- Add Docker Build Pipeline [#3](https://github.com/Namchee/daily-watori/pull/3) ([@chez14](https://github.com/chez14))

#### ⚠️ Pushed to `master`

- feat: Add clear command ([@Namchee](https://github.com/Namchee))
- chore: Add build scripts ([@Namchee](https://github.com/Namchee))
- docs: Add basic documentation ([@Namchee](https://github.com/Namchee))
- chore: Merge dependency patch ([@Namchee](https://github.com/Namchee))
- fix: Fix tweet rejection status indicator ([@Namchee](https://github.com/Namchee))
- feat: Implement better logging service ([@Namchee](https://github.com/Namchee))
- refactor: Move freshness threshold to config ([@Namchee](https://github.com/Namchee))
- fix: Remove :id params from retweet function ([@Namchee](https://github.com/Namchee))
- refactor: Replace message.reply with channel.send as it's less obstructive ([@Namchee](https://github.com/Namchee))
- feat: Add extended help feature ([@Namchee](https://github.com/Namchee))
- fix: Remove additionalProperties options from schema to avoid auto _id generation error ([@Namchee](https://github.com/Namchee))
- feat: Ignore all messages from irrelevant channels ([@Namchee](https://github.com/Namchee))
- refactor: Remove manual filtering and rely on API to filter tweets ([@Namchee](https://github.com/Namchee))
- fix: Flip boolean operator on 'watch' command ([@Namchee](https://github.com/Namchee))
- chore: Bootstraping bot initialization step ([@Namchee](https://github.com/Namchee))
- feat: Add retweet features ([@Namchee](https://github.com/Namchee))
- fix: Add Tweet URL to fresh tweet notifier ([@Namchee](https://github.com/Namchee))
- feat: Connect scheduled fetch service to event hub ([@Namchee](https://github.com/Namchee))
- refactor: Restructure project files ([@Namchee](https://github.com/Namchee))
- fix: Fix docker configuration ([@Namchee](https://github.com/Namchee))
- refactor: Migrate to Mongo as ACIDity is not a requirement ([@Namchee](https://github.com/Namchee))
- feat: Add list command to show the watchlist ([@Namchee](https://github.com/Namchee))
- feat: Add watch and unwatch command ([@Namchee](https://github.com/Namchee))
- feat: Add help command ([@Namchee](https://github.com/Namchee))
- refactor: Restructure interfaces and import for cleaner file structure ([@Namchee](https://github.com/Namchee))
- chore: Remove unnecessary stuff from docker file ([@Namchee](https://github.com/Namchee))
- chore: Add direct migrations script and fix migrations issues ([@Namchee](https://github.com/Namchee))
- feat: Add migrations ([@Namchee](https://github.com/Namchee))
- refactor: Remove image URLs in favor of direct embed ([@Namchee](https://github.com/Namchee))
- refactor: Remodel database entities ([@Namchee](https://github.com/Namchee))
- feat: Reintroduce repository for all entities ([@Namchee](https://github.com/Namchee))
- feat: Add user entity and revert repository as it's simple enough ([@Namchee](https://github.com/Namchee))
- feat: Add skeleton repository ([@Namchee](https://github.com/Namchee))
- refactor: Remove ormconfig.json as it's unused ([@Namchee](https://github.com/Namchee))
- refactor: Change loose entity to typeorm entities ([@Namchee](https://github.com/Namchee))
- feat: Add docker minimal setup ([@Namchee](https://github.com/Namchee))
- chore(deps): Bump dependencies ([@Namchee](https://github.com/Namchee))
- refactor: Remove discord.ts as it doesn't have custom class parameter capability ([@Namchee](https://github.com/Namchee))
- feat: Construct twitter service class from exported functions ([@Namchee](https://github.com/Namchee))
- feat: Add nodemon for dev purposes ([@Namchee](https://github.com/Namchee))
- refactor: Decouple env requirements from dev env setup ([@Namchee](https://github.com/Namchee))
- First commit :tada: ([@Namchee](https://github.com/Namchee))

#### 🔩 Dependency Updates

- chore(deps): Bump ini from 1.3.5 to 1.3.7 [#1](https://github.com/Namchee/daily-watori/pull/1) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 3

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Chris Qiang ([@chez14](https://github.com/chez14))
- Cristopher ([@Namchee](https://github.com/Namchee))

---

# v0.0.1 (Sat Jan 30 2021)

:tada: This release contains work from new contributors! :tada:

Thanks for all your work!

:heart: Chris Qiang ([@chez14](https://github.com/chez14))

:heart: Cristopher ([@Namchee](https://github.com/Namchee))

#### 🐛 Bug Fix

- Add Docker Build Pipeline [#3](https://github.com/Namchee/daily-watori/pull/3) ([@chez14](https://github.com/chez14))

#### ⚠️ Pushed to `master`

- feat: Add clear command ([@Namchee](https://github.com/Namchee))
- chore: Add build scripts ([@Namchee](https://github.com/Namchee))
- docs: Add basic documentation ([@Namchee](https://github.com/Namchee))
- chore: Merge dependency patch ([@Namchee](https://github.com/Namchee))
- fix: Fix tweet rejection status indicator ([@Namchee](https://github.com/Namchee))
- feat: Implement better logging service ([@Namchee](https://github.com/Namchee))
- refactor: Move freshness threshold to config ([@Namchee](https://github.com/Namchee))
- fix: Remove :id params from retweet function ([@Namchee](https://github.com/Namchee))
- refactor: Replace message.reply with channel.send as it's less obstructive ([@Namchee](https://github.com/Namchee))
- feat: Add extended help feature ([@Namchee](https://github.com/Namchee))
- fix: Remove additionalProperties options from schema to avoid auto _id generation error ([@Namchee](https://github.com/Namchee))
- feat: Ignore all messages from irrelevant channels ([@Namchee](https://github.com/Namchee))
- refactor: Remove manual filtering and rely on API to filter tweets ([@Namchee](https://github.com/Namchee))
- fix: Flip boolean operator on 'watch' command ([@Namchee](https://github.com/Namchee))
- chore: Bootstraping bot initialization step ([@Namchee](https://github.com/Namchee))
- feat: Add retweet features ([@Namchee](https://github.com/Namchee))
- fix: Add Tweet URL to fresh tweet notifier ([@Namchee](https://github.com/Namchee))
- feat: Connect scheduled fetch service to event hub ([@Namchee](https://github.com/Namchee))
- refactor: Restructure project files ([@Namchee](https://github.com/Namchee))
- fix: Fix docker configuration ([@Namchee](https://github.com/Namchee))
- refactor: Migrate to Mongo as ACIDity is not a requirement ([@Namchee](https://github.com/Namchee))
- feat: Add list command to show the watchlist ([@Namchee](https://github.com/Namchee))
- feat: Add watch and unwatch command ([@Namchee](https://github.com/Namchee))
- feat: Add help command ([@Namchee](https://github.com/Namchee))
- refactor: Restructure interfaces and import for cleaner file structure ([@Namchee](https://github.com/Namchee))
- chore: Remove unnecessary stuff from docker file ([@Namchee](https://github.com/Namchee))
- chore: Add direct migrations script and fix migrations issues ([@Namchee](https://github.com/Namchee))
- feat: Add migrations ([@Namchee](https://github.com/Namchee))
- refactor: Remove image URLs in favor of direct embed ([@Namchee](https://github.com/Namchee))
- refactor: Remodel database entities ([@Namchee](https://github.com/Namchee))
- feat: Reintroduce repository for all entities ([@Namchee](https://github.com/Namchee))
- feat: Add user entity and revert repository as it's simple enough ([@Namchee](https://github.com/Namchee))
- feat: Add skeleton repository ([@Namchee](https://github.com/Namchee))
- refactor: Remove ormconfig.json as it's unused ([@Namchee](https://github.com/Namchee))
- refactor: Change loose entity to typeorm entities ([@Namchee](https://github.com/Namchee))
- feat: Add docker minimal setup ([@Namchee](https://github.com/Namchee))
- chore(deps): Bump dependencies ([@Namchee](https://github.com/Namchee))
- refactor: Remove discord.ts as it doesn't have custom class parameter capability ([@Namchee](https://github.com/Namchee))
- feat: Construct twitter service class from exported functions ([@Namchee](https://github.com/Namchee))
- feat: Add nodemon for dev purposes ([@Namchee](https://github.com/Namchee))
- refactor: Decouple env requirements from dev env setup ([@Namchee](https://github.com/Namchee))
- First commit :tada: ([@Namchee](https://github.com/Namchee))

#### 🔩 Dependency Updates

- chore(deps): Bump ini from 1.3.5 to 1.3.7 [#1](https://github.com/Namchee/daily-watori/pull/1) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 3

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Chris Qiang ([@chez14](https://github.com/chez14))
- Cristopher ([@Namchee](https://github.com/Namchee))

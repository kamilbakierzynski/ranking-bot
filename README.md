# Discord bot

Run scripts from root dir (runs for all packages):
```
yarn commit // Runs commitizen commit
yarn new-version // Creates new version

yarn lint
yarn lint:fix

yarn prettier
yarn prettier:fix

yarn util:precommit // Runs lint:fix && prettier:fix
yarn util:postpull // Runs yarn install
```

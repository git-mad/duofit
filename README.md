# duofit

when you first clone, use "npm ci" instead of "npm install" to install the expo dependencies (i think)

then...

to run linter: `yarn lint`

to run tests: `yarn test`

to run: `yarn start`

## commit messages

Whenever you commit, husky runs the linter and tests automatically to ensure that all tests pass. You commit message should also be in the format {type}: {message}, where type is one of [build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test] 

# duofit

0. `git clone xxxx`
1. `cd duofit`
2. when you first clone, use `npm ci` instead of `npm install` to install the expo dependencies (i think)

3. then...
4. `npm start`

> ⚠️ Warning
> 
> React Native Firebase disables expo go, you must run a development build with `yarn ios` or `yarn android`  (I think, expo go could still work on android).

## commit messages

Whenever you commit, husky runs the linter and tests automatically to ensure that all tests pass. You commit message should also be in the format `{type}: {message}`, where type is one of `[build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test]`

(refer to [https://www.conventionalcommits.org/en/v1.0.0/](https://www.conventionalcommits.org/en/v1.0.0/))



### Resources

[starting react project](https://dev.to/vladimirvovk/starting-react-native-project-in-2023-2le)

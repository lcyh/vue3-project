# vue3-project

## 技术栈

[@vue/cli](https://cli.vuejs.org/zh/guide/installation.html)
```
采用 @vue/cli 搭建的 vue3 + vue-router@next + vuex@next 项目
```

## EditorConfig 配置
```
EditorConfig 有助于为不同 IDE 编辑器上处理同一项目的多个开发人员维护一致的编码风格
```
## prettier 代码风格 
```
新加 .prettierrc配置文件
安装 prettier
```
## eslint 规范代码质量 
```
eslint airbnb
```

## husky + lint-staged 代码规范 
```js
1.husky —— Git Hook 工具，可以设置在 git 各个阶段（pre-commit、commit-msg、pre-push 等）触发我们的命令
2.lint-staged —— 在 git 暂存的文件上运行 linters
```
## husky 配置
[husky配置文档](https://typicode.github.io/husky/#/?id=usage)
```
使用 husky-init 命令快速在项目初始化一个 husky 配置
npx husky-init && yarn 
这行命令做了四件事：
```
>1.安装 husky 到开发依赖
2.在项目根目录下创建 .husky 目录
3.在 .husky 目录创建 pre-commit hook，并初始化 pre-commit 命令为 npm 
test
4.修改 package.json 的 scripts，增加 "prepare": "husky install"

修改 .husky/pre-commit hook 文件的触发命令：
```
eslint --fix ./src --ext .vue,.js,.ts
```
>上面这个 pre-commit hook 文件的作用是：当我们执行 git commit -m "xxx" 时，会先对 src 目录下所有的 .vue、.js、.ts  文件执行 eslint --fix 命令，如果 ESLint 通过，成功 commit，否则终止 commit。

## 配置 lint-staged
>lint-staged 这个工具一般结合 husky 来使用，它可以让 husky 的 hook 触发的命令只作用于 git add那些文件（即 git 暂存区的文件），而不会影响到其他文件

```js
1.安装 lint-staged
yarn add lint-staged -D
2.在 package.json里增加 lint-staged 配置项
"lint-staged": {
  "*.{vue,js,ts,.jsx,.tsx}": "eslint --fix"
},
这行命令表示：只对 git 暂存区的 .vue、.js、.ts 文件执行 eslint --fix
3.修改 .husky/pre-commit hook 的触发命令为：npx lint-staged

```

## 集成 Commitizen 实现规范提交
```js
1.安装 Commitizen
yarn add commitizen -D
2.成功安装 Commitizen 后，我们用 cz-conventional-changelog 适配器来初始化项目：
npx commitizen init cz-conventional-changelog --save-dev --save-exact
```
这行命令做了两件事：
* 安装 cz-conventional-changelog 到开发依赖（devDependencies）
* 在 package.json 中增加了 config.commitizen
```
"config": {
  "commitizen": {
    "path": "./node_modules/cz-conventional-changelog"
  }
}

```
## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Run your unit tests

```
yarn test:unit
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

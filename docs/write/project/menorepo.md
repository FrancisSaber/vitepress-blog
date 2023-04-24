---
title: menorepot
author: underwood
date: '2023-04-07'
categories:
  - project
tags:
  - 项目管理
  - menorepo
  - 单一代码库
---

#

## 工具

1. 根目录下创建`pnpm-workspace.yaml`
   <font color="orange">意思是，将 `packages` 目录下所有的目录都作为单独的包进行管理。</font>

   ```yaml
   packages:
     # all packages in subdirs of packages/ and components/
     - 'packages/**'
   ```

2. 创建 packages 存放各个具体的项目，公共业务可放在 packages>shared 下

3.

## 指令

    1. pnpm add [packName] -w 安装到根目录下依赖
    2. pnpm add [packName] -w -D 安装根目录本地打包
    3. pnpm add [packName] -w -S 安装根目录线上打包
    4. pnpm run -r 递归执行 build
    4. pnpm run -r --filter <projectName> <scriptName>

## 子项目安装

- 可以直接到具体目录下安装

- 通过参数指定安装

  ```bash
  # 目录结构为 root>packages>SSR>package.json  name属性值为ssr
  # 执行完下行指令后，会在SSR子项目安装包，不会在目录安装
  $ pnpm add -r --filter [ssr]
  ```

-

## TS

```bash
$ pnpm add typescript -w
$ pnpm tsc --init
```

## 提示

- 不加 -D -S 默认为 -S

https://juejin.cn/post/6988464604309356552

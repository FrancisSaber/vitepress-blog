# 推送

```bash
$ git push resposity master # reposity 仓库名 master分支名
```

# 脚本

  <a href="https://github.com/FrancisSaber/SSG-Blog/blob/master/.github/workflows/deploy.yml">
  <img alt="Deploy to AWS Elastic Beanstalk" src="https://github.com/FrancisSaber/SSG-Blog/blob/master/.github/public/bh3.JPG">
</a>

# 文档

[官网](https://vitepress.dev/)
[参考](https://github.com/Jack-Star-T/vitePress)

# 部署

# 坑

- node 版本需要大于 16.0.2 [PR](https://github.com/firebase/firebase-tools/issues/4598)

- 需要将仓库设为公开，将能部署静态网页

- **目录结构**

  > ```css
  > - docs
  > 	- index.md
  > 	- .vitepress
  > 		- config.ts
  > ```
  >
  > - `vitepress`会根据`package.json`运行参数找项目入口，默认根目录，如果想修改可以在命令里修改
  >
  > - 改为 docs 目录下
  >
  >   ```json
  >   {
  >     "script": {
  >       "start": "vitepress dev docs",
  >       "build": "vitepress build docs"
  >     }
  >   }
  >   ```
  >
  > -

-

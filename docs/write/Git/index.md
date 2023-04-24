---
title: Git笔记1
author: ccy
date: '2023-04-12'
showAccessNumber: true
categories:
  - Git
tags:
  - Git
---

# knowledge point

## rebase & merge

### 用法

> **想要将当前分支合并到另一个分支**
>
> - 方式一
>
>   ```bash
>   # current branch feature1
>   # 想要将当前分支合并到 feature
>   $ git checkout feature
>   $ git pull --rebase origin feature # git fetch origin master & git rebase origin/master 两条件命令的合并。
>   ```
>
> - 方式二
>
> ```bash
> # current branch feature1
> # 想要将当前分支合并到 master
> $ git checkout master
> $ git merge master
> ```
>
> <font color="orange">在上述例子，必须保证`master`  和  `feature`同步了最新的远程分支内容</font>

### 区别

> 在 `rebase` 操作中，源分支的提交会被“重新播放”在目标分支的最新提交之上，形成一个新的线性提交历史。使用 rebase 操作可以使提交历史更加干净整洁，分指数呈线性，但是需要注意的是，rebase 操作会改变提交历史（提交哈希会改变），因此需要谨慎使用。
>
> 在 `merge` 操作中，源分支和目的分支会基于分支点按时间顺序将提交排序，并生成一个新的提交。分指数呈分线性。
>
> 两种方式产生冲突都需要解决。对于 rebase 执行 `git rebase --continue` 继续，对于 merge，执行 `git merge --continue`，但`merge`可能会自动提交。可以使用 `git merge --no-commit` 命令来禁止 Git 自动提交中间提交。
>
> 如下图。 他们都是基于分支的共同公共祖先开始的，这里是 C2
>
> <img src="https://cdn.jsdelivr.net/gh/FrancisSaber/image/markdown-Image202303261543796.png" alt="image-20230326154325571" style="zoom:67%;" />![image-20230326154412694](https://cdn.jsdelivr.net/gh/FrancisSaber/image/markdown-Image202303261544787.png)
>
> 基于 C2 切出了 dev 分支，同时`master`也有了新的提交记录。
>
> <img src="https://cdn.jsdelivr.net/gh/FrancisSaber/image/markdown-Image202303261544787.png" alt="image-20230326154412694" style="zoom:67%;" />
>
> **对于 rebase**
>
> ![image-20230326154715719](https://cdn.jsdelivr.net/gh/FrancisSaber/image/markdown-Image202303261547806.png)
>
> **对于 merge**
>
> <img src="https://cdn.jsdelivr.net/gh/FrancisSaber/image/markdown-Image202303261548888.png" alt="image-20230326154840792" style="zoom:80%;" />

## pull

​ 这个命令是 `git fetch & git merge` 的合并。

### 用法

> **默认行为**
>
> ```bash
> # current dev branch 当前在dev分支
> $ git pull <仓库名>/<分支名>  # git pull 后面不加内容的话默认是基于当前分支
> ```
>
> ```bash
> # 上面的等价于 假设远程仓库名为 origin
> $ git fetch origin/dev
> $ git merge origin/dev
> ```
>
> <font color="orange">`git pull`默认使用 merge，可以如下修改默认行为</font>
>
> ```bash
> $ git config --global pull.rebase true
> ```
>
> **加上 rebase**
>
> ```bash
> # git pull --rebase origin/master
> ```
>
> ```bash
> # 上面等价于
> $ git fetch origin/master
> $ git rebase origin/master
> ```

---
title: Nuxt
author: underwood
date: '2023-04-07'
categories:
  - Nuxt
tags:
  - Vue3
  - 服务端渲染
---

# Start

```bash
$ pnpm dlx nuxi init <project-name>
$ cd <project-name>
$ pnpm install
$ pnpm dev -o
```

# 自动导入

`Nuxt3`中，任何可能的组件和组合函数都是自动引入的。

https://nuxt.com/docs/migration/configuration#typescript

[自动导入](https://nuxt.com/docs/guide/concepts/auto-imports)

You can look at `.nuxt/types/components.d.ts` and `.nuxt/types/imports.d.ts` to see how Nuxt has resolved your components and composable auto-imports.

# 元标签

## 管理元标签

- 通过`nuxt.config`配置
- 通过组合函数`composable` `useHead`
- 通过全局元组件
- 可以定制 `title`, `titleTemplate`, `base`, `script`, `noscript`, `style`, `meta`, `link`, `htmlAttrs` and `bodyAttrs`.
- [more info about meta tag](https://nuxt.com/docs/getting-started/seo-meta)

## 内置元组件

- 使用大写开头的标签以区别原生`HTML`标签
- 这些组件可用于任何页面模板

```vue
<template>
  <div>
    <Head>
      <Title>My App</Title>
      <Meta name="description" content="My app description" />
    </Head>
    <!-- -->
  </div>
</template>
```

## Options API 方式

```vue
<script>
// if using options API `head` method you must use `defineNuxtComponent`
export default defineNuxtComponent({
  head(nuxtApp) {
    // `head` receives the nuxt app but cannot access the component instance
    return {
      meta: [
        {
          name: 'description',
          content: 'This is my page description.',
        },
      ],
    }
  },
})
</script>
```

# 配置

```ts
defineNuxtConfig
```

## 配置

```ts
// defineNuxtConfig 是全局可用的，无需导入
```

## 读取配置

```vue
<template>
  <div>
    <!-- <NuxtWelcome /> -->
    <NuxtPage></NuxtPage>
  </div>
</template>

<script setup>
// 两个hook方法无需导入
const runtimeConfig = useRuntimeConfig()
const appConfig = useAppConfig()
</script>
```

## 外部配置文件

`Nuxt` 使用 `nuxt.config.ts file` 作为唯一的可信任配置，跳过读取其他的配置文件。在构建你的项目期间， 你可能需要对一些常见配置项进行定制，可以通过配置`nuxt.config` 文件下对象对应的`key` 所表示的值。如下

| Name                               | Config File             | How To Configure                                                                                    |
| ---------------------------------- | ----------------------- | --------------------------------------------------------------------------------------------------- |
| [Nitro](https://nitro.unjs.io/)    | ~~`nitro.config.ts`~~   | Use [`nitro`](https://nuxt.com/docs/api/configuration/nuxt-config#nitro) key in `nuxt.config`       |
| [Vite](https://vitejs.dev/)        | ~~`vite.config.ts`~~    | Use [`vite`](https://nuxt.com/docs/api/configuration/nuxt-config#vite) key in `nuxt.config`         |
| [webpack](https://webpack.js.org/) | ~~`webpack.config.ts`~~ | Use [`webpack`](https://nuxt.com/docs/api/configuration/nuxt-config#webpack-1) key in `nuxt.config` |

**其他配置**

| Name                                          | Config File          | How To Configure                                                                       |
| --------------------------------------------- | -------------------- | -------------------------------------------------------------------------------------- |
| [TypeScript](https://www.typescriptlang.org/) | `tsconfig.json`      | [More Info](https://nuxt.com/docs/guide/concepts/typescript#nuxttsconfigjson)          |
| [ESLint](https://eslint.org/)                 | `.eslintrc.js`       | [More Info](https://eslint.org/docs/latest/user-guide/configuring/configuration-files) |
| [Prettier](https://prettier.io/)              | `.prettierrc.json`   | [More Info](https://prettier.io/docs/en/configuration.html)                            |
| [Stylelint](https://stylelint.io/)            | `.stylelintrc.json`  | [More Info](https://stylelint.io/user-guide/configure)                                 |
| [TailwindCSS](https://tailwindcss.com/)       | `tailwind.config.js` | [More Info](https://tailwindcss.nuxt.dev/tailwind/config/)                             |
| [Vitest](https://vitest.dev/)                 | `vitest.config.ts`   | [More Info](https://vitest.dev/config/)                                                |

# Views

​ `Nuxt`提供几个组件层实现应用用户视图

​ 默认会将`App.vue`视为入并渲染于应用程序的每个路由。

`Nuxt`在幕后实现了类似 main.js 创建一个应用的操作

## Components

​ 大多数用户视图组件是可复用的，无需具体引入，在`compoents`目录下创建这个组件即可在页面实用。

​ <font color="orange">`Pages`目录下的文件结构表示了具体的路由模式</font>

### NuxtLayout

- Layout 是围绕包含多个页面的公共用户界面的页面的包装，例如页眉和页脚显示。
- 如果是单一布局推荐实用`NuxtPage`组件
- `layouts/default.vue`是默认组件。

#### 用法

> **默认 layout**
>
> ```vue
> // layouts/default.vue
> <template>
>   <div>
>     <AppHeader />
>     <slot />
>     <AppFooter />
>   </div>
> </template>
> ```
>
> ```vue
> // pages/index.vue
> <template>
>   <div>
>       <!-->不指定name表示default组件<-->
>       <NuxtLayout></NuxtLayout>
>   </div>
> </template
> ```
>
> 具名**layout**
>
> ```vue
> // layouts/about.vue
> <template>
>   <div>about page <slot /></div>
> </template>
> ```
>
> ```vue
> // pages/index.vue
> <template>
>   <div>
>       <!-->name对应具体layout文件名<-->
>       <NuxtLayout name="about"></NuxtLayout>
>   </div>
> </template
> ```

#### override layout

```vue
<template>
  <NuxtLayout :name="layout">
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup>
const layout = true ? 'custom' : 'default'
</script>
```

#### 动态 layout

```vue
<template>
  <div>
    <button @click="enableCustomLayout">Update layout</button>
  </div>
</template>

<script setup>
function enableCustomLayout() {
  setPageLayout('custom')
}
definePageMeta({
  layout: false,
})
</script>
```

**注意点**

如果使用了 `NuxtLayout`组件结合`pages`，确保组件不是根元素或关闭 layout/page 过度。

### NuxtPage

# LAYERS

约定大于配置

`Nuxt3`的核心功能之一是层结构和扩展支持。可以扩展默认的`Nuxt3`引用来服用组件、工具和配置。层结构和标准`nuxt`应用几乎相同便于维护。

- 通过`nuxt.config`和`app.config `可共享配置预设
- `Nuxt3`支持通过`componets`目录创建组件库
- 创建实用程序和组合函数库通过 composables 和 utils 目录
- 创建模块预设、主题、

```ts
// 给 nuxt.config扩展属性来添加Layer
export default defineNuxtConfig({
  extends: [
    '../base', // Extend from a local layer
    '@my-themes/awesome', // Extend from an installed npm package
    'github:my-themes/awesome#v1', // Extend from a git repository
  ],
})
```

> ## [Authoring Nuxt Layers](https://nuxt.com/docs/getting-started/layers#authoring-nuxt-layers)
>
> See [Layer Author Guide](https://nuxt.com/docs/guide/going-further/layers) to learn more.
>
> ## [Examples](https://nuxt.com/docs/getting-started/layers#examples)
>
> - [Nuxt Docus Theme](https://github.com/nuxt-themes/docus#readme)
> - [Nuxt Content Wind Theme](https://github.com/Atinux/content-wind#readme)

# 目录结构

## pages

`Nuxt`提供了基于文件的路由

如果使用了`App.vue`,需要使用`NuxtPage`组件来显示当前页面内容。

`Pages`下的必须是只有一个根节点，否则路由跳转过渡将失败，注释元素也会有影响。

## 动态路由

由于 Nuxt 是基于文件的路由，通过 pages 下的文件命名可以指定路由参数

```
- pages
	- goods-[pid]
		- chicken-[id]
		- chicken[id]
```

对应的`url`为

```
/goods-1/chicken-1   pid = 1; id = 1
/goods-2/chickenxx   pid = 2; id = xx
```

**获取路由参数**

```vue
<template>
  <div>{{ $route.params.id }}</div>
</template>
<script setup>
const route = useRoute()
const id = ref(route.params.id)
</script>
```

## 嵌套路由

```
- pages
	- parent.vue
	- parent
		- son.vue
		- son1.vue
```

**对应路由表**

```ts
;[
  {
    path: '/parent',
    component: '~/pages/parent.vue',
    name: 'parent',
    children: [
      {
        path: '/parent/son',
        components: '~/pages/parent/son.vue',
        name: 'parent-son',
      },
    ],
  },
]
```

**给子路由传值 & 接收**

> ```vue
> <template>
>   <div>
>     <NuxtPage :foobar="123" :props-key="456"></NuxtPage>
>   </div>
> </template>
> <script setup>
> definePageMeta({
>   test: 'test',
> })
> </script>
> ```
>
> - `pageMeta` 无法通过`defineProps`获取
>
> ```vue
> <script setup>
> const props = defineProps({
>   foobar: Number, // 123
>   propsKey: Number, // 456
>   test: String, // undefined
> })
> const route = useRoute()
> const meta = route.meta
> {
>   test: test
> }
> </script>
> ```

## 页面元数据

### 特殊的元数据

- 可以往`defineMetaData`自定义元数据，里面也已经存在一些特定目的的元数据

- `alias、keepalive、`

**props key & emit**

```vue
<script srtup>
const props = defineProps({
  foobar: Number,
  propsKey: Number,
  key: String,
})
const emit = defineEmits(['change', 'delete'])
</script>
```

##

实用组件时加上 Lazy 表示懒加载

##

**定义**

```vue
<!--> parent.vue <-->
<script>
definePageMeta({
  key: 'home',
})
</script>
```

**使用**

```vue
<!--> child.vue <-->
<script>
const { key } = useRoute().meta
</script>
```

https://github.com/jackbrens/nuxt3-project#nuxtconfigts-%E5%B8%B8%E7%94%A8%E9%85%8D%E7%BD%AE

(demo)[https://github.com/productdevbook/oku-nuxt3-template]

![image-20230320145008834](https://cdn.jsdelivr.net/gh/FrancisSaber/image/markdown-Image202303201450221.png)

# 请求数据

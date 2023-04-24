---
title: Vue3知识点
author: underwood
date: '2023-04-07'
categories:
  - Vue
tags:
  - Vue3
  - 框架
---

# 组件

## 作用域组件

> 作用域组件可以实现数据定义在子组件，但父组件可以拿到自组件的数据并决定如何渲染。
>
> ```vue
> <!--> 作用域子组件 ScopeSon.vue <-->
> <template>
>   <slot :a="a" />
>   <slot :b="b" :c="c" name="hasName" />
> </template>
> <script setup>
> const a = { name: 'a' }
> const b = { name: 'b' }
> const c = { name: 'c' }
> </script>
> ```
>
> ```vue
> <!--> 使用作用域组件,其中#是 scope的语法糖 <-->
> <template>
>   <div>
>     <scope-son>
>       <template #default="scope">
>         {{ scope.a.name }}
>       </template>
>     </scope-son>
>     <scope-son>
>       <template #default="{ b, c }"> {{ b.name }} {{ c.name }} </template>
>     </scope-son>
>   </div>
> </template>
> ```
>
> - 所有作用域子组件传给父组件的值可以直接接收成一个对象如上的默认作用域组件的使用，也可以结构赋值，如上的具名作用域组件。


<script setup>
import { onMounted } from 'vue'
import DocList from './docList.vue'
import { useDocs } from './useDocs.js'
import 'ml-heatmap/dist/style.css'
// import 'gitalk/dist/gitalk.css'
// import Gitalk from 'gitalk'

const CLORS = ['#FFB3B3', '#FFDBA4', '#FFE9AE', '#C1EFFF']

const { docData, categories, tags, docNum, tagNum } = useDocs()

// 下面是首页配置github的插件实现评论功能，不需要注释
onMounted(()=>{
if (typeof window !== undefined) {
  // console.log(window,'window')
  // console.log(document,'document')
  // var s_div = document.createElement('div');   // 创建节点
  // s_div.setAttribute("id", "gitalk-container");   // 设置属性
  // document.body.appendChild(s_div);   // 添加节点
  // var gitment = new Gitalk({
  //   id: location.pathname, // 可选。默认为 location.href
  //   owner: 'Younglina',
  //   repo: 'Younglina.github.io',
  //   clientID: '91a579be5a403288bdb7',
  //   admin: ['Younglina'],
  //   labels: ['Gitalk'],
  //   proxy: "https://cors-server-ecru.vercel.app/github_access_token",
  //   createIssueManually: true,
  //   clientSecret: '6af31ca2f5dfc7bc7feed23a8642d23993dcc9c3',
  // })
  // gitment.render('gitalk-container')
}

})
</script>

<template>
  <div class="home-page">
    <div class="home-top">
      <h1 class="name">underwood</h1>
      <!-- <p class="tagline">littlear是一只聪明可爱的猫.</p> -->
    </div>

    <!-- <MlHeatmap id="heat-map" :data="calendarData" :year="2022" locale="cn" /> -->

    <div class="docs-wrap">
      <DocList />
      <div class="docs info-wrapper">
        <div class="info-person">
          <img class="info-avatar" src="/side.jpg" />
          <div class="info-name">littlear</div>
          <div class="info-num">
            <div>
              <h3>{{ docNum }}</h3>
              <h6>文章</h6>
            </div>
            <div>
              <h3>{{ tagNum }}</h3>
              <h6>标签</h6>
            </div>
          </div>
          <div class="social-links">
            <a href="https://github.com/FrancisSaber" target="_blank">
              <img class="svg-img" src="/github.svg" />
            </a>
            <!-- <a href="https://leetcode.cn/u/younglina/" target="_blank">
              <img class="svg-img" src="/leetcode.svg" />
            </a> -->
            <a href="https://juejin.cn/" target="_blank">
              <img class="svg-img" src="/juejin.svg" />
            </a>
          </div>
        </div>
        <div>
          <h3 class="docs-types">分类</h3>
          <a v-for="(num, k) in categories" :key="k" class="docs-categor docs" :href="`/categories?cat=${k}&type=cat`"
            target="_blank">
            <span>{{ k }}</span>
            <span class="docs-categor-num" :style="{ backgroundColor: CLORS[Math.floor(Math.random() * 4)] }">
              {{ num }}
            </span>
          </a>
        </div>
        <div>
          <h3 class="docs-types">标签</h3>
          <a v-for="t in tags" :key="t" class="docs-tags"
            :style="{ backgroundColor: CLORS[Math.floor(Math.random() * 4)] }" :href="`/categories?tag=${t}&type=tag`"
            target="_blank">
            <div>{{ t }}</div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

</style>
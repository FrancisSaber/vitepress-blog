import{f as d,w as C,o as b,c as w,x as i,F as Y,K as A,t as n,a as f,V as _,b as a,a1 as y,a2 as I,a3 as x}from"./framework.2919e4b3.js";const N=[{title:"03.无重复字符的最长子串",author:"Younglina",date:"2022-01-04",showAccessNumber:!0,categories:["算法"],tags:["双指针","滑动窗口","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode03"},{title:"1004.最大连续1的个数 III",author:"Younglina",date:"2022-02-17",showAccessNumber:!0,categories:["算法"],tags:["滑动窗口","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode1004"},{title:"101.对称二叉树",author:"Younglina",date:"2022-02-28",showAccessNumber:!0,categories:["算法"],tags:["树","递归","迭代","简单"],link:"\\vitepress-blog\\write\\algorithms\\leetCode101"},{title:"108.将有序数组转换为二叉搜索树",author:"Younglina",date:"2022-06-29",showAccessNumber:!0,categories:["算法"],tags:["树","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode108"},{title:"11.盛水最多的容器",author:"Younglina",date:"2022-01-04",showAccessNumber:!0,categories:["算法"],tags:["双指针","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode11"},{title:"112.路径总和",author:"Younglina",date:"2022-02-27",showAccessNumber:!0,categories:["算法"],tags:["树","递归","迭代","简单"],link:"\\vitepress-blog\\write\\algorithms\\leetCode112"},{title:"1208.尽可能使字符串相等",author:"Younglina",date:"2022-02-24",showAccessNumber:!0,categories:["算法"],tags:["滑动窗口","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode1208"},{title:"1221.分割平衡字符串",author:"Younglina",date:"2022-02-18",showAccessNumber:!0,categories:["算法"],tags:["计数","简单"],link:"\\vitepress-blog\\write\\algorithms\\leetCode1221"},{title:"128.最长连续序列",author:"Younglina",date:"2022-07-05",showAccessNumber:!0,categories:["算法"],tags:["哈希表","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode128"},{title:"143.重排链表",author:"Younglina",date:"2022-07-04",showAccessNumber:!0,categories:["算法"],tags:["双指针","链表","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode143"},{title:"1446.连续字符",author:"Younglina",date:"2022-02-21",showAccessNumber:!0,categories:["算法"],tags:["双指针","简单"],link:"\\vitepress-blog\\write\\algorithms\\leetCode1446"},{title:"148.排序链表",author:"Younglina",date:"2022-07-06",showAccessNumber:!0,categories:["算法"],tags:["链表","分治","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode148"},{title:"15.三数之和",author:"Younglina",date:"2022-01-04",showAccessNumber:!0,categories:["算法"],tags:["双指针","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode15"},{title:"155.最小栈",author:"Younglina",date:"2022-07-14",showAccessNumber:!0,categories:["算法"],tags:["双指针","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode155"},{title:"1663.具有给定数值的最小字符串",author:"Younglina",date:"2022-06-06",showAccessNumber:!0,categories:["算法"],tags:["贪心","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode1663"},{title:"17.电话号码的字母组合",author:"Younglina",date:"2022-03-06",showAccessNumber:!0,categories:["算法"],tags:["回溯","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode17"},{title:"187.重复的DNA序列",author:"Younglina",date:"2022-02-22",showAccessNumber:!0,categories:["算法"],tags:["滑动窗口","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode187"},{title:"19. 删除链表的倒数第 N 个结点",author:"Younglina",date:"2022-01-05",showAccessNumber:!0,categories:["算法"],tags:["双指针","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode19"},{title:"20.有效的括号",author:"Younglina",date:"2022-02-19",showAccessNumber:!0,categories:["算法"],tags:["栈","简单"],link:"\\vitepress-blog\\write\\algorithms\\leetCode20"},{title:"200.岛屿数量",author:"Younglina",date:"2022-07-07",showAccessNumber:!0,categories:["算法"],tags:["矩阵","dfs","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode200"},{title:"219.存在重复元素 II",author:"Younglina",date:"2022-02-22",showAccessNumber:!0,categories:["算法"],tags:["哈希表","简单"],link:"\\vitepress-blog\\write\\algorithms\\leetCode219"},{title:"222.完全二叉树的节点个数",author:"Younglina",date:"2022-06-18",showAccessNumber:!0,categories:["算法"],tags:["树","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode222"},{title:"230.二叉搜索树中第K小的元素",author:"Younglina",date:"2022-06-26",showAccessNumber:!0,categories:["算法"],tags:["树","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode230"},{title:"239.滑动窗口最大值",author:"Younglina",date:"2022-07-13",showAccessNumber:!0,categories:["算法"],tags:["队列","困难"],link:"\\vitepress-blog\\write\\algorithms\\leetCode239"},{title:"242.有效的字母异位词",author:"Younglina",date:"2022-02-19",showAccessNumber:!0,categories:["算法"],tags:["计数","简单"],link:"\\vitepress-blog\\write\\algorithms\\leetCode242"},{title:"26.删除有序数组中的重复项",author:"Younglina",date:"2022-01-05",showAccessNumber:!0,categories:["算法"],tags:["双指针","简单"],link:"\\vitepress-blog\\write\\algorithms\\leetCode26"},{title:"27.移除元素",author:"Younglina",date:"2022-01-06",showAccessNumber:!0,categories:["算法"],tags:["双指针","简单"],link:"\\vitepress-blog\\write\\algorithms\\leetCode27"},{title:"278.第一个错误的版本",author:"Younglina",date:"2022-03-26",showAccessNumber:!0,categories:["算法"],tags:["二分","简单"],link:"\\vitepress-blog\\write\\algorithms\\leetCode278"},{title:"287.寻找重复数",author:"Younglina",date:"2022-04-02",showAccessNumber:!0,categories:["算法"],tags:["滑动窗口","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode287"},{title:"30.串联所有单词的子串",author:"Younglina",date:"2022-02-21",showAccessNumber:!0,categories:["算法"],tags:["滑动窗口","困难"],link:"\\vitepress-blog\\write\\algorithms\\leetCode30"},{title:"304.二维区域和检索 - 矩阵不可变",author:"Younglina",date:"2022-07-18",showAccessNumber:!0,categories:["算法"],tags:["前缀和","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode304"},{title:"33.搜索旋转排序数组",author:"Younglina",date:"2022-03-19",showAccessNumber:!0,categories:["算法"],tags:["二分查找","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode33"},{title:"34.在排序数组中查找元素的第一个和最后一个位置",author:"Younglina",date:"2022-03-26",showAccessNumber:!0,categories:["算法"],tags:["二分查找","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode34"},{title:"343.整数拆分",author:"Younglina",date:"2022-04-14",showAccessNumber:!0,categories:["算法"],tags:["动态规划","递归","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode343"},{title:"345.反转字符串中的元音字母",author:"Younglina",date:"2022-01-07",showAccessNumber:!0,categories:["算法"],tags:["双指针","简单"],link:"\\vitepress-blog\\write\\algorithms\\leetCode345"},{title:"347.前 K 个高频元素",author:"Younglina",date:"2022-07-08",showAccessNumber:!0,categories:["算法"],tags:["栈","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode347"},{title:"36.有效的数独",author:"Younglina",date:"2022-07-15",showAccessNumber:!0,categories:["算法"],tags:["dfs","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode36"},{title:"377.组合总和Ⅳ",author:"Younglina",date:"2022-04-28",showAccessNumber:!0,categories:["算法"],tags:["动态规划","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode377"},{title:"378.有序矩阵中第 K 小的元素",author:"Younglina",date:"2022-07-20",showAccessNumber:!0,categories:["算法"],tags:["二分","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode378"},{title:"394.字符串解码",author:"Younglina",date:"2022-07-08",showAccessNumber:!0,categories:["算法"],tags:["栈","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode394"},{title:"396.旋转函数",author:"Younglina",date:"2022-06-09",showAccessNumber:!0,categories:["算法"],tags:["动态规划","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode396"},{title:"40.组合总和II",author:"Younglina",date:"2022-07-16",showAccessNumber:!0,categories:["算法"],tags:["dfs","回溯","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode40"},{title:"41.缺失的第一个正数",author:"Younglina",date:"2022-06-08",showAccessNumber:!0,categories:["算法"],tags:["数组","原地修改","困难"],link:"\\vitepress-blog\\write\\algorithms\\leetCode41"},{title:"413.等差数列划分",author:"Younglina",date:"2022-01-16",showAccessNumber:!0,categories:["算法"],tags:["模拟","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode413"},{title:"42.接雨水",author:"Younglina",date:"2022-06-30",showAccessNumber:!0,categories:["算法"],tags:["双指针","栈","困难"],link:"\\vitepress-blog\\write\\algorithms\\leetCode42"},{title:"424.替换后的最长重复字符",author:"Younglina",date:"2022-01-10",showAccessNumber:!0,categories:["算法"],tags:["滑动窗口","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode424"},{title:"438.找到字符串中所有字母异位词",author:"Younglina",date:"2022-01-11",showAccessNumber:!0,categories:["算法"],tags:["双指针","滑动窗口","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode438"},{title:"442.数组中重复的数据",author:"Younglina",date:"2022-06-08",showAccessNumber:!0,categories:["算法"],tags:["数组","原地修改","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode442"},{title:"443.压缩字符串",author:"Younglina",date:"2022-01-11",showAccessNumber:!0,categories:["算法"],tags:["模拟","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode443"},{title:"449.序列化和反序列化二叉搜索树",author:"Younglina",date:"2022-06-24",showAccessNumber:!0,categories:["算法"],tags:["树","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode449"},{title:"485.最大连续 1 的个数",author:"Younglina",date:"2022-01-12",showAccessNumber:!0,categories:["算法"],tags:["模拟","简单"],link:"\\vitepress-blog\\write\\algorithms\\leetCode485"},{title:"494.目标和",author:"Younglina",date:"2022-04-26",showAccessNumber:!0,categories:["算法"],tags:["动态规划","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode494"},{title:"524.通过删除字母匹配到字典里最长单词",author:"Younglina",date:"2022-01-13",showAccessNumber:!0,categories:["算法"],tags:["双指针","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode524"},{title:"530.二叉搜索树的最小绝对差",author:"Younglina",date:"2022-06-25",showAccessNumber:!0,categories:["算法"],tags:["树","简单"],link:"\\vitepress-blog\\write\\algorithms\\leetCode530"},{title:"538.把二叉搜索树转换为累加树",author:"Younglina",date:"2022-06-16",showAccessNumber:!0,categories:["算法"],tags:["数","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode538"},{title:"539.最小时间差",author:"Younglina",date:"2022-06-14",showAccessNumber:!0,categories:["算法"],tags:["字符串","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode539"},{title:"54.螺旋矩阵",author:"Younglina",date:"2022-06-10",showAccessNumber:!0,categories:["算法"],tags:["回溯","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode54"},{title:"567.字符串的排列",author:"Younglina",date:"2022-02-23",showAccessNumber:!0,categories:["算法"],tags:["滑动窗口","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode567"},{title:"581.最短无序连续子数组",author:"Younglina",date:"2022-01-14",showAccessNumber:!0,categories:["算法"],tags:["双指针","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode581"},{title:"589.N叉树的前序遍历",author:"Younglina",date:"2022-06-23",showAccessNumber:!0,categories:["算法"],tags:["滑动窗口","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode589"},{title:"594.最长和谐子序列",author:"Younglina",date:"2022-01-17",showAccessNumber:!0,categories:["算法"],tags:["双指针","滑动窗口","简单"],link:"\\vitepress-blog\\write\\algorithms\\leetCode594"},{title:"611.有效三角形的个数",author:"Younglina",date:"2022-01-18",showAccessNumber:!0,categories:["算法"],tags:["双指针","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode611"},{title:"62.不同路径",author:"Younglina",date:"2022-04-12",showAccessNumber:!0,categories:["算法"],tags:["动态规划","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode62"},{title:"623.在二叉树中增加一行",author:"Younglina",date:"2022-06-21",showAccessNumber:!0,categories:["算法"],tags:["树","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode623"},{title:"63.不同路径II",author:"Younglina",date:"2022-04-13",showAccessNumber:!0,categories:["算法"],tags:["动态规划","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode63"},{title:"633.平方数之和",author:"Younglina",date:"2022-01-19",showAccessNumber:!0,categories:["算法"],tags:["双指针","简单"],link:"\\vitepress-blog\\write\\algorithms\\leetCode633"},{title:"64.最小路径和",author:"Younglina",date:"2022-04-20",showAccessNumber:!0,categories:["算法"],tags:["动态规划","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode64"},{title:"655.输出二叉树",author:"Younglina",date:"2022-06-22",showAccessNumber:!0,categories:["算法"],tags:["树","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode655"},{title:"66.加一",author:"Younglina",date:"2022-06-15",showAccessNumber:!0,categories:["算法"],tags:["字符串","简单"],link:"\\vitepress-blog\\write\\algorithms\\leetCode66"},{title:"662.二叉树最大宽度",author:"Younglina",date:"2022-06-20",showAccessNumber:!0,categories:["算法"],tags:["树","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode662"},{title:"687.最长同值路径",author:"Younglina",date:"2022-06-19",showAccessNumber:!0,categories:["算法"],tags:["树","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode687"},{title:"696.计数二进制子串",author:"Younglina",date:"2022-06-13",showAccessNumber:!0,categories:["算法"],tags:["字符串","简单"],link:"\\vitepress-blog\\write\\algorithms\\leetCode696"},{title:"697.数组的度",author:"Younglina",date:"2022-06-08",showAccessNumber:!0,categories:["算法"],tags:["数组","简单"],link:"\\vitepress-blog\\write\\algorithms\\leetCode697"},{title:"704.二分查找",author:"Younglina",date:"2022-03-17",showAccessNumber:!0,categories:["算法"],tags:["二分查找","简单"],link:"\\vitepress-blog\\write\\algorithms\\leetCode704"},{title:"739.每日温度",author:"Younglina",date:"2022-06-17",showAccessNumber:!0,categories:["算法"],tags:["栈","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode739"},{title:"76.最小覆盖子串",author:"Younglina",date:"2022-09-07",showAccessNumber:!0,categories:["算法"],tags:["滑动窗口","困难"],link:"\\vitepress-blog\\write\\algorithms\\leetCode76"},{title:"825.适龄的朋友",author:"Younglina",date:"2022-02-11",showAccessNumber:!0,categories:["算法"],tags:["双指针","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode825"},{title:"873.最长的斐波那契子序列的长度",author:"Younglina",date:"2022-07-09",showAccessNumber:!0,categories:["算法"],tags:["动态规划","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode873"},{title:"875.爱吃香蕉的珂珂",author:"Younglina",date:"2022-06-07",showAccessNumber:!0,categories:["算法"],tags:["二分","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode875"},{title:"88.合并两个有序数组",author:"Younglina",date:"2022-01-06",showAccessNumber:!0,categories:["算法"],tags:["双指针","简单"],link:"\\vitepress-blog\\write\\algorithms\\leetCode88"},{title:"881.救生艇",author:"Younglina",date:"2022-02-14",showAccessNumber:!0,categories:["算法"],tags:["双指针","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode881"},{title:"890.查找和替换模式",author:"Younglina",date:"2022-06-12",showAccessNumber:!0,categories:["算法"],tags:["回溯","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode890"},{title:"90.子集 II",author:"Younglina",date:"2022-03-09",showAccessNumber:!0,categories:["算法"],tags:["回溯","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode90"},{title:"926.将字符串翻转到单调递增",author:"Younglina",date:"2022-06-11",showAccessNumber:!0,categories:["算法"],tags:["回溯","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode926"},{title:"930.和相同的二元子数组",author:"Younglina",date:"2022-02-15",showAccessNumber:!0,categories:["算法"],tags:["双指针","前缀和","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode930"},{title:"95.不同的二叉搜索树 II",author:"Younglina",date:"2022-07-21",showAccessNumber:!0,categories:["算法"],tags:["递归","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode95"},{title:"96.不同的二叉搜索树",author:"Younglina",date:"2022-04-15",showAccessNumber:!0,categories:["算法"],tags:["动态规划","递归","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode96"},{title:"992.K个不同整数的子数组",author:"Younglina",date:"2022-02-17",showAccessNumber:!0,categories:["算法"],tags:["滑动窗口","困难"],link:"\\vitepress-blog\\write\\algorithms\\leetCode992"},{title:"打家劫舍I、II、III",author:"Younglina",date:"2022-04-29",showAccessNumber:!0,categories:["算法"],tags:["双指针","简单"],link:"\\vitepress-blog\\write\\algorithms\\leetCodeRob"},{title:"剑指Offer26.树的子结构",author:"Younglina",date:"2022-07-12",showAccessNumber:!0,categories:["算法"],tags:["树","对称树","中等"],link:"\\vitepress-blog\\write\\algorithms\\leetCode_o26"},{title:"剑指 Offer 53 - II.0～n-1中缺失的数字",author:"Younglina",date:"2022-03-27",showAccessNumber:!0,categories:["算法"],tags:["二分查找","简单"],link:"\\vitepress-blog\\write\\algorithms\\leetCode_o53"},{title:"通过gitbash配置快捷指令",author:"Younglina",date:"2022-09-07",categories:["文档"],tags:["小技巧"],link:"\\vitepress-blog\\write\\docs\\alias"},{title:"vuepress配置github pages域名访问",author:"Younglina",date:"2022-03-11",categories:["文档"],tags:["记录","github pages"],link:"\\vitepress-blog\\write\\docs\\githubPages"},{date:"2022-08-30",title:"获取vitepress所有文章数据",author:"Younglina",categories:["文档"],tags:["记录","vitepress"],link:"\\vitepress-blog\\write\\docs\\vitepress-data"},{date:"2022-09-19",title:"vitepress配置评论(gitalk)",author:"Younglina",categories:["文档"],tags:["记录","vitepress"],link:"\\vitepress-blog\\write\\docs\\vitepress-gitalk"},{date:"2022-08-22",title:"自定义一个vitepress的blog",author:"Younglina",categories:["文档"],tags:["记录","vitepress"],link:"\\vitepress-blog\\write\\docs\\vitepress"},{title:"vuepress配置自动部署",author:"Younglina",date:"2021-12-28",categories:["文档"],tags:["记录","vuepress"],link:"\\vitepress-blog\\write\\docs\\VuepressConfig"},{title:"开发本地vuepress 复制代码插件",author:"Younglina",date:"2022-02-12",categories:["文档"],tags:["记录","vuepress"],link:"\\vitepress-blog\\write\\docs\\vuepressPlugin"},{title:"Nuxt",author:"underwood",date:"2023-04-07",categories:["Nuxt"],tags:["Vue3","服务端渲染"],link:"\\vitepress-blog\\write\\framework\\Nuxt\\nuxt"},{title:"Vue3知识点",author:"underwood",date:"2023-04-07",categories:["Vue"],tags:["Vue3","框架"],link:"\\vitepress-blog\\write\\framework\\Vue\\Vue3已忘功能"},{title:"Git笔记1",author:"ccy",date:"2023-04-12",showAccessNumber:!0,categories:["Git"],tags:["Git"],link:"\\vitepress-blog\\write\\Git\\index"},{title:"NestJS笔记",author:"ccy",date:"2023-04-12",showAccessNumber:!0,categories:["NestJS"],tags:["NestJS","Node"],link:"\\vitepress-blog\\write\\NestJS\\Nest"},{title:"NestJS项目实践",author:"ccy",date:"2023-04-12",showAccessNumber:!0,categories:["NestJS"],tags:["NestJS","Node"],link:"\\vitepress-blog\\write\\NestJS\\README"},{title:"menorepot",author:"underwood",date:"2023-04-07",categories:["project"],tags:["项目管理","menorepo","单一代码库"],link:"\\vitepress-blog\\write\\project\\menorepo"},{title:"Typescript笔记",author:"ccy",date:"2023-04-12",showAccessNumber:!0,categories:["Typescript"],tags:["Typescript","类型编程"],link:"\\vitepress-blog\\write\\Typescript\\TS-TYPE-CODE"},{title:"深入理解Typescript",author:"ccy",date:"2023-04-12",showAccessNumber:!0,categories:["Typescript"],tags:["Typescript","类型编程"],link:"\\vitepress-blog\\write\\Typescript\\深入理解Typescript"}];function T(){N.sort((r,t)=>new Date(t.date)-new Date(r.date));const g={},l=new Set;let p=0,c=0;return N.map(r=>{p++,r.categories&&r.categories.map(t=>{g[t]||(g[t]=0),g[t]++}),r.tags&&r.tags.map(t=>{l.add(t)})}),c=l.size,{docData:N,categories:g,tags:l,docNum:p,tagNum:c}}const D={class:"docs-list-wrap"},S={class:"docs-list"},V=["href"],J={class:"docs-title"},P={class:"docs-footer"},E={class:"docs-info"},K={class:"docs-info"},G=["href"],B={class:"page-nation"},L=["disabled"],M=["disabled"],O=i("span",null,"跳转至",-1),$={__name:"docList",props:["filter","type"],setup(g){const l=g,{categories:p,docData:c}=T(),r=d([]);let t=d(1),u=d(1),h=d(null),v=d([]);C(()=>l.filter,s=>{let o=[];l.type==="tag"?o=c.filter(e=>!s||e.tags&&e.tags.includes(s)):o=c.filter(e=>!s||e.categories&&e.categories.includes(s)),u.value=Math.ceil(o.length/10),r.value=o,v.value=o.slice(0,10)},{immediate:!0});function k(s){!isNaN(s)||s>=u.value||s<1?t.value=s>u.value?u.value:s<1?1:+s:s=="prev"||s=="next"?t.value+=s==="prev"?-1:1:t.value=1,v.value=r.value.slice((t.value-1)*10,t.value*10)}return(s,o)=>(b(),w("div",D,[i("div",S,[(b(!0),w(Y,null,A(a(v),e=>(b(),w("a",{key:e.title,href:e.link,class:"docs"},[i("div",J,n(e.title),1),i("div",P,[i("span",E,"✍️"+n(e.author),1),i("span",K,"🕐"+n(e.date),1),i("span",null,[f(" 🔗 "),(b(!0),w(Y,null,A(e.tags,m=>(b(),w("a",{class:"docs-info docs-tag",style:_({color:m===l.filter?"var(--vp-home-hero-name-color)":"#7f7f7f"}),key:m,href:`/categories?tag=${m}&type=tag`,target:"_blank"},[i("span",null,n(m),1)],12,G))),128))])])],8,V))),128))]),i("div",B,[i("span",null,"共"+n(a(u))+"页",1),i("span",null,"当前第"+n(a(t))+"页",1),i("button",{onClick:o[0]||(o[0]=e=>k("prev")),disabled:a(t)==1},"上一页",8,L),i("button",{onClick:o[1]||(o[1]=e=>k("next")),disabled:a(t)==a(u)},"下一页",8,M),O,y(i("input",{"onUpdate:modelValue":o[2]||(o[2]=e=>x(h)?h.value=e:h=e),class:"input-page"},null,512),[[I,a(h)]]),i("button",{onClick:o[3]||(o[3]=e=>k(a(h)))},"前往")])]))}};export{$ as _,T as u};
---
title: 696.计数二进制子串
author: Younglina
date: '2022-06-13'
showAccessNumber: true
categories:
 - 算法
tags:
 - 字符串
 - 简单
---

## 题目描述
[696.计数二进制子串](https://leetcode.cn/problems/count-binary-substrings/)  
给定一个字符串 s，统计并返回具有相同数量 0 和 1 的非空（连续）子字符串的数量，并且这些子字符串中的所有 0 和所有 1 都是成组连续的。  
重复出现（不同位置）的子串也要统计它们出现的次数。  

### 示例 1：
```
输入：s = "00110011"  
输出：6  
解释：6 个子串满足具有相同数量的连续 1 和 0 ："0011"、"01"、"1100"、"10"、"0011" 和 "01" 。  
注意，一些重复出现的子串（不同位置）要统计它们出现的次数。  
另外，"00110011" 不是有效的子串，因为所有的 0（还有 1 ）没有组合在一起。  
```

### 示例 2：
```
输入：s = "10101"  
输出：4  
解释：有 4 个子串："10"、"01"、"10"、"01" ，具有相同数量的连续 1 和 0 。  
```

:::tip 提示
1 <= s.length <= 105  
s[i] 为 '0' 或 '1'  
:::

## 思路
如 字符串"00011"，符合条件的只有2种，0011和01，  
如 字符串"0000111",符合条件的只有3种，000111和0011和01，  
可以发现，当遇到不是连续相等字符时，取的是两者中出现次数较少的那个。  
遍历`s`，记录当前字符为`c`，统计出现次数为`cnt`，直到字符不与'c'相同，累加cnt与p中较小的值即可，'p'为上一段字符出现的次数，累加过后将`cnt`赋予`p`，p默认为0，

## 题解
```javascript
var countBinarySubstrings = function(s) {
    let p=0,i=0,len=s.length,res=0
    while(i<len){
        let cnt = 0,c=s[i]
        while(s[i]===c){
            cnt++
            i++
        }
        res+=Math.min(cnt, p)
        p=cnt
    }
    return res
};
```

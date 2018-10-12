# fartHero
暂定游戏名称为放屁超人
开发注意事项：利用空闲时间，不要占用上班时间！不需要赶进度！不要求代码量，但要保证基本的代码质量！另外缩进两空格！  

## 开发人员  
ZHAO XIANG XIE DU
## 开发工具：  
[白鹭引擎官网](http://developer.egret.com/cn/)  
[地图生成器](https://www.mapeditor.org/)  

## 开发语言：Typescript  

[文档](https://www.tslang.cn/docs/handbook/basic-types.html) 务必通读一遍基本语法（其实语言都差不多)  

## 开发前准备：  
- git总该会用吧，下载 cmder 工具，clone 本仓库到本地  
- 不要在主分支 (master) 开发！！！也不要用 push -f !!!  
- 开发任务会在开发 qq(+q: 1036971959) 群发放，不要贸然开发，听指挥  
- 在接到开发任务后，从 `master` 拉取一个功能分支 `git checkout -b feature-分支名称`  
- 功能开发完毕后，上传到远程仓库 `git push origin feature-分支名称`，然后向 `master` 发起 `pull Request` 请求  

## 协同工具：  
  [原型链接](https://modao.cc/workspace/apps) 
  账号密码在qq群里咨询  

## 策划：  
  这里放一些游戏玩法，不需太详细， 但一定要有

## 开发：  

## 代码封装
  为了保证任何人都可以无缝开发，我会封装一些静态方法，不需要了解白鹭api即可开发游戏  
  以下是封装的方法：
  Request URL:https://da.dxy.cn/_da_event?account=da-10010-2&u=&t=&uname=&euname=&vtoken=&app_id=wx9a1e763032f69003&lang=zh_CN&cookie_id=6570d442dd97ce7f0c95e1166f9f5d8d1539335055462&page_id=a15fcd485d554847db2f779438f4aaad1539335073702&category=jobmd_recommend_17&daction=click&optLabel=&optValue=&ext=%7B%22item%22%3A%7B%22id%22%3A742519%2C%22type%22%3A%22resume%22%2C%22rdna%22%3A%2283887184%22%2C%22order%22%3A1%2C%22domain%22%3A%22jobmd_resume4job_section%22%2C%22from%22%3A%22home%22%2C%22uniqueKey%22%3A%226b7dcb7dec868e02c791a101b0ba8382%22%7D%2C%22simuid%22%3A%226511859488167308460%22%2C%22model%22%3A%22iPhone%205%22%2C%22pixelRatio%22%3A2%2C%22version%22%3A%226.6.3%22%2C%22system%22%3A%22iOS%2010.0.1%22%2C%22platform%22%3A%22devtools%22%2C%22SDKVersion%22%3A%222.3.0%22%7D&_=1539335154851&real_member_id=dxy_7f0mk6fw&url=pages%2Fmain&da_version=1

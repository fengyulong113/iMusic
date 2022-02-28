# 简介

项目采用immutable.js对数据形成持久化结构，其中部分数据的更新会返回一个全新的对象，来满足浅比较的过程中存在更新对象属性时其引用没有改变的情况。
因为所有组件都是采用`hook`开发，对于浅比较的检测不能使用`shouldComponentUpdate`，而是使用React为函数组件提供的`memo`方法来对`props`的浅比较。

在对react做性能优化时，通过memo+immutable的方法来检测`state`和`props`，进而判断是否需要`render`

## 依赖

项目依赖gitHub开源网易云数据接口，点击[地址](https://github.com/Binaryify/NeteaseCloudMusicApi)克隆项目。注意该默认端口为3000，想修改可以根据其**README**更改。

## 安装

    $ git clone git@github.com:fengyulong113/i-music.git

    $ npm install 

## 运行

将`src/api/config.js` 中的 `baseUrl` 改为数据接口项目地址，默认为`http://127.0.0.1:3000`。

    $ npm run start

## 目录
- api：请求方法与工具类方法
- application：基础模块组件
  - Home
  - Album：专辑
  - Player：播放器
  - Rank：排行榜
  - Recommend：推荐
  - Search：搜索
  - Singer：歌手
  - Singers：歌手列表
  - SongsList：歌曲列表
- assets：静态资源
- baseUI：基础UI轮子
- components：基础组件
- store：全局状态管理

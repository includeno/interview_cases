# interview_cases 面试题目自测平台

功能介绍:

✅导入题目(文件/直接添加) ✅导出题目至文件

✅查看题目 ✅阅读题目

✅录制声音

✅查看答案 ✅阅读答案

关于部署在http服务器上不能使用录音功能的问题
https://blog.csdn.net/weixin_44493841/article/details/108073810

# 项目配置 终端内输入
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

# 使用到的库 终端内输入

## vuex 用于管理服务器地址
yarn add vuex

## vue-record 用于录制声音
yarn add @musoftware/vue-record

## ant-design-vue 用于提供界面元素
yarn add ant-design-vue

# 本地启动方法 终端内输入

## web
yarn

yarn build

yarn global add serve

serve -s "/Users/xxxxx/interview_cases/dist"

## server

python flask/flaskserver.py

# docker方式部署 终端内输入

docker-compose部署 参考文件 docker-compose-command

docker直接部署 参考文件 docker-command
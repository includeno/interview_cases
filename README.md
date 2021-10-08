# interview_cases 面试题目自测平台

功能介绍:

✅导入题目(文件/直接添加) ✅导出题目

✅查看题目 ✅阅读题目

✅录制声音

✅查看答案 ✅阅读答案

#使用到的库

## vuex 用于管理服务器地址
yarn add vuex

## vue-record 用于录制声音
yarn add @musoftware/vue-record

## ant-design-vue 用于提供界面元素
yarn add ant-design-vue

## Project setup
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

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


Docker:

# Build
docker build . -t interview:1.0

# Run
docker run -itd -p 8080:5000 --name interview_container interview:1.0

http://localhost:8080即可打开网站

# Check
docker logs -ft interview_container

docker exec -it interview_container /bin/bash

# Clean
docker stop interview_container

docker rm interview_container

docker images rm interview:1.0
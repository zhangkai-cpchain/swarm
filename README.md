# 前端

## 安装

```bash
npm install --registry https://registry.npm.taobao.org
```

## 运行开发者模式

npm run dev

## 配置端口

vue.config.js 中 devServer 中 port 字段,目前为 9527

## 配置后端接口地址

使用代理可以可以后端接口不开放跨域

vue.config.js 中 devServer 中 proxy,配置 target，目前为<http://129.204.65.25:8380/>

# AI信息库采集分析网站

## 说明

本项目使用了官方开发人员提供的建
议[模板](https://github.com/edmundhung/remix-cloudflare-template)，可以参考模版
readme文件查看说明。

## 使用方法

将代码克隆到本地，执行wrangler命令生成env文件的类型。再修改了配置文件后运行以下
命令可以生成配置文件的类型生命，配置项目记录在两个文件里.dev.vars和

```bash
pnpm wrangler types
```

通过本地开发工具运行或者通过wrangler模拟服务器端环境。

```bash
pnpm run dev #本地启动vite测试
pnpm run start #本地启动一个模拟cloudflare的环境，在涉及数据库等其他服务器端资源的情况下需要使用该命令测试
```

## 测试命令

生成数据库

```bash
npx wrangler d1 migrations apply db --local
```

生成网站并进行测试

```bash
pnpm run build && pnpm run start
```

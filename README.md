# AI信息库采集分析网站

## 说明

本项目使用了官方开发人员提供的建
议[模板](https://github.com/edmundhung/remix-cloudflare-template)，可以参考模版
readme文件查看说明。

## 本项目本地开发测试方法

将代码克隆到本地，.dev.vars.example复制为.dev.vars，可以在其中定义一些环境变量。
执行wrangler命令生成env文件的类型，便于程序中引用。

```bash
pnpm wrangler types
```

本地测试方式，直接通过vite运行，可以测试部分前端功能。

```bash
pnpm run dev #本地启动vite测试，该方式无法测试到数据库功能。
```

## 测试数据库相关功能

克隆项目后，使用迁移命令生成数据库。

```bash
pnpm run migrate
```

运行命令成功后会生成本地数据库文件`./.wrangler/state/v3/d1/DB/db.sqlite`，该文件
就是开发中的本地数据库。

测试网站功能需要先生成网站，然后使用wrangler工具模拟cloudflare的环境，命令如下：

```bash
pnpm run build && pnpm run start
```

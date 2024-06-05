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

以上命令会使用`./migrations`文件夹下的数据脚本生成本地数据库文件，该文件位
于`./.wrangler/state/v3/d1/`文件夹下，可以直接访问修改本地数据库。

生成数据库之后，就可以使用本地测试数据库相关的功能了。

## 使用wrangler工具管理数据库注意事项

- D1数据库暂不支持事务，对于倒入的批量脚本，需要去掉BEGIN、COMMIT等关键词
- 少量数据更改可以借助D1-manager完成
- 大量数据的更新可以借用以下命令：`npx wrangler d1 migrations apply DB --remote`
  or `npx wrangler d1 execute DB --remote --file=./script.sql`

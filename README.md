# AI信息库采集分析网站

## 说明

本项目使用了官方开发人员提供的建
议[模板](https://github.com/edmundhung/remix-cloudflare-template)，可以参考模版
readme文件查看说明。

## 本项目本地开发测试方法

将代码克隆到本地，将.dev.vars.example复制为.dev.vars，可以在其中定义一些环境变
量。执行wrangler命令生成env文件的类型，便于程序中引用。

```bash
pnpm wrangler types
```

如果只是开发前端的功能，可以使用vite进行测试

```bash
pnpm run dev #本地启动vite测试，该方式无法测试到数据库功能。
```

## 测试数据库相关功能

克隆项目后，使用迁移命令生成数据库。

```bash
# 建立数据库结构
pnpm run migrate
# 导入数据
npx wrangler d1 execute DB --local --file=./scripts/data.sql
```

以上命令会使用`./migrations`文件夹下的数据脚本生成本地数据库文件，生成的数据库文
件位于`./.wrangler/state/v3/d1/`文件夹下，可以直接访问修改本地数据库

测试网站功能需要先生成网站，然后使用wrangler工具模拟cloudflare的环境，命令如下：

```bash
pnpm run build && pnpm run start
```

备注：数据库文件为sqlite3数据库文件，可以使用vscode的sqlite插件修改数据，建议不
要修改数据结构，修改数据结构使用prisma相关工具完成，详细信息见下一节。

## 修改数据库结构

修改数据库结构，需要先修改schema.prisma文件的模型，如果修改模型之后,可以通过如下
方式同步修改到本地和远程数据库;

```bash
# 修改schema文件，并重新生成客户端
npx prisma generate
# 创建一个迁移
wrangler d1 migrations create DB change_name
# 重要命令：把数据库修改添加到迁移文件，根据数据库变化生成迁移文件
npx prisma migrate diff --script --from-local-d1 --to-schema-datamodel ./prisma/schema.prisma >> migrations/0002_add_ip.sql
wrangler d1 migrations list # 预览哪些迁移会被执行
wrangler d1 migrations apply DB --local #执行migrations目录下的所有迁移
```

以上是标准流程，一般情况下不会那么顺利^\_^，提供一些工具可以检查:

```bash
# 远程数据库执行命令
npx wrangler d1 execute DB --command="SELECT name FROM sqlite_master WHERE type='table'"
# 本地数据库执行命令
npx wrangler d1 execute DB --local --command="SELECT name FROM sqlite_master WHERE type='table'"
# 本地数据库执行数据脚本
npx wrangler d1 execute DB --local --file=./migrations/0001_init.sql
# 查看表格结构
npx wrangler d1 execute DB --local --command="SELECT * FROM Visit"
# 直接执行迁移脚本
npx wrangler d1 execute DB --local --file=./migrations/0002_add_ip.sql
```

## 创建数据库使用的命令【日常不用使用】

以下命令是创建数据库时使用的命令

```bash
npx wrangler d1 migrations create DB init
npx prisma init --datasource-provider sqlite
npx prisma migrate diff --script --from-empty --to-schema-datamodel ./prisma/schema.prisma >> migrations/0001_init.sql
npx wrangler d1 migrations apply DB --local # 应用到本地数据库
npx wrangler d1 migrations apply DB --remote # 应用到远程数据库
npx prisma generate
```

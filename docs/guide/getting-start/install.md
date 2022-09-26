# 安装

## 使用gf工具

<!-- [开发工具](/getting-start/gf-tool.md) -->

**创建项目模板**

gf工具安装请看 [开发工具](gf-tool)

```shell
gf init demo -u
```
该命令创建一个项目模板，项目名称是demo，其中的-u参数用户指定是否更新项目中使用的goframe框架为最新版本。  
框架有独特的项目工程结构，工程目录结构介绍具体请参考：[目录结构](structure.md) 。

**创建多应用模板**
```shell
gf init demo -m
```
其中-m 表示使用多项目的模板

::: tip
项目模板中提供了一些make命令，用于更便捷地使用框架工具，特别是make cli及make dao命令在项目开发中比较常用。具体命令介绍请参考项目中的README.MD
:::

## Git clone 方式

**下载项目模板**

```shell
git clone https://github.com/gogf/template-single.git
```

克隆项目模板, 进入项目, 修改项目名称(可选)  
获取最新版本gf

```shell
go get -u github.com/gogf/gf/v2@latest
```



## 运行项目

```md
cd demo && gf run main.go
```
进入到项目里并运行

::: tip
其中的gf run是框架开发工具的动态编译命令，也可以替换为go run命令。
:::

默认情况下项目会设置Web服务端口为8000、开启OpenAPI接口文档、展示Swagger接口文档页面，这些关键信息都会展示到终端。默认情况下，会打印所有的路由信息到终端，该项目模板只会添加一个仅供演示的路由：/hello  

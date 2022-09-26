# 安装

## 使用gf工具

<!-- [开发工具](/getting-start/gf-tool.md) -->

**创建项目模板**

gf工具安装请看 [开发工具](gf-tool)

```shell
gf init demo -u
```
该命令创建一个项目模板，项目名称是demo，其中的-u参数用户指定是否更新项目中使用的goframe框架为最新版本。框架有独特的项目工程结构，工程目录结构介绍具体请参考：[目录结构](structure.md) 。

**创建多项目模板**
```shell
gf init demo -m
```
其中-m 表示使用多项目的模板

::: tip
项目模板中提供了一些make命令，用于更便捷地使用框架工具，特别是make cli及make dao命令在项目开发中比较常用。具体命令介绍请参考项目中的README.MD
:::

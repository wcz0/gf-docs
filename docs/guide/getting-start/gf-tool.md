# 开发工具

GoFrame框架提供了功能强大的gf命令行开发辅助工具，是框架发展的一个重要组成部分

## 简介

GoFrame框架提供了功能强大的gf命令行开发辅助工具，是框架发展的一个重要组成部分，工具地址：[https://github.com/gogf/gf/tree/master/cmd/gf](https://github.com/gogf/gf/tree/master/cmd/gf)  工具安装请参考仓库页面

### 工具职责

- 简化工程开发，提高开发效率
- 支持框架工程设计规范准确落地

::: tip
- 部分命令需要您先安装好Golang基础的开发环境，环境安装具体请参考 环境安装 章节。
- 最新的CLI工具版本会随着最新的框架版本走
:::

## 安装
### 预编译安装

- **Mac** or **Linux**

```md
wget -O gf "https://github.com/gogf/gf/releases/latest/download/gf_$(go env GOOS)_$(go env GOARCH)" && chmod +x gf && ./gf install -y && rm ./gf
```

- **Windows**

下载对应的二进制文件，双击按照终端指令安装即可。如果双击安装失败，请采用最后万能的手动编译安装方式。

### 手动编译

```md
git clone https://github.com/gogf/gf && cd gf/cmd/gf && go install
```
### 验证安装成功

```md
$ gf -v
GoFrame CLI Tool v2.1.4, https://goframe.org
GoFrame Version: cannot find go.mod
CLI Installed At: /opt/homebrew/bin/gf
CLI Built Detail:
  Go Version:  go1.17.13
  GF Version:  v2.1.4
  Git Commit:  2022-08-26 15:45:41 a0619f7ff0e1d7766884e3062d1b3b0947c87da4
  Build Time:  2022-08-26 15:51:38
```

## Help 查看帮助

## Version 查看版本

## Init 创建项目

## Build 交叉编译

## Gen 代码生成

## Run 自动编译

## Pack 资源打包

## Docker 镜像编译



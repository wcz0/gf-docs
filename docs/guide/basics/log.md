# 日志

`glog`是通用的高性能日志管理模块，实现了强大易用的日志管理功能，是 `GoFrame`开发框架的核心组件之一。

## 基本介绍

**使用方式:**

```go
import "github.com/gogf/gf/v2/os/glog"
```

**接口文档** ：[https://pkg.go.dev/github.com/gogf/gf/v2/os/glog](https://pkg.go.dev/github.com/gogf/gf/v2/os/glog)

**简要说明：**

1. `glog`模块固定日志文件名称格式为 `*.log`，即固定使用 `.log`作为日志文件名后缀。
2. `glog`支持文件输出、日志级别、日志分类、调试管理、调用跟踪、链式操作、滚动切分等等丰富特性。
3. 可以使用 `glog.New`方法创建 `glog.Logger`对象用于自定义日志打印，也可以并推荐使用 `glog`默认提供的包方法来打印日志。
4. 当使用包方法修改模块配置时，注意任何的 `glog.Set*`设置方法都将会 **全局生效** 。
5. 日志内容默认时间格式为 `时间 [级别] 内容 换行`，其中 `时间`精确到毫秒级别，`级别`为可选输出，`内容`为调用端的参数输入，`换行`为可选输出(部分方法自动为日志内容添加换行符号)，日志内容示例：`2018-10-10 12:00:01.568 [ERRO] 产生错误`。
6. `Print*/Debug*/Info*`方法输出日志内容到标准输出(`stdout`)，为防止日志的错乱，`Notice*/Warning*/Error*/Critical*/Panic*/Fatal*`方法也是将日志内容输出到标准输出(`stdout`)。
7. `Panic*`方法在输出日志信息后会引发 `panic`错误方法
8. `Fatal*`方法在输出日志信息之后会停止进程运行，并返回进程状态码值为 `1`(正常程序退出状态码为 `0`)。

### 组件特性

`glog`组件具有以下显著特性：

* 使用简便，功能强大
* 支持配置管理，使用统一的配置组件
* 支持日志级别
* 支持颜色打印
* 支持链式操作
* 支持指定输出日志文件/目录
* 支持链路跟踪
* 支持异步输出
* 支持堆栈打印
* 支持调试信息开关
* 支持自定义 `Writer`输出接口
* 支持自定义日志 `Handler`处理
* 支持自定义日志 `CtxKeys`键值
* 支持 `JSON`格式打印
* 支持 `Flags`特性
* 支持 `Rotate`滚动切分特性

### 知识图谱

![](https://goframe.org/download/attachments/1114673/GoFrame%20Logging%20Features.png?version=1&modificationDate=1623331625106&api=v2)

### 单例对象

日志组件支持单例模式，使用 `g.Log(单例名称)`获取不同的单例日志管理对象。提供单例对象的目的在于针对不同业务场景可以使用不同配置的日志管理对象。我们推荐使用 `g.Log()`方法获取单例对象来进行日志操作，该方法内部会自动读取配置文件并初始化单例对象，该初始化操作仅会执行一次。

### `glog.Print`和 `g.Log().Print`区别

* `glog`是日志组件的包名，`g.Log()`是一个日志组件单例对象。
* `g.Log()`单例对象通过对象管理组件 `g`包来维护，对象初始化时会自动读取日志配置，使用简便，大多数场景下推荐使用这种方式使用日志组件。
* `glog`通过独立组件的形式使用，默认情况下会直接输出日志到终端。也可以通过配置管理方法设置全局配置，或者通过 `New`创建独立的日志对象使用

## 配置管理

### 配置文件(推荐)

::: tip

日志的配置使用的是框架统一的配置组件，支持多种文件格式，也支持配置中心、接口化扩展等特性，更多细节请参考章节：[配置管理](https://goframe.org/pages/viewpage.action?pageId=1114668)

:::

日志组件支持配置文件，当使用 `g.Log(单例名称)`获取 `Logger`单例对象时，将会自动通过默认的配置管理对象获取对应的 `Logger`配置。默认情况下会读取 `logger.单例名称`配置项，当该配置项不存在时，将会读取默认的 `logger`配置项。配置项请参考配置对象结构定义：[https://pkg.go.dev/github.com/gogf/gf/v2/os/glog#Config](https://pkg.go.dev/github.com/gogf/gf/v2/os/glog#Config)

完整配置文件配置项及说明如下，其中配置项名称不区分大小写：

```yml
logger:
  path:                  "/var/log/"   # 日志文件路径。默认为空，表示关闭，仅输出到终端
  file:                  "{Y-m-d}.log" # 日志文件格式。默认为"{Y-m-d}.log"
  prefix:                ""            # 日志内容输出前缀。默认为空
  level:                 "all"         # 日志输出级别
  ctxKeys:               []            # 自定义Context上下文变量名称，自动打印Context的变量到日志中。默认为空
  header:                true          # 是否打印日志的头信息。默认true
  stdout:                true          # 日志是否同时输出到终端。默认true
  rotateSize:            0             # 按照日志文件大小对文件进行滚动切分。默认为0，表示关闭滚动切分特性
  rotateExpire:          0             # 按照日志文件时间间隔对文件滚动切分。默认为0，表示关闭滚动切分特性
  rotateBackupLimit:     0             # 按照切分的文件数量清理切分文件，当滚动切分特性开启时有效。默认为0，表示不备份，切分则删除
  rotateBackupExpire:    0             # 按照切分的文件有效期清理切分文件，当滚动切分特性开启时有效。默认为0，表示不备份，切分则删除
  rotateBackupCompress:  0             # 滚动切分文件的压缩比（0-9）。默认为0，表示不压缩
  rotateCheckInterval:   "1h"          # 滚动切分的时间检测间隔，一般不需要设置。默认为1小时
  stdoutColorDisabled:   false         # 关闭终端的颜色打印。默认开启
  writerColorEnable:     false         # 日志文件是否带上颜色。默认false，表示不带颜色
```

其中，`level`配置项使用字符串配置，按照日志级别支持以下配置：`DEBU` < `INFO` < `NOTI` < `WARN` < `ERRO` < `CRIT`，也支持 `ALL`, `DEV`, `PROD`常见部署模式配置名称。`level`配置项字符串不区分大小写。关于日志级别的详细介绍请查看 [日志组件-日志级别](https://goframe.org/pages/viewpage.action?pageId=1114151) 章节。

#### 示例1，默认配置项

```yml
logger:
  path:    "/var/log"
  level:   "all"
  stdout:  false
```

随后可以使用 `g.Log()`获取默认的单例对象时自动获取并设置该配置。

#### 示例2，多个配置项

多个 `Logger`的配置示例：

```yml
logger:
  path:    "/var/log"
  level:   "all"
  stdout:  false
  logger1:
    path:    "/var/log/logger1"
    level:   "dev"
    stdout:  false
  logger2:
    path:    "/var/log/logger2"
    level:   "prod"
    stdout:  true
```

我们可以通过单例对象名称获取对应配置的 `Logger`单例对象：

```go
// 对应 logger.logger1 配置项
l1 := g.Log("logger1")
// 对应 logger.logger2 配置项
l2 := g.Log("logger2")
// 对应默认配置项 logger
l3 := g.Log("none")
// 对应默认配置项 logger
l4 := g.Log()
```

### 配置方法(高级)

配置方法用于模块化使用 `glog`时由开发者自己进行配置管理。

方法列表：

简要说明：

1. 可以通过 `SetConfig`及 `SetConfigWithMap`来设置。
2. 也可以使用 `Logger`对象的 `Set*`方法进行特定配置的设置。
3. 主要注意的是，配置项在 `Logger`对象执行日志输出之前设置，避免并发安全问题。

我们可以使用 `SetConfigWithMap`方法通过 `Key-Value`键值对来设置/修改 `Logger`的特定配置，其余的配置使用默认配置即可。其中 `Key`的名称即是 `Config`这个 `struct`中的属性名称，并且不区分大小写，单词间也支持使用 `-`/`_`/`空格`符号连接，具体可参考 [类型转换-Struct转换](https://goframe.org/pages/viewpage.action?pageId=1114345) 章节的转换规则。

简单示例：

```
logger := glog.New()
logger.SetConfigWithMap(g.Map{
    "path":     "/var/log",
    "level":    "all",
    "stdout":   false,
    "StStatus": 0,
})
logger.Print("test")
```

其中 `StStatus`表示是否开启堆栈打印，设置为 `0`表示关闭。键名也可以使用 `stStatus`, `st-status`, `st_status`, `St Status`，其他配置属性以此类推

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

日志的配置使用的是框架统一的配置组件，支持多种文件格式，也支持配置中心、接口化扩展等特性，更多细节请参考章节：[配置管理](configure)

:::

日志组件支持配置文件，当使用 `g.Log(单例名称)`获取 `Logger`单例对象时，将会自动通过默认的配置管理对象获取对应的 `Logger`配置。默认情况下会读取 `logger.单例名称`配置项，当该配置项不存在时，将会读取默认的 `logger`配置项。配置项请参考配置对象结构定义：[https://pkg.go.dev/github.com/gogf/gf/v2/os/glog#Config](https://pkg.go.dev/github.com/gogf/gf/v2/os/glog#Config)

完整配置文件配置项及说明如下，其中配置项名称不区分大小写：

```yaml
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

```yaml
logger:
  path:    "/var/log"
  level:   "all"
  stdout:  false
```

随后可以使用 `g.Log()`获取默认的单例对象时自动获取并设置该配置。

#### 示例2，多个配置项

多个 `Logger`的配置示例：

```yaml
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

我们可以使用 `SetConfigWithMap`方法通过 `Key-Value`键值对来设置/修改 `Logger`的特定配置，其余的配置使用默认配置即可。其中 `Key`的名称即是 `Config`这个 `struct`中的属性名称，并且不区分大小写，单词间也支持使用 `-`/`_`/`空格`符号连接，具体可参考 [类型转换-Struct转换]() 章节的转换规则。

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

## 日志级别

日志级别用于管理日志的输出，我们可以通过设定特定的日志级别来关闭/开启特定的日志内容。 日志级别的设置可以通过两个方法实现：

### SetLevel

通过 `SetLevel`方法可以设置日志级别，`glog`模块支持以下几种日志级别常量设定：

```
LEVEL_ALL
LEVEL_DEV
LEVEL_PROD
LEVEL_DEBU
LEVEL_INFO
LEVEL_NOTI
LEVEL_WARN
LEVEL_ERRO
```

我们可以通过 `位操作`组合使用这几种级别，例如其中 `LEVEL_ALL`等价于 `LEVEL_DEBU | LEVEL_INFO | LEVEL_NOTI | LEVEL_WARN | LEVEL_ERRO | LEVEL_CRIT`。我们还可以通过 `LEVEL_ALL & ^LEVEL_DEBU & ^LEVEL_INFO & ^LEVEL_NOTI`来过滤掉 `LEVEL_DEBU/LEVEL_INFO/LEVEL_NOTI`日志内容。

当然 `glog`模块还有其他的一些级别，如 `CRIT`和 `FATA`，但是这两个级别是非常严重的错误，无法由开发者自定义屏蔽，产生严重错误的时候。将会产生一些额外的系统动作，如 `panic`/`exit`。

使用示例：

```go
package main

import (
	"context"

	"github.com/gogf/gf/v2/os/glog"
)

func main() {
	ctx := context.TODO()
	l := glog.New()
	l.Info(ctx, "info1")
	l.SetLevel(glog.LEVEL_ALL ^ glog.LEVEL_INFO)
	l.Info(ctx, "info2")
}
```

执行后，输出结果为：

```
2021-12-31 11:16:57.272 [INFO] info1
```

### `SetLevelStr`

大部分场景下我们可以通过 `SetLevelStr`方法来通过字符串设置日志级别，配置文件中的 `level`配置项也是通过字符串来配置日志级别。支持的日志级别字符串如下，不区分大小写：

```go
"ALL":      LEVEL_DEBU | LEVEL_INFO | LEVEL_NOTI | LEVEL_WARN | LEVEL_ERRO | LEVEL_CRIT,
"DEV":      LEVEL_DEBU | LEVEL_INFO | LEVEL_NOTI | LEVEL_WARN | LEVEL_ERRO | LEVEL_CRIT,
"DEVELOP":  LEVEL_DEBU | LEVEL_INFO | LEVEL_NOTI | LEVEL_WARN | LEVEL_ERRO | LEVEL_CRIT,
"PROD":     LEVEL_WARN | LEVEL_ERRO | LEVEL_CRIT,
"PRODUCT":  LEVEL_WARN | LEVEL_ERRO | LEVEL_CRIT,
"DEBU":     LEVEL_DEBU | LEVEL_INFO | LEVEL_NOTI | LEVEL_WARN | LEVEL_ERRO | LEVEL_CRIT,
"DEBUG":    LEVEL_DEBU | LEVEL_INFO | LEVEL_NOTI | LEVEL_WARN | LEVEL_ERRO | LEVEL_CRIT,
"INFO":     LEVEL_INFO | LEVEL_NOTI | LEVEL_WARN | LEVEL_ERRO | LEVEL_CRIT,
"NOTI":     LEVEL_NOTI | LEVEL_WARN | LEVEL_ERRO | LEVEL_CRIT,
"NOTICE":   LEVEL_NOTI | LEVEL_WARN | LEVEL_ERRO | LEVEL_CRIT,
"WARN":     LEVEL_WARN | LEVEL_ERRO | LEVEL_CRIT,
"WARNING":  LEVEL_WARN | LEVEL_ERRO | LEVEL_CRIT,
"ERRO":     LEVEL_ERRO | LEVEL_CRIT,
"ERROR":    LEVEL_ERRO | LEVEL_CRIT,
"CRIT":     LEVEL_CRIT,
"CRITICAL": LEVEL_CRIT,
```

可以看到，通过级别名称设置的日志级别是按照日志级别的高低来进行过滤的：`DEBU < INFO < NOTI < WARN < ERRO < CRIT`，也支持 `ALL`, `DEV`, `PROD`常见部署模式配置名称。

使用示例：

```go
package main

import (
	"context"

	"github.com/gogf/gf/v2/os/glog"
)

func main() {
	ctx := context.TODO()
	l := glog.New()
	l.Info(ctx, "info1")
	l.SetLevelStr("notice")
	l.Info(ctx, "info2")
}
```

执行后，输出结果为：

```
2021-12-31 11:20:15.019 [INFO] info1 
```

### 级别名称

在日志中我们会看到不同级别的打印内容，会在内容前面带有不同的日志级别名称。默认的日志级别名称如下：

```
LEVEL_DEBU: "DEBU",
LEVEL_INFO: "INFO",
LEVEL_NOTI: "NOTI",
LEVEL_WARN: "WARN",
LEVEL_ERRO: "ERRO",
LEVEL_CRIT: "CRIT",
LEVEL_PANI: "PANI",
LEVEL_FATA: "FATA",
```

为方便统一日志格式，保证比较优雅的排版风格，因此日志级别的名称都使用了级别英文单词的前四个字符。若有特殊需求需要修改日志级别名称的，可以通过以下方法进行设置：

```go
func (l *Logger) SetLevelPrefix(level int, prefix string)
func (l *Logger) SetLevelPrefixes(prefixes map[int]string)
```

使用示例：

```go
package main

import (
	"context"

	"github.com/gogf/gf/v2/os/glog"
)

func main() {
	ctx := context.TODO()
	l := glog.New()
	l.SetLevelPrefix(glog.LEVEL_DEBU, "debug")
	l.Debug(ctx, "test")
}
```

执行后，终端输出：

```
2021-12-31 11:21:45.754 [debug] test 
```

## 文件目录

### 日志文件

默认情况下，日志文件名称以当前时间日期命名，格式为 `YYYY-MM-DD.log`，我们可以使用 `SetFile`方法来设置文件名称的格式，并且文件名称格式支持 [时间管理-gtime](https://goframe.org/pages/viewpage.action?pageId=1114883) 时间格式 。简单示例：

```go
package main

import (
	"context"

	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/os/gfile"
	"github.com/gogf/gf/v2/os/glog"
)

// 设置日志等级
func main() {
	ctx := context.TODO()
	path := "./glog"
	glog.SetPath(path)
	glog.SetStdoutPrint(false)
	// 使用默认文件名称格式
	glog.Print(ctx, "标准文件名称格式，使用当前时间时期")
	// 通过SetFile设置文件名称格式
	glog.SetFile("stdout.log")
	glog.Print(ctx, "设置日志输出文件名称格式为同一个文件")
	// 链式操作设置文件名称格式
	glog.File("stderr.log").Print(ctx, "支持链式操作")
	glog.File("error-{Ymd}.log").Print(ctx, "文件名称支持带gtime日期格式")
	glog.File("access-{Ymd}.log").Print(ctx, "文件名称支持带gtime日期格式")

	list, err := gfile.ScanDir(path, "*")
	g.Dump(err)
	g.Dump(list)
}
```

执行后，输出结果为：

```html
<nil>
[
    "C:\hailaz\test\glog\2021-12-31.log",
    "C:\hailaz\test\glog\access-20211231.log",
    "C:\hailaz\test\glog\error-20211231.log",
    "C:\hailaz\test\glog\stderr.log",
    "C:\hailaz\test\glog\stdout.log",
]
```

可以看到，文件名称格式中如果需要使用 `gtime`时间格式，格式内容需要使用 `{xxx}`包含起来。该示例中也使用到了 `链式操作`的特性，具体请看后续说明。

### 日志目录

默认情况下，`glog`将会输出日志内容到标准输出，我们可以通过 `SetPath`方法设置日志输出的目录路径，这样日志内容将会写入到日志文件中，并且由于其内部使用了 `gfpool`文件指针池，文件写入的效率相当优秀。简单示例：

```go
package main

import (
	"context"

	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/os/gfile"
	"github.com/gogf/gf/v2/os/glog"
)

// 设置日志等级
func main() {
	ctx := context.TODO()
	path := "./glog"
	glog.SetPath(path)
	glog.Print(ctx, "日志内容")
	list, err := gfile.ScanDir(path, "*")
	g.Dump(err)
	g.Dump(list)
}
```

执行后，输出内容为：

```
2021-12-31 11:32:16.742 日志内容 
<nil>
[
    "C:\hailaz\test\glog\2021-12-31.log",
]
```

当通过 `SetPath`设置日志的输出目录，如果目录不存在时，将会递归创建该目录路径。可以看到，执行 `Println`之后，在 `/tmp`下创建了日志目录 `glog`，并且在其下生成了日志文件。同时，我们也可以看见日志内容不仅输出到了文件，默认情况下也输出到了终端，我们可以通过 `SetStdoutPrint(false)`方法来关闭终端的日志输出，这样日志内容仅会输出到日志文件中。

## 链式操作

完整的方法列表可参考接口文档：[https://pkg.go.dev/github.com/gogf/gf/v2/os/glog](https://pkg.go.dev/github.com/gogf/gf/v2/os/glog)

`glog`模块支持非常简便的 `链式操作`方式，主要的链式操作方法如下：

```go
// 重定向日志输出接口
func To(writer io.Writer) *Logger
// 日志内容输出到目录
func Path(path string) *Logger
// 设置日志文件分类
func Cat(category string) *Logger
// 设置日志文件格式
func File(file string) *Logger
// 设置日志打印级别
func Level(level int) *Logger
// 设置日志打印级别(字符串)
func LevelStr(levelStr string) *Logger
// 设置文件回溯值
func Skip(skip int) *Logger
// 是否开启trace打印
func Stack(enabled bool) *Logger
// 开启trace打印并设定过滤trace的字符串
func StackWithFilter(filter string) *Logger
// 是否开启终端输出
func Stdout(enabled...bool) *Logger
// 是否输出日志头信息
func Header(enabled...bool) *Logger
// 输出日志调用行号信息
func Line(long...bool) *Logger
// 异步输出日志
func Async(enabled...bool) *Logger
```

## 颜色打印

可以增加日志的可查看性，打印日志时，会将错误等级文字通过添加字体颜色的方式突出显示。

```go
package main

import (
	"context"

	"github.com/gogf/gf/v2/frame/g"
)

func main() {
	ctx := context.TODO()
	g.Log().Debug(ctx, "Debug")
	g.Log().Info(ctx, "Info")
	g.Log().Notice(ctx, "Notice")
	g.Log().Warning(ctx, "Warning")
	g.Log().Error(ctx, "Error")
}
```

![](https://goframe.org/download/attachments/20086799/image2021-12-31_10-51-10.png?version=1&modificationDate=1640919070315&api=v2)

# 使用配置

控制台是必然会自带颜色输出的，文件日志默认不带颜色

若需要在文件中的日志也带上颜色可以在配置文件中添加配置

```yaml
logger:
  stdoutColorDisabled: false # 是否关闭终端的颜色打印。默认否，表示终端的颜色输出。
  writerColorEnable:   false # 是否开启Writer的颜色打印。默认否，表示不输出颜色到自定义的Writer或者文件。
```

也可以在代码中添加

```go
g.Log().SetWriterColorEnable(true)
```

# 默认颜色对应表

默认情况下，不同日志等级对应的颜色如下：

```go
// \v2\os\glog\glog_logger_color.go
var defaultLevelColor = map[int]int{
	LEVEL_DEBU: COLOR_YELLOW,
	LEVEL_INFO: COLOR_GREEN,
	LEVEL_NOTI: COLOR_CYAN,
	LEVEL_WARN: COLOR_MAGENTA,
	LEVEL_ERRO: COLOR_RED,
	LEVEL_CRIT: COLOR_HI_RED,
	LEVEL_PANI: COLOR_HI_RED,
	LEVEL_FATA: COLOR_HI_RED,
}
```

## Context

## Handler

## JSON格式

## 异步输出

## 堆栈打印

## 调试信息

## Writer接口

## 常见问题

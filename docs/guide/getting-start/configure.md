# 服务

# 配置

GoFrame框架的WebServer配置管理非常方便，支持通过配置文件配置、多种配置文件格式、多种配置方式以及若干配置方法

## 配置文件

Server对象支持通过配置文件进行便捷的配置。支持的配置选项以及配置说明请查看接口文档说明，文档中有详细说明，以下章节不会对配置选项作介绍。

当使用g.Server(单例名称)获取Server单例对象时，将会自动通过默认的配置管理对象获取对应的Server配置。默认情况下会读取server.单例名称配置项，当该配置项不存在时，将会读取server配置项。

支持的配置文件配置项请参考 `Server`配置管理对象属性：[https://pkg.go.dev/github.com/gogf/gf/v2/net/ghttp#ServerConfig](https://pkg.go.dev/github.com/gogf/gf/v2/net/ghttp#ServerConfig)

默认配置:

```yaml
server:  
    address:    ":80"
    serverRoot: "/var/www/Server"
```

使用 g.Server() 获取默认的单例对象时自动获取并设置该配置

多个配置:

```yaml
server:
    address:    ":80"
    serverRoot: "/var/www/Server"
    server1:
        address:    ":8080"
        serverRoot: "/var/www/Server1"
    server2:
        address:    ":8088"
        serverRoot: "/var/www/Server2"
```

通过单例对象名称获取对应配置的Server单例对象

```go
// 对应 server.server1 配置项
s1 := g.Server("server1")
// 对应 server.server2 配置项
s2 := g.Server("server2")
// 对应默认配置项 server
s3 := g.Server("none")
// 对应默认配置项 server
s4 := g.Server()  
```

案例配置:

```yaml
server:
    address:          ":8199"
    serverRoot:       "/var/www/Server"
    indexFiles:       ["index.html", "main.html"]
    accessLogEnabled: true
    errorLogEnabled:  true
    pprofEnabled:     true
    log-path:         "/var/log/ServerLog"
    session_Id_Name:  "MySessionId"
    Session-path:     "/tmp/MySessionStoragePath"
    session_MaxAge:   "24h"
    DumpRouterMap:    false
```

同理，配置属性项的名称也不区分大小写，单词间也支持使用 `-`/`_`符号连接

::: tip

推荐配置文件中的配置项名称统一使用小驼峰的格式

:::

### 上传限制

`Server`对于客户端提交的数据是由大小限制的，主要有两个配置参数控制：

* `MaxHeaderBytes`：请求头大小限制，请求头包括客户端提交的 `Cookie`数据，默认设置为 `10KB`。
* `ClientMaxBodySize`：客户端提交的 `Body`大小限制，同时也影响文件上传大小，默认设置为 `8MB`。

### 日志配置

从 `v2`版本开始，`Server`增加了对配置文件中 `Logger`的配置项支持，主要是为了统一日志组件配置、并解决日志滚动切分的问题

```yaml
server:
    address: ":8080"
    logger:
      path:                 "/var/log/server" 
	    file:                 "{Y-m-d}.log"    
	    stdout:               false  
	    rotateSize:           "100M"  
	    rotateBackupLimit:    10
	    rotateBackupExpire:   "60d"
	    rotateBackupCompress: 9
	    rotateCheckInterval:  "24h" 
```

其中logger项的参考 todo: 日志.

## 配置文件模板

```yaml
server:
    # 基本配置
    address:             ":80"                        # 本地监听地址。默认":80"
    httpsAddr:           ":443"                       # TLS/HTTPS配置，同时需要配置证书和密钥。默认关闭
    httpsCertPath:       ""                           # TLS/HTTPS证书文件本地路径，建议使用绝对路径。默认关闭
    httpsKeyPath:        ""                           # TLS/HTTPS密钥文件本地路径，建议使用绝对路径。默认关闭
    readTimeout:         "60s"                        # 请求读取超时时间，一般不需要配置。默认为60秒
    writeTimeout:        "0"                          # 数据返回写入超时时间，一般不需要配置。默认不超时（0）
    idleTimeout:         "60s"                        # 仅当Keep-Alive开启时有效，请求闲置时间。默认为60秒
    maxHeaderBytes:      "10240"                      # 请求Header大小限制（Byte）。默认为10KB
    keepAlive:           true                         # 是否开启Keep-Alive功能。默认true
    serverAgent:         "GoFrame HTTP Server"        # 服务端Agent信息。默认为"GoFrame HTTP Server"

    # 接口文档
    openapiPath: "/api.json" # OpenAPI接口文档地址
    swaggerPath: "/swagger"  # 内置SwaggerUI展示地址

    # 静态服务配置
    indexFiles:          ["index.html","index.htm"]   # 自动首页静态文件检索。默认为["index.html", "index.htm"]
    indexFolder:         false                        # 当访问静态文件目录时，是否展示目录下的文件列表。默认关闭，那么请求将返回403
    serverRoot:          "/var/www"                   # 静态文件服务的目录根路径，配置时自动开启静态文件服务。默认关闭
    searchPaths:         ["/home/www","/var/lib/www"] # 提供静态文件服务时额外的文件搜索路径，当根路径找不到时则按照顺序在搜索目录查找。默认关闭
    fileServerEnabled:   false                        # 静态文件服务总开关。默认false

    # Cookie配置
    cookieMaxAge:        "365d"             # Cookie有效期。默认为365天
    cookiePath:          "/"                # Cookie有效路径。默认为"/"表示全站所有路径下有效
    cookieDomain:        ""                 # Cookie有效域名。默认为当前配置Cookie时的域名

	# Sessions配置
    sessionMaxAge:       "24h"              # Session有效期。默认为24小时
    sessionIdName:       "gfsessionid"      # SessionId的键名名称。默认为gfsessionid
    sessionCookieOutput: true               # Session特性开启时，是否将SessionId返回到Cookie中。默认true
    sessionPath:         "/tmp/gsessions"   # Session存储的文件目录路径。默认为当前系统临时目录下的gsessions目录

    # 日志基本配置
	logPath:             ""                 # 日志文件存储目录路径，建议使用绝对路径。默认为空，表示关闭
    logStdout:           true               # 日志是否输出到终端。默认为true
    errorStack:          true               # 当Server捕获到异常时是否记录堆栈信息到日志中。默认为true
    errorLogEnabled:     true               # 是否记录异常日志信息到日志中。默认为true
    errorLogPattern:     "error-{Ymd}.log"  # 异常错误日志文件格式。默认为"error-{Ymd}.log"
    accessLogEnabled:    false              # 是否记录访问日志。默认为false
    accessLogPattern:    "access-{Ymd}.log" # 访问日志文件格式。默认为"access-{Ymd}.log"

    # 日志扩展配置(参数日志组件配置)
    logger:
      path:                  "/var/log/"   # 日志文件路径。默认为空，表示关闭，仅输出到终端
      file:                  "{Y-m-d}.log" # 日志文件格式。默认为"{Y-m-d}.log"
      prefix:                ""            # 日志内容输出前缀。默认为空
      level:                 "all"         # 日志输出级别
      stdout:                true          # 日志是否同时输出到终端。默认true
      rotateSize:            0             # 按照日志文件大小对文件进行滚动切分。默认为0，表示关闭滚动切分特性
      rotateExpire:          0             # 按照日志文件时间间隔对文件滚动切分。默认为0，表示关闭滚动切分特性
      rotateBackupLimit:     0             # 按照切分的文件数量清理切分文件，当滚动切分特性开启时有效。默认为0，表示不备份，切分则删除
      rotateBackupExpire:    0             # 按照切分的文件有效期清理切分文件，当滚动切分特性开启时有效。默认为0，表示不备份，切分则删除
      rotateBackupCompress:  0             # 滚动切分文件的压缩比（0-9）。默认为0，表示不压缩
      rotateCheckInterval:   "1h"          # 滚动切分的时间检测间隔，一般不需要设置。默认为1小时

    # PProf配置
    pprofEnabled:        false              # 是否开启PProf性能调试特性。默认为false
    pprofPattern:        ""                 # 开启PProf时有效，表示PProf特性的页面访问路径，对当前Server绑定的所有域名有效。

    # 其他配置
    clientMaxBodySize:   810241024          # 客户端最大Body上传限制大小，影响文件上传大小(Byte)。默认为8*1024*1024=8MB
    formParsingMemory:   1048576            # 解析表单时的缓冲区大小(Byte)，一般不需要配置。默认为1024*1024=1MB
    nameToUriType:       0                  # 路由注册中使用对象注册时的路由生成规则。默认为0
    routeOverWrite:      false              # 当遇到重复路由注册时是否强制覆盖。默认为false，重复路由存在时将会在启动时报错退出
    dumpRouterMap:       true               # 是否在Server启动时打印所有的路由列表。默认为true
    graceful:            false              # 是否开启平滑重启特性，开启时将会在本地增加10000的本地TCP端口用于进程间通信。默认false       
    gracefulTimeout:     2                  # 父进程在平滑重启后多少秒退出，默认2秒。若请求耗时大于该值，可能会导致请求中断
```

## 配置方法

### 配置对象

定义: [https://pkg.go.dev/github.com/gogf/gf/v2/net/ghttp#ServerConfig](https://pkg.go.dev/github.com/gogf/gf/v2/net/ghttp#ServerConfig)

### 配置方法

方法列表: [https://pkg.go.dev/github.com/gogf/gf/v2/net/ghttp#Server](https://pkg.go.dev/github.com/gogf/gf/v2/net/ghttp#Server)

1. 可以通过 `SetConfig`及 `SetConfigWithMap`来设置。
2. 也可以使用 `Server`对象的 `Set*/Enable*`方法进行特定配置的设置。

::: warning

配置项在 `Server`执行 `Start`之后便不能再修改，防止产生并发安全问题。

:::

#### SetConfigWithMap 方法

我们可以使用 `SetConfigWithMap`方法通过 `Key-Value`键值对来设置/修改 `Server`的特定配置，其余的配置使用默认配置即可

```go
s := g.Server()
s.SetConfigWithMap(g.Map{
    "Address":    ":80",
    "ServerRoot": "/var/www/MyServerRoot",
})
s.Run()
```

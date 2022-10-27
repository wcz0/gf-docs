# 路由

`goframe`框架自建了非常强大的路由功能，提供了比任何同类框架更加出色的路由特性，支持流行的命名匹配规则、模糊匹配规则及字段匹配规则，并提供了优秀的优先级管理机制

## 路由参数

### 路由注册参数

```
[HTTPMethod:]路由规则[@域名]
```

其中HTTPMethod（支持的Method：GET,PUT,POST,DELETE,PATCH,HEAD,CONNECT,OPTIONS,TRACE）和@域名为非必需参数，一般来说直接给定路由规则参数即可，BindHandler会自动绑定所有的请求方式，如果给定HTTPMethod，那么路由规则仅会在该请求方式下有效。@域名可以指定生效的域名名称，那么该路由规则仅会在该域名下生效

### 精准匹配规则

精准匹配规则即未使用任何动态规则的规则，如：user、order、info等等这种确定名称的规则。

### 动态路由规则

动态路由规则分为三种：命名匹配规则、模糊匹配规则和字段匹配规则

#### 命名匹配规则(必填参数)

使用:name方式进行匹配(name为自定义的匹配名称)，对URI指定层级的参数进行命名匹配（类似正则([^/]+)，该URI层级必须有值），对应匹配参数会被解析为Router参数并传递给注册的服务接口使用。

示例1:

```
rule: /user/:user

/user/john                match
/user/you                 match
/user/john/profile        no match
/user/                    no match
```

示例2:

```
rule: /:name/action

/john/name                no match
/john/action              match
/smith/info               no match
/smith/info/age           no match
/smith/action             match
```

示例3:

```
rule: /:name/:action

/john/name                match
/john/info                match
/smith/info               match
/smith/info/age           no match
/smith/action/del         no match
```

#### 模糊匹配规则(可选参数)

使用*any方式进行匹配(any为自定义的匹配名称)，对URI指定位置之后的参数进行模糊匹配（类似正则(.*)，该URI层级可以为空），并将匹配参数解析为Router参数并传递给注册的服务接口使用

示例1:

```
rule: /src/*path

/src/                     match
/src/somefile.go          match
/src/subdir/somefile.go   match
/user/                    no match
/user/john                no match
```

示例2:

```
rule: /src/*path/:action

/src/                     no match
/src/somefile.go          match
/src/somefile.go/del      match
/src/subdir/file.go/del   match
```

示例3:

```
rule: /src/*path/show

/src/                     no match
/src/somefile.go          no match
/src/somefile.go/del      no match
/src/somefile.go/show     match
/src/subdir/file.go/show  match
/src/show                 match
```

#### 字段匹配规则

使用{field}方式进行匹配(field为自定义的匹配名称)，可对URI任意位置的参数进行截取匹配（类似正则([\w\.\-]+)，该URI层级必须有值，并且可以在同一层级进行多个字段匹配），并将匹配参数解析为Router参数并传递给注册的服务接口使用

示例1:

```
rule: /order/list/{page}.php

/order/list/1.php          match
/order/list/666.php        match
/order/list/2.php5         no match
/order/list/1              no match
/order/list                no match
```

示例2:

```
rule: /db-{table}/{id}

/db-user/1                     match
/db-user/2                     match
/db/user/1                     no match
/db-order/100                  match
/database-order/100            no match
```

示例3:

```
rule: /{obj}-{act}/*param

/user-delete/10                match
/order-update/20               match
/log-list                      match
/log/list/1                    no match
/comment/delete/10             no match
```

#### 优先级控制

优先级控制按照深度优先策略，主要的几点因素：

1. 层级越深的规则优先级越高；
2. 同一层级下，精准匹配优先级高于模糊匹配；
3. 同一层级下，模糊匹配优先级：字段匹配 > 命名匹配 > 模糊匹配；

示例:

```
/:name                   >            /*any
/user/name               >            /user/:action
/:name/info              >            /:name/:action
/:name/:action           >            /:name/*action
/:name/{action}          >            /:name/:action
/src/path/del            >            /src/path
/src/path/del            >            /src/path/:action
/src/path/*any           >            /src/path
```

## 路由注册

WebServer提供服务需要方法/对象的支持，ghttp包支持多种路由注册模式，为开发者提供非常强大和灵活的接口功能

### 规范注册 (推荐)

```go
import (
	"context"
	"fmt"
	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/net/ghttp"
)

type HelloReq struct {
	g.Meta `path:"/hello" method:"get"`
}
type HelloRes struct {
	g.Meta `mime:"text/html" example:"string"`
}

type Hello struct{}

func (Hello) Say(ctx context.Context, req *HelloReq) (res *HelloRes, err error) {
    g.RequestFromCtx(ctx).Response.Writeln("Hello World!")
	return
}

func main() {
	s := g.Server()
	s.Use(ghttp.MiddlewareHandlerResponse)
	s.Group("/", func(group *ghttp.RouterGroup) {
		group.Bind(
            new(Hello),
        )
	})
	s.Run()
}
```

以上代码注册了 `/*` 路由组下的 `/hello` 以外，Server自动帮我们注册了两个路由：`/api.json` 和 `/swagger/*`。前者是自动生成的基于标准的OpenAPIv3协议的接口文档，后者是自动生成SwaggerUI页面，方便开发者查看和调试。这两个功能默认是关闭的, 通过[配置](../getting-start/configure.md)文件开启

我们推荐使用对象化的方式来管理所有路由方法，并通过分组路由的Bind方法执行统一注册。

需要注意的是，在规范化路由方式下，路由地址以及请求方式将由请求结构体在g.Meta中定义，通过分组路由可以定义分组下的所有路由前缀。

我们可以通过RequestFromCtx/g.RequestFromCtx方法从ctx中获取Request对象。

### 函数注册

函数注册方式是最简单且最灵活的的路由注册方式，注册的服务可以是一个实例化对象的方法地址，也可以是一个包方法地址。服务需要的数据可以通过模块内部变量形式或者对象内部变量形式进行管理，开发者可根据实际情况进行灵活控制。相关方法:

```go
import (
    "github.com/gogf/gf/v2/frame/g"
    "github.com/gogf/gf/v2/net/ghttp"
)

func main() {
    s := g.Server()
    s.BindHandler("/hello", func(r *ghttp.Request) {
            r.Response.Write("哈喽世界！")
        })
    s.Run()
}
```

#### 包方法注册

```go
import (
	"github.com/gogf/gf/v2/container/gtype"
	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/net/ghttp"
)

var (
	total = gtype.NewInt()
)

func Total(r *ghttp.Request) {
	r.Response.Write("total:", total.Add(1))
}

func main() {
	s := g.Server()
	s.BindHandler("/total", Total)
	s.Run()
}
```

我们通过包方法的形式来注册路由。该方法返回总共访问的次数，由于涉及到并发安全，因此total变量使用了gtype.Int并发安全类型。执行后，当我们不停访问 `http://localhost:8000/total` 时，可以看到返回的数值不停递增。

#### 对象方法注册

注册的路由函数可以是一个对象的方法

```go
package main

import (
	"github.com/gogf/gf/v2/container/gtype"
	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/net/ghttp"
)

type Controller struct {
	total *gtype.Int
}

func (c *Controller) Total(r *ghttp.Request) {
	r.Response.Write("total:", c.total.Add(1))
}

func main() {
	s := g.Server()
	c := &Controller{
		total: gtype.NewInt(),
	}
	s.BindHandler("/total", c.Total)
	s.Run()
}
```

使用了对象来封装业务逻辑所需的变量，使用回调函数注册来灵活注册对应的对象方法。

### 对象注册

对象注册注册一个实例化的对象，以后每一个请求都交给该对象（同一对象）处理，该对象常驻内存不释放

可以通过 BindObject 方法完成对象的注册

#### 路由内置变量

当使用 `BindObject`方法进行对象注册时，在路由规则中可以使用两个内置的变量：`{.struct}`和 `{.method}`，前者表示当前 **对象名称** ，后者表示当前注册的**方法名**

```go
import (
	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/net/ghttp"
)
type Order struct{}

func (o *Order) List(r *ghttp.Request) {
	r.Response.Write("list")
}

func main() {
    s := g.Server()
    o := new(Order)
	s.BindObject("/{.struct}-{.method}", o)
	s.Run()
}
```

得到的路由为 /order-list

#### 命名风格规则

通过对象进行路由注册时，可以根据对象及方法名称自动生成路由规则，默认的路由规则为：当方法名称带有多个 `单词`（按照字符大写区分单词）时，路由控制器默认会自动使用英文连接符号 `-`进行拼接，因此访问的时候方法名称需要带 `-`号。

例如，方法名为 `UserName`时，生成的路由为 `user-name`；方法名为 `ShowListItems`时，生成的路由为 `show-list-items`；以此类推。

此外，我们可以通过 `.Server.SetNameToUriType`方法来设置对象方法名称的路由生成方式。支持的方式目前有 `4`种，对应 `4`个常量定义：

```go
UriTypeDefault  = 0 // （默认）全部转为小写，单词以'-'连接符号连接
UriTypeFullName = 1 // 不处理名称，以原有名称构建成URI
UriTypeAllLower = 2 // 仅转为小写，单词间不使用连接符号
UriTypeCamel    = 3 // 采用驼峰命名方式
```

::: warning

需要在通过对象进行路由注册前进行该参数的设置，在路由注册后设置将不会生效，那么将使用默认规则。

:::

```go
import (
	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/net/ghttp"
)

type User struct{}

func (u *User) ShowList(r *ghttp.Request) {
	r.Response.Write("list")
}

func main() {
	u := new(User)
	s1 := g.Server("UriTypeDefault")
	s2 := g.Server("UriTypeFullName")
	s3 := g.Server("UriTypeAllLower")
	s4 := g.Server("UriTypeCamel")

	s1.SetNameToUriType(ghttp.UriTypeDefault)
	s2.SetNameToUriType(ghttp.UriTypeFullName)
	s3.SetNameToUriType(ghttp.UriTypeAllLower)
	s4.SetNameToUriType(ghttp.UriTypeCamel)

	s1.BindObject("/{.struct}/{.method}", u)
	s2.BindObject("/{.struct}/{.method}", u)
	s3.BindObject("/{.struct}/{.method}", u)
	s4.BindObject("/{.struct}/{.method}", u)

	s1.SetPort(8100)
	s2.SetPort(8200)
	s3.SetPort(8300)
	s4.SetPort(8400)

	s1.Start()
	s2.Start()
	s3.Start()
	s4.Start()

	g.Wait()
}
```

为了对比演示效果，这个示例采用了 `多Server`运行方式，将不同的名称转换方式使用了不同的 `Server`来配置运行，因此我们可以方便地在同一个程序中，访问不同的 `Server`（通过不同的端口绑定）看到不同的结果。

```shell
http://127.0.0.1:8100/user/show-list
http://127.0.0.1:8200/User/ShowList
http://127.0.0.1:8300/user/showlist
http://127.0.0.1:8400/user/showList
```

#### 对象方法注册

假如控制器中有若干公开方法，但是我只想注册其中几个，其余的方法我不想对外公开，怎么办？我们可以通过 `BindObject`传递**第三个非必需参数**替换实现，参数支持传入**多个**方法名称，多个名称以英文 `,`号分隔（ **方法名称参数区分大小写** ）。

```go
import (
	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/net/ghttp"
)

type Controller struct{}

func (c *Controller) Index(r *ghttp.Request) {
	r.Response.Write("index")
}

func (c *Controller) Show(r *ghttp.Request) {
	r.Response.Write("show")
}

func main() {
	s := g.Server()
	c := new(Controller)
	s.BindObject("/object", c, "Show")
	s.Run()
}
```

得到 `/object/show` 路由

#### 绑定路由方法

我们可以通过 `BindObjectMethod`方法绑定指定的路由到指定的方法执行（ **方法名称参数区分大小写** ）。

```go
import (
	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/net/ghttp"
)

type Controller struct{}

func (c *Controller) Index(r *ghttp.Request) {
	r.Response.Write("index")
}

func (c *Controller) Show(r *ghttp.Request) {
	r.Response.Write("show")
}

func main() {
	s := g.Server()
	c := new(Controller)
	s.BindObjectMethod("/show", c, "Show")
	s.Run()
}
```

得到 `/show` 路由

## 路由组

### 分组路由

GoFrame框架支持分组路由的注册方式，可以给分组路由指定一个prefix前缀（也可以直接给定/前缀，表示注册在根路由下），在该分组下的所有路由注册都将注册在该路由前缀下。分组路由注册方式也是推荐的路由注册方式。

**接口文档**: https://pkg.go.dev/github.com/gogf/gf/v2/net/ghttp#RouterGroup

```go
import (
	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/net/ghttp"
)

func main() {
	s := g.Server()
	group := s.Group("/api")
	group.ALL("/all", func(r *ghttp.Request) {
		r.Response.Write("all")
	})
	group.GET("/get", func(r *ghttp.Request) {
		r.Response.Write("get")
	})
	group.POST("/post", func(r *ghttp.Request) {
		r.Response.Write("post")
	})
	s.Run()
}
```

Group方法用于创建一个分组路由对象，并且支持在指定域名对象上创建。
以HTTP Method命名的方法用于绑定指定的HTTP Method路由；其中ALL方法用于注册所有的HTTP Method到指定的函数/对象/控制器上；REST方法用于注册RESTful风格的路由，需给定一个执行对象或者控制器对象。

### 层级注册 (推荐)

::: info
GoFrame框架的层级路由注册方式灵感来源于PHP Laravel框架。😉
:::

推荐使用路由层级注册方式，注册的路由代码更清晰直观。

GoFrame框架的分组路由注册支持更加直观优雅层级的注册方式，以便于开发者更方便地管理路由列表。路由层级注册方式也是推荐的路由注册方式。

```go
func main() {
	s := g.Server()
	s.Group("/api.v2", func(group *ghttp.RouterGroup) {
		group.GET("/test", func(r *ghttp.Request) {
			r.Response.Write("test")
		})
		group.Group("/order", func(group *ghttp.RouterGroup) {
			group.GET("/list", func(r *ghttp.Request) {
				r.Response.Write("list")
			})
			group.PUT("/update", func(r *ghttp.Request) {
				r.Response.Write("update")
			})
		})
		group.Group("/user", func(group *ghttp.RouterGroup) {
			group.GET("/info", func(r *ghttp.Request) {
				r.Response.Write("info")
			})
			group.POST("/edit", func(r *ghttp.Request) {
				r.Response.Write("edit")
			})
			group.DELETE("/drop", func(r *ghttp.Request) {
				r.Response.Write("drop")
			})
		})
	})
	s.Run()
}
```

### 批量注册

可以使用ALLMap方法实现批量的路由注册

```go
s := g.Server()
// 前台系统路由注册
s.Group("/", func(group *ghttp.RouterGroup) {
	group.ALLMap(g.Map{
		"/":            api.Index,          // 首页
		"/login":       api.Login,          // 登录
		"/register":    api.Register,       // 注册
		"/category":    api.Category,       // 栏目
		"/topic":       api.Topic,          // 主题
		"/topic/:id":   api.Topic.Detail,   // 主题 - 详情
		"/ask":         api.Ask,            // 问答
		"/ask/:id":     api.Ask.Detail,     // 问答 - 详情
		"/article":     api.Article,        // 文章
		"/article/:id": api.Article.Detail, // 文章 - 详情
		"/reply":       api.Reply,          // 回复
		"/search":      api.Search,         // 搜索
		"/captcha":     api.Captcha,        // 验证码
		"/user/:id":    api.User.Index,     // 用户 - 主页
	})
	// 权限控制路由
	group.Group("/", func(group *ghttp.RouterGroup) {
		group.ALLMap(g.Map{
			"/user":     api.User,     // 用户
			"/content":  api.Content,  // 内容
			"/interact": api.Interact, // 交互
			"/file":     api.File,     // 文件
		})
	})
})
```

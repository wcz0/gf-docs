# 路由

`goframe`框架自建了非常强大的路由功能，提供了比任何同类框架更加出色的路由特性，支持流行的命名匹配规则、模糊匹配规则及字段匹配规则，并提供了优秀的优先级管理机制

## 路由参数

### 路由注册参数

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

我们通过包方法的形式来注册路由。该方法返回总共访问的次数，由于涉及到并发安全，因此total变量使用了gtype.Int并发安全类型。执行后，当我们不停访问 http://127.0.0.1:8199/total 时，可以看到返回的数值不停递增。

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
GoFrame框架的层级路由注册方式灵感来源于PHP Laravel框架。:wink:
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











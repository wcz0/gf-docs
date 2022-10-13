# 请求

请求输入依靠 `ghttp.Request` 对象实现，`ghttp.Request`继承了底层的 `http.Request`对象

相关方法: [https://pkg.go.dev/github.com/gogf/gf/v2/net/ghttp#Request](https://pkg.go.dev/github.com/gogf/gf/v2/net/ghttp#Request)

## 请求简介

### 提交类型

`GoFrame`框架的参数获取不是通过 `HTTP Method`来做区分，而是通过参数提交类型来区分。例如，分别通过 `HTTP Method: POST、INPUT、DELETE`来提交表单参数，在服务端获取参数不是通过 `GetPost`/`GetInput`/`GetDelete`的方式来获取，而是统一通过 `GetForm`方法来获取表单参数，针对其他的 `HTTP Method`也是如此。

在 `GoFrame`框架下，有以下几种提交类型：

1. `Router`: 路由参数，来源于路由规则匹配
2. `Query`: `URL`中的 `Query String`参数解析
3. `Form`: 表单提交参数，最常见的提交方式，提交的 `Content-Type`往往为：`application/x-www-form-urlencoded`、`multipart/form-data`、`multipart/mixed`。
4. `Body`: 原始提交内容，从 `Body`中获取并解析得到的参数，`JSON`/`XML`请求往往使用这种方式提交。
5. `Custom`: 自定义参数，往往在服务端的中间件、服务函数中通过 `SetParam/GetParam`方法管理。

获取的参数方法可以对指定键名的数据进行自动类型转换, 获取到的参数都是泛型变量，根据该泛型变量再根据需要调用对应的方法转换为对应的数据类型。

### 参数优先级

在 `GoFrame`框架下，我们根据不同的获取方法，将会按照不同的优先级进行获取，优先级高的方式提交的参数将会优先覆盖其他方式的同名参数。优先级规则如下：

1. `Get`及 `GetRequset`方法：`Router < Query < Body < Form < Custom`，也就是说自定义参数的优先级最高，其次是 `Form`表单参数，再次是 `Body`提交参数，以此类推。例如，`Query`和 `Form`中都提交了同样名称的参数 `id`，参数值分别为 `1`和 `2`，那么 `Get("id")`/`GetForm("id")`将会返回 `2`，而 `GetQuery("id")`将会返回 `1`。
2. `GetQuery`方法：`Query > Body`，也就是说 `query string`的参数将会覆盖 `Body`中提交的同名参数。例如，`Query`和 `Body`中都提交了同样名称的参数 `id`，参数值分别为 `1`和 `2`，那么 `Get("id")`将会返回 `2`，而 `GetQuery("id")`将会返回 `1`。
3. `GetForm`方法：由于该类型的方法仅用于获取 `Form`表单参数，因此没什么优先级的差别。

## 复杂参数

`ghttp.Request`对象支持智能的参数类型解析（不区分请求提交方式及请求提交类型），以下为提交参数示例以及服务端对应解析的变量类型

| Parameter               | Variable                       |
| ----------------------- | ------------------------------ |
| `k1=m&k2=n`           | `map[k1:m k2:n]`             |
| `k=m&k=n`             | `map[k:n]`                   |
| `k=m&k[a]=n`          | `error`                      |
| `k[]=m&k[]=n`         | `map[k:[m n]]`               |
| `k[a]=m&k[b]=n`       | `map[k:map[a:m b:n]]`        |
| `k[a][]=m&k[a][]=n`   | `map[k:map[a:[m n]]]`        |
| `k[a][a]=m&k[a][b]=n` | `map[k:map[a:map[a:m b:n]]]` |

### 同名参数

同名参数提交格式为: k=v1&k=v2, 后续的变量值将会覆盖前面的变量值

::: warning

需要注意的是，在标准库 `net/http`处理中，提交的同名参数将会被转换为字符串数组。

:::

### 数组参数

提交格式为: k[]=v1&k1[]=v2

### Map参数

提交格式为: k[a]=1&k[b]=2, 并且支持多级Map, 例如: k[a][a]=1&k[a][b]=2

## 对象处理

### 对象转换

对象转换在请求处理中非常常见。我们推荐将输入和输出定义为 `struct`结构体对象，以便于结构化的参数输入输出维护。`GoFrame`框架支持非常便捷的对象转换，支持将客户端提交的参数如 `Query`参数、表单参数、内容参数、`JSON/XML`等参数非常便捷地转换为指定的 `struct`结构体，并且支持提交参数与 `struct`属性的映射关系维护。

对象转换方法使用 `Request`对象的 `Parse`方法或者 `Get*Struct`方法，具体方法定义请参考API文档： [https://pkg.go.dev/github.com/gogf/gf/v2/net/ghttp#Request](https://pkg.go.dev/github.com/gogf/gf/v2/net/ghttp#Request)

### 参数映射

#### 默认规则

客户端提交的参数如果需要映射到服务端定义的 `struct`属性上，可以采用默认的映射关系，这一点非常方便。默认的转换规则如下：

1. `struct`中需要匹配的属性必须为 **`公开属性`** (首字母大写)。
2. 参数名称会自动按照 **`不区分大小写`** 且 **忽略 `-/_/空格`符号** 的形式与 `struct`属性进行匹配。
3. 如果匹配成功，那么将键值赋值给属性，如果无法匹配，那么忽略该键值。

示例:

```
map键名    struct属性     是否匹配
name       Name           match
Email      Email          match
nickname   NickName       match
NICKNAME   NickName       match
Nick-Name  NickName       match
nick_name  NickName       match
nick name  NickName       match
NickName   Nick_Name      match
Nick-name  Nick_Name      match
nick_name  Nick_Name      match
nick name  Nick_Name      match
```

::: tip

由于底层对象转换实现使用的是 `gconv`模块，因此也支持 `c/gconv/json`标签，更详细的规则可以参考请参考 [类型转换-Struct转换](#请求简介)。

:::

#### 自定义规则

自定义的参数映射规则可以通过为 `struct`属性绑定 `tag`实现，`tag`名称可以为 `p/param/params`

示例:

```go
type User struct{
    Id    int
    Name  string
    Pass1 string `p:"password1"`
    Pass2 string `p:"password2"`
}
```

其中我们使用了 `p`标签来指定该属性绑定的参数名称。`password1`参数将会映射到 `Pass1`属性，`password2`将会映射到 `Pass2`属性上。其他属性采用默认的转换规则即可，无需设置 `tag`。

### Parse 转换

我们同时可以使用 `Parse`方法来实现 `struct`的转换，该方法是一个便捷方法，内部会自动进行转换及数据校验，但如果 `struct`中没有校验 `tag`的绑定将不会执行校验逻辑。

::: tip

从 `GoFrame v2`版本开始，我们推荐使用结构化的方式来定义路由方法，更便捷地管理输入输出数据结构及其实例对象，具体请参考：[路由注册-规范路由](route#规范注册-推荐)

:::

## Context

请求流程往往会在上下文中共享一些自定义设置的变量，例如在请求开始之前通过中间件设置一些变量，随后在路由服务方法中可以获取该变量并相应对一些处理.

在 `GoFrame`框架中，我们推荐使用 `Context`上下文对象来处理流程共享的上下文变量，甚至将该对象进一步传递到依赖的各个模块方法中。

### 方法列表

```go
func (r *Request) GetCtx() context.Context
func (r *Request) SetCtx(ctx context.Context)
func (r *Request) GetCtxVar(key interface{}, def ...interface{}) *gvar.Var
func (r *Request) SetCtxVar(key interface{}, value interface{})
```

- `GetCtx`方法用于获取当前的 `context.Context`对象，作用同 `Context`方法。
- `SetCtx`方法用于设置自定义的 `context.Context`上下文对象。
- `GetCtxVar`方法用于获取上下文变量，并可给定当该变量不存在时的默认值。
- `SetCtxVar`方法用于设置上下文变量。

示例:

`SetCtx`方法常用于中间件中整合一些第三方的组件，例如第三方的链路跟踪组件等等。

```go
import (
	"context"
	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/net/ghttp"
)

const (
	TraceIdName = "trace-id"
)

func main() {
	s := g.Server()
	s.Group("/", func(group *ghttp.RouterGroup) {
		group.Middleware(func(r *ghttp.Request) {
			ctx := context.WithValue(r.Context(), TraceIdName, "HBm876TFCde435Tgf")
			r.SetCtx(ctx)
			r.Middleware.Next()
		})
		group.ALL("/", func(r *ghttp.Request) {
			r.Response.Write(r.Context().Value(TraceIdName))
			// 也可以使用
			// r.Response.Write(r.GetCtxVar(TraceIdName))
		})
	})
	s.Run()
}
```

## 文件上传

在服务端通过 `Request`对象获取上传文件：

```go
import (
	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/net/ghttp"
)

// Upload uploads files to /tmp .
func Upload(r *ghttp.Request) {
	files := r.GetUploadFiles("upload-file")
    names, err := files.Save("/tmp/")
    if err != nil {
		r.Response.WriteExit(err)
	}
	r.Response.WriteExit("upload successfully: ", names)
}

func main() {
	s := g.Server()
	s.Group("/upload", func(group *ghttp.RouterGroup) {
		group.POST("/", Upload)
	})
	s.Run()
}
```

http://127.0.0.1:8000/upload 接口用于文件上传，该接口同时支持单个文件或者多个文件上传；

**关键代码说明**

1. 我们在服务端可以通过 `r.GetUploadFiles`方法获得上传的所有文件对象，也可以通过 `r.GetUploadFile`获取单个上传的文件对象。
2. 在 `r.GetUploadFiles("upload-file")`中的参数 `"upload-file"`为本示例中客户端上传时的表单文件域名称，开发者可以根据前后端约定在客户端中定义，以方便服务端接收表单文件域参数。
3. 通过 `files.Save`可以将上传的多个文件方便地保存到指定的目录下，并返回保存成功的文件名。如果是批量保存，只要任意一个文件保存失败，都将会立即返回错误。此外，`Save`方法的第二个参数支持随机自动命名上传文件。
4. 通过 `group.POST("/", Upload)`注册的路由仅支持 `POST`方式访问。
